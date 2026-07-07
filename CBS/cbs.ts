import { faker } from '@faker-js/faker';
import { CBS_TXN } from '../Models/CBS_TXN.model';
import {
    CBS_CR_ACCT_NO,
    CBS_DR_ACCT_NO,
    CBS_SOL_ID,
    formatCbsTranDate,
    SUCCESS_NPCI_CODES,
} from '../Constants/constant';

function generateTranId(): string {
    return `S${faker.string.numeric(8)}`;
}

function formatCbsAmount(amount: string): string {
    return parseFloat(amount).toFixed(4);
}

// CBS
export function* generateCbsData(count: number, date: Date, commonData): IterableIterator<CBS_TXN> {
    const tranDate = formatCbsTranDate(date);

    for (let i = 0; i < count; i++) {
        const { TXNID, AMOUNT, RRN, NPCI_CODE } = commonData[i];
        if ((SUCCESS_NPCI_CODES as readonly string[]).includes(NPCI_CODE[0])) {
            yield {
                TRAN_ID: generateTranId(),
                TRAN_DATE: tranDate,
                TRAN_AMT: formatCbsAmount(AMOUNT),
                VALUE_DATE: tranDate,
                CR_SOL_ID: CBS_SOL_ID,
                DR_SOL_ID: CBS_SOL_ID,
                CR_ACCT_NO: CBS_CR_ACCT_NO,
                DR_ACCT_NO: CBS_DR_ACCT_NO,
                RRN: RRN,
                UPI_TXN_ID: TXNID,
            };
        }
    }
}
