"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAdEntity_1 = require("./BaseAdEntity");
var AdKeyword = /** @class */ (function (_super) {
    __extends(AdKeyword, _super);
    function AdKeyword() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AdKeyword;
}(BaseAdEntity_1.default));
exports.default = AdKeyword;
//# sourceMappingURL=AdKeyword.js.map