"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sortAlphabetically(object1, object2, field) {
    return object1[field].localeCompare(object2[field], 'en', { sensitivity: 'base' });
}
exports.sortAlphabetically = sortAlphabetically;
function sortCampaigns(campaigns) {
    campaigns.sort(function (a, b) { return sortAlphabetically(a, b, 'name'); });
    campaigns.forEach(function (campaign) {
        campaign.ad_groups.sort(function (a, b) { return sortAlphabetically(a, b, 'name'); });
        campaign.ad_groups.forEach(function (adGroup) {
            adGroup.ads.sort(function (a, b) {
                var result = sortAlphabetically(a, b, 'headline');
                if (result === 0) {
                    result = sortAlphabetically(a, b, 'description_line1');
                }
                return result !== 0 ? result : sortAlphabetically(a, b, 'description_line2');
            });
            adGroup.keywords.sort(function (a, b) {
                var result = sortAlphabetically(a, b, 'keyword');
                return result !== 0 ? result : sortAlphabetically(a, b, 'type');
            });
        });
    });
}
exports.sortCampaigns = sortCampaigns;
//# sourceMappingURL=util.js.map