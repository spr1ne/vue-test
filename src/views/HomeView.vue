<template>
  <div class="container">
    <div class="row">
      <div class="col-12">

        <ui-navigation class="mt-4 mb-4"></ui-navigation>

        <h1>Описание</h1>

        <p>Приложение позволяет конфигурировать формы (адаптивные под разные устройства), а затем
          использовать их.</p>
        <p>В приложении существуют несколько разделов:</p>
        <ol>
          <li>
            Создание форм
            <img src="img/m1.png" alt="Создание форм">
          </li>

          <li>Заполнение форм
            <img src="img/m2.png" alt="Заполнение форм">
            <img src="img/m3.png" alt="Заполнение форм">
            <img src="img/m4.png" alt="Заполнение форм">
          </li>
        </ol>

        <p>Основной функционал реализован в разделе "Создание форм", более подробно о его
          возможностях
          читайте ниже.</p>

        <h2>Возможности конфигуратора</h2>

        <ol>
          <li>Конфигурировать сетку формы без ограничений (уровень вложенности не ограничен)
            <img src="img/1.png" alt="Конфигурация сетки формы">
          </li>
          <li>Конфигурация осуществляется через popup меню
            <ol>
              <li>Меню компонента
                <img src="img/2.png" alt="Меню компонента">
              </li>
              <li>Меню колонки
                <img src="img/3.png" alt="Меню колонки">
              </li>
              <li>Не инициализированная колонка
                <img src="img/4.png" alt="Не инициализированная колонка">
              </li>
            </ol>
          </li>
          <li>Настройка колонки
            <img src="img/5.png" alt="Настройка колонки">
          </li>
          <li>Настройка компонента
            <img src="img/6.png" alt="Настройка компонента">
          </li>
          <li>Для выбора доступно 5 компонентов
            <img src="img/7.png" alt="Доступные компоненты">
          </li>
          <li>В компоненты Form, Label можно вкладывать другие компоненты</li>
          <li>На форме может располагаться несколько независимых форм
            (<a href="img/a1.mp4">Демонстрация
              работы на видео</a>)
            <img src="img/a1.png" alt="Демонстрация работы">
          </li>
        </ol>

      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import UiNavigation from '@/components/ui/ui-navigation.vue';
import Form         from '@/models/Form';
import { useRepo }  from 'pinia-orm';
import Component    from 'vue-class-component';
import { Vue }      from 'vue-property-decorator';

@Component({
  components: {
    UiNavigation,
  },
})
export default class HomeView extends Vue {
}
</script>

<style lang="scss" scoped>
img {
  display: block;
  max-width: 100%;
}
</style>
