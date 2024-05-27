let mysql = require("mysql2");
const util = require('util');
let pool =mysql.createPool({
    connectionLimit: 10,
    host:"localhost",
    database: "distribuidos",
    user: "root",
    password: ""
});
//Descomentar esto y ejecutar este archivo para corroborrar la conexion a la bd
/*conexion.connect(function(err){
    if(err){
        throw err;
    }
    else
    {
        console.log("Conexion exitosa a la bd")
    }
});*/

pool.query = util.promisify(pool.query);

// Exportar los componentes
module.exports = pool;
