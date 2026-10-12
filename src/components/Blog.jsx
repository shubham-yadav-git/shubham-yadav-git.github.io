import { useState } from 'react';
import Section from './Section';
import articles from '../data/blog.json';

function truncate(text, maxLen) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
}

export default function Blog() {
  const [visibleCount, setVisibleCount] = useState(6);

  const visible = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <Section
      id="blog"
      num={4}
      title="Blog"
      intro="Technical articles by Shubham Yadav covering backend architectures, Python automation, Docker, and modern software engineering practices."
    >
      <ol className="articles">
        {visible.map((article) => (
          <li key={article.link} className="article">
            <div>
              <h3 className="article__title">
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p className="article__excerpt">{truncate(article.description, 180)}</p>
            </div>
          </li>
        ))}
      </ol>

      {hasMore && (
        <button className="text-button" onClick={() => setVisibleCount((c) => c + 3)}>
          Load more
        </button>
      )}
    </Section>
  );
}
