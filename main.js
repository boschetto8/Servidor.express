const fs = require('fs/promises');

class Contenedor {
    constructor (ruta){
        this.ruta = ruta;
    }
    
   async getAll(){
    try {
    const prod = await fs.readFile(this.ruta, 'utf-8');
    const JSONprod = JSON.parse(prod)
    return JSONprod        
    } 
    catch (error) {
             return []
        
             }
    }
    async save (obj){
        try {
            const objs = await this.getAll();
            let newId;
            if (objs.length === 0){
                newId = 1
            }
            else {
                newId = objs[objs.length - 1].id + 1
            }
            

            const newObj = {id: newId, ...obj};
            objs.push(newObj);
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return newId;


        } catch (error) {
            throw new Error (`Error al guardar: ${error}`);
            
        }



    }
    async getById(id){
        try {
            const objs = await this.getAll();
            
            const idBuscado = objs.findIndex((p) => p.id == id);
            if (idBuscado ==-1){
                throw new Error (`el ID buscado ${id} no existe`)
            }
            
            else {
                return objs[idBuscado]
            }
            
                       
        } catch (error) {
            throw new Error (`No se pudo encontrar el id: ${error}`)
        }
    }

    
    async deleteById(id){

        try {
            const objs = await this.getAll();
            const idBuscado = objs.findIndex((p)=> p.id == id);
                if (idBuscado == -1) {
                    throw new Error (`el ID buscado: ${id} no existe, por lo que no se puede eliminar`)
            }
             else {
                objs.splice(idBuscado, 1);
                 await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2)); 
                
            }
                
        } catch (error) {
            
            throw new Error (`No se pudo eliminar el id: ${error}`)
            

        }


    }
    async deleteAll(){
        try {
          await fs.writeFile(this.ruta, JSON.stringify([], null, 2)); 
        } catch (error) {
           throw new Error (`No se pudo eliminar los arcihvos ${error}`)
        }
    }
}

module.exports = Contenedor
/*
async function ejecutar () {
const producto = new Contenedor('./archivo/archivo.json');
console.log(await producto.save({"title": "Botines","price": 20000,"thumbnail": "https://www.pngwing.com/es/free-png-xgsls"}));
console.log(await producto.save({"title": "Pelota","price": 12500,"thumbnail": "https://www.pngegg.com/es/png-cgxve"}));
console.log(await producto.save({"title": "Guantes de arquero","price": 14000, "thumbnail": "https://www.pngwing.com/es/free-png-iiycv"}));
console.log('todos los productos',await producto.getAll());

};

ejecutar()*/