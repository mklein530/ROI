"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
var yargs_1 = require("yargs");
var parse_util_1 = require("./parse-util");
var sort_util_1 = require("./sort-util");
var input = yargs_1.argv.input || process.env.npm_config_input || 'input.tsv';
var output = yargs_1.argv.output || process.env.npm_config_output || 'output.json';
// index of the current campaign, current adgroup, current ad, and current keyword
// kept track of so we know when and where to add new objects as we parse the file
var campaignIndex = -1, adGroupIndex = -1, adIndex = -1, keywordIndex = -1;
var campaigns = [];
var isFirstLine = true;
readline
    .createInterface({
    input: fs.createReadStream(input),
    terminal: false
})
    .on('line', function (line) {
    if (isFirstLine) {
        isFirstLine = false;
        return;
    }
    var fields = line.split('\t');
    if (parse_util_1.lineIsNewCampaign(fields)) {
        parse_util_1.startNewCampaign(campaigns, fields);
        // when adding a new campaign, we need to know where in the array of campaigns we are, and we need to reset the indices of the other arrays
        // since those will not have any values yet
        campaignIndex++;
        adGroupIndex = -1;
        adIndex = -1;
        keywordIndex = -1;
    }
    if (parse_util_1.lineIsNewAdGroup(fields)) {
        parse_util_1.startNewAdGroup(campaigns, fields, campaignIndex);
        // upon adding a new ad group, we need to know where in the array of adgroups we are, and we need to reset the indices of the other arrays
        // within the adgroup since those will not have any values yet
        adGroupIndex++;
        adIndex = -1;
        keywordIndex = -1;
    }
    if (parse_util_1.lineIsNewAd(fields)) {
        parse_util_1.startNewAd(campaigns, fields, campaignIndex, adGroupIndex);
        // upon adding a new ad, we need to know where we are in the array of ads, so we increment the index
        adIndex++;
    }
    if (parse_util_1.lineIsNewKeyword(fields)) {
        parse_util_1.startNewKeyword(campaigns, fields, campaignIndex, adGroupIndex);
        // upon adding a new keyword, we need to know where we are in the array of ads, so we increment the index
        keywordIndex++;
    }
})
    .on('close', function () {
    sort_util_1.sortCampaigns(campaigns);
    // write to the file
    fs.writeFileSync(output, JSON.stringify(campaigns), 'utf8');
    process.exit(0);
});
//# sourceMappingURL=index.js.map