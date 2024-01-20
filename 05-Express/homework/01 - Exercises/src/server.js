const express = require("express");

let publications = [];
const STATUS_ERROR = 404;
const STATUS_OK = 200;
let id = 0;

const server = express();

server.use(express.json());//sirve para poder usar json cuando nos vienen datos desde el body que no son de tipo json


server.post('/posts', (req, res)=> {
    const {author, title, contents} = req.body;
    if(!author || !title || !contents) {
        return res
        .status(STATUS_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear la publicación"});
    }
    const publication = {
        author,
        title,
        contents,
        id: ++id
    }
    publications.push(publication)
    res.status(STATUS_OK).json(publication);
});

//GET ruta /posts?author=author?title=title por query que lo manda el front

server.get('/posts', (req, res) => {
    const {author, title} = req.query;
    if(author && title) {
        const filterPublications = publications.filter((publ)=> {
            return publ.title === title && publ.author;
        })
        filterPublications.length > 0 
            ? res.status(STATUS_OK).json(filterPublications)
            : res.status(STATUS_ERROR).json({error: "No existe ninguna publicación con dicho título y autor indicado"})
    } else { //este else es necesario para que no siga ejecutando otra respuesta, si no se quiere colocar este else, se podria colocar un return en la respuesta del status_ok
        res.status(STATUS_OK).json({message: "all publications", publications: publications })
    }
});

//GET ruta /posts/:author en este caso el author se obtiene por params

server.get('/posts/:author', (req, res) => {
    const {author} = req.params;
    if (author) {
        const filterPublicationXAuthor = publications.filter((publ) => {
            return publ.author === author;
        });
        filterPublicationXAuthor.length > 0
        ? res.status(STATUS_OK).json(filterPublicationXAuthor)
        : res.status(STATUS_ERROR).json({error: "No existe ninguna publicación del autor indicado"});
    } else {
        res.status(STATUS_ERROR).json({message: "author invalid"});
    }
});

//PUT ruta /posts/:id

server.put('/posts/:id', (req, res) => {
    const {id} = req.params;
    const{title, contents} = req.body;

    if (!id || !title || !contents) {
        return res.status(STATUS_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar la publicación"});   
    }

    let publicId = publications.find((e)=> e.id === Number(id));
    if (!publicId) {
        return res.status(STATUS_ERROR).json({error: "No se recibió el id correcto necesario para modificar la publicación"});
    }

    publicId = {...publicId, title, contents};
    publications.forEach((e, index) => {
        if (e.id === Number(id)) {
            publications[index] = publicId;
        }
    });
    res.status(STATUS_OK).json(publicId);
});

//DELETE ruta /posts/:id id se obtiene por params tambien 
server.delete('/posts/:id', (req, res) => {
    const {id} = req.params;
    const {title, contents} = req.body;
    if(!id) {
        return res.status(STATUS_ERROR).json({error: "No se recibió el id de la publicación a eliminar"});
    }
    const newPublication = publications.filter((e)=> e.id !== Number(id));//con esta operacion logro guardar en un nuevo array todas las publicaciones diferentes a la que busco para asi eliminar la publicacion del array original.
    if (newPublication.length < publications.length) {
        publications = newPublication;
        return res.status(STATUS_OK).json({ success: true });
    };
    return res.status(STATUS_ERROR).json({error: "No se recibió el id correcto necesario para eliminar la publicación"});
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
