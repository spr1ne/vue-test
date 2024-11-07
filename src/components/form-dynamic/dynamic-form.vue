<template>
  <form :name="name" @submit.prevent>
    {{$log(JSON.stringify(form))}}
    <slot></slot>
  </form>
</template>

<script lang="ts">
import Col                         from '@/models/Col';
import { DynamicComponentSetting } from '@/models/components/BaseDynamicComponent';
import DynamicFormComponent        from '@/models/components/DynamicFormComponent';
import Form                        from '@/models/Form';
import FormData                    from '@/models/FormData';
import Row                         from '@/models/Row';
import { useRepo }                 from 'pinia-orm';
import Component                   from 'vue-class-component';
import { Prop, Provide, Vue }      from 'vue-property-decorator';

@Component
export default class DynamicForm extends Vue {
  @Provide('dynamic-form-bus') dynamicFormBus = new Vue();

  /**
   * Форма
   */
  @Prop() col!: Col;

  /**
   * Идентификатор формы
   */
  @Prop() formId!: number;

  /**
   * Настройки формы
   */
  @Prop() settings!: DynamicFormComponent['props']['settings'];

  get form() {
    return useRepo(Form).withAllRecursive(2).find(this.formId);
  }

  /**
   * (HTML атрибут) name
   */
  get name() {
    const setting = this.settings.find((item) => item.name === 'name') as DynamicComponentSetting;
    return setting.value;
  }

  /**
   * (Hook) created
   */
  created() {
    this.dynamicFormBus.$on('clear', this.clearForm);
  }

  /**
   * (Hook) beforeDestroy
   */
  beforeDestroy() {
    this.dynamicFormBus.$off('clear', this.clearForm);
  }

  /**
   * Очищение данных всех дочерних полей
   */
  clearForm() {
    if (this.col.entityId) {
      useRepo(FormData).where('id', this.col.entityId).update({ value: '' });
    }
    this.clear(this.col.rows);
  }

  /**
   * Рекурсивное очищение полей от данных
   * @param rows
   * @private
   */
  private clear(rows: Row[]) {
    rows.forEach((row1) => {
      const row = useRepo(Row).with('cols').find(row1.id);

      if (row && row.cols) {
        row.cols.forEach((col1) => {
          if (col1.entityId) {
            useRepo(FormData)
              .where('id', col1.entityId)
              .update({ value: '' });
          }

          const col = useRepo(Col)
            .with('rows')
            .find(col1.id);

          if (col && col.rows) {
            this.clear(col.rows);
          }
        });
      }
    });
  }
}
</script>
