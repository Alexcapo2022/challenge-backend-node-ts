import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Product from "../models/products";
import { productMocks } from "./productMock";
import Account from "../models/accounts";

async function insertAllProductsMock() {
  try {
    await mongoose.connect(process.env.MONGODB_URL_PRODUCTS!);

    for (const product of productMocks) {
      // Validar si la cuenta existe
      const accountExists = await Account.exists({ _id: product.accountId });
      if (!accountExists) {
        console.warn("❌ Cuenta no encontrada:", product.accountId);
        continue;
      }

      const exists = await Product.findOne({ sku: product.sku });
      if (!exists) {
        await Product.create(product);
        console.log("✅ Producto insertado:", product.sku);
      } else {
        console.log("⚠️ Ya existe:", product.sku);
      }
    }

    await mongoose.disconnect();
    console.log("✔️ Inserción de productos mock finalizada.");
  } catch (error) {
    console.error("❌ Error insertando productos mock:", error);
  }
}

insertAllProductsMock();
