import BaseEntity from './BaseEntity';
import AdCampaign from './AdCampaign';

export default class Account extends BaseEntity {
  campaigns: AdCampaign[];
}
