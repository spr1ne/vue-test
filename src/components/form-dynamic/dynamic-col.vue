<template>
  <div class="col" :class="col.size">
    <template v-if="col.component">
      <component :is="col.component.name"
                 v-on="{ onInput }"
                 v-bind="{ row, col, formId, value, ...col.component.props }">
        <dynamic-row v-for="row in col.rows"
                :formId="formId"
                :key="row.id"
                :rowId="row.id"></dynamic-row>
      </component>
    </template>
    <template v-else-if="col.rows && col.rows.length">
      <dynamic-row v-for="row in col.rows"
              :formId="formId"
              :key="row.id"
              :rowId="row.id"></dynamic-row>
    </template>
  </div>
</template>

<script lang="ts">
import DynamicButton from '@/components/form-dynamic/dynamic-button.vue';
import DynamicForm   from '@/components/form-dynamic/dynamic-form.vue';
import DynamicLabel  from '@/components/form-dynamic/dynamic-label.vue';
import DynamicText   from '@/components/form-dynamic/dynamic-text.vue';
import Col           from '@/models/Col';
import FormData      from '@/models/FormData';
import { useRepo }   from 'pinia-orm';
import Component     from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    // Динамический импорт необходим, чтобы избежать циклической зависимости
    DynamicRow: () => import('./dynamic-row.vue'),
    DynamicLabel,
    DynamicText,
    DynamicForm,
    DynamicButton,
  },
})
export default class DynamicCol extends Vue {
  /**
   * Строка
   */
  @Prop() row!: Col;

  /**
   * ID колонки
   */
  @Prop() colId!: string;

  /**
   * ID формы
   */
  @Prop() formId!: string;

  /**
   * Колонка
   */
  get col() {
    return useRepo(Col)
      .with('row')
      .with('rows')
      .with('component')
      .find(this.colId) || new Col();
  }

  /**
   * Запись FormData
   * Данные, привязанные к колонке
   * могут быть использованы с компонентами из ComponentsRegistry
   */
  get entityData() {
    if (this.col.entityId) {
      const FormDataRepo = useRepo(FormData);
      const entity = FormDataRepo.find(this.col.entityId);

      if (entity) {
        return entity;
      }
    }

    return new FormData();
  }

  /**
   * Значение для компонента
   */
  get value() {
    return this.col.component.name ? this.entityData.value : null;
  }

  /**
   * (Handler) Вызов происходит при изменении значения компонента
   */
  onInput(event: KeyboardEvent) {
    const target       = event?.target as HTMLInputElement;
    const { value }    = target;
    const FormDataRepo = useRepo(FormData);

    // Если запись уже существует - обновляем
    if (this.col.entityId) {
      const entity = FormDataRepo.find(this.col.entityId);

      if (entity) {
        FormDataRepo.where('id', this.col.entityId)
          .update({
            ...entity,
            value,
          });
      }

    // Если нет - создаем
    } else {
      const entity = FormDataRepo.save({
        form_id: this.formId,
        value,
      });

      if (entity) {
        this.col.entityId = entity.id;
        useRepo(Col).save(this.col);
      }
    }
  }
}
</script>
