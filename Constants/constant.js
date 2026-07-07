"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPCI_FILE_CONFIG = exports.MCC_CODE = exports.merchantVPAs = exports.merchantCredentials = exports.AUTH_CYCLES = exports.DISPUTE_CYCLE_WINDOWS = exports.AUTH_CYCLE_WINDOWS = exports.payerVpas = exports.beneficiaryTypes = exports.adjustmentType = exports.adjustHeaders = exports.CBS_DR_ACCT_NO = exports.CBS_CR_ACCT_NO = exports.CBS_SOL_ID = exports.SUCCESS_NPCI_CODES = exports.cbsHeaders = exports.switchHeaders = exports.timeoutHeaders = exports.npciHeaders = void 0;
exports.generateTimeInCycle = generateTimeInCycle;
exports.formatNpciTimeToColon = formatNpciTimeToColon;
exports.generateRandomTime = generateRandomTime;
exports.generateRandomTimeHHMMSS = generateRandomTimeHHMMSS;
exports.setMerchantCredentials = setMerchantCredentials;
exports.setMerchantVPAs = setMerchantVPAs;
exports.formatCbsTranDate = formatCbsTranDate;
exports.formatDateToDDMMYYYYHHMMSS = formatDateToDDMMYYYYHHMMSS;
exports.formatDate = formatDate;
exports.formatDateDDMMYY = formatDateDDMMYY;
exports.buildNpciFilename = buildNpciFilename;
exports.buildSwitchFilename = buildSwitchFilename;
exports.buildCbsFilename = buildCbsFilename;
exports.buildAdjustmentFilename = buildAdjustmentFilename;
exports.formatSwitchDateFromNpciTime = formatSwitchDateFromNpciTime;
exports.formatFullDateWithTimeSWITCH = formatFullDateWithTimeSWITCH;
exports.formatFullDateWithTimeCBS = formatFullDateWithTimeCBS;
exports.formatFullDateWithTimeout = formatFullDateWithTimeout;
exports.formatDateForFilename = formatDateForFilename;
// Define headers for each type of data
exports.npciHeaders = [
    { id: "NPCI_TXN_TYPE", title: "NPCI_TXN_TYPE" },
    { id: "NPCI_STATUS", title: "NPCI_STATUS" },
    { id: "TXNID", title: "TXNID" },
    { id: "RRN", title: "RRN" },
    { id: "NPCI_CODE", title: "NPCI_CODE" },
    { id: "DATE", title: "DATE" },
    { id: "TIME", title: "TIME" },
    { id: "AMOUNT", title: "AMOUNT" },
    { id: "A", title: "A" },
    { id: "B", title: "B" },
    { id: "C", title: "C" },
    { id: "D", title: "D" },
    { id: "PSP", title: "PSP" },
    { id: "E", title: "E" },
    { id: "PAYER_VPA", title: "PAYER_VPA" },
    { id: "F", title: "F" },
    { id: "MCC", title: "MCC" },
    { id: "PAYEE_VPA", title: "PAYEE_VPA" },
    { id: "G", title: "G" },
    { id: "H", title: "H" },
    { id: "I", title: "I" },
    { id: "J", title: "J" },
    { id: "K", title: "K" },
    { id: "L", title: "L" },
    { id: "M", title: "M" },
    { id: "N", title: "N" },
];
exports.timeoutHeaders = [
    { id: "TXN UID", title: "TXN UID" },
    { id: "TXN Type", title: "TXN Type" },
    { id: "TXN Date", title: "TXN Date" },
    { id: "TXN Time", title: "TXN Time" },
    { id: "Settlement Date", title: "Settlement Date" },
    { id: "Response Code", title: "Response Code" },
    { id: "RRN", title: "RRN" },
    { id: "STAN", title: "STAN" },
    { id: "Remitter", title: "Remitter" },
    { id: "Beneficiary", title: "Beneficiary" },
    {
        id: "Beneficiary Mobile  /Account/Aadhar Number",
        title: "Beneficiary Mobile  /Account/Aadhar Number",
    },
    { id: "Remitter Number", title: "Remitter Number" },
    { id: "Amount", title: "Amount" },
    { id: "UTXNID", title: "UTXNID" },
    { id: "PayerPSP", title: "PayerPSP" },
    { id: "PayeePSP", title: "PayeePSP" },
];
exports.switchHeaders = [
    { id: "Date of txn", title: "Date of txn" },
    { id: "Amount", title: "Amount" },
    { id: "Resp Code", title: "Resp Code" },
    { id: "Status", title: "Status" },
    { id: "RRN", title: "RRN" },
    { id: "Ext id", title: "Ext id" },
    { id: "Payee Vpa", title: "Payee Vpa" },
    { id: "Txn Note", title: "Txn Note" },
    { id: "Payer UPI ID", title: "Payer UPI ID" },
    { id: "PayerName", title: "PayerName" },
    { id: "Txn Id", title: "Txn Id" },
    { id: "MCC", title: "MCC" },
];
exports.cbsHeaders = [
    { id: "TRAN_ID", title: "TRAN_ID" },
    { id: "TRAN_DATE", title: "TRAN_DATE" },
    { id: "TRAN_AMT", title: "TRAN_AMT" },
    { id: "VALUE_DATE", title: "VALUE_DATE" },
    { id: "CR_SOL_ID", title: "CR_SOL_ID" },
    { id: "DR_SOL_ID", title: "DR_SOL_ID" },
    { id: "CR_ACCT_NO", title: "CR_ACCT_NO" },
    { id: "DR_ACCT_NO", title: "DR_ACCT_NO" },
    { id: "RRN", title: "RRN" },
    { id: "UPI_TXN_ID", title: "UPI_TXN_ID" },
];
/** NPCI response codes treated as successful — aligned with MMS billing/recon. */
exports.SUCCESS_NPCI_CODES = ["00", "RB", "0"];
exports.CBS_SOL_ID = "2650";
exports.CBS_CR_ACCT_NO = "27220001182650";
exports.CBS_DR_ACCT_NO = "19025003182650";
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
    "Arbitration Raise",
    "Pre-Arbitration Raise",
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
    "Wrong credit Representment",
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
    "SIB",
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
    "@paytm",
];
/** NPCI OC 222 — AUTH settlement windows (Annexure I). */
exports.AUTH_CYCLE_WINDOWS = {
    1: { startHour: 21, endHour: 0 },
    2: { startHour: 0, endHour: 5 },
    3: { startHour: 5, endHour: 7 },
    4: { startHour: 7, endHour: 9 },
    5: { startHour: 9, endHour: 11 },
    6: { startHour: 11, endHour: 13 },
    7: { startHour: 13, endHour: 15 },
    8: { startHour: 15, endHour: 17 },
    9: { startHour: 17, endHour: 19 },
    10: { startHour: 19, endHour: 21 },
};
/** NPCI OC 222 — Dispute settlement windows DC1 / DC2. */
exports.DISPUTE_CYCLE_WINDOWS = {
    1: { startHour: 0, endHour: 16 },
    2: { startHour: 16, endHour: 0 },
};
exports.AUTH_CYCLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/** Random HHMMSS inside a settlement-cycle window. */
function generateTimeInCycle(_baseDate, window) {
    var startMins = window.startHour * 60;
    var endMins = window.endHour * 60;
    var span = endMins > startMins
        ? endMins - startMins
        : 24 * 60 - startMins + endMins;
    var offset = Math.floor(Math.random() * span);
    var totalMins = startMins + offset;
    if (totalMins >= 24 * 60)
        totalMins -= 24 * 60;
    var h = Math.floor(totalMins / 60);
    var m = totalMins % 60;
    var s = Math.floor(Math.random() * 60);
    return "".concat(String(h).padStart(2, "0")).concat(String(m).padStart(2, "0")).concat(String(s).padStart(2, "0"));
}
function formatNpciTimeToColon(timeHHMMSS) {
    return "".concat(timeHHMMSS.slice(0, 2), ":").concat(timeHHMMSS.slice(2, 4), ":").concat(timeHHMMSS.slice(4, 6));
}
function generateRandomTime() {
    var hours = String(Math.floor(Math.random() * 24)).padStart(2, "0");
    var minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
    var seconds = String(Math.floor(Math.random() * 60)).padStart(2, "0");
    return "".concat(hours).concat(minutes).concat(seconds);
}
function generateRandomTimeHHMMSS() {
    var hours = String(Math.floor(Math.random() * 24)).padStart(2, "0");
    var minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
    var seconds = String(Math.floor(Math.random() * 60)).padStart(2, "0");
    return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
}
/** Populated at startup from ClickHouse `entity_credentials_uat`. */
exports.merchantCredentials = [];
/** VPA list derived from `merchantCredentials` for random selection. */
exports.merchantVPAs = [];
function setMerchantCredentials(credentials) {
    exports.merchantCredentials.length = 0;
    exports.merchantCredentials.push.apply(exports.merchantCredentials, credentials);
    exports.merchantVPAs.length = 0;
    exports.merchantVPAs.push.apply(exports.merchantVPAs, credentials.map(function (row) { return row.vpa; }));
}
function setMerchantVPAs(vpas) {
    exports.merchantVPAs.length = 0;
    exports.merchantVPAs.push.apply(exports.merchantVPAs, vpas);
}
exports.MCC_CODE = {
    gamming: "5816",
    dinning: "5814",
    grocery: "5411",
    traveler: "4722",
    telecom: "4814",
    bookerr: "7883"
};
//DATE
/** yyyy-MM-dd HH:mm:ss — CBS TRAN_DATE / VALUE_DATE. */
function formatCbsTranDate(date) {
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    return "".concat(year, "-").concat(month, "-").concat(day, " 00:00:00");
}
// Function to format date to 'DD-MM-YYYY HH:mm:ss' format
function formatDateToDDMMYYYYHHMMSS(date) {
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    var hours = String(date.getHours()).padStart(2, "0");
    var minutes = String(date.getMinutes()).padStart(2, "0");
    var seconds = String(date.getSeconds()).padStart(2, "0");
    return "".concat(day, "-").concat(month, "-").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
function formatDate(date) {
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = String(date.getFullYear()).slice(-2);
    return "".concat(month).concat(day).concat(year);
}
/** DDMMYY — used in NPCI / CBS / SWITCH upload filenames. */
function formatDateDDMMYY(date) {
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = String(date.getFullYear()).slice(-2);
    return "".concat(day).concat(month).concat(year);
}
exports.NPCI_FILE_CONFIG = {
    side: "ISS",
    bank: "SBF",
    cycle: 3,
};
/** UPIMERCHANTRAWDATA(ISS|ACQ)<BANK>(DDMMYY)_<CYCLE>C.csv */
function buildNpciFilename(date, options) {
    if (options === void 0) { options = {}; }
    var _a = __assign(__assign({}, exports.NPCI_FILE_CONFIG), options), side = _a.side, bank = _a.bank, cycle = _a.cycle;
    return "UPIMERCHANTRAWDATA".concat(side).concat(bank).concat(formatDateDDMMYY(date), "_").concat(cycle, "C.csv");
}
/** Switch_File(DDMMYY).csv */
function buildSwitchFilename(date) {
    return "Switch_File".concat(formatDateDDMMYY(date), ".csv");
}
/** UPI_Cbs(DDMMYY).csv */
function buildCbsFilename(date) {
    return "UPI_Cbs".concat(formatDateDDMMYY(date), ".csv");
}
var ADJUSTMENT_MONTHS = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];
/** UPI Adjustment Report_<BANK>_<DDMONYYYY>_DC<n>.csv */
function buildAdjustmentFilename(date, disputeCycle) {
    var day = String(date.getDate()).padStart(2, "0");
    var mon = ADJUSTMENT_MONTHS[date.getMonth()];
    var year = date.getFullYear();
    return "UPI Adjustment Report_".concat(exports.NPCI_FILE_CONFIG.bank, "_").concat(day).concat(mon).concat(year, "_DC").concat(disputeCycle, ".csv");
}
/** DD-MM-YYYY HH:mm:ss for SWITCH from NPCI TIME (HHMMSS) on baseDate. */
function formatSwitchDateFromNpciTime(baseDate, timeHHMMSS) {
    var txnDate = new Date(baseDate);
    txnDate.setHours(Number(timeHHMMSS.slice(0, 2)), Number(timeHHMMSS.slice(2, 4)), Number(timeHHMMSS.slice(4, 6)));
    var day = String(txnDate.getDate()).padStart(2, "0");
    var month = String(txnDate.getMonth() + 1).padStart(2, "0");
    var year = txnDate.getFullYear();
    var hours = String(txnDate.getHours()).padStart(2, "0");
    var minutes = String(txnDate.getMinutes()).padStart(2, "0");
    var seconds = String(txnDate.getSeconds()).padStart(2, "0");
    return "".concat(day, "-").concat(month, "-").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
function formatFullDateWithTimeSWITCH(date) {
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    var hours = String(date.getHours()).padStart(2, "0");
    var minutes = String(date.getMinutes()).padStart(2, "0");
    var seconds = String(date.getSeconds()).padStart(2, "0");
    return "".concat(day, "-").concat(month, "-").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
function formatFullDateWithTimeCBS(date) {
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    var hours = String(date.getHours()).padStart(2, "0");
    var minutes = String(date.getMinutes()).padStart(2, "0");
    var seconds = String(date.getSeconds()).padStart(2, "0");
    return "".concat(day, "-").concat(month, "-").concat(year);
}
function formatFullDateWithTimeout(date) {
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    var hours = String(date.getHours()).padStart(2, "0");
    var minutes = String(date.getMinutes()).padStart(2, "0");
    var seconds = String(date.getSeconds()).padStart(2, "0");
    return "".concat(year, "-").concat(month, "-").concat(day);
}
// Function to format date to 'YYYYMMDD' for filename
function formatDateForFilename(date) {
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    return "".concat(year).concat(month).concat(day);
}
