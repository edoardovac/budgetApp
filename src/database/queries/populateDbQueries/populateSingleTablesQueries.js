export const populateCategoryQuery = () => {
  return `INSERT INTO Category (name, description) VALUES 
    ('Food', 'Expenses related to groceries and dining out'),
    ('Transportation', 'Expenses related to commuting and vehicle maintenance'),
    ('Utilities', 'Expenses related to electricity, water, and internet bills'),
    ('Entertainment', 'Expenses related to leisure activities and entertainment'),
    ('Miscellaneous', 'No description'),
    ('Healthcare', 'Expenses related to medical and health-related costs'),
    ('Clothing', 'Expenses related to clothing and apparel'),
    ('Education', 'Expenses related to educational costs'),
    ('Travel', 'Expenses related to traveling and vacations'),
    ('Insurance', 'Expenses related to insurance premiums');`;
};

export const populateExpenseQuery = () => {
  return `INSERT INTO Expense (name, description, import, date, type, fixed, categoryId) VALUES
    ('Groceries', 'Weekly grocery shopping', 75.00, '2024-04-15', 'CASH', 'YES', 1),
    ('Gas', 'Refueling the car', 50.00, '2024-04-16', 'CREDIT CARD', 'YES', 2),
    ('Electricity Bill', 'No description', 80.00, '2024-04-10', 'BANK TRANSFER', 'YES', 3),
    ('Restaurant', 'Dinner with friends', 70.50, '2024-04-12', 'DEBIT CARD', 'NO', 4),
    ('Movie Tickets', 'No description', 30.00, '2024-04-14', 'CASH', 'NO', 4),
    ('Rent', 'No description', 1000.00, '2024-04-01', 'BANK TRANSFER', 'YES', 5),
    ('Internet Bill', 'Monthly internet subscription', 50.00, '2024-04-05', 'CREDIT CARD', 'NO', 3),
    ('Car Maintenance', 'No description', 200.00, '2024-04-08', 'DEBIT CARD', 'YES', 2),
    ('Phone Bill', 'No description', 40.00, '2024-04-20', 'CASH', 'NO', 5),
    ('Gym Membership', 'Monthly gym subscription', 50.00, '2024-04-02', 'CREDIT CARD', 'NO', 5),
    ('Medicine', 'Prescription medication', 30.00, '2024-05-01', 'CASH', 'NO', 6),
    ('T-shirt', 'Casual wear', 20.00, '2024-05-02', 'DEBIT CARD', 'NO', 7),
    ('Textbooks', 'Educational materials', 100.00, '2024-05-03', 'CREDIT CARD', 'NO', 8),
    ('Flight Tickets', 'Airfare for vacation', 300.00, '2024-05-04', 'BANK TRANSFER', 'NO', 9),
    ('Health Insurance', 'Monthly premium', 150.00, '2024-05-05', 'BANK TRANSFER', 'NO', 10),
    ('Doctor Visit', 'Routine check-up', 50.00, '2024-04-25', 'CASH', 'NO', 6),
    ('Jeans', 'Denim pants', 40.00, '2024-04-26', 'DEBIT CARD', 'NO', 7),
    ('Online Course', 'Skill development', 80.00, '2024-04-27', 'CREDIT CARD', 'NO', 8),
    ('Hotel Booking', 'Accommodation for vacation', 200.00, '2024-04-28', 'BANK TRANSFER', 'NO', 9),
    ('Car Insurance', 'Annual premium', 500.00, '2024-04-29', 'BANK TRANSFER', 'NO', 10),
    ('Dentist Appointment', 'Check-up and cleaning', 70.00, '2024-03-20', 'CASH', 'NO', 6),
    ('Dress', 'Formal attire', 50.00, '2024-03-21', 'DEBIT CARD', 'NO', 7),
    ('Course Material', 'Books and supplies', 120.00, '2024-03-22', 'CREDIT CARD', 'NO', 8),
    ('Train Tickets', 'Transportation for trip', 100.00, '2024-03-23', 'BANK TRANSFER', 'NO', 9),
    ('Life Insurance', 'Monthly premium', 200.00, '2024-03-24', 'BANK TRANSFER', 'NO', 10);`;
};

export const populateIncomeQuery = () => {
  return `INSERT INTO Income (name, description, import, date, type, fixed, categoryId) VALUES
    ('Salary', 'Monthly income', 3000.00, '2024-04-01', 'BANK TRANSFER', 'YES', 5),
    ('Freelance Work', 'Payment for freelance project', 500.00, '2024-04-10', 'BANK TRANSFER', 'NO', 5),
    ('Stock Dividend', 'No description', 200.00, '2024-04-15', 'BANK TRANSFER', 'NO', 5),
    ('Gift', 'Birthday gift', 50.00, '2024-04-20', 'CASH', 'NO', 4),
    ('Interest', 'Savings account interest', 20.00, '2024-04-25', 'BANK TRANSFER', 'NO', 5),
    ('Bonus', 'Performance bonus', 500.00, '2024-05-10', 'BANK TRANSFER', 'NO', 5),
    ('Investment Return', 'Returns from investment', 100.00, '2024-05-15', 'BANK TRANSFER', 'NO', 5),
    ('Rental Income', 'Income from property rental', 200.00, '2024-05-20', 'BANK TRANSFER', 'NO', 5),
    ('Scholarship', 'Educational grant', 300.00, '2024-05-25', 'BANK TRANSFER', 'NO', 5),
    ('Tax Refund', 'Refund from tax overpayment', 50.00, '2024-05-30', 'BANK TRANSFER', 'NO', 5),
    ('Consulting Fee', 'Payment for consulting services', 400.00, '2024-04-10', 'BANK TRANSFER', 'NO', 5),
    ('Royalties', 'Income from intellectual property', 150.00, '2024-04-15', 'BANK TRANSFER', 'NO', 5),
    ('Dividend', 'Stock dividend payout', 80.00, '2024-04-20', 'BANK TRANSFER', 'NO', 5),
    ('Gift', 'Cash gift', 30.00, '2024-04-25', 'CASH', 'NO', 5),
    ('Interest', 'Savings account interest', 10.00, '2024-04-30', 'BANK TRANSFER', 'NO', 5),
    ('Part-time Job', 'Income from part-time work', 200.00, '2024-03-10', 'BANK TRANSFER', 'NO', 5),
    ('Side Project', 'Payment for freelance project', 150.00, '2024-03-15', 'BANK TRANSFER', 'NO', 5),
    ('Investment Income', 'Returns from investment portfolio', 100.00, '2024-03-20', 'BANK TRANSFER', 'NO', 5),
    ('Alimony', 'Monthly alimony', 300.00, '2024-03-25', 'BANK TRANSFER', 'NO', 5),
    ('Refund', 'Refund for returned item', 50.00, '2024-03-30', 'BANK TRANSFER', 'NO', 5);`;
};
