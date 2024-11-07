<template>
  <div class="container-fluid container-md">
    <ui-navigation class="mt-4 mb-4"></ui-navigation>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import UiNavigation from '@/components/ui/ui-navigation.vue';
import Component    from 'vue-class-component';
import { Vue }      from 'vue-property-decorator';

@Component({
  components: {
    UiNavigation,
  },
})
export default class FormsBuilderView extends Vue {
}
</script>
