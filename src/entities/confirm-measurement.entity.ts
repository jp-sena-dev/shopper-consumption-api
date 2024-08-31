export class ConfirmMeasureEntity {
  readonly success: boolean;

  constructor(entity: ConfirmMeasureEntity) {
    Object.assign(this, entity);
  }
}
