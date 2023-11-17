const port = 3000;
const express = require('express');
const axios = require('axios');
const  cheerio  =  require ('cheerio');
 

const articles = []

const app = express();

app.get('/', (req, res)=>{   
    res.json("welcome to weather application")
})


const newspapers = [
    {
        name: 'Times of India',
        url: 'https://timesofindia.indiatimes.com/sports/cricket/icc-cricket-world-cup-2023'
    },
    {
        name: 'Hindustan Times',
        url: 'https://www.hindustantimes.com/cricket/world-cup'
    },

	{
       name:'The Indian express',
	   url:"https://indianexpress.com/section/sports/cricket-world-cup/"

	},
	{
		name:'sportstar',
		url:'https://sportstar.thehindu.com/cricket/'
	}
];

app.get('/news', async (req, res) => {
    try {
        let articles = [];

        for (const news of newspapers) {
            const response = await axios.get(news.url);
            const html = response.data;
            const $ = cheerio.load(html);

            $('a:contains("worldcup")', html).each(function () {
                const title = $(this).text();
                const url = $(this).attr('href');
                articles.push({ title, url, source: news.name });
            });
        }

        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


 


app.listen(port,()=>{
    console.log(`Server is runing on the port ${port}`);

})