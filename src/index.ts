import * as fs from 'fs';
import * as readline from 'readline';
import AdCampaign from './entities/AdCampaign';
import { argv } from 'yargs';
import {
  lineIsNewCampaign,
  lineIsNewAdGroup,
  lineIsNewAd,
  lineIsNewKeyword,
  startNewCampaign,
  startNewAdGroup,
  startNewAd,
  startNewKeyword
} from './parse-util';
import { sortCampaigns } from './sort-util';

const input = (argv.input as string) || process.env.npm_config_input || 'input.tsv';
const output = (argv.output as string) || process.env.npm_config_output || 'output.json';

// index of the current campaign, current adgroup, current ad, and current keyword
// kept track of so we know when and where to add new objects as we parse the file
let campaignIndex = -1,
  adGroupIndex = -1,
  adIndex = -1,
  keywordIndex = -1;
const campaigns: AdCampaign[] = [];
let isFirstLine = true;

readline
  .createInterface({
    input: fs.createReadStream(input),
    terminal: false
  })
  .on('line', (line: string) => {
    if (isFirstLine) {
      isFirstLine = false;
      return;
    }
    const fields = line.split('\t');
    if (lineIsNewCampaign(fields)) {
      startNewCampaign(campaigns, fields);
      // when adding a new campaign, we need to know where in the array of campaigns we are, and we need to reset the indices of the other arrays
      // since those will not have any values yet
      campaignIndex++;
      adGroupIndex = -1;
      adIndex = -1;
      keywordIndex = -1;
    }
    if (lineIsNewAdGroup(fields)) {
      startNewAdGroup(campaigns, fields, campaignIndex);
      // upon adding a new ad group, we need to know where in the array of adgroups we are, and we need to reset the indices of the other arrays
      // within the adgroup since those will not have any values yet
      adGroupIndex++;
      adIndex = -1;
      keywordIndex = -1;
    }
    if (lineIsNewAd(fields)) {
      startNewAd(campaigns, fields, campaignIndex, adGroupIndex);
      // upon adding a new ad, we need to know where we are in the array of ads, so we increment the index
      adIndex++;
    }
    if (lineIsNewKeyword(fields)) {
      startNewKeyword(campaigns, fields, campaignIndex, adGroupIndex);
      // upon adding a new keyword, we need to know where we are in the array of ads, so we increment the index
      keywordIndex++;
    }
  })
  .on('close', () => {
    sortCampaigns(campaigns);
    // write to the file
    fs.writeFileSync(output, JSON.stringify(campaigns), 'utf8');
    process.exit(0);
  });
