import { Schema } from "mongoose";

import mongoose from "mongoose";

const cartSchema = new Schema({
  quantity: {
    type: Number,
    min: [0, "wrong min quantity"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const virtual = cartSchema.virtual("id");

virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Cart = mongoose.model('Cart',cartSchema)