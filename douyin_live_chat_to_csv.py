#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import argparse
import csv
import datetime as dt
import re
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

DEFAULT_SELECTORS = [
    # Common containers for Douyin web live chat (these often change).
    # We'll look within these for individual message rows.
    '[class*="Chat"], [class*="chat"], [class*="Comment"], [class*="comment"], [class*="Message"], [class*="message"]',
    # Fallback to any scrollable panel that might hold chat items
    'div[role="log"], div[role="feed"], div[aria-live], [class*="Scroll"], [class*="scroll"]'
]

# Heuristics to split username/content from a combined line of text
USERNAME_SEP_PATTERNS = [
    r'：', r': ', r':', r' - ', r'——', r'—'
]

def now_ts():
    return dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

def sanitize_text(s: str) -> str:
    return re.sub(r'\s+', ' ', s).strip()

def guess_user_and_content(line: str):
    """Try to split a line into username + content using separators; if no match, return ('', line)."""
    for sep in USERNAME_SEP_PATTERNS:
        if sep in line:
            parts = line.split(sep, 1)
            if len(parts) == 2:
                return sanitize_text(parts[0]), sanitize_text(parts[1])
    return '', sanitize_text(line)

def attach_mutation_observer(page):
    """
    Inject a MutationObserver that collects likely chat lines into window.__CHAT_BUFFER.
    We'll scan added nodes for short-ish text lines that look like chat messages.
    """
    page.evaluate("""() => {
        window.__CHAT_BUFFER = [];
        window.__CHAT_SEEN = new Set();

        function looksLikeChatText(t) {
            if (!t) return false;
            const s = t.trim();
            if (s.length < 1) return false;
            // Filter out very long blobs (likely not a single message) and generic join messages if too noisy
            if (s.length > 180) return false;
            return true;
        }

        function extractText(node) {
            // Join all text nodes within the node
            return (node.innerText || node.textContent || '').trim();
        }

        function processNode(node) {
            try {
                if (!(node instanceof HTMLElement)) return;
                const text = extractText(node);
                if (!looksLikeChatText(text)) return;

                // Use a hash to avoid duplicates
                const key = text + '|' + (Date.now());
                if (!window.__CHAT_SEEN.has(key)) {
                    window.__CHAT_SEEN.add(key);
                    window.__CHAT_BUFFER.push({text, time: Date.now()});
                }
            } catch (e) {
                // ignore
            }
        }

        const obs = new MutationObserver(mutations => {
            for (const m of mutations) {
                if (m.addedNodes) {
                    for (const n of m.addedNodes) {
                        if (n instanceof HTMLElement) {
                            // Direct node
                            processNode(n);
                            // Children
                            n.querySelectorAll && n.querySelectorAll('*').forEach(processNode);
                        }
                    }
                }
            }
        });

        // Observe the whole document; this is heavy but robust for dynamic sites
        obs.observe(document, {subtree: true, childList: true});
    }""")

def drain_buffer(page):
    data = page.evaluate("""() => {
        const out = window.__CHAT_BUFFER ? [...window.__CHAT_BUFFER] : [];
        if (window.__CHAT_BUFFER) window.__CHAT_BUFFER.length = 0;
        return out;
    }""")
    return data or []

def wait_for_possible_chat_container(page, timeout_ms=15000):
    """Try to wait for at least one likely container to exist; if not, continue anyway."""
    for sel in DEFAULT_SELECTORS:
        try:
            page.wait_for_selector(sel, timeout=timeout_ms)
            return sel
        except PlaywrightTimeoutError:
            continue
    return None

def main():
    parser = argparse.ArgumentParser(description="Capture Douyin live chat to CSV (best-effort, DOM-based).")
    parser.add_argument("url", help="Douyin live URL, e.g. https://live.douyin.com/646454278948")
    parser.add_argument("--minutes", type=int, default=20, help="Capture duration in minutes (default: 20)")
    parser.add_argument("--outfile", default="douyin_live_chat.csv", help="CSV output path (default: douyin_live_chat.csv)")
    parser.add_argument("--headless", action="store_true", help="Run headless (may fail if login/DRM required)")

    args = parser.parse_args()
    out_path = Path(args.outfile)

    print(f"[{now_ts()}] Opening browser...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=args.headless)
        context = browser.new_context(locale="zh-CN", viewport={"width": 1280, "height": 800})
        page = context.new_page()

        print(f"[{now_ts()}] Navigating: {args.url}")
        page.goto(args.url, wait_until="domcontentloaded", timeout=60000)

        # Some rooms show a consent / 18+ / login prompt. Give the user a chance to solve it.
        print(f"[{now_ts()}] If the page requires login/consent, please complete it in the opened browser.")
        input(f"[{now_ts()}] Press ENTER here to start capture... ")

        # Try to wait for a possible chat container (best-effort)
        sel = wait_for_possible_chat_container(page) or "(document)"
        print(f"[{now_ts()}] Chat container heuristic: {sel}")

        attach_mutation_observer(page)

        # Prepare CSV
        first_write = not out_path.exists()
        f = open(out_path, "a", newline="", encoding="utf-8")
        writer = csv.writer(f)
        if first_write:
            writer.writerow(["timestamp", "username", "content", "raw_text"])

        print(f"[{now_ts()}] Capturing for ~{args.minutes} min. Ctrl+C to stop early.")
        deadline = time.time() + args.minutes * 60

        try:
            while time.time() < deadline:
                # Drain buffer periodically
                rows = drain_buffer(page)
                write_count = 0
                for item in rows:
                    raw = sanitize_text(item.get("text", ""))
                    if not raw:
                        continue
                    # Heuristic: split first token as username if it looks like "name: content"
                    username, content = guess_user_and_content(raw)
                    ts = now_ts()
                    writer.writerow([ts, username, content, raw])
                    write_count += 1

                if write_count:
                    print(f"[{now_ts()}] +{write_count} messages")

                time.sleep(2)
        except KeyboardInterrupt:
            print(f"\n[{now_ts()}] Stopped by user.")
        finally:
            f.close()
            context.close()
            browser.close()

    print(f"[{now_ts()}] Done. Saved to: {out_path.resolve()}")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("Fatal error:", e)
        sys.exit(1)
