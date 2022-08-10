const express = require ('express');
const app = express ();
const PORT = 8080;
const Contenedor = require('./main');

const producto = new Contenedor('./archivo/archivo.json');

app.get('/productos', async (req, res) => {
    try {
        const prod = await producto.getAll()
        res.send(prod)
        
    } catch (error) {
        throw new Error (`No se encontro la ruta solicitada ${error}`)        
    }
    })



app.get ('/productosRandom', async (req, res)=>{
    const prod = await producto.getAll();
    const indiceAleatorio = Math.floor(Math.random()* prod.length)
    res.send(prod[indiceAleatorio])
})

app.get ('*', (req, res)=>{
    res.send ('Page not found')
})


async function ejecutar () {   
    console.log(await producto.save({"title": "Botines","price": 20000,"thumbnail": "https://www.pngwing.com/es/free-png-xgsls"}));
    console.log(await producto.save({"title": "Pelota","price": 12500,"thumbnail": "https://www.pngegg.com/es/png-cgxve"}));
    console.log(await producto.save({"title": "Guantes de arquero","price": 14000, "thumbnail": "https://www.pngwing.com/es/free-png-iiycv"}));
    const server = app.listen(PORT, () => {
        console.log(`Server ejecutado en PORT ${PORT}`)
    })
    
};

 ejecutar();





