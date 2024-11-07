<template>
  <p class="input-message input-message_warning"><span>{{error}}</span></p>
</template>

<script lang="ts">
import Component     from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';

@Component
export default class UiError extends Vue {
  @Prop() error!: string;
}
</script>

<style lang="scss">
$text-color: #37352f;
$message-bg-color: #fbfbfb;
$message-border-color: #ebebeb;
$message-icon-bg-color: #da4949;
$message-icon-border-color: #c54e4e;
$message-info-bg-color: #5392f7;
$message-info-border-color: #3976d9;
$message-warning-bg-color: #fff3d2;
$message-warning-border-color: #ffda7b;
$message-warning-text-color: #8b7227;
$message-icon-text-color: #fff;
$radio-label-color: #6a6a6a;

// sass-lint:disable no-important
.input-message {
  background: $message-bg-color;
  border: 1px solid $message-border-color;
  border-radius: 3px;
  color: $text-color;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  margin-bottom: 4px;
  padding: 3px 8px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  &_info::before {
    background: $message-info-bg-color !important;
    border: 1px solid $message-info-border-color !important;
  }

  &_warning {
    background: $message-warning-bg-color;
    border: 1px solid $message-warning-border-color;

    span {
      color: $message-warning-text-color;
      margin-left: 0 !important;
    }

    &::after,
    &::before {
      display: none !important;
    }
  }

  span {
    margin-left: 6px;
    vertical-align: middle;
  }

  &::before {
    background: $message-icon-bg-color;
    border: 1px solid $message-icon-border-color;
    border-radius: 50%;
    color: $message-icon-text-color;
    content: '!';
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    height: 14px;
    line-height: 14px;
    position: relative;
    text-align: center;
    user-select: none;
    vertical-align: middle;
    width: 14px;
  }
}
</style>
