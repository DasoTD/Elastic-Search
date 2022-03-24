const express = require('express');
const router = express.Router();

const elastic = require('elasticsearch');
const res = require('express/lib/response');

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

router.get('/products/:id', (req,res) => {
    let query = {
        index: 'products',
        id:req.params.id
    }
    elasticClient.get(query)
    .then(resp => {
        if(!resp){
            return res.status(404).json({
                product: resp
            });
        }
        return res.status(200).json({
            product: resp
        });
    })
    .catch(err => {
        return res.status(500).json({
            msg: "error not found",
            err
        });
    });
});

router.put('/products/:id', (req, res) => {
    elasticClient.update({
        index: 'products',
        id: req.params.id,
        body: {
            doc: req.body
        }
    })
    .then(resp => {
        return res.status(200).json({
            msg: "products updated"
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            msg: "Error",
            err
        });
    });
});