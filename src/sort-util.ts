import AdCampaign from './entities/AdCampaign';

/**
 * Generic sort utility
 * Given two objects and a field key on those objects, this will determine the alphabetical order of those objects
 * @See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
 * @param object1
 * @param object2
 * @param field
 */
export const sortAlphabetically = (object1: any, object2: any, field: string): number => {
  return object1[field].localeCompare(object2[field], 'en', { sensitivity: 'base' });
};

/**
 * Sorts campaigns by the following:
 * Campaigns: sorted by name
 * Ad Groups: sorted by name
 * Ads: sorted by headline
 *      if headlines are the same, sorted by description_line1
 *      if description_line1 fields are the same, sorted by description_line2
 * Keywords: sorted by keyword
 *           if keywords are the same, sorted by criterion type
 * @param campaigns
 */
export const sortCampaigns = (campaigns: AdCampaign[]) => {
  campaigns.sort((a, b) => sortAlphabetically(a, b, 'name'));
  campaigns.forEach(campaign => {
    campaign.ad_groups.sort((a, b) => sortAlphabetically(a, b, 'name'));
    campaign.ad_groups.forEach(adGroup => {
      adGroup.ads.sort((a, b) => {
        let result = sortAlphabetically(a, b, 'headline');
        if (result === 0) {
          result = sortAlphabetically(a, b, 'description_line1');
        }
        return result !== 0 ? result : sortAlphabetically(a, b, 'description_line2');
      });
      adGroup.keywords.sort((a, b) => {
        let result = sortAlphabetically(a, b, 'keyword');
        return result !== 0 ? result : sortAlphabetically(a, b, 'type');
      });
    });
  });
};
