/* eslint-disable no-undef */

require('dotenv').config();
const pug = require('pug');
const jsonData = require('./cypress/mochaReports/mochawesome-report.json');
// Now you can send this HTML in the email body with nodemailer
const nodemailer = require('nodemailer');
const path = require('path');

// Prepare the data from the report
const stats = jsonData.stats; // Overall statistics
const suites = jsonData.results.flatMap((result) => result.suites); // Flatten suites

// Compile the Pug template (this assumes the pug file is in the templates folder)
const compiledTemplate = pug.compileFile('scripts/reportTemplate.pug');

// Generate HTML by passing data to the template
const summaryHtml = compiledTemplate({
  stats: stats,
  suites: suites,
});

// Configure the email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com', // Corrected host
  port: 587,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
  logger: true,
  transactionLog: true, // Include SMTP traffic in the logs
  allowInternalNetworkInterfaces: false,
});
const reportPath = path.join(
  __dirname,
  'cypress',
  'mochaReports',
  'mochawesome-report.html'
);

// Email options
const mailOptions = {
  from: {
    name: process.env.EMAIL_FROM_NAME,
    address: process.env.EMAIL_FROM_ADDRESS,
  },
  to: process.env.EMAIL_TO,
  subject: 'Cypress Test Execution Report',
  html: summaryHtml,
  attachments: [
    {
      filename: 'mochawesome-report.html',
      path: reportPath,
      contentType: 'text/html',
    },
  ],
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
