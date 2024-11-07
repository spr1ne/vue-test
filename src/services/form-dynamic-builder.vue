<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">

import Component        from 'vue-class-component';
import { Provide, Vue } from 'vue-property-decorator';

@Component
export default class FormDynamicBuilderService extends Vue {
  @Provide('fdb-event-bus') fdbEventBus = new Vue();
}
</script>
