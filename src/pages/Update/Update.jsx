import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Update.css"

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://855637b89fc9ec39.mokky.dev/news/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка загрузки:', error);
                setError(error);
                setLoading(false);
            }
        };
        fetchPost();
    }, {id});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.patch(`https://855637b89fc9ec39.mokky.dev/news/${id}`, post);
            alert('Пост обновлен!');
            navigate('/'); 
        } catch (error) {
            console.error('Ошибка обновления:', error);
            alert('Ошибка при обновлении');
        }
    };

    const handleCancel = () => {
        if (window.confirm('Вы уверены, что хотите отменить изменения?')) {
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div className="col-3 div_load">
                <div className="snippet" data-title="dot-carousel">
                    <div className="stage">
                        <div className="dot-carousel"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="container">
                <h1>Пост не найден</h1>
                <Link to="/">Вернуться на главную</Link>
            </div>
        );
    }

    return (

    
        <form className="news-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="news-id">ID Новости:</label>
                <input 
                    type="text" 
                    id="news-id" 
                    value={id} 
                    readOnly 
                    className="readonly-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="news-title">Заголовок:</label>
                <input 
                    type="text" 
                    id="news-title"
                    name="title"
                    value={post.title || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="news-date">Дата:</label>
                <input 
                    type="date" 
                    id="news-date"
                    name="date"
                    value={post.date || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="news-category">Категория:</label>
                <input 
                    type="text" 
                    id="news-category"
                    name="category"
                    value={post.category || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="news-content">Содержание:</label>
                <textarea 
                    id="news-content" 
                    rows="10"
                    name="content"
                    value={post.content || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="news-source">Источник:</label>
                <input 
                    type="text" 
                    id="news-source"
                    name="source"
                    value={post.source || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="news-image">URL Изображения:</label>
                <input 
                    type="url" 
                    id="news-image"
                    name="image"
                    value={post.image || ""}
                    onChange={handleChange}
                />
                {post.image && (
                    <img 
                        src={post.image} 
                        alt="Предварительный просмотр" 
                        className="image-preview"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                )}
            </div>

            <div className="form-group">
                <label htmlFor="news-tags">Теги (через запятую):</label>
                <input 
                    type="text" 
                    id="news-tags"
                    name="tags"
                    value={post.tags || ""}
                    onChange={handleChange}
                    placeholder="трансфер, АПЛ, аренда"
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="save-button">Сохранить Изменения</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                    Отмена
                </button>
            </div>
        </form>
    );
}

export default Update;