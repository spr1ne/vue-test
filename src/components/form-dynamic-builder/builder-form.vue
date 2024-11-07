<template>
  <div>
    <builder-row v-for="row in form.rows" :key="row.id" :rowId="row.id"></builder-row>

    <div class="ml-3 mt-3">
      <UiButton :options="{ inline: true, red: true }"
                @click="onAddRow">Добавить строку</UiButton>
    </div>
  </div>
</template>

<script lang="ts">
import BuilderRow    from '@/components/form-dynamic-builder/builder-row.vue';
import UiButton      from '@/components/ui/ui-button.vue';
import Col           from '@/models/Col';
import Form          from '@/models/Form';
import Row           from '@/models/Row';
import { useRepo }   from 'pinia-orm';
import Component     from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    UiButton,
    BuilderRow,
  },
})
export default class BuilderForm extends Vue {
  /**
   * Форма
   */
  @Prop() form!: Form;

  /**
   * (Handler) Добавление строки в форму
   */
  onAddRow() {
    const rowRepo = useRepo(Row);

    const row = rowRepo.save({
      formId: this.form.id,
      cols:   [],
    });

    useRepo(Col).save({
      rowId: row.id,
    });
  }
}
</script>
