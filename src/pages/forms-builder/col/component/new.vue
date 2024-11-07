<template>
  <div>
    <UiModal @close="navigateToParent">
      <h1>Создать компонент</h1>

      <FbComponentTypeSelect class="mb-2"
                             @change="onSelect"></FbComponentTypeSelect>

      <BuilderComponent @submit="onSubmit" :component="componentInstance" v-if="componentInstance">
        <UiButton class="mt-3">Создать</UiButton>
      </BuilderComponent>
    </UiModal>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import BuilderComponent                from '@/components/form-dynamic-builder/builder-component.vue';
import UiButton                        from '@/components/ui/ui-button.vue';
import UiModal                         from '@/components/ui/ui-modal.vue';
import RouterMixin                     from '@/mixins/router';
import Col                             from '@/models/Col';
import ComponentsRegistry              from '@/models/components';
import { DynamicComponentSetting }     from '@/models/components/BaseDynamicComponent';
import DynamicButtonComponent          from '@/models/components/DynamicButtonComponent';
import DynamicFormComponent            from '@/models/components/DynamicFormComponent';
import DynamicInputComponent           from '@/models/components/DynamicInputComponent';
import DynamicLabelComponent           from '@/models/components/DynamicLabelComponent';
import FbComponentTypeSelect           from '@/pages/forms-builder/col/component/fb-select.vue';
import { Constructor, useRepo } from 'pinia-orm';
import Component, { mixins }           from 'vue-class-component';

@Component({
  components: {
    FbComponentTypeSelect,
    UiButton,
    UiModal,
    BuilderComponent,
  },
})
export default class PagesFormsBuilderColEditComponentNew extends mixins(RouterMixin) {
  componentInstance: ComponentsRegistry[keyof ComponentsRegistry] | null = null;

  settings = {};

  onSubmit() {
    if (!this.componentInstance) {
      return;
    }

    // eslint-disable-next-line max-len
    const component = useRepo(this.componentInstance.constructor as Constructor<ComponentsRegistry[keyof ComponentsRegistry]>)
      .save(this.componentInstance);

    const col = useRepo(Col).find(this.$route.params.colId) as Col;

    col.componentId   = component.id;
    col.componentType = component.$entity();

    useRepo(Col)
      .save(col);

    this.$router.push({
      name:   'componentEdit',
      params: { componentId: component.id },
    });
  }

  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const { value }     = selectElement;

    if (value === 'dynamic-text') {
      this.componentInstance = new DynamicInputComponent();
    } else if (value === 'dynamic-form') {
      this.componentInstance = new DynamicFormComponent();
    } else if (value === 'dynamic-button') {
      this.componentInstance = new DynamicButtonComponent();
    } else if (value === 'dynamic-label') {
      this.componentInstance = new DynamicLabelComponent();
    } else if (value === 'dynamic-button-clear') {
      const componentInstance = new DynamicButtonComponent();
      const setting           = componentInstance.props.settings.find((item) => item.name === 'event') as DynamicComponentSetting;
      setting.value           = 'clear';
      this.componentInstance  = componentInstance;
    }
  }
}
</script>
