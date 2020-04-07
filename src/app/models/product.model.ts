import { ModifierModel } from "./modifier.model";
export class ProductModel {
  _id: string;
  name: string;
  description: string;
  comment: string;
  price: number;
  quantity: string;
  store: string;
  Modifier: ModifierModel[];
}
