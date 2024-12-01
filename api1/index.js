const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  const { user } = req.body;
  if (!user)
    return res.status(400).send({ error: "'user es requerido" });

  try {
    // Consultamos la API2 para obtener el conteo de veces que el usuario ha sido insertado
    const response = await axios.post("http://api2:3001", { user });
    const count = response.data.count;

    // Respondemos con el conteo
    return res.json({ count });
  } catch (error) {
    console.error("Se ha producido un error:", error.message);
    return res.status(500).send({ error: "ERROR" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API1 corriendo en el puerto ${PORT}`));
