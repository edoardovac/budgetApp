export const populateCategoryQuery = () => {
  return `INSERT INTO Category (name, description) VALUES 
    ('Food', 'Expenses related to groceries and dining out'),
    ('Transportation', 'Expenses related to commuting and vehicle maintenance'),
    ('Utilities', 'Expenses related to electricity, water, and internet bills'),
    ('Entertainment', 'Expenses related to leisure activities and entertainment'),
    ('Miscellaneous', 'No description');`;
};

export const populateExpenseQuery = () => {
  return `INSERT INTO Expense (name, description, import, date, type, fixed, categoryId) VALUES
    ('Groceries', 'Weekly grocery shopping', 75.00, '2024-04-15', 'CASH', 'YES', 1),
    ('Gas', 'Refueling the car', 50.00, '2024-04-16', 'CREDIT CARD', 'YES', 2),
    ('Electricity Bill', NULL, 80.00, '2024-04-10', 'BANK TRANSFER', 'YES', 3),
    ('Restaurant', 'Dinner with friends', 70.50, '2024-04-12', 'DEBIT CARD', 'NO', 4),
    ('Movie Tickets', NULL, 30.00, '2024-04-14', 'CASH', 'NO', 4),
    ('Rent', NULL, 1000.00, '2024-04-01', 'BANK TRANSFER', 'YES', 5),
    ('Internet Bill', 'Monthly internet subscription', 50.00, '2024-04-05', 'CREDIT CARD', 'NO', 3),
    ('Car Maintenance', NULL, 200.00, '2024-04-08', 'DEBIT CARD', 'YES', 2),
    ('Phone Bill', NULL, 40.00, '2024-04-20', 'CASH', 'NO', 5),
    ('Gym Membership', 'Monthly gym subscription', 50.00, '2024-04-02', 'CREDIT CARD', 'NO', 5);`;
};

export const populateIncomeQuery = () => {
  return `INSERT INTO Income (name, description, import, date, type, fixed, categoryId) VALUES
    ('Salary', 'Monthly income', 3000.00, '2024-04-01', 'BANK TRANSFER', 'YES', 5),
    ('Freelance Work', 'Payment for freelance project', 500.00, '2024-04-10', 'BANK TRANSFER', 'NO', 5),
    ('Stock Dividend', NULL, 200.00, '2024-04-15', 'BANK TRANSFER', 'NO', 5),
    ('Gift', 'Birthday gift', 50.00, '2024-04-20', 'CASH', 'NO', 4),
    ('Interest', 'Savings account interest', 20.00, '2024-04-25', 'BANK TRANSFER', 'NO', 5);`;
};
