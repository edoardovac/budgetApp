-- EXPENSE TABLE

-- select all from expense
SELECT expenseId, name, description, import, date, type, fixed, categoryId FROM Expense;

-- select expenses by type:
-- 'CASH','DEBIT CARD','CREDIT CARD','CHECK',
-- 'WIRE TRANSFER','BANK TRANSFER','CRYPTO','OTHER'
SELECT expenseId, name, description, import, date, categoryId FROM Expense
 WHERE type = "";

-- fixed expenses
SELECT expenseId, name, description, import, date, type, categoryId FROM Expense
 WHERE fixed IS NOT NULL;

-- non-fixed expenses
SELECT expenseId, name, description, import, date, type, categoryId FROM Expense
 WHERE fixed IS NULL;


--- INCOME TABLE

 -- select all from Income
SELECT incomeId, name, description, import, date, type, fixed, categoryId FROM Income;

-- select incomes by type:
-- 'CASH','DEBIT CARD','CREDIT CARD','CHECK',
-- 'WIRE TRANSFER','BANK TRANSFER','CRYPTO','OTHER'
SELECT incomeId, name, description, import, date, categoryId FROM Income
 WHERE type = "";

-- fixed incomes
SELECT incomeId, name, description, import, date, type, categoryId FROM Income
 WHERE fixed IS NOT NULL;

-- non-fixed incomes
SELECT incomeId, name, description, import, date, type, categoryId FROM Income
 WHERE fixed IS NULL;

--- CATEGORY TABLE

-- select all from Category
SELECT categoryId, name, description FROM Category;

-- select expense by given category
SELECT expenseId, name, description, import, date, type FROM Expense
JOIN Category ON Expense.categoryId = Category.categoryId
WHERE Category.name = 'Food';

-- select income by given income
SELECT incomeId, Income.name, description, import, date, type, Category.name AS 'Category' FROM Income
JOIN Category ON Income.categoryId = Category.categoryId
WHERE Category.name = 'Entertainment';