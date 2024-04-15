import React, { useEffect, useState } from "react";
import style from "./news.module.css";
import Article from "../../components/article";

const News = () => {
  const [newsList, setNews] = useState([]);

  const fetchNews = async () => {
    const url =
      "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=79dfa1154873475bbc47172dfb39f998";
    const res = await fetch(url);
    const res_json = await res.json();
    const _news = res_json.articles;
    let filterNews = [];
    filterNews = _news.filter(
      (_article) =>
        _article["description"] !== null && _article["urlToImage"] !== null
    );
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
          urlToImage={_article.urlToImage}
        />
      ))}
    </div>
  );
};

export default News;
