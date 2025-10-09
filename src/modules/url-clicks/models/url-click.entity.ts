import { Entity } from 'src/core/entity';

export interface IUrlClickProps {
  urlId: string;
  clickedAt?: Date;
  ipAddress?: string;
  country?: string;
  city?: string;
  referrer?: string;
  userAgent?: string;
  deviceType?: string;
  os?: string;
  browser?: string;
}

export class UrlClickEntity extends Entity<IUrlClickProps> {
  constructor(props: IUrlClickProps, id?: string) {
    super(props, id);
  }

  get clickedAt() {
    return this.props.clickedAt;
  }

  set clickedAt(value: Date | undefined) {
    this.props.clickedAt = value;
  }

  static create(props: IUrlClickProps, id?: string) {
    const entity = new UrlClickEntity(props, id);
    if (!entity.clickedAt) entity.clickedAt = new Date();
    return entity;
  }
}
