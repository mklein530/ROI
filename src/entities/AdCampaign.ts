import BaseAdEntity from './BaseAdEntity';
import AdGroup from './AdGroup';

export default class AdCampaign extends BaseAdEntity {
  name: string;
  daily_budget: string;
  ad_groups: AdGroup[];
}
