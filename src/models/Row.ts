// eslint-disable-next-line import/no-cycle
import Col                                from '@/models/Col';
// eslint-disable-next-line import/no-cycle
import Form                               from '@/models/Form';
import { Model }                          from 'pinia-orm';
import {
  Attr, BelongsTo, HasMany, Uid,
} from 'pinia-orm/dist/decorators';

export default class Row extends Model {
  static entity = 'row';

  /**
   * ID
   */
  @Uid() declare id: string;

  /**
   * ID модели Form
   */
  @Attr(null) declare formId: string | null;

  /**
   * ID родительской колонки
   */
  @Attr(null) declare colId: string | null;

  /**
   * Родительская колонка
   */
  @BelongsTo(() => Col, 'colId') declare col: Col;

  /**
   * Ссылка на Form
   */
  @BelongsTo(() => Form, 'formId') declare form: Form;

  /**
   * Дочерние колонки
   */
  @HasMany(() => Col, 'rowId') declare cols: Col[];

  /**
   * Заполнена ли строка
   */
  get isFilled() {
    return !!this.cols?.length;
  }

  /**
   * Сохранять в LocalStorage
   */
  static piniaOptions = {
    persist: true,
  };
}

declare module '@/models/model' {
  export default interface ModelRegistry {
    Row: Row;
    // eslint-disable-next-line semi
  }
}
