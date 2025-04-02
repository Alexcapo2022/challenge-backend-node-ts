import { Types } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  sku: string;
  status?: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  accountId: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}
