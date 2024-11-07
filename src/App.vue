<script lang="ts">
import FormDynamicBuilderService from '@/services/form-dynamic-builder.vue';
import Component                 from 'vue-class-component';
import { Vue }                   from 'vue-property-decorator';

@Component({
  components: {
    FormDynamicBuilderService,
  },
})
export default class App extends Vue {}
</script>

<template>
  <div id="app">
    <FormDynamicBuilderService>
      <router-view/>
    </FormDynamicBuilderService>
  </div>
</template>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap-grid';
@import 'node_modules/bootstrap/scss/utilities/sizing';
@import 'node_modules/bootstrap/scss/utilities/position';
@import 'node_modules/bootstrap/scss/bootstrap-reboot';

body {
  font-family: Roboto, sans-serif;
}

.form-control {
  border: 2px solid #a9aabc;
  border-radius: 10px;
  padding: 5px 10px;
  width: 100%;
  background-color: #fff;

  &:focus-visible {
    outline-color: #d66c00;
  }
}

.router-link-exact-active {
  color: #da00c8;
  text-decoration: underline;
}
</style>
