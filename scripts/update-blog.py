import json
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path


RSS_URL = "https://computergeeks.hashnode.dev/rss.xml"
OUTPUT_PATH = Path(__file__).parents[1] / "assets" / "data" / "blog.json"
NAMESPACES = {
    "content": "http://purl.org/rss/1.0/modules/content/",
    "media": "http://search.yahoo.com/mrss/",
}


def first_text(item, tag, namespaced_tag=None):
    node = item.find(tag)
    if node is None and namespaced_tag:
        node = item.find(namespaced_tag, NAMESPACES)
    return (node.text or "").strip() if node is not None else ""


def extract_image(item):
    enclosure = item.find("enclosure")
    if enclosure is not None and enclosure.get("url"):
        return enclosure.get("url")

    media_content = item.find("media:content", NAMESPACES)
    if media_content is not None and media_content.get("url"):
        return media_content.get("url")

    return ""


def main():
    request = urllib.request.Request(
        RSS_URL,
        headers={"User-Agent": "Mozilla/5.0 (compatible; blog-feed-updater/1.0)"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        root = ET.fromstring(response.read())

    articles = []
    for item in root.findall("./channel/item")[:10]:
        articles.append(
            {
                "title": first_text(item, "title") or "Untitled article",
                "link": first_text(item, "link"),
                "description": first_text(item, "description", "content:encoded"),
                "image": extract_image(item),
            }
        )

    if not articles:
        raise RuntimeError("RSS feed returned no articles")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(articles, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()