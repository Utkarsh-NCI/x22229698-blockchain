import React, { useEffect, useState } from "react";
import style from "./news.module.css";
import Article from "../../components/article";

const News = () => {
  const [newsList, setNews] = useState([]);

  const fetchNews = async () => {
    const url =
      "https://gnews.io/api/v4/search?q=sports&lang=en&country=us&max=10&apikey=e8d1d95266c98e172642b301c2e61219";
    const res = await fetch(url);
    const res_json = await res.json();
    const _news = res_json.articles;
    let filterNews = [];
    filterNews = _news.filter((_article) => _article["description"] !== null);
    console.log(filterNews);
    setNews(filterNews);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  console.log(newsList, "1");

  return (
    <div className={style.rootContainer}>
      {newsList.map((_article) => (
        <Article
          key={_article.title}
          title={_article.title}
          description={_article.description}
          url={_article.url}
          urlToImage={_article.image}
        />
      ))}
    </div>
  );
};

export default News;
