import BaseDynamicComponent, {
  IDynamicComponentProps,
}                         from '@/models/components/BaseDynamicComponent';
import { Attr, Str, Uid } from 'pinia-orm/dist/decorators';

export default class DynamicLabelComponent extends BaseDynamicComponent {
  static entity = 'label_components';

  /**
   * ID
   */
  @Uid() declare id: string;

  /**
   * Наименование компонента
   */
  @Str('dynamic-label') declare name: string;

  @Attr(() => ({
    settings: [
      {
        type: 'text', title: 'ID', name: 'id', value: '',
      },
      {
        type: 'text', title: 'Текст', name: 'title', value: 'Название',
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
    DynamicButtonComponent: DynamicLabelComponent;
    // eslint-disable-next-line semi
  }
}
