import { Model }          from 'pinia-orm';
import { Attr, Str, Uid } from 'pinia-orm/dist/decorators';

export type DynamicComponentSetting = {
  type: string;
  title: string;
  name: string;
  value: string | number | boolean;
  hidden?: boolean;
}

export type IDynamicComponentProps = {
  settings: DynamicComponentSetting[];
  [key: string]: unknown;
}

export default class BaseDynamicComponent extends Model {
  static entity = 'component';

  /**
   * ID
   */
  @Uid() declare id: string;

  /**
   * Наименование компонента (например dynamic-text)
   */
  @Str('') declare name: string;

  /**
   * Props компонента
   */
  @Attr() declare props: IDynamicComponentProps;
}
