'use strict';

const connection = require('../config/connection');

function printQuestionMarks(num) {
    const arr = [];
    for (let i = 0; i < num; ++i) {
        arr.push('?');
    }
    return arr.toString();
};

function objToSql(ob) {
    const arr = [];
    for (const key in ob) {
      arr.push(key + '=' + ob[key]);
    }
    return arr.toString();
};

const orm = {
    selectAll: function (table, cb) {
        let queryString = 'SELECT * FROM ' + table + ';';
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        let queryString = 'INSERT INTO' + table;
        queryString += '(';
        queryString += cols.toString();
        queryString += ')';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ')';

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        let queryString = 'UPDATE' + table;
        queryString += 'SET';
        queryString += objToSql(objColVals);
        queryString += 'WHERE';
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },

    deleteOne: function (table, condition, cb) {
        let queryString = 'DELETE FROM' + table;
        queryString += 'WHERE';
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        })
    }
};

module.exports = orm;
