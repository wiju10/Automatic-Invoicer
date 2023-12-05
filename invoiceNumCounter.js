const fs = require("fs");

const invoiceNumFilePath = "./invoiceNum.txt";

function readInvoiceNumber() {
  try {
    return parseInt(fs.readFileSync(invoiceNumFilePath, "utf8")) || 0;
  } catch (error) {
    return 0;
  }
}

function writeInvoiceNumber(invoiceNumber) {
  fs.writeFileSync(invoiceNumFilePath, invoiceNumber.toString());
}

let currentInvoiceNumber = readInvoiceNumber();
currentInvoiceNumber++;

console.log(`Invoice Number: ${currentInvoiceNumber}`);

writeInvoiceNumber(currentInvoiceNumber);

// Export the currentInvoiceNumber value
module.exports = currentInvoiceNumber;
