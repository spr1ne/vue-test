// eslint-disable-next-line import/no-cycle
import BaseDynamicComponent                             from '@/models/components/BaseDynamicComponent';
import DynamicButtonComponent
  from '@/models/components/DynamicButtonComponent';
import DynamicFormComponent
  from '@/models/components/DynamicFormComponent';
import DynamicInputComponent
  from '@/models/components/DynamicInputComponent';
import DynamicLabelComponent
  from '@/models/components/DynamicLabelComponent';
import Row                                              from '@/models/Row';
import { Model }                                        from 'pinia-orm';
import {
  Attr, BelongsTo, HasMany, MorphTo, Str, Uid,
} from 'pinia-orm/dist/decorators';

export default class Col extends Model {
  static entity = 'col'; // Исправлено на 'col'

  /**
   * ID
   */
  @Uid() declare id: string;

  /**
   * Размер колонки (class bootstrap-grid)
   */
  @Str('') declare size: string;

  /**
   * ID полиморфного компонента
   */
  @Str('') declare componentId: string;

  /**
   * Тип полиморфного компонента
   */
  @Str('') declare componentType: string;

  /**
   * Данные компонента, которые будут обновлены в БД
   */
  @Str('FormData') declare entity: string;

  /**
   * ID данных компонента (могут отсутствовать, т.к еще запись не создана)
   */
  @Str('') declare entityId: string;

  /**
   * ID родительской строки
   */
  @Attr(null) declare rowId: string | null;

  /**
   * Родительская строка
   */
  @BelongsTo(() => Row, 'rowId') declare row: Row;

  /**
   * Дочерние строки
   */
  @HasMany(() => Row, 'colId') declare rows: Row[];

  /**
   * Компонент (Полиморфная связь)
   */
  @MorphTo(() => [DynamicFormComponent, DynamicInputComponent, DynamicButtonComponent, DynamicLabelComponent], 'componentId', 'componentType') declare component: BaseDynamicComponent;

  /**
   * Выбран компонент или добавлены строки
   */
  get isFilled() {
    return !!this.component || !!this.rows?.length;
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
    Col: Col;
    // eslint-disable-next-line semi
  }
}
