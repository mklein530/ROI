import BaseAdEntity from './BaseAdEntity';

export default class Ad extends BaseAdEntity {
  headline: string;
  description_line1: string;
  description_line2: string;
  display_url: string;
  final_url: string;
}
