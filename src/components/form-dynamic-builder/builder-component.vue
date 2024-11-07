<template>
  <form @submit.prevent="onSubmit">
    <div v-for="setting in settings" :key="setting.name">
      <div class="mb-2" v-if="setting.type === 'text'">
        <label :for="setting.name">
          {{ setting.title }}:
        </label>
        <div>
          <input type="text"
                 class="form-control"
                 :id="setting.name"
                 :name='setting.name'
                 v-model="setting.value"/>
        </div>
      </div>
      <div v-if="setting.type === 'checkbox'">
        <label :for="setting.name">
          {{ setting.title }}:
        </label>
        <div>
          <input type="checkbox"
                 :id="setting.name"
                 :name='setting.name'
                 v-model="setting.value">
        </div>
      </div>
    </div>

    <slot></slot>
  </form>
</template>

<script lang="ts">
import ComponentsRegistry  from '@/models/components';
import Component           from 'vue-class-component';
import { Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BuilderComponent extends Vue {
  /**
   * (Событие) Сохранение формы
   * @param event
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit('submit') onSubmit(event: FormDataEvent) { }

  /**
   * Компонент из ComponentsRegistry
   */
  @Prop() component!: ComponentsRegistry[keyof ComponentsRegistry];

  /**
   * Настройки компонента
   */
  get settings() {
    return this.component.props.settings.filter((item) => !item.hidden);
  }
}
</script>
