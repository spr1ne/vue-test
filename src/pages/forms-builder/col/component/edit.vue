<template>
  <div>
    <UiModal @close="navigateToParent">
      <h1>Редактировать компонент</h1>

      <FbComponentTypeSelect class="mb-2"
                             :selected="componentName"
                             @change="onSelect"></FbComponentTypeSelect>

      <BuilderComponent @submit="onSubmit" :component="component">
        <UiButton class="mt-3">Сохранить</UiButton>
      </BuilderComponent>
    </UiModal>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import BuilderComponent       from '@/components/form-dynamic-builder/builder-component.vue';
import UiButton               from '@/components/ui/ui-button.vue';
import UiModal                from '@/components/ui/ui-modal.vue';
import RouterMixin            from '@/mixins/router';
import Col                    from '@/models/Col';
import { DynamicComponentSetting } from '@/models/components/BaseDynamicComponent';
import DynamicButtonComponent from '@/models/components/DynamicButtonComponent';
import DynamicFormComponent   from '@/models/components/DynamicFormComponent';
import DynamicInputComponent  from '@/models/components/DynamicInputComponent';
import DynamicLabelComponent  from '@/models/components/DynamicLabelComponent';
import FbComponentTypeSelect  from '@/pages/forms-builder/col/component/fb-select.vue';
import { useRepo }            from 'pinia-orm';
import Component, { mixins }  from 'vue-class-component';

@Component({
  components: {
    UiButton, FbComponentTypeSelect, BuilderComponent, UiModal,
  },
})
export default class PagesFormsBuilderColEditComponentEdit extends mixins(RouterMixin) {
  get col() {
    return useRepo(Col).with('component').find(this.$route.params.colId) as Col;
  }

  get component() {
    return this.col.component;
  }

  get componentName() {
    return this.component.name;
  }

  onSubmit() {
    useRepo(Col).save(this.col);
    this.navigateToParent();
  }

  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const { value } = selectElement;

    if (value === 'dynamic-text') {
      this.col.component = new DynamicInputComponent();
    } else if (value === 'dynamic-form') {
      this.col.component = new DynamicFormComponent();
    } else if (value === 'dynamic-button') {
      this.col.component = new DynamicButtonComponent();
    } else if (value === 'dynamic-label') {
      this.col.component = new DynamicLabelComponent();
    } else if (value === 'dynamic-button-clear') {
      const componentInstance = new DynamicButtonComponent();
      const setting = componentInstance.props.settings.find((item) => item.name === 'event') as DynamicComponentSetting;
      setting.value = 'clear';
      this.col.component = componentInstance;
    }

    useRepo(Col).save(this.col);
  }
}
</script>
