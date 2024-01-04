const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');


function print(output) {
   process.stdout.write(output);
   process.stdout.write("\nprompt > ");/*\n es un salto de linea*/
}

function bash() {
   process.stdout.write("prompt > "); /*el prompt es donde yo escribo los comandos */
   process.stdin.on("data", (data) => { /*este es el comando cmd */
      const args = data.toString().trim().split(" "); /*asumo que lo que recibo como data en un array y lo convierto en un string, elimino espacios al principio y al final con el metodo trim, y tambien con el metodo split vuelvo a guardar el string en un arreglo pero esta vez mas limpio.*/
      const cmd = args.shift(); //retorno la primer palabra del arreglo.

      if (commands[cmd]) {
         commands[cmd](print, args.join(' '));
      } else {
         print(`command not found: ${cmd}`); //"command not found:" + cmd
      }
   });
}





bash();
module.exports = {
   print,
   bash,
};
