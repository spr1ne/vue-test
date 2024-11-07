import BaseDynamicComponent, {
  IDynamicComponentProps,
}                         from '@/models/components/BaseDynamicComponent';
import { Attr, Str, Uid } from 'pinia-orm/dist/decorators';

export default class DynamicButtonComponent extends BaseDynamicComponent {
  static entity = 'button_components';

  /**
   * ID
   */
  @Uid() declare id: string;

  /**
   * Наименование компонента
   */
  @Str('dynamic-button') declare name: string;

  /**
   * Props
   */
  @Attr(() => ({
    settings: [
      {
        type: 'text', title: 'Тип', name: 'type', value: 'submit',
      },
      {
        type: 'text', title: 'Текст', name: 'title', value: 'Сохранить',
      },
      {
        type: 'text', title: 'Событие', name: 'event', value: 'clear', hidden: true,
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
    DynamicButtonComponent: DynamicButtonComponent;
    // eslint-disable-next-line semi
  }
}
