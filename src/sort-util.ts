import AdCampaign from './entities/AdCampaign';

export const sortAlphabetically = (object1: any, object2: any, field: string) => {
  return object1[field].localeCompare(object2[field], 'en', { sensitivity: 'base' });
};

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
