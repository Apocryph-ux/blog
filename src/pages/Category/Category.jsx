import React from "react";
import { Link } from "react-router-dom";
import styles from './Category.css';
import Header from '../../Components/Header/Header';

const Category = () => {
    const categories = [
        { 
            id: 'all', 
            name: 'Все новости', 
            icon: '/icons/home.png',
            path: '/'
        },
        { 
            id: 'football', 
            name: 'Футбол', 
            icon: '/icons/foot.png',
            path: '/category/Футбол'
        },
        { 
            id: 'basketball', 
            name: 'Баскетбол', 
            icon: '/icons/basket.png',
            path: '/category/Баскетбол'
        },
        { 
            id: 'rugby', 
            name: 'Регби', 
            icon: '/icons/regbi.png',
            path: '/category/Регби'
        },
        { 
            id: 'hockey', 
            name: 'Хоккей', 
            icon: '/icons/hokkey.png',
            path: '/category/Хоккей'
        },
        { 
            id: 'esports', 
            name: 'Киберспорт', 
            icon: '/icons/CyberSport.png',
            path: '/category/Киберспорт'
        },
        { 
            id: 'boxing', 
            name: 'Бокс', 
            icon: '/icons/boxing.png',
            path: '/category/Бокс'
        },
        { 
            id: 'mma', 
            name: 'Mix Fight', 
            icon: '/icons/mix.png',
            path: '/category/mma'
        }
    ];

    return (
        <div className="container1">
            <Header/>
            <div className="tabs">
                <div className="tab orange">Категории</div>
            </div>
            
            <div className="main-content category-grid">
                {categories.map(category => (
                    <Link 
                        key={category.id} 
                        to={`${category.path}`}
                        className="category-link"
                    >
                        <div className="category-item">
                            <img src={category.icon}  width={32} height={32} />
                            <p className="title_icon">{category.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Category;