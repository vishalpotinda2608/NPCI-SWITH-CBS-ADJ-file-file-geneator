"use strict";
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
exports.generateSwitchData = generateSwitchData;
var faker_1 = require("@faker-js/faker");
var constant_1 = require("../Constants/constant");
var SWITCH_NULL = "\\N";
var SWITCH_AMOUNTS = [
    100, 500, 600, 700, 800, 960, 1000, 1123, 1500, 2000,
];
var FAILURE_RESP_CODES = ["U30", "U09", "U31", "U67", "U78"];
function hexId(length) {
    return faker_1.faker.string.hexadecimal({ length: length, casing: "lower" }).replace("0x", "");
}
function generateSwitchPayerUpiId() {
    var handle = faker_1.faker.helpers.arrayElement(constant_1.payerVpas);
    var phone = faker_1.faker.string.numeric(10);
    var suffix = Math.random() > 0.75
        ? "-".concat(faker_1.faker.number.int({ min: 1, max: 9 }))
        : "";
    return "".concat(phone).concat(suffix).concat(handle);
}
function switchRespCode(status) {
    if (status === "FAILURE") {
        return faker_1.faker.helpers.arrayElement(FAILURE_RESP_CODES);
    }
    return SWITCH_NULL;
}
function formatSwitchAmount() {
    return faker_1.faker.helpers.arrayElement(SWITCH_AMOUNTS).toFixed(2);
}
// SWITCH
function generateSwitchData(count, baseDate, commonData) {
    var i, _a, TXNID, NPCI_CODE, PAYEE_VPA, RRN, MCC, TIME, status_1, payerUpiId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                batchId = "";
                batchCount = 0;
                BATCH_SIZE = 10;
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < count)) return [3 /*break*/, 4];
                _a = commonData[i], TXNID = _a.TXNID, NPCI_CODE = _a.NPCI_CODE, PAYEE_VPA = _a.PAYEE_VPA, RRN = _a.RRN, MCC = _a.MCC, TIME = _a.TIME;
                status_1 = NPCI_CODE[1];
                payerUpiId = generateSwitchPayerUpiId();
                return [4 /*yield*/, {
                        "Date of txn": TIME
                            ? (0, constant_1.formatSwitchDateFromNpciTime)(baseDate, TIME)
                            : (0, constant_1.formatSwitchDateFromNpciTime)(baseDate, "103000"),
                        Amount: formatSwitchAmount(),
                        "Resp Code": switchRespCode(status_1),
                        Status: status_1,
                        RRN: RRN,
                        "Ext id": hexId(32),
                        "Payee Vpa": PAYEE_VPA,
                        "Txn Note": "payment",
                        "Payer UPI ID": payerUpiId,
                        PayerName: SWITCH_NULL,
                        "Txn Id": TXNID,
                        MCC: MCC,
                    }];
            case 2:
                _b.sent();
                if (batchCount == BATCH_SIZE) {
                    batchId = BATCH_ID;
                    batchCount = 0;
                }
                else {
                    batchCount += 1;
                }
                _b.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
