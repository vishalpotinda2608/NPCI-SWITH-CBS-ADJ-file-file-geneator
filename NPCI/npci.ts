import { faker } from '@faker-js/faker';
import { NPCI_TXN } from '../Models/NPCI_TXN.model';
import { beneficiaryTypes, generateRandomTime, MCC_CODE, merchantVPAs } from '../Constants/constant';
//NPCI

export function* generateNpciData(count: number, date: string, commonData): IterableIterator<NPCI_TXN> {
    for (let i = 0; i < count; i++) {
        const { TXNID, AMOUNT, NPCI_CODE, PAYEE_VPA, PAYER_VPA } = commonData[i];
        yield {
            NPCI_TXN_TYPE: 'TX',
            NPCI_STATUS: 'U2',
            TXNID: TXNID,
            RRN: faker.string.numeric(12),
            NPCI_CODE: NPCI_CODE[0],
            DATE: date,
            TIME: generateRandomTime(),
            AMOUNT: (AMOUNT * 100).toFixed(0),
            UMN: '',
            MAPID: '1',
            INITMODE: '01',
            PURPOSECODE: '',
            PAYERCODE: faker.helpers.arrayElement(beneficiaryTypes),
            PAYERMCC: '0',
            PAYER_VPA: PAYER_VPA,
            PAYEECODE: faker.helpers.arrayElement(beneficiaryTypes),
            PAYEEMCC: MCC_CODE[PAYEE_VPA.split('.')[0]],
            PAYEE_VPA: PAYEE_VPA,
            REMCODE: faker.helpers.arrayElement(beneficiaryTypes),
            REM_IFSC_CODE: `${faker.helpers.arrayElement(beneficiaryTypes)}${faker.string.numeric(7)}`,
            REM_ACC_TYPE: `01`,
            REM_ACC_NUMBER: `${faker.string.alphanumeric(10)}`,
            BENCODE: 'COB',
            BEN_IFSC_CODE: `COB${faker.string.numeric(7)}`,
            BEN_ACC_TYPE: '02',
            BEN_ACC_NUMBER: `${faker.string.alphanumeric(10)}`,
            LRN: '',
            RE1: '',
            RE2: '',
            RE3: '',
        };
    }
}