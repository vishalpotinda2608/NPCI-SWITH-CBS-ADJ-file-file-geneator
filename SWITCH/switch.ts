import { faker } from "@faker-js/faker";
import { SWITCH_TXN } from "../Models/SWITCH_TXN.model";
import {
  formatSwitchDateFromNpciTime,
  payerVpas,
} from "../Constants/constant";

const SWITCH_NULL = "\\N";

const SWITCH_AMOUNTS = [
  100, 500, 600, 700, 800, 960, 1000, 1123, 1500, 2000,
];

const FAILURE_RESP_CODES = ["U30", "U09", "U31", "U67", "U78"];

function hexId(length: number): string {
  return faker.string.hexadecimal({ length, casing: "lower" }).replace("0x", "");
}

function generateSwitchPayerUpiId(): string {
  const handle = faker.helpers.arrayElement(payerVpas);
  const phone = faker.string.numeric(10);
  const suffix =
    Math.random() > 0.75
      ? `-${faker.number.int({ min: 1, max: 9 })}`
      : "";
  return `${phone}${suffix}${handle}`;
}

function switchRespCode(status: string): string {
  if (status === "FAILURE") {
    return faker.helpers.arrayElement(FAILURE_RESP_CODES);
  }
  return SWITCH_NULL;
}

function formatSwitchAmount(): string {
  return faker.helpers.arrayElement(SWITCH_AMOUNTS).toFixed(2);
}

// SWITCH
export function* generateSwitchData(
  count: number,
  baseDate: Date,
  commonData
): IterableIterator<SWITCH_TXN> {
  for (let i = 0; i < count; i++) {
    const { TXNID, NPCI_CODE, PAYEE_VPA, RRN, MCC, TIME } = commonData[i];
    const status = NPCI_CODE[1];
    const payerUpiId = generateSwitchPayerUpiId();

    yield {
      "Date of txn": TIME
        ? formatSwitchDateFromNpciTime(baseDate, TIME)
        : formatSwitchDateFromNpciTime(baseDate, "103000"),
      Amount: formatSwitchAmount(),
      "Resp Code": switchRespCode(status),
      Status: status,
      RRN: RRN,
      "Ext id": hexId(32),
      "Payee Vpa": PAYEE_VPA,
      "Txn Note": "payment",
      "Payer UPI ID": payerUpiId,
      PayerName: SWITCH_NULL,
      "Txn Id": TXNID,
      MCC: MCC,
    };
  }
}
