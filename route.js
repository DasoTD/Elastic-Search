const express = require('express');
const router = express.Router();

const elastic = require('elasticsearch');

const elasticClient = elastic.Client({
    host: 'localhost:9200',
});

let products = [
    {
        "id": 1,
        "name":"dd",
        "categories": ["dd", "td", "tt"],
        "description": "ona mila"
    },
    {
        "id": 2,
        "name":"td",
        "categories": ["td", "dd", "tt"],
        "description": "mose rere"
    },
    {
        "id": 3,
        "name":"tt",
        "categories": ["tt", "td", "dd"],
        "description": "hallelijah"
    }
]

router.use((req, res, next) => {
    elasticClient.index({
        index: 'logs',
        body: {
            url: req.url,
            method: req.method,
        }
    }).then(res => {
        console.log('logs indedxed')
    })
    .catch(err => {
        console.log(err)
    })
    next();
});