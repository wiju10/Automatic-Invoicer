const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const currentInvoiceNumber = require("./invoiceNumCounter.js");

console.log(`Exported Invoice Number: ${currentInvoiceNumber}`);
// Create a document
const doc = new PDFDocument();

// Replace with your own values
const fullName = "John Snow";
const accNo = "123123123123";
const address = "Winterfell Winterfell Winterfell WinterfellWinterfell";
const phoneNumber = "0123456789";
const email = "example@gmail.com";
const billTo = "Eleventeen";
const total = "RM1000";
const bank = "anActualBank";

const invoiceNum = (0 + currentInvoiceNumber).toString().padStart(5, "0");
const date = new Date();
const tDate = date.toLocaleDateString("en-GB");
let month = date.toLocaleString("default", { month: "long" });
doc.pipe(fs.createWriteStream(`${month}test.pdf`, { flags: "w" }));

//draw rectangle
doc
  .save()
  .moveTo(0, 25)
  .lineTo(0, 50)
  .lineTo(630, 50)
  .lineTo(630, 25)
  .fill("#cc0000")
  .restore();
doc.moveDown(2);
doc.fontSize(30).text(`INVOICE`, { align: "left" });
doc.moveDown(2);
doc.fontSize(12).text(`${fullName}`, { continued: true, align: "left" });
doc
  .fill("black")
  .fontSize(12)
  .text(`${tDate}`, { align: "right", underline: true, color: "black" });
doc.moveDown(1);
doc
  .fontSize(12)
  .text(`${address}`, { align: "left", width: "150" })
  .moveDown()
  .fontSize(12)
  .text(`${phoneNumber}`, { align: "left", width: "150" });
doc.fontSize(12).text(`${email}`, { continued: true, align: "left" });
doc
  .fontSize(12)
  .text(`${invoiceNum}`, { align: "right", underline: true, color: "black" });
doc.moveDown(2);
doc.fontSize(14).text(`BILL TO: ${billTo}`);
drawLine(400);
doc.moveDown(3);
const table = {
  headers: [
    {
      label: "Description",
      property: "description",
      width: 200,
      renderer: null,
    },
    {
      label: "Qty",
      property: "qty",
      height: 20,
      width: 50,
      renderer: null,
    },
    {
      label: "Unit Price",
      property: "unitPrice",
      height: 20,
      width: 150,
      renderer: null,
    },
    { label: "Total", property: "total", width: 70, renderer: null },
  ],
  datas: [
    {
      description: `Programming Instructor Services for ${month} `,
      qty: "1",
      unitPrice: "RM 2",
      total: "RM 3",
    },
    {
      description: "",
      qty: "",
      unitPrice: "",
      total: "",
    },
    {
      description: "",
      qty: "",
      unitPrice: "",
      total: "",
    },
  ],
};

doc.table(table, {
  minRowHeight: 30,
  prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
  prepareRow: (row, indexColumn, indexRow, rectRow) => {
    doc.font("Helvetica").fontSize(11);
    indexColumn === 0 &&
      doc.addBackground(rectRow, indexRow % 2 ? "grey" : "white", 0.15);
  },
});

doc
  .fontSize(10)
  .text(`Payment Instructions: `, {
    continued: true,
    align: "left",
  })
  .fontSize(12)
  .text(`Balance Due   ${total}`, { align: "right" });
doc
  .fontSize(10)
  .text(`${fullName} ${bank} ${accNo}`, { align: "left", width: 150 });
doc.end();

function drawLine(yAxis) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(20, yAxis)
    .lineTo(590, yAxis)
    .stroke();
}
