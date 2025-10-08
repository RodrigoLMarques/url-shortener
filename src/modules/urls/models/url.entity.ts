import { init } from '@paralleldrive/cuid2';
import { Entity } from 'src/core/entity';

export type IUrlProps = {
  originalUrl: string;
  alias?: string;
};

export class UrlEntity extends Entity<IUrlProps> {
  constructor(props: IUrlProps, id?: string) {
    super(props, id);
    this.props.alias = this.props.alias ?? this.generateAlias();
  }

  private generateAlias(): string {
    const createId = init({ length: 4 });
    return createId();
  }

  get originalUrl() {
    return this.props.originalUrl;
  }

  get alias() {
    return this.props.alias;
  }

  static create(props: IUrlProps, id?: string) {
    const entity = new UrlEntity(props, id);
    return entity;
  }
}
