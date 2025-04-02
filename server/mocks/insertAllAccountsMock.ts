import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Account from "../models/accounts";
import { accountMocks } from "./accountMock";

async function insertAllAccountsMock() {
  try {
    await mongoose.connect(process.env.MONGODB_URL_ACCOUNTS!);

    for (const mock of accountMocks) {
      const exists = await Account.findOne({ email: mock.email });
      if (!exists) {
        await Account.create(mock);
        console.log("✅ Insertado:", mock.email);
      } else {
        console.log("⚠️ Ya existe:", mock.email);
      }
    }

    await mongoose.disconnect();
    console.log("✔️ Inserción de mocks finalizada.");
  } catch (error) {
    console.error("❌ Error al insertar mocks:", error);
  }
}

insertAllAccountsMock();
