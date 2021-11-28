const User = require("../models/User");
const Role = require("../models/Role");
const Proveedor = require("../models/Proveedor")
const Categoria = require("../models/Categoria")
const bcrypt = require("bcryptjs");

const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "admin@localhost" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

  if (!user) {
    // create a new admin user
    await User.create({
      username: "admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  }
};

const createProveedores = async () => {
  try {
    // Count Documents
    const count = await Proveedor.estimatedDocumentCount();

    // check for existing proveedores
    if (count > 0) return;

    // Create default proveedores
    const values = await Promise.all([
      new Proveedor({ nombre: "GN", direccion: "Av Mansiche 256", telefono: "961569893", ruc: "12354895" }).save(),
      new Proveedor({ nombre: "Distribuidora Doña LULI", direccion: "Mercado Hermelinda puesto 456", telefono: "96153893", ruc: "1231568" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
}

const createCategorias = async () => {
  try {
    // Count Documents
    const count = await Categoria.estimatedDocumentCount();

    // check for existing categorias
    if (count > 0) return;

    // Create default categorias
    const values = await Promise.all([
      new Categoria({ nombre: "Bebida"}).save(),
      new Categoria({ nombre: "Embutido"}).save(),
      new Categoria({ nombre: "Lácteo" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
    createAdmin,
    createRoles,
    createProveedores,
    createCategorias
}