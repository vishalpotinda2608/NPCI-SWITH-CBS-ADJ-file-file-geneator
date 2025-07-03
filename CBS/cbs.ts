import { faker } from "@faker-js/faker";
import { CBS_TXN } from "../Models/CBS_TXN.model";

// CBS
export function* generateCbsData(
  count: number,
  date: string,
  commonData
): IterableIterator<CBS_TXN> {
  let batchId = "";
  let batchCount = 0;
  let BATCH_SIZE = 10;
  let batchTotalSum = 0;
  for (let i = 0; i < count; i++) {
    const { TXNID, AMOUNT, RRN, NPCI_CODE, BATCH_ID } = commonData[i];

    if (i === 0) {
      batchId = BATCH_ID;
    }
    if (
      (NPCI_CODE[0] == "RB" && NPCI_CODE[1] == "DEEMED") ||
      (NPCI_CODE[0] == "00" && NPCI_CODE[1] == "SUCCESS")
    ) {
      if (batchCount === BATCH_SIZE) {
        yield {
          A: "S75960940",
          DATE: date,
          AMOUNT: batchTotalSum.toFixed(2).toString(),
          B: date,
          C: "",
          D: "2001",
          E: "2650",
          F: "20012207843065",
          G: "27111001182650",
          RRN: RRN,
          H: date,
          TXNID: batchId,
        };
      }

      if (batchCount === BATCH_SIZE) {
        batchId = BATCH_ID;
        batchCount = 0;
        batchTotalSum = 0;
      } else {
        batchCount += 1;
        batchTotalSum += parseFloat(AMOUNT);
      }
    }
  }
}
