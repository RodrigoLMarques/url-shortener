import { init } from '@paralleldrive/cuid2';
import { Entity } from 'src/core/entity';

export interface IUrlProps {
  originalUrl: string;
  alias?: string;
  clickCount?: number;
}

export class UrlEntity extends Entity<IUrlProps> {
  constructor(props: IUrlProps, id?: string) {
    super(props, id);
  }

  private createAlias(): string {
    const createId = init({ length: 4 });
    this.props.alias = createId();
    return this.props.alias;
  }

  get originalUrl() {
    return this.props.originalUrl;
  }
  get alias() {
    return this.props.alias;
  }
  get clickCount() {
    return this.props.clickCount;
  }

  set clickCount(value: number | undefined) {
    this.props.clickCount = value;
  }

  static create(props: IUrlProps, id?: string) {
    const entity = new UrlEntity(props, id);
    if (!entity.alias) entity.createAlias();
    return entity;
  }
}
