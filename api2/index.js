const express = require("express");
const mongoose = require("mongoose");

// Conexión a MongoDB usando mongoose
const MONGO_URL = "mongodb://mongodb:27017/testdb";
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB using Mongoose"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

// Definimos el modelo de la colección
const userSchema = new mongoose.Schema({ user: String });
const User = mongoose.model("User", userSchema);

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { user } = req.body;
  if (!user) 
    return res.status(400).send({ error: "'user' es requerido" });

  try {
    // Insertamos el usuario en la base de datos
    await User.create({ user });

    // Veces que el usuario ha sido insertado en la base de datos
    const count = await User.countDocuments({ user });

    // Respondemos con el conteo
    return res.json({ count });
  } catch (error) {
    console.error("Se ha producido un error:", error.message);
    return res.status(500).send({ error: "ERROR" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API2 corriendo en el puerto ${PORT}`));
