<template>
  <vue-suspense v-model="form" :promise="loadData()">
    <div>
      <div class="title">
        <h2 class="title__text">Редактор формы "{{form.title}}"</h2>
        <span class="title__id">(ID:&nbsp;{{ this.$route.params.id }})</span>
      </div>

      <BuilderForm :form="form"></BuilderForm>

      <router-view></router-view>
    </div>
    <template #error="{error}">
      {{ error }}
    </template>
  </vue-suspense>

</template>

<script lang="ts">
import BuilderForm     from '@/components/form-dynamic-builder/builder-form.vue';
import BuilderRow      from '@/components/form-dynamic-builder/builder-row.vue';
import Form            from '@/models/Form';
import { useRepo }     from 'pinia-orm';
import Component       from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';

@Component({
  components: {
    BuilderForm,
    BuilderRow,
  },
})
export default class PagesFormsEdit extends Vue {
  /**
   * EventBus для сообщения между компонентами
   */
  @Inject('fdb-event-bus') fdbEventBus!: Vue;

  /**
   * Загруженная форма
   */
  form = {};

  /**
   * (Hook) created
   */
  created() {
    this.fdbEventBus.$on('update-form', this.loadData);
  }

  /**
   * (Hook) beforeDestroy
   */
  beforeDestroy() {
    this.fdbEventBus.$off('update-form', this.loadData);
  }

  /**
   * Имитация загрузки данных
   */
  async loadData() {
    const formId = this.$route.params.id;
    const form = useRepo(Form)
      .withAllRecursive(2)
      .find(formId) || {};

    Object.assign(this.form, form);

    return new Promise((resolve) => {
      setTimeout(() => { resolve(form); }, 1000);
    });
  }
}
</script>

<style scoped lang="scss">
.title {
  display: inline-block;
  color: #fff;
  box-shadow: 8px 6px 0 0 #a9aabc;
  background-color: #5182ff;
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
