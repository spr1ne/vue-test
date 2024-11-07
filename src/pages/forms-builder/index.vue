<template>
  <div>
    <div class="mb-3">
      <h1 class="title">Создание форм</h1>
      <UiButton :options="{ inline: true, green: true }" @click="onCreate">Создать</UiButton>
    </div>

    <div class="grid" v-if="forms && forms.length">

      <div class="form" v-for="form in forms" :key="form.id">
        <div class="form__header">
          <div class="form__title">
            <router-link :to="{ name: 'formEdit', params: { id: form.id }}">
              {{ form.title }}
            </router-link>
          </div>
        </div>

        <div class="form__content">
          <div class="form__id">ID: {{ form.id }}</div>
          {{ form.description }}
        </div>

        <div class="form__footer">
          <UiButton :options="{ inline: true, red: true }"
                    @click="onDelete(form)">Удалить
          </UiButton>
        </div>
      </div>

    </div>

    <div v-else>
      <UiButton :options="{ inline: true, red: true }" @click="onCreate">
        Еще нет созданных форм
      </UiButton>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import UiButton from '@/components/ui/ui-button.vue';
import Form from '@/models/Form';
import { useRepo } from 'pinia-orm';
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component({
  components: { UiButton },
})
export default class PagesFormsBuilderIndex extends Vue {
  /**
   * Все формы
   */
  get forms() {
    return useRepo(Form)
      .all();
  }

  /**
   * (Handler) Создать форму
   */
  onCreate() {
    this.$router.push({ name: 'new' });
  }

  /**
   * (Handler) Удалить форму
   * @param form
   */
  onDelete(form: Form) {
    // eslint-disable-next-line no-alert
    const result = window.confirm('Вы действительно хотите удалить форму?');

    if (result) {
      useRepo(Form)
        .destroy(form.id);
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: inline-block;
  margin-right: 15px;
  vertical-align: middle;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;

  @media (width <= 576px) {
    grid-template-columns: repeat(1, 1fr)
  }
}

.form {
  border: 1px solid #444655;
  border-radius: 10px;
  background-color: #5182ff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  box-shadow: 8px 6px 0 0 #a9aabc;

  &__header {
    border-bottom: 1px solid #fff;
    padding: 10px 15px;

    a {
      color: white;
      font-size: 27px;
      font-weight: 700;
      letter-spacing: 3px;
    }
  }

  &__id {
    font-size: 10px;
    color: #fff;
  }

  &__content {
    padding: 10px 15px;
    color: white;
  }

  &__footer {
    border-top: 1px solid #fff;
    padding: 10px 15px;
    display: flex;
    justify-content: flex-end;
    max-height: 59px;
  }
}
</style>
