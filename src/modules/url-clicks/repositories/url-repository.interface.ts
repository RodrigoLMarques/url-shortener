import { UrlClickEntity } from '../models/url-click.entity';

export interface IUrlClickRepository {
  create(entity: UrlClickEntity): Promise<void>;
}

export const URL_CLICK_REPOSITORY = 'UrlClickRepository';
