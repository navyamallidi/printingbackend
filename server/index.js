import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { Details } from './models/user.js';
import multer from "multer";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Connection error', error.message);
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files from the public directory
app.use('/public', express.static('public'));

// Endpoint to handle form submission
app.post("/materials", upload.single('image'), async (req, res) => {
  try {
    const { name, technology, color, price, type } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const detail = new Details({
      name,
      technology,
      color: JSON.parse(color),
      price,
      type: JSON.parse(type),
      image: imagePath 
    });

    const result = await detail.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/materials", async (req, res) => {
  try {
    const materials = await Details.find({}, '-image'); 
    res.status(200).json(materials);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/materials/:id", async (req, res) => {
  try {
    const material = await Details.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




// Start the server
app.listen(3001, () => {
  console.log("server is running on port 3001");
});
