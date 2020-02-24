'use strict';

const express = require('express');
const router = express.Router();
const burger = require('../models/burger');


router.get('/', (req, res) => {
    burger.selectAll(function (data) {
        const hbsObj = {
            burgers: data
        };
        res.render('index', hbsObj)
    });
});

router.post('/api/burgers', (req, res) => {
    burger.insertOne('burger_name', req.body.name, function (result) {
        res.json({ id: result.insertId });
    });
});

router.put ('/api/burgers/:id', (req,res)=>{
    let condition = 'id=' + req.params.id;
    console.log('condition',condition);
    burger.updateOne({devoured:req.body.devoured}, condition, function(result){
        if(result.changedRows === 0){
            return res.status(404).end();
        }
        else{
            res.status(200).end();
        }
    })
});


router.delete('/api/burgers/:id', (req,res)=>{
    let condition = 'id = ' + req.params.id;
    console.log('condition',condition);
    burger.deleteOne(condition, function(resutl){
        if (result.changedRows === 0){
            return res.status(404).end();
        }
        else{
            res.status(200).end();
        }
    })
});

module.exports = router;

