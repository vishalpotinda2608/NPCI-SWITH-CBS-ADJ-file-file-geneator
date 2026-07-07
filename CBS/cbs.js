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
exports.generateCbsData = generateCbsData;
var faker_1 = require("@faker-js/faker");
var constant_1 = require("../Constants/constant");
function generateTranId() {
    return "S".concat(faker_1.faker.string.numeric(8));
}
function formatCbsAmount(amount) {
    return parseFloat(amount).toFixed(4);
}
// CBS
function generateCbsData(count, date, commonData) {
    var tranDate, i, _a, TXNID, AMOUNT, RRN, NPCI_CODE;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tranDate = (0, constant_1.formatCbsTranDate)(date);
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < count)) return [3 /*break*/, 4];
                _a = commonData[i], TXNID = _a.TXNID, AMOUNT = _a.AMOUNT, RRN = _a.RRN, NPCI_CODE = _a.NPCI_CODE;
                if (!constant_1.SUCCESS_NPCI_CODES.includes(NPCI_CODE[0])) return [3 /*break*/, 3];
                return [4 /*yield*/, {
                        TRAN_ID: generateTranId(),
                        TRAN_DATE: tranDate,
                        TRAN_AMT: formatCbsAmount(AMOUNT),
                        VALUE_DATE: tranDate,
                        CR_SOL_ID: constant_1.CBS_SOL_ID,
                        DR_SOL_ID: constant_1.CBS_SOL_ID,
                        CR_ACCT_NO: constant_1.CBS_CR_ACCT_NO,
                        DR_ACCT_NO: constant_1.CBS_DR_ACCT_NO,
                        RRN: RRN,
                        UPI_TXN_ID: TXNID,
                    }];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
