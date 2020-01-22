import AdCampaign from './entities/AdCampaign';
import Columns from './constants';

export const lineIsNewCampaign = (fields: string[]) => fields[Columns.CAMPAIGN_DAILY_BUDGET];

export const lineIsNewAdGroup = (fields: string[]) => fields[Columns.MAX_CPC];

export const lineIsNewAd = (fields: string[]) => fields[Columns.HEADLINE];

export const lineIsNewKeyword = (fields: string[]) => fields[Columns.KEYWORD];

export const startNewCampaign = (campaigns: AdCampaign[], fields: string[]) => {
  campaigns.push({
    name: fields[Columns.CAMPAIGN],
    daily_budget: fields[Columns.CAMPAIGN_DAILY_BUDGET],
    status: fields[Columns.CAMPAIGN_STATUS],
    ad_groups: []
  });
};

export const startNewAdGroup = (campaigns: AdCampaign[], fields: string[], campaignIndex: number) => {
  campaigns[campaignIndex].ad_groups.push({
    name: fields[Columns.AD_GROUP],
    max_cpc: fields[Columns.MAX_CPC],
    ads: [],
    keywords: [],
    status: fields[Columns.AD_GROUP_STATUS]
  });
};

export const startNewAd = (campaigns: AdCampaign[], fields: string[], campaignIndex: number, adGroupIndex: number) => {
  campaigns[campaignIndex].ad_groups[adGroupIndex].ads.push({
    headline: fields[Columns.HEADLINE],
    description_line1: fields[Columns.DESCRIPTION_LINE_1],
    description_line2: fields[Columns.DESCRIPTION_LINE_2],
    display_url: fields[Columns.DISPLAY_URL],
    final_url: fields[Columns.FINAL_URL],
    status: fields[Columns.STATUS]
  });
};

export const startNewKeyword = (campaigns: AdCampaign[], fields: string[], campaignIndex: number, adGroupIndex: number) => {
  campaigns[campaignIndex].ad_groups[adGroupIndex].keywords.push({
    keyword: fields[Columns.KEYWORD],
    type: fields[Columns.CRITERION_TYPE],
    first_page_bid: fields[Columns.FIRST_PAGE_BID],
    top_of_page_bid: parseInt(fields[Columns.TOP_OF_PAGE_BID]) !== 0 ? fields[Columns.TOP_OF_PAGE_BID] : undefined,
    status: fields[Columns.STATUS]
  });
};
