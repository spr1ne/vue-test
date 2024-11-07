import Vue       from 'vue';
import Component from 'vue-class-component';

@Component
export default class RouterMixin extends Vue {
  navigateToParent() {
    const path = this.$route.path.split('/');

    if (path.length > 0) {
      path.splice(path.length - 2);
      this.$router.push(path.join('/'));
    }
  }
}
