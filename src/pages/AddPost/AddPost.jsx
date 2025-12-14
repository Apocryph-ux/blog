'use client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

export default function AddPost() {

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [source, setSource] = useState('');
  const [image, setImage] = useState('');


  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setStatus({ loading: true, error: null, success: null });

    
    const postData = {
      title,
      date: new Date().toISOString().split('T')[0], 
      category,
      content,
      source,
      image
    };

    try {
      const response = await fetch('https://855637b89fc9ec39.mokky.dev/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(postData),
      });

     
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сервера');
      }

      
      const createdPost = await response.json();
      setStatus({
        loading: false, 
        error: null, 
        success: 'Пост успешно создан!'
      });
      
      
      setTitle('');
      setDate('');
      setCategory('');
      setContent('');
      setSource('');
      setImage('');

    } catch (error) {
      
      setStatus({
        loading: false, 
        error: error.message, 
        success: null 
      });
    }
  };

  return (
    <main className="container">
      <section className="glass-panel">
        <h1 className="post-title">Создать новую запись</h1>
        
      
        {status.loading && <div className="alert alert-info">Отправка данных...</div>}
        {status.error && <div className="alert alert-danger">{status.error}</div>}
        {status.success && <div className="alert alert-success">{status.success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Заголовок</label>
            <input 
                type="text" 
              id="title" 
              name="title" 
              value={title}
                onChange={(e) => setTitle(e.target.value)}
              className="form-control" 
              placeholder="Название вашей истории..." 
              disabled={status.loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Описание</label>
            <textarea 
                id="content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3" 
              className="form-control" 
                placeholder="Несколько слов о главном..." 
              disabled={status.loading}
              required
            ></textarea>
          </div>

          

          <div className="form-group">
            <label htmlFor="date">Дата</label>
            <input 
              type="text" 
              id="date" 
              name="date" 
              value={new Date().toISOString().split('T')[0]}
              readOnly
              className="form-control" 
              disabled={status.loading}
            />
          </div>

        
          <div className="form-group">
            <label htmlFor="category">Категория</label>
            <input 
              type="text" 
              id="category" 
              name="category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control" 
              placeholder="Категория поста..." 
              disabled={status.loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="source">Источник</label>
            <input 
              type="text" 
              id="source" 
              name="source" 
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="form-control" 
              placeholder="Источник информации..." 
              disabled={status.loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">URL изображения</label>
            <input 
              type="text" 
              id="image" 
              name="image" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="form-control" 
              placeholder="Ссылка на изображение..." 
              disabled={status.loading}
            />
          </div>

          
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={status.loading}
          >
            {status.loading ? 'Публикация...' : 'Опубликовать'}
          </button>
        </form>
      </section>
    </main>
  );
}