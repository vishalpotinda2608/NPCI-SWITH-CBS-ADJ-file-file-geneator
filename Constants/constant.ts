// Define headers for each type of data
export const npciHeaders = [
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

export const timeoutHeaders = [
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

export const switchHeaders = [
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

export const cbsHeaders = [
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
export const SUCCESS_NPCI_CODES = ["00", "RB", "0"] as const;

export const CBS_SOL_ID = "2650";
export const CBS_CR_ACCT_NO = "27220001182650";
export const CBS_DR_ACCT_NO = "19025003182650";

export const adjustHeaders = [
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

export const adjustmentType = [
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

export const beneficiaryTypes = [
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

export const payerVpas = [
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

export type AuthCycle = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type DisputeCycle = 1 | 2;

export interface CycleWindow {
  startHour: number;
  endHour: number;
}

/** NPCI OC 222 — AUTH settlement windows (Annexure I). */
export const AUTH_CYCLE_WINDOWS: Record<AuthCycle, CycleWindow> = {
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
export const DISPUTE_CYCLE_WINDOWS: Record<DisputeCycle, CycleWindow> = {
  1: { startHour: 0, endHour: 16 },
  2: { startHour: 16, endHour: 0 },
};

export const AUTH_CYCLES: AuthCycle[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** Random HHMMSS inside a settlement-cycle window. */
export function generateTimeInCycle(
  _baseDate: Date,
  window: CycleWindow
): string {
  const startMins = window.startHour * 60;
  const endMins = window.endHour * 60;
  const span =
    endMins > startMins
      ? endMins - startMins
      : 24 * 60 - startMins + endMins;

  const offset = Math.floor(Math.random() * span);
  let totalMins = startMins + offset;
  if (totalMins >= 24 * 60) totalMins -= 24 * 60;

  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const s = Math.floor(Math.random() * 60);
  return `${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}${String(s).padStart(2, "0")}`;
}

export function formatNpciTimeToColon(timeHHMMSS: string): string {
  return `${timeHHMMSS.slice(0, 2)}:${timeHHMMSS.slice(2, 4)}:${timeHHMMSS.slice(4, 6)}`;
}

export function generateRandomTime() {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  const seconds = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  return `${hours}${minutes}${seconds}`;
}
export function generateRandomTimeHHMMSS() {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  const seconds = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

/** Populated at startup from ClickHouse `entity_credentials_uat`. */
export let merchantCredentials: { vpa: string; mcc: string }[] = [];

/** VPA list derived from `merchantCredentials` for random selection. */
export let merchantVPAs: string[] = [];

export function setMerchantCredentials(
  credentials: { vpa: string; mcc: string }[]
): void {
  merchantCredentials.length = 0;
  merchantCredentials.push(...credentials);
  merchantVPAs.length = 0;
  merchantVPAs.push(...credentials.map((row) => row.vpa));
}

export function setMerchantVPAs(vpas: string[]): void {
  merchantVPAs.length = 0;
  merchantVPAs.push(...vpas);
}

export const MCC_CODE = {
  gamming: "5816",
  dinning: "5814",
  grocery: "5411",
  traveler: "4722",
  telecom: "4814",
  bookerr:"7883"
};

//DATE

/** yyyy-MM-dd HH:mm:ss — CBS TRAN_DATE / VALUE_DATE. */
export function formatCbsTranDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day} 00:00:00`;
}

// Function to format date to 'DD-MM-YYYY HH:mm:ss' format
export function formatDateToDDMMYYYYHHMMSS(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${month}${day}${year}`;
}

/** DDMMYY — used in NPCI / CBS / SWITCH upload filenames. */
export function formatDateDDMMYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}${month}${year}`;
}

export const NPCI_FILE_CONFIG = {
  side: "ISS" as "ISS" | "ACQ",
  bank: "SBF",
  cycle: 3,
};

/** UPIMERCHANTRAWDATA(ISS|ACQ)<BANK>(DDMMYY)_<CYCLE>C.csv */
export function buildNpciFilename(
  date: Date,
  options: Partial<typeof NPCI_FILE_CONFIG> = {}
): string {
  const { side, bank, cycle } = { ...NPCI_FILE_CONFIG, ...options };
  return `UPIMERCHANTRAWDATA${side}${bank}${formatDateDDMMYY(date)}_${cycle}C.csv`;
}

/** Switch_File(DDMMYY).csv */
export function buildSwitchFilename(date: Date): string {
  return `Switch_File${formatDateDDMMYY(date)}.csv`;
}

/** UPI_Cbs(DDMMYY).csv */
export function buildCbsFilename(date: Date): string {
  return `UPI_Cbs${formatDateDDMMYY(date)}.csv`;
}

const ADJUSTMENT_MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/** UPI Adjustment Report_<BANK>_<DDMONYYYY>_DC<n>.csv */
export function buildAdjustmentFilename(
  date: Date,
  disputeCycle: DisputeCycle
): string {
  const day = String(date.getDate()).padStart(2, "0");
  const mon = ADJUSTMENT_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `UPI Adjustment Report_${NPCI_FILE_CONFIG.bank}_${day}${mon}${year}_DC${disputeCycle}.csv`;
}

/** DD-MM-YYYY HH:mm:ss for SWITCH from NPCI TIME (HHMMSS) on baseDate. */
export function formatSwitchDateFromNpciTime(
  baseDate: Date,
  timeHHMMSS: string
): string {
  const txnDate = new Date(baseDate);
  txnDate.setHours(
    Number(timeHHMMSS.slice(0, 2)),
    Number(timeHHMMSS.slice(2, 4)),
    Number(timeHHMMSS.slice(4, 6))
  );
  const day = String(txnDate.getDate()).padStart(2, "0");
  const month = String(txnDate.getMonth() + 1).padStart(2, "0");
  const year = txnDate.getFullYear();
  const hours = String(txnDate.getHours()).padStart(2, "0");
  const minutes = String(txnDate.getMinutes()).padStart(2, "0");
  const seconds = String(txnDate.getSeconds()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export function formatFullDateWithTimeSWITCH(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export function formatFullDateWithTimeCBS(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

export function formatFullDateWithTimeout(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Function to format date to 'YYYYMMDD' for filename
export function formatDateForFilename(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}${month}${day}`;
}
