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
var readline = require('readline').promises;
var _a = require('process'), input = _a.stdin, output = _a.stdout;
function normalizeEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, domain, normalized;
        return __generator(this, function (_b) {
            _a = email.toLowerCase().split('@'), username = _a[0], domain = _a[1];
            if (!username || !domain)
                return [2 /*return*/, ''];
            normalized = username.replace(/\./g, '').split('+')[0];
            return [2 /*return*/, "".concat(normalized, "@").concat(domain)];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var rl, input_1, emails, unique, _i, emails_1, email, normalized;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rl = readline.createInterface({ input: input, output: output });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 7, 8]);
                    return [4 /*yield*/, rl.question('Введите email-адреса через запятую: ')];
                case 2:
                    input_1 = _a.sent();
                    emails = input_1.split(',').map(function (e) { return e.trim(); });
                    unique = new Set();
                    _i = 0, emails_1 = emails;
                    _a.label = 3;
                case 3:
                    if (!(_i < emails_1.length)) return [3 /*break*/, 6];
                    email = emails_1[_i];
                    return [4 /*yield*/, normalizeEmail(email)];
                case 4:
                    normalized = _a.sent();
                    if (normalized)
                        unique.add(normalized);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log('\nУникальные адреса после нормализации:');
                    unique.forEach(function (email) { return console.log("- ".concat(email)); });
                    console.log("\n\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u0430\u0434\u0440\u0435\u0441\u043E\u0432: ".concat(unique.size));
                    return [3 /*break*/, 8];
                case 7:
                    rl.close();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
