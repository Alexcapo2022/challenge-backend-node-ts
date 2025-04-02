import Products from "../../models/products";
import { getPagination } from "../../utils/pagination";

export const queries = {
  testProdQ: async (_: any) => {
    const products = await Products.find({});
    return products.length;
  },

  listProducts: async (_: any, { page = 1, limit = 10, search = "" }: any) => {
    const { skip, limit: parsedLimit } = getPagination(page, limit);

    const match: any = {};
    if (search) {
      match.$or = [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }

    const result = await Products.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "accounts", // debe coincidir con el nombre real de la colección
          localField: "accountId",
          foreignField: "_id",
          as: "account"
        }
        
        
      },
      {
        $unwind: {
          path: "$account",
          preserveNullAndEmptyArrays: true // 👈 Esto evita que se elimine el producto si no hay cuenta asociada
        }
      },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: parsedLimit }
          ],
          totalCount: [{ $count: "count" }]
        }
      }
    ]);

    const data = result[0]?.data || [];
    const total = result[0]?.totalCount[0]?.count || 0;
    const totalPages = Math.ceil(total / parsedLimit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      total,
      totalPages,
      currentPage: page,
      hasNextPage,
      hasPreviousPage,
      data
    };
  }
};
