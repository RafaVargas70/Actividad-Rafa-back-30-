import express from "express";
import clientesRoutes from "./src/routes/clientes.js";
import empleadosRoutes from "./src/routes/empleados.js";
import peliculasRoutes from "./src/routes/peliculas.js"
import registrarClientesRoutes from "./src/routes/registrarClientes.js";
import cookieParser from "cookie-parser";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";
import registrarEmpleadosRoutes from "./src/routes/registrarEmpleados.js";
import recuperarContraseñaRoutes from "./src/routes/recuperarContraseña.js";

const app = express();

app.use(express.json());

app.use(cookieParser());


app.use("/api/clientes", clientesRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/peliculas", peliculasRoutes);


app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);


app.use("/api/registrarClientes", registrarClientesRoutes);
app.use("/api/recuperarContraseña", recuperarContraseñaRoutes);
app.use("/api/registrarEmpleado", registrarEmpleadosRoutes);

export default app;
