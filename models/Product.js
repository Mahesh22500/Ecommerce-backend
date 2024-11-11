import { Schema } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, min: [0, "wrong price"] },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discount"],
    max: [50, "wrong max discount"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
  },
  brand: {
     type: String,
     set:(brand)=>brand.toLowerCase().replace(' ','_')

  },
  category: { type: String,
    set:(category)=>category.toLowerCase().replace(' ','_')

   },
  thumbnail: { type: String },  
  images: [String],
  stock:{
    type:Number,
    default:0,
    min:[0, "wrong min number"]
  },
  deleted:{
    type:Boolean,
    default:false
  }
});

const virtual = productSchema.virtual("id");

virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Product = mongoose.model("Product", productSchema);
