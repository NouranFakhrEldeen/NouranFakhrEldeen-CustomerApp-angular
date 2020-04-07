export class CategoryModel {
  _id: string;
  name: string;
  subCategory: SubCategoryModel[];
}
export class SubCategoryModel {
  _id: string;
  name: string;
}
