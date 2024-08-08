"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCC_CODE = exports.merchantVPAs = exports.payerVpas = exports.beneficiaryTypes = exports.adjustmentType = exports.adjustHeaders = exports.cbsHeaders = exports.switchHeaders = exports.npciHeaders = void 0;
exports.generateRandomTime = generateRandomTime;
exports.formatDateToDDMMYYYYHHMMSS = formatDateToDDMMYYYYHHMMSS;
exports.formatDateToYYMMDDHHMMSS = formatDateToYYMMDDHHMMSS;
exports.formatDate = formatDate;
exports.formatFullDateWithTimeSWITCH = formatFullDateWithTimeSWITCH;
exports.formatDateForFilename = formatDateForFilename;
// Define headers for each type of data
exports.npciHeaders = [
    { id: 'NPCI_TXN_TYPE', title: 'NPCI_TXN_TYPE' },
    { id: 'NPCI_STATUS', title: 'NPCI_STATUS' },
    { id: 'TXNID', title: 'TXNID' },
    { id: 'RRN', title: 'RRN' },
    { id: 'NPCI_CODE', title: 'NPCI_CODE' },
    { id: 'DATE', title: 'DATE' },
    { id: 'TIME', title: 'TIME' },
    { id: 'AMOUNT', title: 'AMOUNT' },
    { id: 'A', title: 'A' },
    { id: 'B', title: 'B' },
    { id: 'C', title: 'C' },
    { id: 'D', title: 'D' },
    { id: 'PSP', title: 'PSP' },
    { id: 'E', title: 'E' },
    { id: 'PAYER_VPA', title: 'PAYER_VPA' },
    { id: 'F', title: 'F' },
    { id: 'MCC', title: 'MCC' },
    { id: 'PAYEE_VPA', title: 'PAYEE_VPA' },
    { id: 'G', title: 'G' },
    { id: 'H', title: 'H' },
    { id: 'I', title: 'I' },
    { id: 'J', title: 'J' },
    { id: 'K', title: 'K' },
    { id: 'L', title: 'L' },
    { id: 'M', title: 'M' },
    { id: 'N', title: 'N' },
];
exports.switchHeaders = [
    { id: 'Date of txn', title: 'Date of txn' },
    { id: 'Amount', title: 'Amount' },
    { id: 'Resp Code', title: 'Resp Code' },
    { id: 'Status', title: 'Status' },
    { id: 'RRN', title: 'RRN' },
    { id: 'Ext id', title: 'Ext id' },
    { id: 'Payee Vpa', title: 'Payee Vpa' },
    { id: 'Txn Note', title: 'Txn Note' },
    { id: 'Payer UPI ID', title: 'Payer UPI ID' },
    { id: 'PayerName', title: 'PayerName' },
    { id: 'Txn Id', title: 'Txn Id' },
    { id: 'MCC', title: 'MCC' },
];
exports.cbsHeaders = [
    { id: 'A', title: 'A' },
    { id: 'DATE', title: 'DATE' },
    { id: 'AMOUNT', title: 'AMOUNT' },
    { id: 'B', title: 'B' },
    { id: 'C', title: 'C' },
    { id: 'D', title: 'D' },
    { id: 'E', title: 'E' },
    { id: 'F', title: 'F' },
    { id: 'G', title: 'G' },
    { id: 'RRN', title: 'RRN' },
    { id: 'H', title: 'H' },
    { id: 'TXNID', title: 'TXNID' },
];
exports.adjustHeaders = [
    { id: "Txnuid", title: "Txnuid" },
    { id: "Uid", title: "Uid" },
    { id: "Adjdate", title: "Adjdate" },
    { id: "Adjtype", title: "Adjtype" },
    { id: "Remitter", title: "Remitter" },
    { id: "Beneficiery", title: "Beneficiery" },
    { id: "Response", title: "Response" },
    { id: "Txndate", title: "Txndate" },
    { id: "Txntime", title: "Txntime" },
    { id: "RRN", title: "RRN" },
    { id: "Terminalid", title: "Terminalid" },
    { id: "Ben_Mobile_No", title: "Ben_Mobile_No" },
    { id: "Rem_Mobile_No", title: "Rem_Mobile_No" },
    { id: "Chbdate	Chbref", title: "Chbref" },
    { id: "Txnamount", title: "Txnamount" },
    { id: "Adjamount", title: "Adjamount" },
    { id: "Rem/PayeePSP_Fee", title: "Rem/PayeePSP_Fee" },
    { id: "Ben_Fee", title: "Ben_Fee" },
    { id: "Ben_FeeSW", title: "Ben_FeeSW" },
    { id: "Adjfee", title: "Adjfee" },
    { id: "Npcifee", title: "Npcifee" },
    { id: "Remfeetax", title: "Remfeetax" },
    { id: "Benfeetax", title: "Benfeetax" },
    { id: "Npcitax", title: "Npcitax" },
    { id: "Adjref", title: "Adjref" },
    { id: "Bankadjref", title: "Bankadjref" },
    { id: "Adjproof", title: "Adjproof" },
    { id: "Compensation amount", title: "Compensation amount" },
    { id: "Adjustment raised time", title: "time" },
    { id: "No of Days for Penalty", title: "Penalty" },
    { id: "SHDT73", title: "SHDT73" },
    { id: "SHDT74", title: "SHDT74" },
    { id: "SHDT75", title: "SHDT75" },
    { id: "SHDT76", title: "SHDT76" },
    { id: "SHDT77", title: "SHDT77" },
    { id: "Transaction_Type", title: "Transaction_Type" },
    { id: "Transaction Indicator", title: "Transaction Indicator" },
    { id: "Beneficiary Account number", title: "Beneficiary Account number" },
    { id: "Remitter Account number", title: "Remitter Account number" },
    { id: "Aadhar Number", title: "Aadhar Number" },
    { id: "Mobile Number", title: "Mobile Number" },
    { id: "Payer PSP", title: "Payer PSP" },
    { id: "Payee PSP", title: "Payee PSP" },
    { id: "UPI Transaction ID", title: "UPI Transaction ID" },
    { id: "Virtual Address", title: "Virtual Address" },
    { id: "Dispute Flag", title: "Dispute Flag" },
    { id: "Reason Code", title: "Reason Code" },
    { id: "MCC", title: "MCC" },
    { id: "Originating Channel", title: "Originating Channel" },
];
exports.adjustmentType = [
    "Chargeback Acceptance",
    "Chargeback Raise",
    "Complaint Raise",
    "Credit Adjustment",
    "Debit Reversal Confirmation",
    "Differed Chargeback Raise",
    "Differed Re-presentment Raise",
    "Fraud Chargeback Raise",
    "Fraud Chargeback Representment",
    "Online Refund",
    "Refund Reversal Confirmation",
    "Re-presentment Raise",
    "Response to Complaint",
    "RET",
    "TCC",
    "Wrong Credit Chargeback Acceptance",
    "Wrong Credit Chargeback Raise",
    "Wrong credit Representment"
];
exports.beneficiaryTypes = [
    "YES",
    "YBS",
    "SBI",
    "AXB",
    "HDF",
    "GTI",
    "BOB",
    "FBL",
    "UOB",
    "PNB",
    "CNB",
    "KMB",
    "ARL",
    "APP",
    "INB",
    "BOI",
    "YJU",
    "IPB",
    "ICI",
    "IIB",
    "CBI",
    "IOB",
    "UCO",
    "FIB",
    "IDB",
    "BOM",
    "KTP",
    "BOM",
    "YOM",
    "BDN",
    "KVB",
    "IDC",
    "MBK",
    "SIB"
];
exports.payerVpas = [
    "@apl",
    "@yapl",
    "@rapl",
    "@abfspay",
    "@abfspay",
    "@axisb",
    "@idfcbank",
    "@fkaxis",
    "@icici",
    "@okaxis",
    "@okhdfcbank",
    "@okicici",
    "@oksbi",
    "@yesg",
    "@ybl",
    "@axl",
    "@timecosmos",
    "@paytm"
];
function generateRandomTime() {
    var hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    var minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    var seconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return "".concat(hours).concat(minutes).concat(seconds);
}
exports.merchantVPAs = [
    // Digital Goods: Games-5816	
    'airpay.car@timecosmos',
    'airpay.bike@timecosmos',
    'airpay.truck@timecosmos',
    'airpay.boat@timecosmos',
    'airpay.airplane@timecosmos',
    'airpay.scooter@timecosmos',
    'airpay.helmet@timecosmos',
    'airpay.robot@timecosmos',
    'airpay.submarine@timecosmos',
    'airpay.drone@timecosmos',
    //Fast Food Restaurants-5814
    'razorpay.pizza@timecosmos',
    'razorpay.burger@timecosmos',
    'razorpay.sushi@timecosmos',
    'razorpay.pasta@timecosmos',
    'razorpay.tacos@timecosmos',
    'razorpay.soup@timecosmos',
    'razorpay.salad@timecosmos',
    'razorpay.steak@timecosmos',
    'razorpay.dessert@timecosmos',
    'razorpay.vegetarian@timecosmos',
    // finopay Stores, Supermarkets-5411
    'finopay.freshmart@timecosmos',
    'finopay.marketplace@timecosmos',
    'finopay.timecosmosrite@timecosmos',
    'finopay.foodland@timecosmos',
    'finopay.greenbasket@timecosmos',
    'finopay.dailygrocer@timecosmos',
    'finopay.bulkstore@timecosmos',
    'finopay.organic@timecosmos',
    'finopay.corner@timecosmos',
    'finopay.town@timecosmos',
    // tripay Agencies - 4722
    'tripay.explore@timecosmos',
    'tripay.wander@timecosmos',
    'tripay.adventure@timecosmos',
    'tripay.getaway@timecosmos',
    'tripay.destinations@timecosmos',
    'tripay.escape@timecosmos',
    'tripay.vacation@timecosmos',
    'tripay.tour@timecosmos',
    'tripay.globetrot@timecosmos',
    'tripay.expedition@timecosmos',
    // jiopaymunication Services-4814
    'jiopay.mobile@timecosmos',
    'jiopay.internet@timecosmos',
    'jiopay.cable@timecosmos',
    'jiopay.voip@timecosmos',
    'jiopay.fiber@timecosmos',
    'jiopay.data@timecosmos',
    'jiopay.broadband@timecosmos',
    'jiopay.satellite@timecosmos',
    'jiopay.wireless@timecosmos',
    'jiopay.convergence@timecosmos'
];
exports.MCC_CODE = {
    "airpay": "5816",
    "razorpay": "5814",
    "finopay": "5411",
    "tripay": "4722",
    "jiopay": "4814"
};
//DATE
// Function to format date to 'DD-MM-YYYY HH:mm:ss' format YYYY=MM-DD HH:mm:ss (for cosmos)
function formatDateToDDMMYYYYHHMMSS(date) {
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var seconds = String(date.getSeconds()).padStart(2, '0');
    return "".concat(day, "-").concat(month, "-").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
function formatDateToYYMMDDHHMMSS(date) {
    //todo: the date will be in format of 2024-07-16 23:59:53. break this to return 2024-07-16
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var seconds = String(date.getSeconds()).padStart(2, '0');
    return "".concat(day, "-").concat(month, "-").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
function formatDate(date) {
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = String(date.getFullYear()).slice(-2);
    return "".concat(month).concat(day).concat(year);
}
function formatFullDateWithTimeSWITCH(date) {
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var seconds = String(date.getSeconds()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
function formatDateForFilename(date) {
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    return "".concat(year).concat(month).concat(day);
}
