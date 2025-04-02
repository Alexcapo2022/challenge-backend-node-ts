import Account from "../../models/accounts";

export const mutations = {
  createAccount: async (_: any, { input }: any) => {
    const exists = await Account.findOne({ email: input.email });
    if (exists) throw new Error("Email already exists");
    const account = await Account.create(input);
    return account;
  },

  // Puedes dejar testAccM si quieres mantener pruebas anteriores
  testAccM: async (_: any) => true,
};
