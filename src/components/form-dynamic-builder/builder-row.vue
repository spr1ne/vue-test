<template>
  <div class="border-row">
<!--    <div class="orm-id">-->
<!--      {{row.id}}-->
<!--    </div>-->
    <div class="border-row__content" v-if="row.isFilled">
      <builder-col v-for="col in row.cols" :key="col.id" :row="row" :colId="col.id"></builder-col>
    </div>
  </div>
</template>

<script lang="ts">
import Row           from '@/models/Row';
import { useRepo }   from 'pinia-orm';
import Component     from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

@Component({
  name:       'builder-row',
  components: {
    // Динамический импорт необходим, чтобы избежать циклической зависимости
    BuilderCol: () => import('./builder-col.vue'),
  },
})
export default class BuilderRow extends Vue {
  /**
   * ID строки
   */
  @Prop() rowId!: string;

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

<style lang="scss">
.orm-id {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 10px;
  color: black;
}
.border-row {
  position: relative;
  border: 2px dashed red;
  border-radius: 5px;
  margin: 10px 15px;
  display: flex;
  flex: 1;

  &:hover {
    background: rgba(255, 175, 175, 0.6);
  }

  &__content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &_empty {
      align-content: center;
      justify-content: center;
    }
  }
}
</style>
