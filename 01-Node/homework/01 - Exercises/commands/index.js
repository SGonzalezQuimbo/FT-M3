const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");
const { error } = require("console");

function pwd(print) {
    print(process.cwd());
}

function date(print) {
    print(Date());/*metodo Date() muestra la fecha y hora actual */
}

function echo(print, args) {
    print(args);
}

function ls(print) {
    fs.readdir(".", (error, files) => {
        if (error) throw new Error(error);
        print(files.join(' ')); //files es un arreglode strings por lo tanto hay que transformarlo.
    })
}

function cat(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if(error) throw new Error(error);
        print(data);
    })
}

function head(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if (error) throw new Error(error);
        //const rows = data.split('\n').slice(0, 8).join('\n') /*imprime las primeras 8 lineas */
        let rows = data.split('\n')//solo imprime la primera linea
        print(rows[0]);
    });
}

function tail(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if (error) throw new Error(error);
        const rows = data.split('\n');
        print(rows.at(-1).trim());//imprime la ultima linea
        //let lastLine = rows[lastLine.length - 1] tambien se accede a la ultima linea
    })
}

function curl(print, args) {
    utils.request(args, (error, response) => {
        if (error) throw new Error(error);
        print(response)
    })
}

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl,
};
