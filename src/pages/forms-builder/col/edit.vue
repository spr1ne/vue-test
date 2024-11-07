<template>
  <div>
    <UiModal @close="navigateToParent">
      <h1>Редактировать</h1>

      <div>
        Компонент:
      </div>

      <div class="mb-2">
        <template v-if="col.component">
          <UiButton :options="{ green: true, inline: true }" @click="onEditComponent">
            Редактировать
          </UiButton>
        </template>
        <template v-else>
          <UiButton :options="{ green: true, inline: true }" @click="onCreateComponent">
            Создать
          </UiButton>
        </template>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="mb-2">
          <label for="size">
            Размер колонки:
          </label>

          <div>
            <input type="text"
                   id="size"
                   class="form-control"
                   v-model="col.size">
          </div>
        </div>

        <div>
          <UiButton>Сохранить</UiButton>
        </div>
      </form>

    </UiModal>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import UiButton              from '@/components/ui/ui-button.vue';
import UiModal               from '@/components/ui/ui-modal.vue';
import RouterMixin           from '@/mixins/router';
import Col                   from '@/models/Col';
import { useRepo }           from 'pinia-orm';
import Component, { mixins } from 'vue-class-component';

@Component({
  components: {
    UiButton,
    UiModal,
  },
})
export default class PagesFormsBuilderColEdit extends mixins(RouterMixin) {
  /**
   * Колонка
   */
  get col() {
    return useRepo(Col)
      .with('component')
      .find(this.$route.params.colId) as Col;
  }

  /**
   * (Handler) Редактировать компонент
   */
  onEditComponent() {
    this.$router.push({
      name:   'componentEdit',
      params: { componentId: this.col.component.id },
    });
  }

  /**
   * (Handler) Создать компонент
   */
  onCreateComponent() {
    this.$router.push({
      name: 'componentNew',
    });
  }

  /**
   * Сохранить изменения
   */
  onSubmit() {
    useRepo(Col)
      .save(this.col);
    this.navigateToParent();
  }
}
</script>
