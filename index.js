const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const currentInvoiceNumber = require("./invoiceNumCounter.js");

console.log(`Exported Invoice Number: ${currentInvoiceNumber}`);
// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
const invoiceNum = (0 + currentInvoiceNumber).toString().padStart(5, "0");
const fullName = "John Snow";
const accNo = "123123123123";
const address = "Winterfell Winterfell Winterfell WinterfellWinterfell";
const date = new Date();
const tDate = date.toLocaleDateString("en-GB");
const phoneNumber = "0123456789";
const email = "example@gmail.com";
const billTo = "Eleventeen";
const total = "RM1000";
const bank = "Maybank";
let month = date.toLocaleString("default", { month: "long" });
console.log(month);
doc.pipe(fs.createWriteStream(`${month}test.pdf`, { flags: "w" }));
doc
  .save()
  .moveTo(0, 25)
  .lineTo(0, 50)
  .lineTo(630, 50)
  .lineTo(630, 25) // Add a line to the starting point to close the rectangle
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
// Add an image, constrain it to a given size, and center it vertically and horizontally
// doc.image("path/to/image.png", {
//   fit: [250, 300],
//   align: "center",
//   valign: "center",
// });

// Add another page
// doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);

// // Draw a triangle
// doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

// // Apply some transforms and render an SVG path with the 'even-odd' fill rule
// doc
//   .scale(0.6)
//   .translate(470, -380)
//   .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
//   .fill("red", "even-odd")
//   .restore();

// // Add some text with annotations
// doc
//   .addPage()
//   .fillColor("blue")
//   .text("Here is a link!", 100, 100)
//   .underline(100, 100, 160, 27, { color: "#0000FF" })
//   .link(100, 100, 160, 27, "http://google.com/");

// Finalize PDF file
