import { selectAllCategory } from "../database/dbFunctions/selectDbFunctions/selectCategoryFunctions";

export const fetchCategories = (db, setCategories) => {
  selectAllCategory(db, setCategories);
};
