import { Schema } from "mongoose";
import mongoose from "mongoose";



const itemSchema = new Schema({
  product:{
    type: Schema.Types.ObjectId,
    ref:'Product'
  },
  quantity:Number
})

const orderSchema = new Schema({
  items: [
    {
      type: itemSchema,
      default:{}
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },

  totalItems: {
    type: Number,
    default: 0,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  paymentMethod: {
    type: String,
  },
  orderStatus: {
    type: String,
  },

  address: {
    type: Schema.Types.Mixed,
  },
});

const virtual = orderSchema.virtual("id");

virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Order = mongoose.model("Order", orderSchema);
