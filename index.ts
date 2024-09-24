import * as fs from "fs";
import * as path from "path";
import { createObjectCsvWriter } from "csv-writer";
import { faker } from "@faker-js/faker";
import { generateNpciData } from "./NPCI/npci";
import { generateSwitchData } from "./SWITCH/switch";
import { generateCbsData } from "./CBS/cbs";
import {
  adjustHeaders,
  cbsHeaders,
  formatDate,
  formatDateForFilename,
  formatDateToDDMMYYYYHHMMSS,
  formatFullDateWithTimeCBS,
  formatFullDateWithTimeout,
  formatFullDateWithTimeSWITCH,
  merchantVPAs,
  npciHeaders,
  payerVpas,
  switchHeaders,
  timeoutHeaders,
} from "./Constants/constant";
import { generateAdjustmentData } from "./ADJUSTMENT/adjustment";
import { generateTimeoutData } from "./TIMEOUT/timeout";

const ROW_DATA = 900000;

const ensureDirectoryExists = (filePath: string) => {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

async function writeDataToCSV(
  filename: string,
  headers: any[],
  dataGenerator: () => IterableIterator<any>
) {
  ensureDirectoryExists(filename);

  const csvWriter = createObjectCsvWriter({
    path: filename,
    header: headers,
  });
  const batchSize = 500000;
  let batch: any[] = [];
  const dataArray = Array.from(dataGenerator());
  for (let record of dataArray) {
    batch.push(record);
    if (batch.length >= batchSize) {
      try {
        await csvWriter.writeRecords(batch);
        console.log(`Written ${batch.length} records to ${filename}`);
      } catch (error) {
        console.error(`Error writing records to ${filename}:`, error);
      }
      batch = [];
    }
  }

  if (batch.length > 0) {
    try {
      await csvWriter.writeRecords(batch);
      console.log(`Written final ${batch.length} records to ${filename}`);
    } catch (error) {
      console.error(`Error writing final records to ${filename}:`, error);
    }
  }
}

// Generate common TXNID and AMOUNT once and reuse
const generateCommonData = (date, count) => {
  return Array.from({ length: count }, () => ({
    TXNID: faker.database.mongodbObjectId(),
    AMOUNT: faker.finance.amount(),
    NPCI_CODE: faker.helpers.arrayElement([
      ["00", "SUCCESS"],
      ["00", "SUCCESS"],
      ["RB", "DEEMED"],
      ["Z9", "FAILURE"],
      ["00", "FAILURE"],
      ["Z7", "FAILURE"],
      ["Z7", "SUCCESS"],
      ["00", "SUCCESS"],
      ["00", "SUCCESS"],
    ]),
    PAYEE_VPA: faker.helpers.arrayElement(merchantVPAs),
    PAYER_VPA: `${
      faker.internet.email().split("@")[0]
    }${faker.helpers.arrayElement(payerVpas)}`,
    RRN: faker.string.numeric(12),
  }));
};

const generateDataForDateRange = (startDate, numberOfDays, monthName) => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + numberOfDays - 1);

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const currentDate = new Date(date); // Clone the current date

    // Format dates for each file
    const formattedDate = formatDateToDDMMYYYYHHMMSS(currentDate);
    const npciFormattedDate = formatDate(currentDate);
    const switchFormattedDate = formatFullDateWithTimeSWITCH(currentDate);
    const cbsFormattedDate = formatFullDateWithTimeCBS(currentDate);
    const cbsFormatteTimeoutFile = formatFullDateWithTimeout(currentDate);
    const filenameDate = formatDateForFilename(currentDate);

    // Generate data for the current date

        // Generate data for the current date
        const commonData = generateCommonData(currentDate, ROW_DATA);

        // Write data to CSV files
        writeDataToCSV(`${monthName}/${filenameDate}/NPCI_DATA/UPIMERCHANTRAWDATAACQSBM${npciFormattedDate}.csv`, npciHeaders, () => generateNpciData(ROW_DATA, npciFormattedDate, commonData));
        writeDataToCSV(`${monthName}/${filenameDate}/SWITCH_DATA/SWITCH${npciFormattedDate}.csv`, switchHeaders, () => generateSwitchData(ROW_DATA, switchFormattedDate, commonData));
        writeDataToCSV(`${monthName}/${filenameDate}/CBS_DATA/CBS${npciFormattedDate}.csv`, cbsHeaders, () => generateCbsData(ROW_DATA, formattedDate, commonData));
        writeDataToCSV(`${monthName}/${filenameDate}/ADJUMENT/ADJUSTMENT${npciFormattedDate}.csv`, adjustHeaders, () => generateAdjustmentData(ROW_DATA, cbsFormattedDate, commonData));
        writeDataToCSV(`${monthName}/${filenameDate}/TIMEOUT_DATA/UPI Time Out Cases Report_SBL_${cbsFormatteTimeoutFile}.csv`, timeoutHeaders, () => generateTimeoutData(ROW_DATA, cbsFormattedDate, commonData));
    }
};

// Usage example
const startDate = new Date(2024, 6, 1); // 7 - Aug
const numberOfDays=15; // Number of days to generate data for
const monthName='JULY'
generateDataForDateRange(startDate, numberOfDays,monthName);



