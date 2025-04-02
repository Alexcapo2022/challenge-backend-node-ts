import Product from "../../models/products";
import Account from "../../models/accounts";
import { IProduct } from "../../interfaces/product";

export const mutations = {
  createProducts: async (_: any, { input }: { input: IProduct[] }) => {
    // Validar que las cuentas existen
    const accountIds = [...new Set(input.map((p) => p.accountId))];

    const existingAccounts = await Account.find({ _id: { $in: accountIds } });

    if (existingAccounts.length !== accountIds.length) {
      throw new Error("Una o más cuentas no existen");
    }

    const inserted = await Product.insertMany(input);
    return inserted;
  },

  testProdM: async (_: any) => true,
};
