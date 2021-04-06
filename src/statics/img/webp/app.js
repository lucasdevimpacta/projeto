const http = require('http');
const fs = require('fs');
const path = require("path");
const sharp = require("sharp");

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  

  fs.readdir("img", (err, files) => {
    files.forEach(async (file) => {

  	  if ( path.extname(file) != ".svg") {

		  // const result = webp.cwebp(file, "img/"+path.basename(file, path.extname(file) )+".webp","-q 80");

      sharp("img/"+file)
        .toFormat('webp')
        .webp({
            quality: 80
        })
        .toBuffer()
        .then(data => {
            //Agora vamos armazenar esse buffer no novo caminho
            fs.writeFile(path.basename(file, path.extname(file) )+".webp", data, err => {
                if(err){
                    // Já aqui um erro significa que o upload falhou, então é importante que o usuário saiba.
                    console.info(file);
                    console.info(err);
                }
            });

            // Se o código chegou até aqui, deu tudo certo, então vamos retornar o novo caminho
            return true;
        })
	  }


   });

  });    

  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});