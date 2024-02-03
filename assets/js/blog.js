const endpoint = 'https://api.hashnode.com';
      const query = `
        query User($username: String!, $page: Int!) {
          user(username: $username) {
            publication {
              posts(page: $page) {
                title
                brief
                slug
                coverImage
              }
            }
          }
        }
      `;
      const variables = {
        username: 'shubhamblogs',
        page: 0,
      };
      const articlesList = document.getElementById('articles');
      const loadMoreButton = document.getElementById('load-more-button');
      let currentPage = 0;

      function fetchArticles() {
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: {
              ...variables,
              page: currentPage,
            },
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            const articles = json.data.user.publication.posts;
            articles.forEach((article) => {
              const card = document.createElement('div');
              card.classList.add('card');

              const img = document.createElement('img');
              img.classList.add('card-img-top');
              img.src = article.coverImage;
              card.appendChild(img);

              const cardBody = document.createElement('div');
              cardBody.classList.add('card-body');

              const cardTitle = document.createElement('h5');
              cardTitle.classList.add('card-title');
              const a = document.createElement('a');
              a.textContent = article.title;
              a.href = `https://computergeeks.hashnode.dev/${article.slug}`;
              cardTitle.appendChild(a);
              cardBody.appendChild(cardTitle);

              const cardText = document.createElement('p');
              cardText.classList.add('card-text');
              cardText.textContent = article.brief;
              cardBody.appendChild(cardText);

              card.appendChild(cardBody);
              articlesList.appendChild(card);
            });

            if (articles.length === 0) {
              loadMoreButton.style.display = 'none';
            } else {
              currentPage++;
            }
          })
          .catch((err) => console.error(err));
      }

      fetchArticles();

      loadMoreButton.addEventListener('click', () => {
        fetchArticles();
      });
