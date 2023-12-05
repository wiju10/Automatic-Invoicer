const PDFDocument = require("pdfkit");
const fs = require("fs");

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
const fullName = "John Snow";
const address = "Winterfell Winterfell Winterfell WinterfellWinterfell";
const date = new Date();
const tDate = date.toLocaleDateString("en-GB");
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
doc.fontSize(14).text(`${fullName}`, { continued: true, align: "left" });
doc
  .fill("black")
  .fontSize(14)
  .text(`${tDate}`, { align: "right", underline: true, color: "black" });
doc.moveDown(1);
doc.fontSize(14).text(`${address}`, { align: "left", width: "150" });

doc.end();

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
