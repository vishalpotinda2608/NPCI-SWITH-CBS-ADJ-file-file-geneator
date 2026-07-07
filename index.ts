import * as fs from "fs";
import * as path from "path";
import { createObjectCsvWriter } from "csv-writer";
import { faker } from "@faker-js/faker";
import { generateNpciData } from "./NPCI/npci";
import { generateSwitchData } from "./SWITCH/switch";
import { generateCbsData } from "./CBS/cbs";
import {
  adjustHeaders,
  AUTH_CYCLES,
  AUTH_CYCLE_WINDOWS,
  AuthCycle,
  buildAdjustmentFilename,
  buildCbsFilename,
  buildNpciFilename,
  buildSwitchFilename,
  cbsHeaders,
  CycleWindow,
  DISPUTE_CYCLE_WINDOWS,
  DisputeCycle,
  formatDate,
  formatDateForFilename,
  formatFullDateWithTimeCBS,
  formatFullDateWithTimeout,
  generateTimeInCycle,
  merchantCredentials,
  npciHeaders,
  payerVpas,
  setMerchantCredentials,
  switchHeaders,
  timeoutHeaders,
} from "./Constants/constant";
import { generateAdjustmentData } from "./ADJUSTMENT/adjustment";
import { generateTimeoutData } from "./TIMEOUT/timeout";
import {
  closeClickhouseClient,
  fetchMerchantCredentials,
} from "./db/clickhouse";

const ROW_DATA = 5000;

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
  const batchSize = 10000;
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

const generateCommonData = (
  date: Date,
  count: number,
  cycleWindow?: CycleWindow
) => {
  return Array.from({ length: count }, () => {
    const merchant = faker.helpers.arrayElement(merchantCredentials);
    return {
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
      PAYEE_VPA: merchant.vpa,
      MCC: merchant.mcc,
      PAYER_VPA: `${
        faker.internet.email().split("@")[0]
      }${faker.helpers.arrayElement(payerVpas)}`,
      RRN: faker.string.numeric(12),
      TIME: cycleWindow
        ? generateTimeInCycle(date, cycleWindow)
        : generateTimeInCycle(date, AUTH_CYCLE_WINDOWS[5]),
    };
  });
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
    const npciFormattedDate = formatDate(currentDate);
    const cbsFormattedDate = formatFullDateWithTimeCBS(currentDate);
    const cbsFormatteTimeoutFile = formatFullDateWithTimeout(currentDate);
    const filenameDate = formatDateForFilename(currentDate);

    const allCycleCommonData: ReturnType<typeof generateCommonData> = [];

    for (const cycle of AUTH_CYCLES) {
      const cycleCommonData = generateCommonData(
        currentDate,
        ROW_DATA,
        AUTH_CYCLE_WINDOWS[cycle as AuthCycle]
      );
      allCycleCommonData.push(...cycleCommonData);

      writeDataToCSV(
        `${monthName}/${filenameDate}/NPCI_DATA/${buildNpciFilename(currentDate, { cycle })}`,
        npciHeaders,
        () => generateNpciData(ROW_DATA, npciFormattedDate, cycleCommonData)
      );
    }

    writeDataToCSV(
      `${monthName}/${filenameDate}/SWITCH_DATA/${buildSwitchFilename(currentDate)}`,
      switchHeaders,
      () =>
        generateSwitchData(
          allCycleCommonData.length,
          currentDate,
          allCycleCommonData
        )
    );
    writeDataToCSV(
      `${monthName}/${filenameDate}/CBS_DATA/${buildCbsFilename(currentDate)}`,
      cbsHeaders,
      () =>
        generateCbsData(
          allCycleCommonData.length,
          currentDate,
          allCycleCommonData
        )
    );

    for (const dc of [1, 2] as DisputeCycle[]) {
      const disputeCommonData = generateCommonData(
        currentDate,
        ROW_DATA,
        DISPUTE_CYCLE_WINDOWS[dc]
      );
      writeDataToCSV(
        `${monthName}/${filenameDate}/ADJUSTMENT/${buildAdjustmentFilename(currentDate, dc)}`,
        adjustHeaders,
        () =>
          generateAdjustmentData(
            ROW_DATA,
            cbsFormattedDate,
            disputeCommonData
          )
      );
    }

    writeDataToCSV(
      `${monthName}/${filenameDate}/TIMEOUT_DATA/UPI Time Out Cases Report_SBL_${cbsFormatteTimeoutFile}.csv`,
      timeoutHeaders,
      () => generateTimeoutData(ROW_DATA, cbsFormattedDate, allCycleCommonData)
    );
  }
};

async function main() {
  const merchants = await fetchMerchantCredentials();
  if (merchants.length === 0) {
    throw new Error(
      "No merchant VPAs found in entity_credentials_uat. Check ClickHouse connection and table data."
    );
  }
  setMerchantCredentials(merchants);
  console.log(`Loaded ${merchants.length} merchant VPAs from ClickHouse`);

  const startDate = new Date(2026, 5, 5); // 7 - Jun
  const numberOfDays = 1;
  const monthName = "JUNE";
  generateDataForDateRange(startDate, numberOfDays, monthName);
}

main()
  .catch((error) => {
    console.error("Failed to generate fake data:", error);
    process.exitCode = 1;
  })
  .finally(() => closeClickhouseClient());




