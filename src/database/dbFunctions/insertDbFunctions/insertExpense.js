import { insertExpenseQuery } from "../../queries/insertQueries/insertExpenseQueries";
import { formatDateReverse } from "../../../components/formatDate";

export const insertExpense = (
  db,
  name,
  description,
  inputImport,
  date,
  type,
  fixed,
  categoryId
) => {
  const givenName = name.replace(/[^a-zA-Z\s]/g, "").trim();
  let givenDescription = description.replace(/[^a-zA-Z\s]/g, "").trim();
  if (description.length === 0) {
    givenDescription = "No description";
  }
  const givenImport = parseFloat(inputImport).toFixed(2);
  const givenDate = formatDateReverse(date);
  // check if type is a valid value otherwise becomes "OTHER"
  // valid values:
  //  'CASH', 'DEBIT CARD', 'CREDIT CARD'
  //  'CHECK', 'WIRE TRANSFER', 'BANK TRANSFER'
  //  'CRYPTO', 'OTHER'
  let givenType;
  const regexType = new RegExp(
    /^(CASH|DEBIT CARD|CREDIT CARD|CHECK|WIRE TRANSFER|BANK TRANSFER|CRYPTO|OTHER)$/
  );
  if (regexType.test(type) === false) {
    givenType = "OTHER";
  } else {
    givenType = type;
  }
  // check if fixed is a valid value otherwise becomes "NO"
  // valid values : "YES" and "NO"
  let givenFixed;
  const regexFixed = new RegExp(/^(YES|NO)$/);
  if (regexFixed.test(fixed) === false) {
    givenFixed = "NO";
  } else {
    givenFixed = fixed;
  }

  db.transaction(
    (tx) => {
      tx.executeSql(insertExpenseQuery(), [
        givenName,
        givenDescription,
        givenImport,
        givenDate,
        givenType,
        givenFixed,
        categoryId,
      ]);
    },
    (error) => console.log("failed to add expense", error),
    () => console.log("inserted expense successfully")
  );
};
