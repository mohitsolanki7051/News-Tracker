import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState('');
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError('');
            try {
                const { data } = await axios.get('http://localhost:5000/api/news', {
                    params: { category, q: searchTerm }
                });
                setNews(data.articles);
            } catch (error) {
                setError('Failed to fetch news. Please try again later.');
            }
            setLoading(false);
        };

        fetchNews();
    }, [category, searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(query);
    };

    return (
        <div className="App">
            <h1>NewsTracker</h1>
            <div className="controls">
                <div className="category-selector">
                    <label>Select Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option value="business">Business</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="science">Science</option>
                        <option value="sports">Sports</option>
                        <option value="technology">Technology</option>
                    </select>
                </div>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)} 
                            placeholder="Search news..."
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
            {loading ? (
                <p className="loading">Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div className="news-list">
                    {news.map((article, index) => (
                        <div key={index} className="news-article">
                            {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
