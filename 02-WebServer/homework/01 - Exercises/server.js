const fs = require("fs");
const http = require("http");
/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3001;


/* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
module.exports =
  /* AQUÍ DEBAJO YA PUEDES ESCRIBIR TÚ CÓDIGO REEMPLAZANDO EL VALOR DE NULL POR EL SERVIDOR */
  http.createServer((req, res) => {
    console.log(`Server raised in port ${PORT}`);
    //res.end("hola") simplemente para que funcione el server y no quede en loop
    if (req.url === '/api'){ // si la URL es /api devolvemos un JSON
      fs.readFile("./utils/dogsData.json", (err, data) => {
        if(err) res.writeHead(404, {"Content-type": "text/plain"}).end("json not found");
        res.writeHead(200, {"Content-type": "application/json"}).end(data);
      })
      return;
    }

    if (req.url === "/allDogs"){ // si la URL es /AllDogs devolvemos un archivo html
      fs.readFile("./utils/allDogs.html", "UTF8", (err, data) => { //utf-8 para desencriptar el mensaje y que llegue en formato texto o mas legible
        if (err) res.writeHead(404, {"Content-type": "text/plain"}).end("html not found");
        res.writeHead(200, {"Content-type": "text/html"}).end(data);
      })
      return;
    }
    
    //error que se ejecuta en caso de que se ingrese una ruta que no exista.
    res.writeHead(404, {"Content-type": "text/plain"}).end("Route not found");

  }).listen(PORT,"localhost"); //()=> console.log("in port http://localhost:3001")
