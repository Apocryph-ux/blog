import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import './Container.css';
import Header from '../../Components/Header/Header';

const Container = () => {
  const { id } = useParams();
  const location = useLocation();
  const articleFromState = location.state;
  const [article, setArticle] = useState(articleFromState || null);
  const [loading, setLoading] = useState(!articleFromState);

  useEffect(() => {
    if (!articleFromState) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`https://855637b89fc9ec39.mokky.dev/news/${id}`);
          setArticle(response.data);
        } catch (error) {
          console.error("Ошибка загрузки статьи:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id, articleFromState]);

  if (loading)
    return (
      <div className="div_load">
        <div className="col-3">
          <div className="snippet" data-title="dot-rolling">
            <div className="stage">
              <div className="dot-rolling"></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (!article) return <div>Статья не найдена</div>;

  return (
    <div className="container">
      <Header />
      <div className="tabs">
        <Link to="/" className="tab red">Назад</Link>
      </div>
       <p>{location.pathname}</p>

      <div className="main-content single-article-content">
        <h2 className="article-title">{article.title}</h2>
        <p className="article-date">{article.date}</p>
        <p className="article-text">{article.content}</p>

        {article.image && (
          <img src={article.image} alt={article.title} className="article-image" />
        )}

        <p className="article-source">
          Источник: <span className="source-link">{article.source}</span>
        </p>

        <div className="article-tags">
          <span className="tag-button">{article.category}</span>
        </div>

        <Link to={`/update/${article.id}`}>
          <button type="button" className="btn_update">Редактировать</button>
        </Link>
        <button type="button" className="btn_delete">Удалить</button>
      </div>
    </div>
  );
};

export default Container;
