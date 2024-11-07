import Row                    from '@/models/Row';
import { Model }              from 'pinia-orm';
import { HasMany, Str, Uid } from 'pinia-orm/dist/decorators';

export default class Form extends Model {
  static entity = 'form';

  /**
   * ID
   */
  @Uid() declare id: string;

  /**
   * Название формы
   */
  @Str('Title') declare title: string;

  /**
   * Описание формы
   */
  @Str('Description') declare description: string;

  /**
   * Дочерние строки
   */
  @HasMany(() => Row, 'formId') declare rows: Row[]; // Связь с Row

  /**
   * Сохранять в LocalStorage
   */
  static piniaOptions = {
    persist: true,
  };
}

declare module '@/models/model' {
  export default interface ModelRegistry {
    Form: Form;
    // eslint-disable-next-line semi
  }
}
