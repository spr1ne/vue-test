<template>
  <div>
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input
      :id="id"
      type="text"
      class="input"
      ref="inputElement"
      :value="value"
      autocomplete="off"
      :placeholder='placeholder'
      :required='required'
      @input="onInput"
      @invalid="onInvalid"
    />
    <UiError v-if="isInvalid" :error="errorMsg"></UiError>
  </div>
</template>

<script lang="ts">
import UiError                     from '@/components/ui/ui-error.vue';
import Col                         from '@/models/Col';
import { DynamicComponentSetting } from '@/models/components/BaseDynamicComponent';
import DynamicInputComponent       from '@/models/components/DynamicInputComponent';
import Component                   from 'vue-class-component';
import {
  Emit, Prop, Ref, Vue,
}                                  from 'vue-property-decorator';

@Component({
  components: {
    UiError,
  },
})
export default class DynamicText extends Vue {
  /**
   * (Emit) Изменение значения input
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit('onInput') onInput(event: KeyboardEvent) {
    this.isInvalid = false;
  }

  /**
   * Строка
   */
  @Prop() row!: Col;

  /**
   * Колонка
   */
  @Prop() col!: Col;

  /**
   * Значение для input
   */
  @Prop() value!: string;

  /**
   * ID формы
   */
  @Prop() formId!: number;

  /**
   * Настройки компонента
   */
  @Prop() settings!: DynamicInputComponent['props']['settings'];

  /**
   * Элемент input
   */
  @Ref('inputElement') inputElement!: HTMLInputElement;

  /**
   * Поле невалидно
   */
  isInvalid = false;

  /**
   * Сообщение с ошибкой
   */
  errorMsg = ''

  /**
   * (HTML атрибут) ID
   */
  get id() {
    const setting = this.settings.find((item) => item.name === 'id') as DynamicComponentSetting;
    return setting.value;
  }

  /**
   * (HTML атрибут) placeholder
   */
  get placeholder() {
    const setting = this.settings.find((item) => item.name === 'placeholder') as DynamicComponentSetting;
    return setting.value;
  }

  /**
   * (HTML атрибут) required
   */
  get required() {
    const setting = this.settings.find((item) => item.name === 'required') as DynamicComponentSetting;
    return setting.value;
  }

  onInvalid(event: Event) {
    this.isInvalid = true;
    this.errorMsg = 'Поле не должно быть пустым';
    event.preventDefault();
  }
}
</script>

<style lang="scss" scoped>
$border-color: #d5d5d5;
$border-color-disabled: #cfcfcf;
$bg-color: transparent; // 1
$bg-color-hover: transparent;
$border-color-hover: #e4e4e4;
$shadow-color-focus: rgba(0, 0, 0, .1);
$placeholder-text-color: #9b9997;
$text-color: #37352f;
$focus-border-color: #f4bd00;
$box-shadow-inset-color: rgba(51, 51, 51, .15);

.input {
  background: $bg-color;
  border: 1px solid $border-color;
  border-radius: 3px;
  box-shadow: inset 1px 1px 4px $box-shadow-inset-color;
  box-sizing: border-box;
  color: $text-color;
  display: block;
  font-size: 18px;
  font-weight: 500;
  height: 50px;
  padding: 2px 0 0 18px;
  transition: .2s all cubic-bezier(.4, 0, .2, 1);
  width: 100%;

  &::placeholder {
    color: $placeholder-text-color;
  }

  &:hover {
    background: $bg-color-hover;
    border-color: $border-color-hover;
  }

  // sass-lint:disable no-important
  &:focus {
    border-color: $focus-border-color !important;
    box-shadow: 0 3px 11px $shadow-color-focus;
    outline: none;
  }

  &:disabled {
    background: transparent;
    border: 1px solid $border-color-disabled;
    cursor: no-drop;
    opacity: .4;
  }
}
</style>
