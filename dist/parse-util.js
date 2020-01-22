"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
exports.lineIsNewCampaign = function (fields) { return fields[constants_1.default.CAMPAIGN_DAILY_BUDGET]; };
exports.lineIsNewAdGroup = function (fields) { return fields[constants_1.default.MAX_CPC]; };
exports.lineIsNewAd = function (fields) { return fields[constants_1.default.HEADLINE]; };
exports.lineIsNewKeyword = function (fields) { return fields[constants_1.default.KEYWORD]; };
exports.startNewCampaign = function (campaigns, fields) {
    campaigns.push({
        name: fields[constants_1.default.CAMPAIGN],
        daily_budget: fields[constants_1.default.CAMPAIGN_DAILY_BUDGET],
        status: fields[constants_1.default.CAMPAIGN_STATUS],
        ad_groups: []
    });
};
exports.startNewAdGroup = function (campaigns, fields, campaignIndex) {
    campaigns[campaignIndex].ad_groups.push({
        name: fields[constants_1.default.AD_GROUP],
        max_cpc: fields[constants_1.default.MAX_CPC],
        ads: [],
        keywords: [],
        status: fields[constants_1.default.AD_GROUP_STATUS]
    });
};
exports.startNewAd = function (campaigns, fields, campaignIndex, adGroupIndex) {
    campaigns[campaignIndex].ad_groups[adGroupIndex].ads.push({
        headline: fields[constants_1.default.HEADLINE],
        description_line1: fields[constants_1.default.DESCRIPTION_LINE_1],
        description_line2: fields[constants_1.default.DESCRIPTION_LINE_2],
        display_url: fields[constants_1.default.DISPLAY_URL],
        final_url: fields[constants_1.default.FINAL_URL],
        status: fields[constants_1.default.STATUS]
    });
};
exports.startNewKeyword = function (campaigns, fields, campaignIndex, adGroupIndex) {
    campaigns[campaignIndex].ad_groups[adGroupIndex].keywords.push({
        keyword: fields[constants_1.default.KEYWORD],
        type: fields[constants_1.default.CRITERION_TYPE],
        first_page_bid: fields[constants_1.default.FIRST_PAGE_BID],
        top_of_page_bid: parseInt(fields[constants_1.default.TOP_OF_PAGE_BID]) !== 0 ? fields[constants_1.default.TOP_OF_PAGE_BID] : undefined,
        status: fields[constants_1.default.STATUS]
    });
};
//# sourceMappingURL=parse-util.js.map