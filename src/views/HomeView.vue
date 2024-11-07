<template>
  <div class="container">
    <ui-navigation class="mt-4 mb-4"></ui-navigation>

    <h1>Описание</h1>

    <p>Приложение позволяет конфигурировать формы (адаптивные под разные устройства), а затем
      использовать их.</p>
    <p>В приложении существуют несколько разделов:</p>
    <ol>
      <li>Создание форм</li>
      <img src="/img/m1.png" width="400" alt="Создание форм">
      <li>Заполнение форм</li>
      <img src="/img/m2.png" width="400" alt="Заполнение форм">
      <img src="/img/m3.png" width="400" alt="Заполнение форм">
      <img src="/img/m4.png" width="400" alt="Заполнение форм">
    </ol>

    <p>Основной функционал реализован в разделе "Создание форм", более подробно о его возможностях
      читайте ниже.</p>

    <h2>Возможности конфигуратора</h2>

    <ol>
      <li>Конфигурировать сетку формы без ограничений (уровень вложенности не ограничен)</li>
      <img src="/img/1.png" width="400" alt="Конфигурация сетки формы">
      <li>Конфигурация осуществляется через popup меню
        <ol>
          <li>Меню компонента</li>
          <img src="/img/2.png" width="400" alt="Меню компонента">
          <li>Меню колонки</li>
          <img src="/img/3.png" width="400" alt="Меню колонки">
          <li>Не инициализированная колонка</li>
          <img src="/img/4.png" width="400" alt="Не инициализированная колонка">
        </ol>
      </li>
      <li>Настройка колонки</li>
      <img src="/img/5.png" width="400" alt="Настройка колонки">
      <li>Настройка компонента</li>
      <img src="/img/6.png" width="400" alt="Настройка компонента">
      <li>Для выбора доступно 5 компонентов</li>
      <img src="/img/7.png" width="400" alt="Доступные компоненты">
      <li>В компоненты Form, Label можно вкладывать другие компоненты</li>
      <li>На форме может располагаться несколько независимых форм
        (<a href="/img/a1.mp4">Демонстрация
        работы на видео</a>)
      </li>
      <img src="/img/a1.png" width="400" alt="Демонстрация работы">
    </ol>

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
  get forms() {
    return useRepo(Form)
      .all();
  }
}
</script>
