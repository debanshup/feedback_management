import PDFDocument from "pdfkit";
import XLSX from "xlsx";

export function exportAsPDF({ data, filters, res }) {
  const { serviceCategory, experience, priorityLevel, time } = filters;
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=analytics${Date.now()}.pdf`
  );
  res.type("application/pdf");
  const doc = new PDFDocument();

  // Write the PDF to a file
  doc.pipe(res);

  // Add title and filters
  doc.fontSize(16).text("Analytics", { align: "center" }).moveDown(1);

  const filterText = `Filters: Time - ${time}, Service Category - ${serviceCategory}, Experience - ${experience}, Priority Level - ${priorityLevel}`;
  doc.fontSize(12).text(filterText, { align: "left" }).moveDown(1);

  // Add table headers
  doc
    .fontSize(12)
    .text("Time", 50, doc.y, { width: 200, continued: true })
    .text("Count", 250, doc.y);

  doc
    .moveDown(0.5)
    .strokeColor("#000")
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(500, doc.y)
    .stroke();

  // Insert data rows
  data.forEach((item) => {
    doc
      .moveDown(0.5)
      .fontSize(11)
      .text(item.time, 50, doc.y, { width: 200, continued: true })
      .text(item.count, 250, doc.y);
  });

  // Finalize PDF file
  doc.end();
}

export function exportAsEXCEL({ data, filters, res }) {
  try {
    const { time, serviceCategory, experience, priorityLevel } = filters;
    // Create a workbook and worksheet
    // 1. Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([[]]); // Initialize empty sheet

    // 2. Add text filters at the top
    const filterText = `Filters: Time - ${time}, Service Category - ${serviceCategory}, Experience - ${experience}, Priority Level - ${priorityLevel}`;
    XLSX.utils.sheet_add_aoa(worksheet, [[filterText]], { origin: "A1" });

    // 3. Add column headers
    const headers = ["Time", "Count"];
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A3" });

    // 4. Insert data rows manually
    data.forEach((item, index) => {
      const row = [item.time, item.count];
      XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: `A${index + 4}` });
    });

    // 5. Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Time and Count");
    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Set headers and send the Excel file
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=analytics${Date.now()}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    // console.log("created buffer");

    res.send(excelBuffer);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * used to export whole analytics
 */

export function exportAllAsPdf(feedbackData, res) {
  try {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=analytics${Date.now()}.pdf`
    );
    res.type("application/pdf");
    const doc = new PDFDocument();
    doc.pipe(res);

    // Add Title
    doc.fontSize(18).text("Feedback Report", { align: "center" });
    doc.moveDown();

    //  page size with larger width
    doc.addPage({ size: [1000, 800] }); // 650 width, 800 height

    // Table Headers
    const headers = [
      "Date",
      "Service Category",
      "Total Feedback",
      "Good Experience",
      "Average Experience",
      "Poor Experience",
    ];
    const columnWidths = [120, 180, 120, 120, 120, 120];     

    let yPosition = doc.y;
    let xPosition = 50;  

    // Draw Table Header with proper alignment
    doc.fontSize(12).font("Helvetica-Bold");
    headers.forEach((header, i) => {
      doc.text(header, xPosition, yPosition, {
        width: columnWidths[i],
        align: "center",
      });
      xPosition += columnWidths[i];  
    });

    yPosition += 20;  
 
    feedbackData.forEach((entry) => {
      entry.feedback.forEach((feedbackItem) => {
        xPosition = 50;  

        const row = [
          entry.date,
          feedbackItem.serviceCategory,
          feedbackItem.totalFeedback.toString(),
          feedbackItem.goodExperience.toString(),
          feedbackItem.averageExperience.toString(),
          feedbackItem.poorExperience.toString(),
        ];

        row.forEach((col, i) => {
          doc.fontSize(12).text(col, xPosition, yPosition, {
            width: columnWidths[i],
            align: "center",
          });
          xPosition += columnWidths[i];  
        });

        yPosition += 20;  
      });
    });

    doc.end();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export function exportAllAsExcel(feedbackData, res) {
  try {
    const worksheetData = [];
    worksheetData.push([
      "Date",
      "Service Category",
      "Total Feedback",
      "Good Experience",
      "Average Experience",
      "Poor Experience",
    ]);

    // Insert data into rows
    feedbackData.forEach((entry) => {
      entry.feedback.forEach((feedbackItem, index) => {
        worksheetData.push([
          index === 0 ? entry.date : "", // show the date once per group
          feedbackItem.serviceCategory,
          feedbackItem.totalFeedback,
          feedbackItem.goodExperience,
          feedbackItem.averageExperience,
          feedbackItem.poorExperience,
        ]);
      });
    });

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback");

    // Create a buffer for the Excel workbook
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Set response headers
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=analyticsAll_${Date.now()}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send the Excel file as a response
    res.send(excelBuffer);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}
