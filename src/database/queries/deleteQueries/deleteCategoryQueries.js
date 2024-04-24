export const deleteCategoryByIdQuery = () => {
  return `DELETE FROM Category
    WHERE categoryId = ?;`;
};
