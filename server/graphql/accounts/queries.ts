import Account from "../../models/accounts";
import { getPagination } from "../../utils/pagination";

export const queries = {
  testAccQ: async (_: any) => {
    const accounts = await Account.find({});
    return accounts.length;
  },

  listAccounts: async (_: any, { page = 1, limit = 10, search = "" }: any) => {
    const { skip, limit: parsedLimit } = getPagination(page, limit);

    const match: any = {};
    if (search) {
      match.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const result = await Account.aggregate([
      { $match: match },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: parsedLimit },
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      }
    ]);

    const accounts = result[0]?.data || [];
    const total = result[0]?.totalCount[0]?.count || 0;

    return { total, data: accounts };
  },
};
