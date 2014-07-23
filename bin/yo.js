#!/usr/bin/env node

var program = require('commander');
var Yo = require('../');

program
    .version('0.0.1')
    .usage('[options] <apikey>')
    .option('-u, --user [name]', 'send yo to a single user')
    .option('-s, --subscribers', 'list subscribers')
    .parse(process.argv);

if(!program.args.length) {
    return program.help();
}

var yo = new Yo(program.args[0]);

if(program.user) {

    if (program.user === true) {
        return console.log('Please specify username');
    }

    yo.yo(program.user, function(err, result) {

        if (!errorHandling(err, result)) {
            return;
        }

        if (result.statusCode !== 201) {
            return console.log('Something wrong happened: ', result);
        }

        console.log('User ' + program.user + ' is yo\'ed');

    });
} else if (program.subscribers) {
    yo.countOfSubscribers(function(err, result) {

        if (!errorHandling(err, result)) {
            return;
        }

        if (result.statusCode !== 200) {
            return console.log('Something wrong happened: ', result);
        }

        var countOf = JSON.parse(result.body).result;

        console.log('You have ' + countOf + ' subscribers');
    });
} else {
    yo.yoAll(function(err, result) {
        if (!errorHandling(err, result)) {
            return;
        }

        if (result.statusCode !== 201) {
            return console.log('Something wrong happened: ', result);
        }

        console.log('All users all yo\'ed');
    });
}

function errorHandling(err, result) {

    if (err) {
        return console.log('something wrong happened')
    }

    if (!result.body) {
        return console.log('did not get any response');
    }

    var body = JSON.parse(result.body);

    if (body.error) {
        return console.log(body.error);
    }

    return true;
}