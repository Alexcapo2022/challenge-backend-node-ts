import { Schema } from "mongoose";
import { IAccount } from "../interfaces/account";

// CAMBIA esta línea:
import { cnxProducts } from "../db/mongodb"; // en vez de cnxAccounts

const accountsSchema = new Schema<IAccount>(
  {
    name: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

// nombre del modelo: puede ser singular o plural, pero el `from:` en el $lookup debe coincidir con la colección final
const Account = cnxProducts.model<IAccount>("accounts", accountsSchema); // 👈 ojo aquí: usar nombre en minúsculas

export default Account;
