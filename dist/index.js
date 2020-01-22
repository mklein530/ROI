"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var yargs_1 = require("yargs");
var util_1 = require("./util");
var input = yargs_1.argv.input || process.env.npm_config_input || 'input.tsv';
var output = yargs_1.argv.output || process.env.npm_config_output || 'output.json';
var data = fs.readFileSync(input, 'utf8');
// if the line has a value at the following indices, we know it is for a new campaign/adgroup/ad/keyword
var CAMPAIGN_INDEX = 1;
var AD_GROUP_INDEX = 3;
var AD_INDEX = 4;
var KEYWORD_INDEX = 9;
var lines = data.split(/\r?\n/);
var columnNames = lines.shift().split('\t');
var campaignIndex = -1, adGroupIndex = -1, adIndex = -1, keywordIndex = -1;
var campaigns = [];
lines.forEach(function (line) {
    var fields = line.split('\t');
    if (fields[CAMPAIGN_INDEX]) {
        campaigns.push({ name: fields[0], daily_budget: fields[1], status: fields[13], ad_groups: [] });
        campaignIndex++;
        adGroupIndex = -1;
        adIndex = -1;
        keywordIndex = -1;
    }
    if (fields[AD_GROUP_INDEX]) {
        campaigns[campaignIndex].ad_groups.push({ name: fields[2], max_cpc: fields[3], ads: [], keywords: [], status: fields[14] });
        adGroupIndex++;
        adIndex = -1;
        keywordIndex = -1;
    }
    if (fields[AD_INDEX]) {
        campaigns[campaignIndex].ad_groups[adGroupIndex].ads.push({
            headline: fields[4],
            description_line1: fields[5],
            description_line2: fields[6],
            display_url: fields[7],
            final_url: fields[8],
            status: fields[15]
        });
        adIndex++;
    }
    if (fields[KEYWORD_INDEX]) {
        campaigns[campaignIndex].ad_groups[adGroupIndex].keywords.push({
            keyword: fields[9],
            type: fields[10],
            first_page_bid: fields[11],
            top_of_page_bid: parseInt(fields[12]) !== 0 ? fields[12] : undefined,
            status: fields[15]
        });
        keywordIndex++;
    }
});
// const outputPath = 'output.json';
// const inputPath = 'input.tsv';
util_1.sortCampaigns(campaigns);
// prep the file for writing
fs.writeFileSync(output, JSON.stringify(campaigns), 'utf8');
// const destination = fs.createWriteStream(outputPath, { flags: 'a' });
// const lineReader = readline.createInterface({
//   input: fs.createReadStream(inputPath)
// });
// let lineNumber = 0;
// let previousFields: string[] = [];
// lineReader.on('line', line => {
//   let json = '';
//   lineNumber++;
//   if (lineNumber === 1) {
//     json += `{"campaigns": [`;
//     destination.write(json);
//     return;
//   }
//   if (line == null) {
//     json += ']}';
//     destination.write(json);
//     return;
//   }
//   const fields = line.split('\t');
//   if (newCampaign(previousFields, fields)) {
//     json +=
//   }
//     // destination.write(line);
//     // destination.write('\n]}');
//     previousFields = fields;
// });
// function initializeField(name: string, value: string, comma: string = '') {
//   return `"${name}": "${value}"${comma}`;
// }
// const BEGIN_ARRAY = '[';
// const END_ARRAY = ']';
// const BEGIN_OBJECT = '{';
// const END_OBJECT = '}';
//# sourceMappingURL=index.js.map