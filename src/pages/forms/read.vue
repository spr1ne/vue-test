<template>
  <div>
    <div class="title">
      <h2 class="title__text">Заполнение формы "{{form.title}}"</h2>
      <span class="title__id">(ID:&nbsp;{{ this.$route.params.id }})</span>
    </div>

    <FormDynamic :form="form"></FormDynamic>
  </div>
</template>

<script lang="ts">
import FormDynamic from '@/components/form-dynamic/form-dynamic.vue';
import UiError     from '@/components/ui/ui-error.vue';
import Form        from '@/models/Form';
import { useRepo } from 'pinia-orm';
import Component   from 'vue-class-component';
import { Vue }     from 'vue-property-decorator';

@Component({
  components: {
    UiError,
    FormDynamic,
  },
})
export default class PagesFormsRead extends Vue {
  get form() {
    const formId = this.$route.params.id;
    return useRepo(Form).withAllRecursive(2).find(formId);
  }
}
</script>

<style scoped lang="scss">
.title {
  display: inline-block;
  color: #fff;
  box-shadow: 8px 6px 0 0 #a9aabc;
  background-color: #22c197;
  border: 1px solid #444655;
  border-radius: 10px;
  padding: 5px 15px;
  margin-bottom: 24px;

  &__text {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 0;
    margin-right: 10px;
  }

  &__id {
    font-size: 12px;
    vertical-align: middle;
  }
}
</style>
