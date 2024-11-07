<template>
  <label class="label" :for="id">
    <div class="label__text">{{title}}</div>
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { DynamicComponentSetting } from '@/models/components/BaseDynamicComponent';
import DynamicInputComponent       from '@/models/components/DynamicInputComponent';
import Component                   from 'vue-class-component';
import { Prop, Vue }               from 'vue-property-decorator';

@Component
export default class DynamicLabel extends Vue {
  /**
   * Настройки компонента
   */
  @Prop() settings!: DynamicInputComponent['props']['settings'];

  /**
   * (HTML атрибут) ID
   */
  get id() {
    const setting = this.settings.find((item) => item.name === 'id') as DynamicComponentSetting;
    return setting.value;
  }

  /**
   * Текст label
   */
  get title() {
    const setting = this.settings.find((item) => item.name === 'title') as DynamicComponentSetting;
    return setting.value;
  }
}
</script>

<style lang="scss" scoped>
.label {
  display: block;

  &__text {
    margin-bottom: 5px;
  }
}
</style>
