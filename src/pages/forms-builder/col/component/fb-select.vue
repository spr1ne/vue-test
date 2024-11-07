<template>
  <div>
    <label for="component">
      Выберите компонент:
    </label>
    <div>
      <select name="component"
              class="form-control"
              id="component"
              :value="selected"
              @change="onSelect">
        <option disabled value="">Выберите компонент</option>
        <option value="dynamic-form">Form</option>
        <option value="dynamic-label">Label</option>
        <option value="dynamic-text">Text</option>
        <option value="dynamic-button">Button</option>
        <option value="dynamic-button-clear">Button (Clear)</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import Component           from 'vue-class-component';
import { Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FbComponentTypeSelect extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit('change') onSelect(event: Event) {}

  @Prop() selected!: string;
}
</script>
