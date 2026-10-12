import { useState, useEffect } from 'react';
import './Blog.css';

const FALLBACK_ARTICLES = [
  {
    title: 'Senior Python Backend Developer Interview Guide',
    link: 'https://computergeeks.hashnode.dev/senior-python-backend-developer-interview-guide',
    description:
      'A practical guide to Python backend interview prep, data structures, architecture, and real-world engineering expectations.',
    image:
      'https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/Nz0LoJB4d0g/upload/ea5466cb80df83940c3f10b6221202ab.jpeg',
  },
  {
    title: 'Docker',
    link: 'https://computergeeks.hashnode.dev/docker',
    description:
      'An introduction to Docker, containers, and the most useful commands for day-to-day development and deployment workflows.',
    image:
      'https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/HjBOmBPbi9k/upload/db70a0da48d3db37d9eeaac73c91baf8.jpeg',
  },
  {
    title: 'Request and Response',
    link: 'https://computergeeks.hashnode.dev/request-and-response',
    description:
      'A clear explanation of how HTTP requests and responses flow between clients and servers in modern web applications.',
    image:
      'https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/YiX1jsdbWhY/upload/9e7dafbb7230f6dc1f10f66e31c29a2b.jpeg',
  },
  {
    title: 'Deep Copy v/s Shallow Copy',
    link: 'https://computergeeks.hashnode.dev/deep-copy-vs-shallow-copy',
    description:
      'Understand the difference between deep and shallow copying in Python and how mutation behavior changes across nested structures.',
    image:
      'https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/cvBBO4PzWPg/upload/6ccb1d5857e984318e8d923f3f94bc67.jpeg',
  },
  {
    title: 'What is an operating system, and how does it work?',
    link: 'https://computergeeks.hashnode.dev/what-is-an-operating-system-and-how-does-it-work',
    description:
      'Learn how the operating system manages hardware, memory, processes, and user-facing tasks in a computer system.',
    image:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1677261780069/9e741c89-c553-411c-a51f-87455ae5cc0d.png',
  },
];

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

function truncate(text, maxLen) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
}

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // 1. Try live RSS
      try {
        const res = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcomputergeeks.hashnode.dev%2Frss.xml'
        );
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
            setArticles(
              data.items.map((item) => ({
                title: item.title,
                link: item.link,
                description: stripHtml(item.description || ''),
                image: item.thumbnail || item.enclosure?.link || '',
              }))
            );
            setLoading(false);
            return;
          }
        }
      } catch (_) {
        // fall through
      }

      // 2. Try local JSON
      try {
        const res = await fetch('/assets/data/blog.json');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setArticles(
              data.map((item) => ({
                title: item.title,
                link: item.link,
                description: stripHtml(item.description || ''),
                image: item.image || '',
              }))
            );
            setLoading(false);
            return;
          }
        }
      } catch (_) {
        // fall through
      }

      // 3. Fallback
      setArticles(FALLBACK_ARTICLES);
      setLoading(false);
    }

    load();
  }, []);

  const visible = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <section id="blog">
      <div className="section-header">
        <h2>Blog</h2>
        <p>
          Technical articles by Shubham Yadav covering backend architectures, Python automation,
          Docker, and modern software engineering practices.
        </p>
      </div>

      {loading ? (
        <p className="blog-loading">Loading articles…</p>
      ) : (
        <>
          <div className="blog-grid">
            {visible.map((article) => (
              <article key={article.link} className="blog-card">
                {article.image && (
                  <div className="blog-card__img-wrap">
                    <img
                      src={article.image}
                      alt=""
                      className="blog-card__img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="blog-card__body">
                  <h3 className="blog-card__title">
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </h3>
                  <p className="blog-card__excerpt">
                    {truncate(article.description, 180)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="blog-more">
              <button
                className="blog-more__btn"
                onClick={() => setVisibleCount((c) => c + 3)}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
