const accounts = [
  { id: 1, owner: "Alice", balance: 500 },
  { id: 2, owner: "Bob", balance: 300 },
];

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function getAccountById(id) {
  // ID must be a positive integer (NOT a string like "1")
  if (!isPositiveInteger(id)) {
    throw new Error("Invalid account ID: The ID must be a positive integer.");
  }

  const account = accounts.find((a) => a.id === id);

  if (!account) {
    throw new Error("Account not found.");
  }

  return account;
}

function createAccount(newAccountId, newAccountOwner) {
  if (!isPositiveInteger(newAccountId)) {
    throw new Error("Invalid account ID: The ID must be a positive integer.");
  }

  if (!isNonEmptyString(newAccountOwner)) {
    throw new Error("Invalid owner: The owner must be a non-empty string.");
  }

  // Prevent duplicate IDs
  const alreadyExists = accounts.some((a) => a.id === newAccountId);
  if (alreadyExists) {
    throw new Error("Account already exists: An account with this ID already exists.");
  }

  accounts.push({
    id: newAccountId,
    owner: newAccountOwner.trim(),
    balance: 0, // must be a number, not "0"
  });
}

function depositMoney(accountId, amount) {
  const account = getAccountById(accountId);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid deposit amount: The amount must be a finite number greater than 0.");
  }

  account.balance += amount;
}

function withdrawMoney(accountId, amount) {
  const account = getAccountById(accountId);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid withdrawal amount: The amount must be a finite number greater than 0.");
  }

  if (amount > account.balance) {
    throw new Error("Insufficient funds: Cannot withdraw more than the current balance.");
  }

  account.balance -= amount;
}

function transferMoney(fromAccountId, toAccountId, amount) {
  if (fromAccountId === toAccountId) {
    throw new Error("Invalid transfer: Cannot transfer money to the same account.");
  }

  const fromAccount = getAccountById(fromAccountId);
  const toAccount = getAccountById(toAccountId);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid transfer amount: The amount must be a finite number greater than 0.");
  }

  if (amount > fromAccount.balance) {
    throw new Error("Insufficient funds: Cannot transfer more than the source account balance.");
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;
}

/*
Hints (should now behave correctly by throwing errors where appropriate):

getAccountById("1"); // throws invalid ID
getAccountById(4);   // throws not found

createAccount(1, "Alice");      // throws duplicate
createAccount("3", "Charlie");  // throws invalid ID
createAccount(-3, "Charlie");   // throws invalid ID
createAccount(3, ["Charlie"]);  // throws invalid owner
createAccount(3, "");           // throws invalid owner
createAccount(3, "  ");         // throws invalid owner

depositMoney(1, "300");     // throws invalid amount
depositMoney(1, -300);      // throws invalid amount
depositMoney(1, 0);         // throws invalid amount
depositMoney(1, Infinity);  // throws invalid amount
depositMoney(4, 100);       // throws not found

withdrawMoney(1, -100); // throws invalid amount
withdrawMoney(1, 0);    // throws invalid amount
withdrawMoney(1, 501);  // throws insufficient funds (Alice has 500)

transferMoney(1, 4, 100);   // throws not found
transferMoney(1, 2, 501);   // throws insufficient funds
transferMoney(1, 2, 100);   // works
*/
