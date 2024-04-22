export const createCategoryTableQuery = () => {
  return `CREATE TABLE IF NOT EXISTS Category (
        categoryId INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL, 
        description VARCHAR(255) DEFAULT 'No description'
       );`;
};

export const createExpenseTableQuery = () => {
  return `CREATE TABLE IF NOT EXISTS Expense (
    expenseId INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255), 
    import REAL NOT NULL, 
    date TEXT NOT NULL, 
    type TEXT NOT NULL, 
    fixed TEXT,
    categoryId INTEGER NOT NULL, 
    FOREIGN KEY(categoryId) REFERENCES Category(categoryId), 
    CHECK (type = 'CASH' OR type = 'DEBIT CARD' OR type = 'CREDIT CARD' OR type = 'CHECK' OR type = 'WIRE TRANSFER' OR type = 'BANK TRANSFER'  OR type = 'CRYPTO' OR type = 'OTHER')
    CHECK (fixed = "YES")
   );`;
};

export const createIncomeTableQuery = () => {
  return `CREATE TABLE IF NOT EXISTS Income (
    incomeId INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    import REAL NOT NULL, 
    date TEXT NOT NULL, 
    type TEXT NOT NULL, 
    fixed TEXT,
    categoryId INTEGER NOT NULL, 
    FOREIGN KEY(categoryId) REFERENCES Category(categoryId), 
    CHECK (type = 'CASH' OR type = 'DEBIT CARD' OR type = 'CREDIT CARD' OR type = 'CHECK' OR type = 'WIRE TRANSFER' OR type = 'BANK TRANSFER'  OR type = 'CRYPTO' OR type = 'OTHER'),
    CHECK (fixed = "YES")
    );`;
};
