<template>
    <div class="builder-col-component" @click="onClick" @keydown.enter="onClick" ref="rootEl">
      {{this.col.component.name}} {{id}} {{title}} {{name}}

      <builder-row v-for="_row in col.rows" :key="_row.id" :rowId="_row.id"></builder-row>

      <ui-menu v-if="isRendered"
               :rootEl="rootEl"
               :options="menuOptions"
               @onInit="onMenuInit"
               @onSelect="onSelect">
      </ui-menu>
    </div>
</template>

<script lang="ts">
import UiMenu, { UiMenuOption, UiMenuPublicAPI } from '@/components/ui/ui-menu.vue';
import Col                                       from '@/models/Col';
import { DynamicComponentSetting }               from '@/models/components/BaseDynamicComponent';
import Row                                       from '@/models/Row';
import { useRepo }                               from 'pinia-orm';
import Component                                 from 'vue-class-component';
import { Prop, Ref, Vue }                        from 'vue-property-decorator';

@Component({
  name:       'builder-col',
  components: {
    // Динамический импорт необходим, чтобы избежать циклической зависимости
    BuilderRow: () => import('./builder-row.vue'),
    UiMenu,
  },
})
export default class BuilderCol extends Vue {
  /**
   * Строка
   */
  @Prop() row!: Row;

  /**
   * Колонка
   */
  @Prop() col!: Col;

  /**
   * Корневой элемент
   */
  @Ref('rootEl') readonly rootEl!: HTMLElement;

  /**
   * Компонент добавлен?
   */
  isRendered = false;

  /**
   * Публичный апи компонента UiMenu
   * @private
   */
  private menuApi!: UiMenuPublicAPI;

  /**
   * Опции для компонента UiMenu
   */
  get menuOptions() {
    const options = [
      { id: 1, name: 'Строка', value: 'row' },
      { id: 4, name: 'Настроить компонент', value: 'settings' },
    ];

    return options;
  }

  get settings() {
    return this.col.component.props.settings;
  }

  /**
   * (HTML атрибут) ID
   */
  get id() {
    const setting = this.settings.find((item) => item.name === 'id') as DynamicComponentSetting;
    return setting ? `id=(${setting.value})` : '';
  }

  /**
   * (HTML атрибут) title
   */
  get title() {
    const setting = this.settings.find((item) => item.name === 'title') as DynamicComponentSetting;
    return setting ? `(title=${setting.value})` : '';
  }

  /**
   * (HTML атрибут) title
   */
  get name() {
    const setting = this.settings.find((item) => item.name === 'name') as DynamicComponentSetting;
    return setting ? `(name=${setting.value})` : '';
  }

  /**
   * (Hook) mounted
   */
  mounted() {
    this.isRendered = true;
  }

  /**
   * Клик по корневому элементу
   * @param event
   */
  onClick(event: MouseEvent) {
    this.menuApi.open(event);
  }

  /**
   * Инициализация api компонента UiMenu
   * @param api
   */
  onMenuInit(api: UiMenuPublicAPI) {
    this.menuApi = api;
  }

  /**
   * (Handler) Выбор элемента меню
   * @param option
   */
  onSelect(option: UiMenuOption) {
    // Добавление строки <slot> компонента
    if (option.value === 'row') {
      const rowRepo = useRepo(Row);
      const row = rowRepo.save({
        colId: this.col.id,
        cols:  [],
      });

      useRepo(Col)
        .save({
          rowId:         row.id,
          componentName: '',
          rows:          [],
        });

    // Переход к настройкам компонента
    } else if (option.value === 'settings') {
      this.$router.push({ name: 'colEdit', params: { colId: this.col.id } }).then(() => {
        this.$router.push({ name: 'componentEdit', params: { componentId: this.col.componentId } });
      });
    }
  }
}
</script>

<style lang="scss">
.orm-id {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 10px;
  color: black;
}
.builder-col-component {
  position: relative;
  color: #00c15b;
  margin: 15px;
  border: 2px dashed #00c15b;
  border-radius: 5px;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  cursor: pointer;
  flex: 1;

  &:hover {
    background: rgb(137, 255, 196);
  }

  &:hover &__empty {
    color: white;
  }

  &__empty {
    font-size: 22px;
    font-weight: bold;
  }

  &__component {
    border: 1px solid darkgray;
    border-radius: 5px;
    background-color: #e8e8e8;
    margin: 10px;
    padding: 2px 10px;
  }
}

</style>
