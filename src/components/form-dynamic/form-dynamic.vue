<template>
  <form>
    <div>
      <dynamic-row v-for="row in form.rows"
                   :key="row.id"
                   :rowId="row.id"
                   :formId="form.id"></dynamic-row>
    </div>
  </form>
</template>

<script lang="ts">
import DynamicRow    from '@/components/form-dynamic/dynamic-row.vue';
import Form          from '@/models/Form';
import Component     from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    DynamicRow,
  },
})
export default class FormDynamic extends Vue {
  /**
   * Форма
   */
  @Prop() form!: Form[];
}
</script>
