import { init } from '@paralleldrive/cuid2';
import { Entity } from 'src/core/entity';

export type IUrlProps = {
  originalUrl: string;
  alias?: string;
  clicks?: number;
};

const HOST = 'http://my-app.com';

export class UrlEntity extends Entity<IUrlProps> {
  constructor(props: IUrlProps, id?: string) {
    super(props, id);
    this.props.alias = this.generateAlias();
    this.props.clicks = this.props.clicks ?? 0;
  }

  private generateAlias(): string {
    const createId = init({ length: 6 });
    return createId();
  }

  get shortUrl(): string {
    return `${HOST}/${this.props.alias}`;
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

  static create(props: IUrlProps, id?: string) {
    const entity = new UrlEntity(props, id);
    return entity;
  }
}
