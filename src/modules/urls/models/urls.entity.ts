import { init } from '@paralleldrive/cuid2';
import { Entity } from 'src/core/entity';

export type IUrlProps = {
  originalUrl: string;
  alias?: string;
  clicks?: number;
};

const DOMAIN = 'localhost:3000';
const HOST = `http://${DOMAIN}`;

export class UrlEntity extends Entity<IUrlProps> {
  constructor(props: IUrlProps, id?: string) {
    super(props, id);
    this.props.alias = this.props.alias ?? this.generateAlias();
    this.props.clicks = this.props.clicks ?? 0;
  }

  private generateAlias(): string {
    const createId = init({ length: 4 });
    return createId();
  }

  incrementClick() {
    this.props.clicks = (this.props.clicks ?? 0) + 1;
  }

  get originalUrl() {
    return this.props.originalUrl;
  }

  get alias() {
    return this.props.alias;
  }

  get clicks() {
    return this.props.clicks;
  }

  get shortUrl(): string {
    return `${HOST}/${this.props.alias}`;
  }

  get domain(): string {
    return DOMAIN;
  }

  static create(props: IUrlProps, id?: string) {
    const entity = new UrlEntity(props, id);
    return entity;
  }
}
