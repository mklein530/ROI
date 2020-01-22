"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
exports.sortAlphabetically = function (object1, object2, field) {
    return object1[field].localeCompare(object2[field], 'en', { sensitivity: 'base' });
};
exports.sortCampaigns = function (campaigns) {
    campaigns.sort(function (a, b) { return exports.sortAlphabetically(a, b, 'name'); });
    campaigns.forEach(function (campaign) {
        campaign.ad_groups.sort(function (a, b) { return exports.sortAlphabetically(a, b, 'name'); });
        campaign.ad_groups.forEach(function (adGroup) {
            adGroup.ads.sort(function (a, b) {
                var result = exports.sortAlphabetically(a, b, 'headline');
                if (result === 0) {
                    result = exports.sortAlphabetically(a, b, 'description_line1');
                }
                return result !== 0 ? result : exports.sortAlphabetically(a, b, 'description_line2');
            });
            adGroup.keywords.sort(function (a, b) {
                var result = exports.sortAlphabetically(a, b, 'keyword');
                return result !== 0 ? result : exports.sortAlphabetically(a, b, 'type');
            });
        });
    });
};
exports.campaignField = function (fields) { return fields[constants_1.default.CAMPAIGN_DAILY_BUDGET]; };
exports.adGroupField = function (fields) { return fields[constants_1.default.MAX_CPC]; };
exports.adField = function (fields) { return fields[constants_1.default.HEADLINE]; };
exports.keywordField = function (fields) { return fields[constants_1.default.KEYWORD]; };
//# sourceMappingURL=util.js.map