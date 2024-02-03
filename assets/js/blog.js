const endpoint = "https://gql.hashnode.com";
let endCursor =
  "NjQxZTc4NGY0M2NiMzc2YjAyNzNkMzU4XzIwMjMtMDMtMjVUMDQ6Mjc6NTkuNjQxWg==";

function generateQuery(endCursor) {
  const query = `
query Publication {
  publication(host: "computergeeks.hashnode.dev") {
    isTeam,
    title,
    posts(first: 10, after: "${endCursor}") {
      edges {
        node {
          title,
          brief,
          url,
          slug,
          coverImage {
            attribution,
            url,
            photographer
          }
        }
      }
      pageInfo {
        endCursor,
        hasNextPage
      }
    }
  }
}`;
console.log(query)
return query
}

const variables = {
  username: "shubhamblogs",
  page: 0,
};
const articlesList = document.getElementById("articles");
const loadMoreButton = document.getElementById("load-more-button");
let currentPage = 0;

function fetchArticles(query) {
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      const articles = json.data.publication.posts.edges;
      articles.forEach((article) => {
        article = article.node;
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = article.coverImage.url;
        card.appendChild(img);

        const imageCredit = document.createElement("cite");
        imageCredit.textContent =
          "Photograph by " + article.coverImage.photographer;
        card.appendChild(imageCredit);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        const a = document.createElement("a");
        a.textContent = article.title;
        a.href = `https://computergeeks.hashnode.dev/${article.slug}`;
        cardTitle.appendChild(a);
        cardBody.appendChild(cardTitle);

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = article.brief;
        cardBody.appendChild(cardText);

        card.appendChild(cardBody);
        articlesList.appendChild(card);
      });
      let pageInfo = json.data.publication.posts.pageInfo
      if (pageInfo.hasNextPage == false) {
        loadMoreButton.style.display = "none";
      } else {
        endCursor = pageInfo.endCursor
      }
    })
    .catch((err) => console.error(err));
}


valid_query = generateQuery(endCursor)
fetchArticles(valid_query);

loadMoreButton.addEventListener("click", () => {
  new_query=generateQuery(endCursor)
  fetchArticles(new_query);
});
