import BaseAdEntity from './BaseAdEntity';

export default class AdKeyword extends BaseAdEntity {
  keyword: string;
  type: string;
  first_page_bid: string;
  top_of_page_bid: string;
}
