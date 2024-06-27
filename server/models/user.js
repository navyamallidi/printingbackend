import mongoose from "mongoose";


const colorSchema = new mongoose.Schema({
  color: { type: String, required: true },
  id: { type: Number, required: true }
});

const typeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  id: { type: Number, required: true }
});

const DetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  technology: { type: String, required: true },
  color: [colorSchema],
  price: { type: Number, required: true },
  type: [typeSchema],
});

export const Details = mongoose.model("Details", DetailsSchema);
