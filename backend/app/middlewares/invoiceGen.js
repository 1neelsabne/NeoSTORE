// Importing Required Packages and Libraries

import fs from "fs";
import PDFDoc from "pdfkit";
//import img from "../shop.png";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Functions Related to Generating Invoice Pdf

const __dirname = dirname(fileURLToPath(import.meta.url));

function createInvoice(invoice) {
	let doc = new PDFDoc({ size: "A4", margin: 50 });

	generateHeader(doc);
	generateCustomerInformation(doc, invoice);
	generateInvoiceTable(doc, invoice);
	generateFooter(doc);

	const writeStream = fs.createWriteStream("./invoices/invoice.pdf");
	doc.pipe(writeStream);
	doc.end();
	return true;
}

function generateHeader(doc) {
	doc.image("./middlewares/neo.png", 50, 45, { width: 110, height: 30 })
		.fillColor("#444444")
		//.fontSize(20)
		//.text("Infy Inc.", 110, 57)
		.fontSize(10)
		.text("NeoSOFT Technologies", 200, 48, { align: "right" })
		.text("Blue Ridge IT Park", 200, 63, { align: "right" })
		.text("Hinjewadi, Pune, IN, 411033 ", 200, 80, { align: "right" })
		.moveDown();
}

function generateFooter(doc) {
	doc.fillColor("gray")
		.fontSize(10)
		.text("Thank you for your buisness. Tack Care!", 50, 780, {
			align: "center",
			width: 500,
		});
}

function generateCustomerInformation(doc, invoice) {
	const shipping = invoice.address[0];

	doc.fillColor("#444444")
		.font("Helvetica")
		.fontSize(20)
		.text("Invoice", 50, 160);
	generateHr(doc, 185);
	doc.fontSize(10)
		.font("Helvetica-Bold")
		.text(`Invoice Number: ${invoice._id}`, 50, 200)
		.font("Helvetica")
		.text(`Invoice Date: ${invoice.createdAt.substring(0, 10)}`, 50, 215)
		.text(`Order Status: Completed`, 50, 230)
		.font("Helvetica-Bold")
		.text(`${shipping.fname} ${shipping.lname}`, 300, 200)
		.font("Helvetica")
		.text(shipping.add, 300, 215)
		.text(
			`${shipping.city}, ${shipping.state}, ${shipping.country}, ${shipping.pin}`,
			300,
			230
		)
		.moveDown();
	generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
	let i;
	const invoiceTableTop = 330;

	doc.font("Helvetica-Bold");
	generateTableRow(
		doc,
		invoiceTableTop,
		"Items",
		"Quantity",
		"Unit Cost",
		"Line Total"
	);
	generateHr(doc, invoiceTableTop + 20);
	doc.font("Helvetica");

	for (i = 0; i < invoice.order_list.length; i++) {
		const item = invoice.order_list[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.product_name,
			item.product_quantity,
			item.product_cost.toFixed(2),
			(item.product_quantity * item.product_cost).toFixed(2)
		);

		generateHr(doc, position + 20);
	}

	const subtotalPosition = invoiceTableTop + (i + 1) * 30;
	doc.font("Helvetica-Bold");
	generateTableRow(
		doc,
		subtotalPosition,
		"",
		"",
		"Sub Total",
		invoice.sub_total.toFixed(2)
	);

	const gstPosition = subtotalPosition + 20;
	generateTableRow(
		doc,
		gstPosition,
		"",
		"",
		"GST(18%)",
		invoice.gst.toFixed(2)
	);

	const totalPosition = gstPosition + 20;
	generateTableRow(
		doc.fillColor("red"),
		totalPosition,
		"",
		"",
		"Total",
		invoice.total.toFixed(2)
	);

	const paidToDatePosition = totalPosition + 20;
	generateTableRow(
		doc.fillColor("green"),
		paidToDatePosition,
		"",
		"",
		"Paid Status",
		"Paid"
	);
	doc.font("Helvetica");
}
function generateTableRow(doc, y, c1, c2, c3, c4) {
	doc.fontSize(10)
		.text(c1, 50, y)
		.text(c2, 200, y, { width: 90, align: "right" })
		.text(c3, 330, y, { width: 90, align: "right" })
		.text(c4, 460, y, { width: 90, align: "right" });
	//.text(c5, 450, y, { width: 90, align: "right" });
}

function generateHr(doc, y) {
	doc.strokeColor("#aaaaaa")
		.lineWidth(1)
		.moveTo(50, y)
		.lineTo(550, y)
		.stroke();
}

export default createInvoice;
