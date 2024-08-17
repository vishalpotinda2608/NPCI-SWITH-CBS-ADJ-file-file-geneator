import { faker } from '@faker-js/faker';
import { CBS_TXN } from '../Models/CBS_TXN.model';

// CBS
export function* generateCbsData(count: number, date: string,commonData): IterableIterator<CBS_TXN> {
    for (let i = 0; i < count; i++) {
        const { TXNID, AMOUNT,RRN,NPCI_CODE} = commonData[i];
        if((NPCI_CODE[0]=='RB' && NPCI_CODE[1]=='DEEMED') || (NPCI_CODE[0]=='00' && NPCI_CODE[1]=='SUCCESS')){
            yield {
                A: 'S75960940',
                DATE: date,
                AMOUNT: AMOUNT,
                B: date,
                C: '',
                D: '2001',
                E: '2650',
                F: '20012207843065',
                G: '27111001182650',
                RRN: RRN,
                H: date,
                TXNID: TXNID,
            };
        }
    }
}