const fallbackArticles = [
  {
    title: "Senior Python Backend Developer Interview Guide",
    link: "https://computergeeks.hashnode.dev/senior-python-backend-developer-interview-guide",
    description: "A practical guide to Python backend interview prep, data structures, architecture, and real-world engineering expectations.",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/Nz0LoJB4d0g/upload/ea5466cb80df83940c3f10b6221202ab.jpeg"
  },
  {
    title: "Docker",
    link: "https://computergeeks.hashnode.dev/docker",
    description: "An introduction to Docker, containers, and the most useful commands for day-to-day development and deployment workflows.",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/HjBOmBPbi9k/upload/db70a0da48d3db37d9eeaac73c91baf8.jpeg"
  },
  {
    title: "Request and Response",
    link: "https://computergeeks.hashnode.dev/request-and-response",
    description: "A clear explanation of how HTTP requests and responses flow between clients and servers in modern web applications.",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/YiX1jsdbWhY/upload/9e7dafbb7230f6dc1f10f66e31c29a2b.jpeg"
  },
  {
    title: "Deep Copy v/s Shallow Copy",
    link: "https://computergeeks.hashnode.dev/deep-copy-vs-shallow-copy",
    description: "Understand the difference between deep and shallow copying in Python and how mutation behavior changes across nested structures.",
    image: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/cvBBO4PzWPg/upload/6ccb1d5857e984318e8d923f3f94bc67.jpeg"
  },
  {
    title: "What is an operating system, and how does it work?",
    link: "https://computergeeks.hashnode.dev/what-is-an-operating-system-and-how-does-it-work",
    description: "Learn how the operating system manages hardware, memory, processes, and user-facing tasks in a computer system.",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1677261780069/9e741c89-c553-411c-a51f-87455ae5cc0d.png"
  }
];

const rssUrls = [
  "https://computergeeks.hashnode.dev/rss.xml",
  "https://computergeeks.hashnode.dev/rss"
];
const articlesList = document.getElementById("articles");
const loadMoreButton = document.getElementById("load-more-button");

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeImageUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") {
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";
  }

  return trimmed;
}

function createArticleCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");

  const imageUrl = normalizeImageUrl(item.image);
  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = imageUrl;
  img.alt = item.title;
  img.onerror = function () {
    this.onerror = null;
    this.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";
  };
  card.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  const a = document.createElement("a");
  a.textContent = item.title;
  a.href = item.link;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  cardTitle.appendChild(a);
  cardBody.appendChild(cardTitle);

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  const text = stripHtml(item.description || item.content || "");
  cardText.textContent = text.length > 180 ? text.slice(0, 180) + "..." : text;
  cardBody.appendChild(cardText);

  card.appendChild(cardBody);
  return card;
}

function renderArticles(items) {
  if (!articlesList) return;

  articlesList.innerHTML = "";

  if (!items || !items.length) {
    articlesList.innerHTML = "<p class='text-center'>Blog posts are temporarily unavailable.</p>";
    if (loadMoreButton) loadMoreButton.style.display = "none";
    return;
  }

  items.slice(0, 6).forEach((item) => {
    articlesList.appendChild(createArticleCard(item));
  });

  if (loadMoreButton) {
    loadMoreButton.style.display = "none";
  }
}

async function fetchArticles() {
  if (!articlesList) return;

  for (const url of rssUrls) {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) continue;

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "application/xml");
      const items = Array.from(xml.querySelectorAll("item")).slice(0, 10);

      if (!items.length) {
        renderArticles(fallbackArticles);
        return;
      }

      const parsedItems = items.map((item) => {
        const description = item.querySelector("description")?.textContent || item.querySelector("content\\:encoded")?.textContent || "";
        const image = item.querySelector("enclosure")?.getAttribute("url") || item.querySelector("media\\:content")?.getAttribute("url") || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";

        return {
          title: item.querySelector("title")?.textContent || "Untitled article",
          link: item.querySelector("link")?.textContent || "#",
          description,
          content: item.querySelector("content\\:encoded")?.textContent || "",
          image
        };
      });

      renderArticles(parsedItems);
      return;
    } catch (error) {
      console.warn(`Blog feed unavailable at ${url}:`, error);
    }
  }

  renderArticles(fallbackArticles);
}

fetchArticles();

if (loadMoreButton) {
  loadMoreButton.addEventListener("click", fetchArticles);
}
