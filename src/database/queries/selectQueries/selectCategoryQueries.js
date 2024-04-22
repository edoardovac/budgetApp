export const selectAllCategoryQuery = () => {
  return `SELECT categoryId, name, description FROM Category;`;
};
