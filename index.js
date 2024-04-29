const express = require("express");
const mysql = require("mysql");

const app = express();

let conexion = mysql.createConnection({
    host: "localhost",
    database: "top_20spear",
    user: "root",
    password: ""
});

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.render("consulta");
});
app.get("/modulo1/iniciosesion", function (req, res) {
    res.render("inicioAdministrador");
});


app.get("/modulo1/inicioadministrador", function (req, res) {
    res.render("registros");
});

app.post("/validar", function (req, res) {
    const datos = req.body;
    let buscar = "SELECT * FROM tabla_usuarios WHERE ced = ?";
    conexion.query(buscar, [datos.ced], function (error, row) {
        if (error) {
            throw error;
        } else {
            if (row.length > 0) {
                console.log("Usuario Existente");
            } else {
                let registrar = "INSERT INTO tabla_usuarios (ced, nombre, apellido, correo, contrasena) VALUES (?, ?, ?, ?, ?)";
                conexion.query(registrar, [datos.ced, datos.nombre, datos.apellido, datos.correo, datos.contrasena], function (error) {
                    if (error) {
                        throw error;
                    } else {
                        console.log("Datos almacenados");
                    }
                });
            }
        }
    });
});

app.post("/buscar", function (req, res) {
    const datos = req.body;

    const buscar = "SELECT * FROM tabla_usuarios WHERE ced = ?";
    conexion.query(buscar, [datos.ced], function (falla, row) {
        if (falla) {
            console.error(falla);
            return res.status(500).send('Error en la base de datos');
        }
        if (row.length == 0) {
            console.log("Usuario no Existente");
            return res.send("Usuario no Existente");
        } else {
            let usuario = row[0];
            console.log(usuario.correo + " " + usuario.contrasena);
            return res.send("Usuario encontrado: " + usuario.correo);
        }
    });
});


app.get("/testdata", function (req, res) {
    const data = [
        { id: 1, name: "Alice", age: 25 },
        { id: 2, name: "Bob", age: 30 },
        { id: 3, name: "Charlie", age: 35 }
    ];
    res.json(data);
});

app.listen(4007, function () {
    console.log("Servidor creado http://localhost:4007")

});