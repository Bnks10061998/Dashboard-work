// import React from 'react';
// import html2pdf from 'html2pdf.js';
// import logo from '../assets/logo.jpg';

// const InvoicePDF = ({ invoiceData }) => {
//   const calculateValues = () => {
//     const subtotal = invoiceData.items.reduce((sum, item) => {
//       const quantity = parseFloat(item.quantity) || 0;
//       const rate = parseFloat(item.rate) || 0;
//       return sum + quantity * rate;
//     }, 0);
//     const discountAmount = subtotal * (parseFloat(invoiceData.discount) || 0) / 100;
//     const taxable = subtotal - discountAmount;
//     const tax = taxable * (parseFloat(invoiceData.taxPercentage) || 0) / 100;
//     const total = taxable + tax;

//     return { subtotal, discountAmount, tax, total };
//   };

//   const downloadPDF = () => {
//     const { subtotal, discountAmount, tax, total } = calculateValues();

//     const element = document.createElement('div');
//     element.innerHTML = `
//       <div style="font-family: Arial, sans-serif; padding: 30px; max-width: 800px; margin: auto; border: 1px solid #ccc;">
//         <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #00bcd4; padding-bottom: 10px;">
//           <div>
//             <h2 style="color: #00bcd4; margin: 0;">INVOICE</h2>
//             <p>Invoice# <strong>${invoiceData.invoiceNumber}</strong></p>
//             <p>Date: ${invoiceData.date}</p>
//           </div>
//           <div style="text-align: right;">
//             <img src="${logo}" alt="Logo" style="height: 60px;" />
//             <p style="margin: 0;"><strong>Brand Name</strong></p>
//             <p style="font-size: 12px;">Tagline Space Here</p>
//           </div>
//         </div>

//         <div style="display: flex; margin-top: 20px;">
//           <div style="flex: 1; padding-right: 20px;">
//             <h4 style="margin: 0 0 10px 0;">Invoice to:</h4>
//             <p><strong>${invoiceData.clientName}</strong></p>
//             <p>${invoiceData.billingAddress.replace(/\n/g, "<br/>")}</p>
//             <p>${invoiceData.clientEmail}</p>
//           </div>
//           <div style="flex: 1; background: #f5f5f5; padding: 10px; font-size: 12px;">
//             <h4>Terms & Conditions</h4>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien ligula.</p>
//           </div>
//         </div>

//         <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
//           <thead>
//             <tr style="background: #e0f7fa;">
//               <th style="border: 1px solid #ccc; padding: 8px;">SL.</th>
//               <th style="border: 1px solid #ccc; padding: 8px;">Item Description</th>
//               <th style="border: 1px solid #ccc; padding: 8px;">Price</th>
//               <th style="border: 1px solid #ccc; padding: 8px;">Qty</th>
//               <th style="border: 1px solid #ccc; padding: 8px;">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${invoiceData.items.map((item, index) => {
//               const quantity = parseFloat(item.quantity) || 0;
//               const rate = parseFloat(item.rate) || 0;
//               const amount = quantity * rate;
//               return `
//                 <tr>
//                   <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${index + 1}</td>
//                   <td style="border: 1px solid #ccc; padding: 8px;">${item.description}</td>
//                   <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">$${rate.toFixed(2)}</td>
//                   <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${quantity}</td>
//                   <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">$${amount.toFixed(2)}</td>
//                 </tr>`;
//             }).join('')}
//           </tbody>
//         </table>

//         <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
//           <table style="width: 300px; font-size: 14px;">
//             <tr>
//               <td>Sub Total:</td>
//               <td style="text-align: right;">$${subtotal.toFixed(2)}</td>
//             </tr>
//             <tr>
//               <td>Discount (${invoiceData.discount}%):</td>
//               <td style="text-align: right;">-$${discountAmount.toFixed(2)}</td>
//             </tr>
//             <tr>
//               <td>Tax (${invoiceData.taxPercentage}%):</td>
//               <td style="text-align: right;">$${tax.toFixed(2)}</td>
//             </tr>
//             <tr style="font-weight: bold; background: #e0f7fa;">
//               <td>Total:</td>
//               <td style="text-align: right;">$${total.toFixed(2)}</td>
//             </tr>
//           </table>
//         </div>

//         <div style="margin-top: 40px; display: flex; justify-content: space-between;">
//           <div>
//             <p><strong>Authorised Sign</strong></p>
//             <p style="margin-top: 40px;">____________________</p>
//           </div>
//           <div>
//             <h4>Payment Info</h4>
//             <p>Account #: 1234 5678 9012</p>
//             <p>A/C Name: Lorem Ipsum</p>
//             <p>Bank Details: Add your details</p>
//           </div>
//         </div>

//         <div style="text-align: center; margin-top: 30px;">
//           <p>Thank you for your business</p>
//         </div>
//       </div>
//     `;

//     const options = {
//       margin: 0.2,
//       filename: `${invoiceData.invoiceNumber || 'invoice'}.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
//     };

//     html2pdf().set(options).from(element).save();
//   };

//   return (
//     <button
//       onClick={downloadPDF}
//       className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
//     >
//       Download Styled Invoice PDF
//     </button>
//   );
// };

// export default InvoicePDF;


import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import logo from '../assets/Logo.jpg'; 

const InvoicePDF = ({ invoiceData, previewMode = false }) => {
  const previewRef = useRef(null);

  // Fallback Data
  const defaultInvoiceData = {
    invoiceNumber: 'INV-1001',
    date: '2025-05-18',
    clientName: 'John Doe',
    billingAddress: '123 Main Street\nCityville\nCountry',
    clientEmail: 'john.doe@example.com',
    items: [
      { description: 'Logo Design', quantity: '2', rate: '150' },
      { description: 'Website Development', quantity: '1', rate: '800' },
      { description: 'Hosting (1 year)', quantity: '1', rate: '100' }
    ],
    discount: '10',
    taxPercentage: '18'
  };

  const data = invoiceData || defaultInvoiceData;
  const logoUrl = logo || 'https://via.placeholder.com/150'; 

  const calculateValues = () => {
    const subtotal = data.items.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      return sum + quantity * rate;
    }, 0);
    const discountAmount = subtotal * (parseFloat(data.discount) || 0) / 100;
    const taxable = subtotal - discountAmount;
    const tax = taxable * (parseFloat(data.taxPercentage) || 0) / 100;
    const total = taxable + tax;
    return { subtotal, discountAmount, tax, total };
  };

  const generateHTML = () => {
    const { subtotal, discountAmount, tax, total } = calculateValues();

    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: auto; border: 1px solid #ccc;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #00bcd4; padding-bottom: 10px;">
          <div>
            <h2 style="color: #00bcd4; margin: 0;">INVOICE</h2>
            <p>Invoice# <strong>${data.invoiceNumber}</strong></p>
            <p>Date: ${data.date}</p>
          </div>
          <div>
            <img src="${logoUrl}" alt="Logo" style="height: 60px;" />
          </div>
        </div>
        <div style="display: flex; margin-top: 20px;">
          <div style="flex: 1;">
            <h4>Invoice to:</h4>
            <p><strong>${data.clientName}</strong></p>
            <p>${data.billingAddress.replace(/\n/g, "<br/>")}</p>
            <p>${data.clientEmail}</p>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background: #e0f7fa;">
              <th style="border: 1px solid #ccc; padding: 8px;">SL</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Item</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Price</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Qty</th>
              <th style="border: 1px solid #ccc; padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map((item, index) => {
              const qty = parseFloat(item.quantity) || 0;
              const rate = parseFloat(item.rate) || 0;
              const total = qty * rate;
              return `
                <tr>
                  <td style="border: 1px solid #ccc; padding: 8px;">${index + 1}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">${item.description}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">$${rate.toFixed(2)}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">${qty}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">$${total.toFixed(2)}</td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
        <div style="margin-top: 20px; text-align: right;">
          <p>Sub Total: $${subtotal.toFixed(2)}</p>
          <p>Discount: -$${discountAmount.toFixed(2)}</p>
          <p>Tax: $${tax.toFixed(2)}</p>
          <h3>Total: $${total.toFixed(2)}</h3>
        </div>
      </div>
    `;
  };

  const downloadPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = generateHTML();

    const opt = {
      margin: 10,
      filename: `${data.invoiceNumber || 'invoice'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).toPdf().get('pdf').then(pdf => {
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.text(`Page ${i} of ${pageCount}`, 180, 287);
      }
    }).save();
  };

  const printPreview = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Print Preview</title></head><body>${generateHTML()}</body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const sendPDFByEmail = () => {
    const element = document.createElement('div');
    element.innerHTML = generateHTML();

    html2pdf().from(element).outputPdf('datauristring').then(pdfDataUri => {
      const base64PDF = pdfDataUri.split(',')[1];

      fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.clientEmail,
          subject: `Invoice ${data.invoiceNumber}`,
          message: 'Please find your invoice attached.',
          pdf: base64PDF,
          filename: `${data.invoiceNumber || 'invoice'}.pdf`
        })
      }).then(res => {
        if (res.ok) alert('Email sent!');
        else alert('Failed to send email');
      }).catch(console.error);
    });
  };

  return (
    <div className="p-4">
      {previewMode && (
        <div
          ref={previewRef}
          className="bg-white p-4 border shadow-md my-4"
          style={{ minHeight: '400px' }}
          dangerouslySetInnerHTML={{ __html: generateHTML() }}
        />
      )}

      <div className="flex gap-3 flex-wrap">
        <button onClick={downloadPDF} className="bg-cyan-600 text-white px-4 py-2 rounded">
          Download PDF (A4)
        </button>
        <button onClick={printPreview} className="bg-gray-600 text-white px-4 py-2 rounded">
          Print Preview
        </button>
        <button onClick={sendPDFByEmail} className="bg-green-600 text-white px-4 py-2 rounded">
          Send PDF to Email
        </button>
      </div>
    </div>
  );
};

export default InvoicePDF;

