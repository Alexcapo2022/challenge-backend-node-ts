import { Schema } from "mongoose";
import { IProduct } from "../interfaces/product";
import { cnxProducts } from "../db/mongodb";

const productsSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "OUT_OF_STOCK"],
      default: "ACTIVE",
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = cnxProducts.model<IProduct>("Product", productsSchema);
export default Product;
