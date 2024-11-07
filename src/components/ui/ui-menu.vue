<template>
  <div class="menu"
       v-if="isMenuOpen"
       :style="{ left: menuPosition.x + 'px', top: menuPosition.y + 'px' }">
    <div class="menu__option"
         v-for="option in options"
         :key="option.id"
         @click.stop="onSelect(option)"
         @keydown.enter="onSelect(option)">
      {{ option.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Component            from 'vue-class-component';
import { Emit, Prop, Vue } from 'vue-property-decorator';

export type UiMenuPublicAPI = { open: (event: MouseEvent) => void };
export type UiMenuOption = {
  id: string;
  name: string;
  value: string;
};

/**
 * Компонент должен управляться извне, через публичное API
 * Объект с API можно получить в обработчике, например:
 * <pre>
 *   <Parent>
 *     <UiMenu @onInit="onMenuInit(api)">
 *   </Parent>
 * </pre>
 */
@Component({
  name: 'ui-menu',
})
export default class UiMenu extends Vue {
  /**
   * (Emit) Компонент инициализирован, передача публичного API
   */
  @Emit('onInit') onInit() {
    const api = {
      open: this.open.bind(this),
    };

    return api;
  }

  /**
   * Выбор элемента меню
   * @param option
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit('onSelect') onSelect(option: UiMenuOption) {
    this.close();
  }

  /**
   * Корневой элемент
   */
  @Prop() rootEl!: HTMLElement;

  /**
   * Опции меню
   */
  @Prop() options!: UiMenuOption[];

  /**
   * Меню открыто?
   */
  isMenuOpen = false;

  /**
   * Позиция меню
   */
  menuPosition = {
    x: 0,
    y: 0,
  };

  /**
   * (Handler) Скрытие меню по клику за пределами rootEl
   * @param event
   */
  handleClickOutside(event: MouseEvent) {
    const target = event?.target as HTMLElement | null;

    if (target && this.rootEl) {
      if (target !== this.rootEl) {
        this.isMenuOpen = false;
      }
    }
  }

  /**
   * (Hook) mounted
   */
  mounted() {
    document.addEventListener('click', this.handleClickOutside.bind(this));
    this.onInit();
  }

  /**
   * (Hook) beforeDestroy
   */
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  /**
   * Открытие меню
   * @param event
   */
  open(event: MouseEvent) {
    this.menuPosition.x = event.offsetX;
    this.menuPosition.y = event.offsetY;
    this.isMenuOpen     = true;
  }

  /**
   * Закрытие меню
   */
  close() {
    this.isMenuOpen = false;
  }
}
</script>

<style lang="scss">
.menu {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  border: 1px solid #4ba0ff;
  overflow: hidden;
  z-index: 1;

  &__option {
    font-size: 14px;
    font-weight: normal;
    color: #515151;
    padding: 5px 10px;
    border-bottom: 1px solid #d3d3d3;
    background: #f4f4f4;

    &:hover {
      background: #89d7ff;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
