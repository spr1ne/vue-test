<template>
  <button class="button"
          :class="{
            'button_red': options.red,
            'button_green': options.green,
            'button_inline': options.inline,
          }"
          :type="type"
          @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Component           from 'vue-class-component';
import { Emit, Prop, Vue } from 'vue-property-decorator';

interface Options {
  red: boolean;
  green: boolean;
  inline: boolean;
}

@Component
export default class UiButton extends Vue {
  /**
   * (Emit) Нажатие на кнопку
   * @param event
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit('click') onClick(event: Event) {}

  /**
   * Тип кнопки
   */
  @Prop({ default: 'submit' }) type!: string;

  /**
   * Опции кнопки
   */
  @Prop({
    default: () => ({
      red:    false,
      green:  false,
      inline: false,
    }),
  }) options!: Options;
}
</script>

<style lang="scss">
$btn-red-bg-color: #f54764;
$btn-red-hover-bg-color: #b60036;

$btn-green-bg-color: #22c197;
$btn-green-hover-bg-color: #008a64;

.button {
  border-radius: 10px;
  background-color: #5182ff;
  color: white;
  padding: 10px 15px;
  width: 100%;

  &:hover {
    background-color: #3e66ca;
  }

  &:focus-visible {
    background-color: #3e66ca;
  }

  &:disabled {
    cursor: no-drop;
    opacity: .6;
  }

  &_inline {
    display: inline-block;
    width: auto;
    min-width: initial;
    padding: 5px 10px;
  }

  &_green {
    background-color: $btn-green-bg-color;

    &:focus-visible {
      background: $btn-green-hover-bg-color;
    }

    &:hover {
      background: $btn-green-hover-bg-color;
    }
  }

  &_red {
    color: #ffffff;
    background: $btn-red-bg-color;

    &:focus-visible {
      background: $btn-red-hover-bg-color;
    }

    &:hover {
      background: $btn-red-hover-bg-color;
    }
  }
}
</style>
