import express from "express";
const router = express.Router();
import path from "path";
const __dirname = import.meta.dirname
import fs from "fs/promises";

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/form", (req, res) => {
  res.send(`
 <form action="/formulario" method="POST" enctype="multipart/form-data">
 <input type="file" name="foto" required>
 <button> subir archivo </button>
 </form>
 `);
});

router.post("/formulario", (req, res) => {
  const { foto } = req.files;
  const { name } = foto;
  foto.mv(`./uploads/${name}`, (err) => {
    res.send("Archivo cargado con éxito");
  });
});

router.delete("/imagen/:nombre", async (req, res) => {
  const { nombre } = req.params;
  console.log(nombre)
  await fs.unlink(path.join(__dirname, `../assets/images/${nombre}.jpg`));
  res.send(`Imagen ${nombre} fue eliminada con éxito`);
});

export default router;
