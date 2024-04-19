import express from "express";
import routes from "./routes/routes.js";
import expressFileUpload from "express-fileupload";
const app = express();

const PORT = 3008;

//carpeta publica
app.use(express.static("assets"));


//Middlewares
app.use(
  expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit:
      "El peso del archivo que intentas subir supera el limite permitido",
  })
);

//rutas
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});



