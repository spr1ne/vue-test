<template>
  <button class="button"
          :type="type"
          @click="onClick">
    {{title}}
  </button>
</template>

<script lang="ts">
import { DynamicComponentSetting } from '@/models/components/BaseDynamicComponent';
import DynamicButtonComponent      from '@/models/components/DynamicButtonComponent';
import Component                   from 'vue-class-component';
import {
  Emit, Inject, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class DynamicButton extends Vue {
  @Inject('dynamic-form-bus') dynamicFormBus!: Vue;

  /**
   * (Событие) Нажатие на кнопку
   * @param event
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit('click') onClick(event: Event) {
    if (this.event) {
      this.dynamicFormBus.$emit(this.event as string);
    }
  }

  /**
   * Настройки компонента
   */
  @Prop() settings!: DynamicButtonComponent['props']['settings'];

  /**
   * Тип кнопки (по умолчанию submit)
   */
  get type() {
    const setting = this.settings.find((item) => item.name === 'type') as DynamicComponentSetting;
    return setting.value;
  }

  /**
   * Текст кнопки
   */
  get title() {
    const setting = this.settings.find((item) => item.name === 'title') as DynamicComponentSetting;
    return setting.value;
  }

  /**
   * Вызываемое событие при нажатии
   */
  get event() {
    const setting = this.settings.find((item) => item.name === 'event') as DynamicComponentSetting;
    return setting.value;
  }
}
</script>

<style scoped lang="scss">
$btn-text-color: #858585;
$btn-border-color: #ebebeb;
$btn-start-color: rgba(255, 255, 255, .06);
$btn-end-color: rgba(176, 182, 187, .06);
$btn-bg-color: #fff;
$btn-box-shadow-color: rgba(22, 29, 37, .05);
$btn-hover-border-color: rgba(0, 0, 0, .16);
$btn-hover-box-shadow: rgba(22, 29, 37, .05);
$btn-focus-border-color: #f4bd00;

.button {
  background: linear-gradient(
    180deg,
    $btn-start-color 0%,
    $btn-end-color 100%), $btn-bg-color;
  border: 1px solid $btn-border-color;
  border-radius: 4px;
  box-shadow: 0 1px 1px $btn-box-shadow-color;
  box-sizing: border-box;
  color: $btn-text-color;
  font-size: 14px;
  font-weight: 500;
  height: 36px;
  line-height: 16px;
  min-width: 110px;
  padding: 0;
  position: relative;
  top: -1px;
  width: 100%;

  &:hover {
    border: 1px solid $btn-hover-border-color;
    box-shadow: 0 1px 1px $btn-hover-box-shadow;
  }

  &:focus {
    border-color: $btn-focus-border-color;
    outline: none;
  }

  &:disabled {
    cursor: no-drop;
    opacity: .6;
  }
}
</style>
