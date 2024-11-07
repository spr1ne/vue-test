// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-extraneous-dependencies
import { Model }    from 'pinia-orm';
import { Str, Uid } from 'pinia-orm/dist/decorators';

export default class FormData extends Model {
  static entity = 'formData';

  /**
   * ID
   */
  @Uid() declare id: string;

  /**
   * Данные компонента
   */
  @Str('') declare value: string;

  /**
   * ID модели Form
   */
  // eslint-disable-next-line camelcase
  @Str('') declare form_id: string;

  /**
   * Сохранять в LocalStorage
   */
  static piniaOptions = {
    persist: true,
  }
}

declare module '@/models/model' {
  export default interface ModelRegistry {
    FormData: FormData;
    // eslint-disable-next-line semi
  }
}
