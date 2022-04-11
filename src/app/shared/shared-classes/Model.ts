import {IModel} from '../shared-interfaces/model';

export class Model implements IModel {

  uuid: string;
  createdAt: number | null;
  updatedAt: number | null;

  constructor(attributes) {
    console.log('Model: ' + attributes.__typename + ' :attributes', attributes.id, attributes);
    this.id = attributes.id;
    this.createdDate = attributes.created_at;
    this.updatedDate = attributes.updated_at;
  }

  get id(): string {
    return this.uuid;
  }

  set id(attribute: string) {
    this.uuid = attribute;
  }

  private get createdDate(): number | null {
    return this.createdAt;
  }

  private set createdDate(attribute: number | null) {
    this.createdAt = attribute;
  }

  private get updatedDate(): number | null {
    return this.updatedAt;
  }

  private set updatedDate(attribute: number | null) {
    this.updatedAt = attribute;
  }
}
