"use client";
import { Download } from "lucide-react";

export default function InvoiceDownloadButton({ order }) {
  // Function to format the date
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Date not available";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Date not available";
    }
  };

  // Calculate total
  const total = order?.total || 325.0;

  // Generate product rows based on the order data
  const generateProductRows = () => {
    if (!order?.orders || order.orders.length === 0) {
      return `
        <tr class="border-b border-gray-200">
            <td class="bg-gray-50">1</td>
            <td>
                <div class="product-info">
                    <img src="https://via.placeholder.com/50x50?text=Sample" 
                        alt="Sample Product" 
                        class="product-image">
                    <div class="flex flex-col">
                        <span class="font-medium text-gray-800">Sample Product</span>
                        <span class="text-gray-500 text-sm">Size: M</span>
                    </div>
                </div>
            </td>
            <td>1</td>
            <td>$25.00</td>
        </tr>
      `;
    }

    return order.orders
      .map(
        (item, index) => `
        <tr class="border-b border-gray-200">
            <td class="bg-gray-50 ${
              index === order.orders.length - 1 ? "rounded-bl-md" : ""
            }">${index + 1}</td>
            <td>
                <div class="product-info">
                    <img src="${
                      item.thumbnail ||
                      item.image ||
                      "https://via.placeholder.com/50x50?text=No+Image"
                    }" 
                        alt="${item.title || item.name || "Product"}" 
                        class="product-image"
                        onerror="this.src='https://via.placeholder.com/50x50?text=No+Image'">
                    <div class="flex flex-col">
                        <span class="font-medium text-gray-800">${
                          item.title || item.name || "Product Name"
                        }</span>
                        <span class="text-gray-500 text-sm">Size: ${
                          item.size || "N/A"
                        }</span>
                    </div>
                </div>
            </td>
            <td>${item.quantity || 1}</td>
            <td>$${item.price || "0.00"}</td>
        </tr>
      `
      )
      .join("");
  };

  const invoiceHTML = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ES Vibes Invoice</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Asimovian&display=swap");

        /* Font face with absolute URL */
        @font-face {
            font-family: 'logo-font';
            src: url('${
              typeof window !== "undefined" ? window.location.origin : ""
            }/fonts/es-font.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }

        body {
            font-family: "Montserrat", sans-serif;
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .invoice-container {
            max-width: 800px;
            width: 100%;
            background-color: #fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            padding: 40px;
        }

        .text-green {
            color: #10b981;
        }

        .bg-green {
            background-color: #10b981;
        }

        .bg-gray-100 {
            background-color: #f3f4f6;
        }

        .invoice-table th,
        .invoice-table td {
            padding: 12px 16px;
            text-align: left;
        }

        .invoice-table thead th {
            font-weight: 600;
        }

        .product-image {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }

        .product-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        @media print {
            body {
                background-color: white;
                padding: 0;
                margin: 0;
                min-height: auto;
            }

            .invoice-container {
                box-shadow: none;
                border-radius: 0;
                max-width: none;
                padding: 20px;
            }

            .product-image {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
        }

        .logo-font {
            font-family: "logo-font", "Inter", "Roboto", "Helvetica Neue", Arial, sans-serif;
        }

        .logo-es {
            font-family: "Asimovian", sans-serif;
        }
    </style>
</head>

<body>
    <div class="invoice-container">
        <!-- Header -->
        <div class="flex justify-between items-center mb-10">
            <div class="flex items-center gap-2" style="color:black">
                <!-- Logo Icon -->
                <div
                    style="width: 38px; height: 38px; background-color: #000; color: white;"
                    class="logo-es rounded-sm flex justify-center items-center font-bold text-xl tracking-tight shadow-sm">
                    ES
                </div>

                <!-- Logo Text -->
                <div class="flex flex-col -space-y-2">
                    <div class="text-black font-bold text-xl tracking-wide logo-es">
                        ES VIBES
                    </div>
                    <p style="color:black; font-size: 12px!important;" class="logo-font text-sm font-medium tracking-wide">
                        next level tees
                    </p>
                </div>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">Invoice</h2>
        </div>

        <!-- Seller & Invoice Details -->
        <div class="flex flex-col md:flex-row justify-between mb-8 text-sm">
            <div class="mb-4 md:mb-0">
                <p>${order?.address?.city || "Dhaka"}</p>
                <p>${order?.address?.district || "Dhaka"}, ${
    order?.address?.postalCode || "1000"
  }</p>
                <h3 class="font-semibold text-gray-700">${
                  order?.address?.address || "2345 Tail Ends Road"
                }</h3>
            </div>
            <div class="text-gray-600">
                <p><span class="font-semibold">Issue Date:</span> ${formatDate(
                  order?.createdAt
                )}</p>
                <p class="text-green font-semibold">
                    <span class="font-semibold text-gray-600">Invoice No:</span> ${
                      order?.transactionId || "904679"
                    }
                </p>
                <p><span class="font-semibold">Phone:</span> ${
                  order?.address?.phone || "0123456789"
                }</p>
            </div>
        </div>

        <!-- Invoice Summary Table -->
        <div class="overflow-x-auto rounded-md border border-gray-200 mb-8">
            <table class="w-full">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="py-3 px-4 text-left font-medium text-gray-600">
                            Invoice Date:
                        </th>
                        <th class="py-3 px-4 text-left font-medium text-gray-600">
                            Invoice No:
                        </th>
                        <th class="py-3 px-4 text-left font-medium text-gray-600">
                            Phone No:
                        </th>
                        <th class="py-3 px-4 text-left font-medium text-gray-600">
                            Due Amount:
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="py-3 px-4">${formatDate(
                          order?.createdAt
                        )}</td>
                        <td class="py-3 px-4">${
                          order?.transactionId || "AP 3746908"
                        }</td>
                        <td class="py-3 px-4">${
                          order?.address?.phone || "0123456789"
                        }</td>
                        <td class="py-3 px-4">${
                          order?.paymentMethod === "cod"
                            ? `BDT ${total || 0}`
                            : "BDT 0"
                        }</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Item Details Table -->
        <div class="overflow-x-auto rounded-md mb-8">
            <table class="w-full invoice-table">
                <thead class="bg-green text-white rounded-t-md">
                    <tr>
                        <th class="rounded-tl-md">No.</th>
                        <th>Item detail</th>
                        <th>Qty</th>
                        <th class="rounded-tr-md">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateProductRows()}
                </tbody>
            </table>
        </div>

        <!-- Total and Navigation -->
        <div class="flex justify-end items-center mb-8">
            <div class="flex items-center text-lg font-medium">
                <span class="text-gray-800 mr-2">GRAND TOTAL</span>
                <span class="text-green">BDT ${total || "325.00"}</span>
            </div>
        </div>

        <!-- Signature and Buttons -->
        <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-6 md:mb-0">
                <div class="border-b border-gray-400 w-48 mb-2"></div>
                <p class="text-sm text-gray-600">Authorised Sign</p>
            </div>
        </div>
    </div>
</body>

</html>`;

  const handleDownload = () => {
    try {
      // Create a new window for printing
      const printWindow = window.open("", "_blank");

      if (!printWindow) {
        alert("Please allow popups to print the invoice");
        return;
      }

      // Write the invoice HTML to the new window
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();

      // Handle the print process
      printWindow.onload = () => {
        // Longer delay to ensure fonts and images are loaded
        setTimeout(() => {
          // Trigger print
          printWindow.print();

          // Close the window after print dialog is dismissed
          printWindow.onafterprint = () => {
            printWindow.close();
          };

          // Fallback: Close window if user cancels print
          setTimeout(() => {
            if (!printWindow.closed) {
              printWindow.close();
            }
          }, 1000);
        }, 1000);
      };

      // Handle case where window fails to load
      printWindow.onerror = () => {
        printWindow.close();
      };
    } catch (error) {
      console.error("Print failed:", error);
      alert("Failed to open print dialog. Please try again.");
    }
  };

  return (
    <button onClick={handleDownload} className="new-btn">
      Download Invoice
      <Download size={18} />
    </button>
  );
}
