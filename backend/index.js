const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const NEWS_API_KEY = '154ce4d327854c2d846949fa6ddfcfa2';

app.use(cors());

app.get('/api/news', async (req, res) => {
    const { category, q } = req.query;
    try {
        const { data } = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                category: category,
                q: q,
                apiKey: NEWS_API_KEY
            }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
