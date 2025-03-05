import PDFDocument from "pdfkit";
import XLSX from "xlsx";

export function exportAsPDF({ feedback, res }) {
  const {
    name,
    email,
    date,
    serviceCategory,
    experience,
    priorityLevel,
    message,
    _id
  } = feedback;
  res.setHeader("Content-Disposition", `attachment; filename=feedback${_id}.pdf`);
  res.type("application/pdf");
  const doc = new PDFDocument();
  // doc.pipe(res);  // Stream the PDF content directly to the response
  doc.fontSize(18).text("Feedback Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Date: ${date}`);
  doc.text(`Service: ${serviceCategory}`);
  doc.text(`Experience: ${experience}`);
  doc.text(`Priority: ${priorityLevel}`);
  doc.text(`Name: ${name}`);
  doc.text(`Email: ${email}`);
  doc.moveDown();
  doc.fontSize(12).text("Message:");
  doc.fontSize(10).text(message, { indent: 20 });
  doc.pipe(res);
  doc.end();
}

export function exportAsEXCEL({ feedback, res }) {
  try {
    const {
        name,
        email,
        date,
        serviceCategory,
        experience,
        priorityLevel,
        message,
        _id
      } = feedback;
    // Create a workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
        ["Date", "Service", "Experience", "Priority", "Name", "Email", "Message"], // Header row
        [
          date,
          serviceCategory,
          experience,
          priorityLevel,
          name,
          email,
          message,
        ], // Data row
      ]);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback");

    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Set headers and send the Excel file
    res.setHeader("Content-Disposition", `attachment; filename=feedback${_id}.xlsx`);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(excelBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Can't export to excel" });
  }
}
