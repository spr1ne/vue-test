<template>
  <div class="builder-col"
       :class="{ 'builder-col_column': !col.component && col.rows && col.rows.length }"
       @click="onClick"
       @keydown.enter="onClick"
       ref="rootEl">

<!--    <div class="orm-id">-->
<!--      {{col.id}}-->
<!--    </div>-->
    <span class="builder-col__empty" v-if="!col.isFilled">+</span>

    <template v-if="col.component">
      <builder-col-component :row="row" :col="col"></builder-col-component>
    </template>
    <template v-else>
      <builder-row v-for="_row in col.rows" :key="_row.id" :rowId="_row.id"></builder-row>
    </template>

    <ui-menu v-if="isRendered"
            :rootEl="rootEl"
            :options="menuOptions"
            @onInit="onMenuInit"
            @onSelect="onSelect">
    </ui-menu>
  </div>
</template>

<script lang="ts">
import BuilderColComponent                       from '@/components/form-dynamic-builder/builder-col-component.vue';
import UiMenu, { UiMenuOption, UiMenuPublicAPI } from '@/components/ui/ui-menu.vue';
import Col                                       from '@/models/Col';
import Row                                       from '@/models/Row';
import { useRepo }                               from 'pinia-orm';
import Component                                 from 'vue-class-component';
import {
  Inject, Prop, Ref, Vue,
}               from 'vue-property-decorator';

@Component({
  name:       'builder-col',
  components: {
    UiMenu,
    // Динамический импорт необходим, чтобы избежать циклической зависимости
    BuilderRow: () => import('./builder-row.vue'),
    BuilderColComponent,
  },
})
export default class BuilderCol extends Vue {
  /**
   * EventBus для сообщения между компонентами
   */
  @Inject('fdb-event-bus') fdbEventBus!: Vue;

  /**
   * Строка
   */
  @Prop() row!: Row;

  /**
   * ID колонки
   */
  @Prop() colId!: string;

  /**
   * Корневой элемент
   */
  @Ref('rootEl') readonly rootEl!: HTMLElement;

  /**
   * Колонка
   */
  get col() {
    return useRepo(Col).with('rows').with('component').find(this.colId) || new Col();
  }

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
      { id: 2, name: 'Колонка', value: 'col' },
      { id: 3, name: 'Компонент', value: 'component' },
      { id: 4, name: 'Настроить', value: 'col-settings' },
      { id: 5, name: 'Удалить', value: 'delete' },
    ];

    if (!this.col.component) {
      options.push({ id: 1, name: 'Строка', value: 'row' });
    }

    return options;
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
    // Добавление строки
    if (option.value === 'row') {
      const rowRepo = useRepo(Row);
      const row     = rowRepo.save({
        colId: this.col.id,
        cols:  [],
      });

      useRepo(Col)
        .save({
          rowId: row.id,
          rows:  [],
        });

    // Добавление колонки
    } else if (option.value === 'col') {
      useRepo(Col).save({
        rowId: this.row.id,
        rows:  [],
      });

      this.fdbEventBus.$emit('update-form');

    // Переход к настройкам колонки
    } else if (option.value === 'col-settings') {
      this.$router.push({ name: 'colEdit', params: { colId: this.col.id } });

    // Переход к настройкам компонента
    } else if (option.value === 'component') {
      this.$router.push({ name: 'colEdit', params: { colId: this.col.id } }).then(() => {
        this.$router.push({ name: 'componentNew' });
      });

    // Удаление колонки
    } else if (option.value === 'delete') {
      useRepo(Col).destroy(this.col.id);

      // Удаление строки если колонка одна
      if (this.row.cols.length === 1) {
        useRepo(Row).destroy(this.row.id);
      }
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
.builder-col {
  position: relative;
  color: blue;
  margin: 15px;
  border: 2px dashed blue;
  border-radius: 5px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;

  &:hover {
    background: rgba(151, 198, 255, 0.6);
  }

  &:hover > &__empty {
    color: white;
  }

  &_column {
    flex-direction: column;
    align-items: stretch;
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
