import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header/Header';

const CategoryNews = () => {
    const { id } = useParams();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchCategoryNews = async () => {
            try {
                const response = await axios.get(`https://855637b89fc9ec39.mokky.dev/news?category=${id}`);
                setNews(response.data);
            } catch (error) {
                console.error('Ошибка загрузки:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryNews();
    }, [id]);

    if (loading) return <div className='div_load'>
     <div class="col-3">
        <div class="snippet" data-title="dot-rolling">
          <div class="stage">
            <div class="dot-rolling"></div>
          </div>
        </div>
      </div>
  </div>;

    return (
        <div className="container1">
            <Header />
            <div className="tabs">
                <Link style={{backgroundColor:'#19B886'}} to="/category" className="tab yellow"> Назад к категориям</Link>
            </div>

   

            <div className="row1">
                {news.map(item => (
                    <div key={item.id} className="col">
                        <Link to={`/container/${item.id}`} className="news-link">
                            <div className='col_text'> 
                                <h3 className="news-title">{item.title}</h3>
                                <p className="news-date">{item.date}</p>
                                <p className="news-category">{item.category}</p>
                            </div>
                        </Link>
                    </div>
                ))}
                
                {news.length === 0 && (
                    <div className="no-news">
                        <p>Новостей в этой категории пока нет</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryNews;