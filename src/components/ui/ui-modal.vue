<template>
  <div class="modal"
       :class="{ 'modal_open': isOpened && initialized }">
    <div class="modal__backdrop" @click="onClose" @keydown.esc="onClose"></div>
    <div class="modal__content">
      <button type="button"
              class="modal__close-btn"
              @click.stop="onClose">Закрыть</button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue            from 'vue';
import Component      from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

@Component
export default class UiModal extends Vue {
  /**
   * (Emit) Закрытие модального окна
   */
  @Emit('close') close() { }

  /**
   * Модальное окно открыто
   */
  @Prop({ default: true }) isOpened!: boolean;

  /**
   * Компонент инициализирован
   */
  initialized = false;

  /**
   * (Hook) mounted
   */
  mounted() {
    // Задержка 500мс перед открытием
    setTimeout(() => {
      this.initialized = true;
    }, 300);
  }

  /**
   * Нажатие на кнопку "Закрыть"
   */
  onClose() {
    this.close();
  }
}
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: auto;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  transform: scale(1.15);
  transition: transform .3s cubic-bezier(0.4, 0.0, 0.2, 1),
              opacity .3s cubic-bezier(0.4, 0.0, 0.2, 1);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &_open {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  }

  &_open &__backdrop {
    opacity: 1;
    visibility: visible;
  }

  &__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
  }

  &__content {
    z-index: 1;
    flex-grow: 0;
    min-width: 300px;
    background-color: #fff;
    border: 3px solid #d66c00;
    border-radius: 10px;
    padding: 25px 30px;
  }

  &__close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 10px;
    background-color: #5182ff;
    color: white;
    padding: 10px 15px;
  }
}
</style>
