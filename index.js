const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const initialSetup = require('./libs/initialSetup')
const PORT = process.env.PORT || 5000;


// Creamos el servidor
const app = express();
initialSetup.createRoles();
initialSetup.createAdmin();
initialSetup.createProveedores();
initialSetup.createCategorias();

// Conectamos a la BD
conectarDB();
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next()
})
app.use(cors())

app.use(express.json());

app.use('/api/users', require('./routes/userRouter'));
app.use('/api/producto', require('./routes/productoRouter'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/proveedor', require('./routes/proveedorRoute'));
app.use('/api/venta', require('./routes/ventaRouter'));
app.use('/api/compra', require('./routes/compraRouter'))
app.use('/api/categoria', require('./routes/categoriaRouter'))

app.listen(PORT, () => {
    console.log('El servidor esta corriendo perfectamente en ' + PORT)
})