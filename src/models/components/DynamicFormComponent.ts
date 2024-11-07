import BaseDynamicComponent, {
  IDynamicComponentProps,
}                          from '@/models/components/BaseDynamicComponent';
import { Attr, Str, Uid } from 'pinia-orm/dist/decorators';

export default class DynamicFormComponent extends BaseDynamicComponent {
  static entity = 'form_components';

  /**
   * ID
   */
  @Uid() declare id: string;

  /**
   * Наименование компонента
   */
  @Str('dynamic-form') declare name: string;

  @Attr(() => ({
    settings: [
      {
        type: 'text', title: 'Атрибут name', name: 'name', value: '',
      },
    ],
  })) declare props: IDynamicComponentProps;

  /**
   * Сохранять в LocalStorage
   */
  static piniaOptions = {
    persist: true,
  };
}

declare module '@/models/components' {
  export default interface ComponentsRegistry {
    DynamicFormComponent: DynamicFormComponent;
    // eslint-disable-next-line semi
  }
}
