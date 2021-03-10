const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

{/* <script src="https://smtpjs.com/v3/smtp.js"></script>  */}

// exports.scheduledFunctionCrontab = functions.pubsub.schedule('59 11 * * 6')
//   .timeZone('America/New_York') // Users can choose timezone - default is America/Los_Angeles
//   .onRun((context) => {
//   console.log('This will be run every Sunday at 11:59 AM Eastern!');
//   return null;
// });