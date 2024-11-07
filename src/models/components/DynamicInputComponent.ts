import BaseDynamicComponent, {
  IDynamicComponentProps,
}                         from '@/models/components/BaseDynamicComponent';
import { Attr, Str, Uid } from 'pinia-orm/dist/decorators';

export default class DynamicInputComponent extends BaseDynamicComponent {
  static entity = 'input_components';

  /**
   * ID
   */
  @Uid() declare id: string;

  /**
   * Наименование компонента
   */
  @Str('dynamic-text') declare name: string;

  @Attr(() => ({
    settings: [
      {
        type: 'text', title: 'ID', name: 'id', value: '',
      },
      {
        type: 'checkbox', title: 'Обязательное', name: 'required', value: false,
      },
      {
        type: 'text', title: 'Placeholder', name: 'placeholder', value: '',
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
    DynamicInputComponent: DynamicInputComponent;
    // eslint-disable-next-line semi
  }
}
