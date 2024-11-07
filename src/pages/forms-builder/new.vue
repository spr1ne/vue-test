<template>
  <UiModal @close="onClose">
    <h1>Создать форму</h1>

    <form @submit.prevent="onSubmit">
      <div class="mb-2">
        <label for="title">
          Название формы:
        </label>
        <div>
          <input type="text"
                 class="form-control"
                 name="title"
                 id="title"
                 v-model="title"/>
        </div>
      </div>

      <div class="mb-3">
        <label for="description">
          Описание:
        </label>
        <div>
          <textarea type="text"
                    class="form-control"
                    rows="4"
                    name="description"
                    id="description"
                    v-model="description"/>
        </div>
      </div>

      <div>
        <UiButton>Создать</UiButton>
      </div>
    </form>
  </UiModal>
</template>

<script lang="ts">
import UiButton    from '@/components/ui/ui-button.vue';
import UiModal     from '@/components/ui/ui-modal.vue';
import Form        from '@/models/Form';
import { useRepo } from 'pinia-orm';
import Component   from 'vue-class-component';
import { Vue }     from 'vue-property-decorator';

@Component({
  components: { UiButton, UiModal },
})
export default class PagesFormsBuilderNew extends Vue {
  title = '';

  description = '';

  onSubmit() {
    const formRepo = useRepo(Form);
    debugger;
    const form     = formRepo.save({
      title:       this.title,
      description: this.description,
      rows:        [],
    });

    this.$router.push({
      name:   'formEdit',
      params: { id: form.id },
    });
  }

  onClose() {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="scss">

</style>
