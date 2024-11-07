<template>
  <div class="row mb-4">
    <DynamicCol v-for="col in row.cols"
           :key="col.id"
           :colId="col.id"
           :row="row"
           :formId="formId"></DynamicCol>
  </div>
</template>

<script lang="ts">
import Row           from '@/models/Row';
import { useRepo }   from 'pinia-orm';
import Component     from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    // Динамический импорт необходим, чтобы избежать циклической зависимости
    DynamicCol: () => import('./dynamic-col.vue'),
  },
})
export default class DynamicRow extends Vue {
  /**
   * ID строки
   */
  @Prop() rowId!: string;

  /**
   * ID формы
   */
  @Prop() formId!: string;

  /**
   * Строка
   */
  get row() {
    return useRepo(Row)
      .with('col')
      .with('cols')
      .find(this.rowId);
  }
}
</script>
