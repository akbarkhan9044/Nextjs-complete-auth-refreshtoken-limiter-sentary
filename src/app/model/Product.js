import mongoose, { Schema, model, models } from "mongoose";

// 1. Define the sub-schema (Rating)
// Note: No 'await' and added 'new'
const RatingSchema = new Schema(
  {
    rate: { type: Number },
    count: { type: Number }
  },
  { _id: false }
);

// 2. Define the main schema (Product)
const ProductSchema = new Schema(
  {
    id: {
      type: Number,
   
    },
    title: { type: String },
    price: { type: Number },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      index: true
    },
    image: { type: String, required: true },
    rating: RatingSchema // Nested schema
  },
  {
    timestamps: true ,
    collection: 'faker'
    
    // Automatically adds createdAt and updatedAt
  }
);

// 3. Prevent model re-definition errors (Next.js/Serverless friendly)
const Product = models.Faker || model("Faker", ProductSchema);

export default Product;