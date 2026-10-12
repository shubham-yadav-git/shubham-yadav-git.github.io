import html
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path


RSS_URL = "https://computergeeks.hashnode.dev/rss.xml"
OUTPUT_PATH = Path(__file__).parents[1] / "src" / "data" / "blog.json"


def text_of(item, tag):
    node = item.find(tag)
    return (node.text or "").strip() if node is not None else ""


def plain_text(markup):
    return " ".join(html.unescape(re.sub(r"<[^>]*>", " ", markup)).split())


def main():
    request = urllib.request.Request(
        RSS_URL,
        headers={"User-Agent": "Mozilla/5.0 (compatible; blog-feed-updater/1.0)"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        root = ET.fromstring(response.read())

    articles = [
        {
            "title": text_of(item, "title") or "Untitled article",
            "link": text_of(item, "link"),
            "description": plain_text(text_of(item, "description")),
        }
        for item in root.findall("./channel/item")[:10]
    ]

    if not articles:
        raise RuntimeError("RSS feed returned no articles")

    OUTPUT_PATH.write_text(json.dumps(articles, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
