export const insertCategoryQuery = () => {
  return `INSERT INTO Category (name, description) VALUES (?, ?);`;
};
