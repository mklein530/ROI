import BaseAdEntity from './BaseAdEntity';
import Ad from './Ad';
import AdKeyword from './AdKeyword';

export default class AdGroup extends BaseAdEntity {
  name: string;
  max_cpc: string;
  ads: Ad[];
  keywords: AdKeyword[];
}
