import { createId } from '@paralleldrive/cuid2';

export abstract class Entity<Props> {
  public readonly _id: string;
  public readonly props: Props;

  constructor(props: Props, id?: string) {
    this.props = props;
    this._id = id || createId();
  }

  get id() {
    return this._id;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }

  static fromJSON<T extends Entity<any>, P>(
    this: new (props: P, id?: string) => T,
    json: Required<{ id: string } & P>,
  ): T {
    return new this(
      (({ id, ...props }) => props)(json) as P,
      json.id,
    );
  }
}
