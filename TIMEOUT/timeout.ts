import { faker } from "@faker-js/faker";
import {
  beneficiaryTypes,
  generateRandomTime,
  generateRandomTimeHHMMSS,
  MCC_CODE,
  merchantVPAs,
} from "../Constants/constant";
import { TIMEOUT } from "../Models/TIMEOUT.model";
//NPCI

export function* generateTimeoutData(
  count: number,
  date: string,
  commonData
): IterableIterator<TIMEOUT> {
  for (let i = 0; i < count; i++) {
    const { TXNID, AMOUNT, NPCI_CODE, PAYEE_VPA, PAYER_VPA, RRN } =
      commonData[i];
      if(NPCI_CODE[0]=='RB' && i%5==0){
        yield {
            "TXN UID": `${faker.string.numeric(8)}`,
            "TXN Type": "U2",
            "TXN Date": date,
            "TXN Time": generateRandomTimeHHMMSS(),
            "Settlement Date": date,
            "Response Code": "RB",
            RRN: RRN,
            STAN: `${faker.string.numeric(12)}`,
            Remitter: faker.helpers.arrayElement(beneficiaryTypes),
            Beneficiary: faker.helpers.arrayElement(beneficiaryTypes),
            "Beneficiary Mobile  /Account/Aadhar Number": `${faker.string.numeric(
              19
            )}`,
            "Remitter Number": `${faker.string.numeric(19)}`,
            Amount: (AMOUNT * 100).toFixed(0),
            UTXNID: TXNID,
            PayerPSP: faker.helpers.arrayElement(beneficiaryTypes),
            PayeePSP: faker.helpers.arrayElement(beneficiaryTypes),
          };
        }
      }  
}
