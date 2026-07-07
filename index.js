"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var csv_writer_1 = require("csv-writer");
var faker_1 = require("@faker-js/faker");
var npci_1 = require("./NPCI/npci");
var constant_1 = require("./Constants/constant");
var adjustment_1 = require("./ADJUSTMENT/adjustment");
var timeout_1 = require("./TIMEOUT/timeout");
var clickhouse_1 = require("./db/clickhouse");
var ROW_DATA = 50000;
var ensureDirectoryExists = function (filePath) {
    var directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};
function writeDataToCSV(filename, headers, dataGenerator) {
    return __awaiter(this, void 0, void 0, function () {
        var csvWriter, batchSize, batch, dataArray, _i, dataArray_1, record, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ensureDirectoryExists(filename);
                    csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                        path: filename,
                        header: headers,
                    });
                    batchSize = 100000;
                    batch = [];
                    dataArray = Array.from(dataGenerator());
                    _i = 0, dataArray_1 = dataArray;
                    _a.label = 1;
                case 1:
                    if (!(_i < dataArray_1.length)) return [3 /*break*/, 7];
                    record = dataArray_1[_i];
                    batch.push(record);
                    if (!(batch.length >= batchSize)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, csvWriter.writeRecords(batch)];
                case 3:
                    _a.sent();
                    console.log("Written ".concat(batch.length, " records to ").concat(filename));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error writing records to ".concat(filename, ":"), error_1);
                    return [3 /*break*/, 5];
                case 5:
                    batch = [];
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7:
                    if (!(batch.length > 0)) return [3 /*break*/, 11];
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, csvWriter.writeRecords(batch)];
                case 9:
                    _a.sent();
                    console.log("Written final ".concat(batch.length, " records to ").concat(filename));
                    return [3 /*break*/, 11];
                case 10:
                    error_2 = _a.sent();
                    console.error("Error writing final records to ".concat(filename, ":"), error_2);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
var generateCommonData = function (date, count, cycleWindow) {
    return Array.from({ length: count }, function () {
        var merchant = faker_1.faker.helpers.arrayElement(constant_1.merchantCredentials);
        return {
            TXNID: faker_1.faker.database.mongodbObjectId(),
            AMOUNT: faker_1.faker.finance.amount(),
            NPCI_CODE: faker_1.faker.helpers.arrayElement([
                ["00", "SUCCESS"],
                ["00", "SUCCESS"],
                ["0", "SUCCESS"],
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
            PAYER_VPA: "".concat(faker_1.faker.internet.email().split("@")[0]).concat(faker_1.faker.helpers.arrayElement(constant_1.payerVpas)),
            RRN: faker_1.faker.string.numeric(12),
            TIME: cycleWindow
                ? (0, constant_1.generateTimeInCycle)(date, cycleWindow)
                : (0, constant_1.generateTimeInCycle)(date, constant_1.AUTH_CYCLE_WINDOWS[5]),
        };
    });
};
var generateDataForDateRange = function (startDate, numberOfDays, monthName) {
    var endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + numberOfDays - 1);
    var _loop_1 = function (date) {
        var currentDate = new Date(date); // Clone the current date
        // Format dates for each file
        var npciFormattedDate = (0, constant_1.formatDate)(currentDate);
        var cbsFormattedDate = (0, constant_1.formatFullDateWithTimeCBS)(currentDate);
        var cbsFormatteTimeoutFile = (0, constant_1.formatFullDateWithTimeout)(currentDate);
        var filenameDate = (0, constant_1.formatDateForFilename)(currentDate);
        var allCycleCommonData = [];
        var _loop_2 = function (cycle) {
            var cycleCommonData = generateCommonData(currentDate, ROW_DATA, constant_1.AUTH_CYCLE_WINDOWS[cycle]);
            allCycleCommonData.push.apply(allCycleCommonData, cycleCommonData);
            writeDataToCSV("".concat(monthName, "/").concat(filenameDate, "/NPCI_DATA/").concat((0, constant_1.buildNpciFilename)(currentDate, { cycle: cycle })), constant_1.npciHeaders, function () { return (0, npci_1.generateNpciData)(ROW_DATA, npciFormattedDate, cycleCommonData); });
        };
        for (var _i = 0, AUTH_CYCLES_1 = constant_1.AUTH_CYCLES; _i < AUTH_CYCLES_1.length; _i++) {
            var cycle = AUTH_CYCLES_1[_i];
            _loop_2(cycle);
        }
        writeDataToCSV("".concat(monthName, "/").concat(filenameDate, "/SWITCH_DATA/").concat((0, constant_1.buildSwitchFilename)(currentDate)), constant_1.switchHeaders, function () {
            return (0, switch_1.generateSwitchData)(allCycleCommonData.length, currentDate, allCycleCommonData);
        });
        writeDataToCSV("".concat(monthName, "/").concat(filenameDate, "/CBS_DATA/").concat((0, constant_1.buildCbsFilename)(currentDate)), constant_1.cbsHeaders, function () {
            return (0, cbs_1.generateCbsData)(allCycleCommonData.length, currentDate, allCycleCommonData);
        });
        var _loop_3 = function (dc) {
            var disputeCommonData = generateCommonData(currentDate, ROW_DATA, constant_1.DISPUTE_CYCLE_WINDOWS[dc]);
            writeDataToCSV("".concat(monthName, "/").concat(filenameDate, "/ADJUSTMENT/").concat((0, constant_1.buildAdjustmentFilename)(currentDate, dc)), constant_1.adjustHeaders, function () {
                return (0, adjustment_1.generateAdjustmentData)(ROW_DATA, cbsFormattedDate, disputeCommonData);
            });
        };
        for (var _a = 0, _b = [1, 2]; _a < _b.length; _a++) {
            var dc = _b[_a];
            _loop_3(dc);
        }
        writeDataToCSV("".concat(monthName, "/").concat(filenameDate, "/TIMEOUT_DATA/UPI Time Out Cases Report_SBL_").concat(cbsFormatteTimeoutFile, ".csv"), constant_1.timeoutHeaders, function () { return (0, timeout_1.generateTimeoutData)(ROW_DATA, cbsFormattedDate, allCycleCommonData); });
    };
    for (var date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        _loop_1(date);
    }
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var merchants, startDate, numberOfDays, monthName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, clickhouse_1.fetchMerchantCredentials)()];
                case 1:
                    merchants = _a.sent();
                    if (merchants.length === 0) {
                        throw new Error("No merchant VPAs found in entity_credentials_uat. Check ClickHouse connection and table data.");
                    }
                    (0, constant_1.setMerchantCredentials)(merchants);
                    console.log("Loaded ".concat(merchants.length, " merchant VPAs from ClickHouse"));
                    startDate = new Date(2026, 5, 6);
                    numberOfDays = 1;
                    monthName = "JUNE";
                    generateDataForDateRange(startDate, numberOfDays, monthName);
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (error) {
    console.error("Failed to generate fake data:", error);
    process.exitCode = 1;
})
    .finally(function () { return (0, clickhouse_1.closeClickhouseClient)(); });
