// import express from 'express';
// import nodemailer from 'nodemailer';

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { email, subject, message, pdf, filename } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'banakasu4scot@gmail.com',
//       pass: 'olzaoszafmeygbwf'
//     },
//   });

//   const mailOptions = {
//     from: 'banakasu4scot@gmail.com',
//     to: email,
//     subject,
//     text: message,
//     attachments: [
//       {
//         filename,
//         content: Buffer.from(pdf, 'base64'),
//         encoding: 'base64',
//       },
//     ],
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Email sent');
//   } catch (error) {
//     console.error('Failed to send email:', error);
//     res.status(500).send('Failed to send email');
//   }
// });

// export default router;



import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, subject, message, pdf, filename } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'banakasu4scot@gmail.com',
      pass: 'olzaoszafmeygbwf', // app password
    },
  });

  const mailOptions = {
    from: 'banakasu4scot@gmail.com',
    to: email,
    subject,
    text: message,
    attachments: [
      {
        filename,
        content: Buffer.from(pdf, 'base64'),
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Sending email to: ${email}, Subject: ${subject}, Attachment size: ${pdf.length} chars`);

    res.status(200).send('Email sent');
    
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).send('Failed to send email');
  }
});

export default router;
