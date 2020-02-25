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
        const value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === 'string' && value.indexOf('') >= 0) {
                value = " ' " + value + " ' ";
            }
            arr.pust(key + '=' + value);
        }
    }
    return arr.toString();
};

var orm = {
    selectAll: function (table, cb) {
        const queryString = 'SELECT * FROM' + table + ';';
        connection.query(queryString, (err, resutl) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        const queryString = 'INSERT INTO' + table;
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
        const queryString = 'UPDATE' + table;
        queryString += 'SET';
        queryString += objToSql(objColVals);
        queryString += 'WHERE';
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;
