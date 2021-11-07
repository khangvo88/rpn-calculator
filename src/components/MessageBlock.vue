<script lang="ts" setup>
import { MESSAGE_TYPE } from "../types/Message";

// Disable since it conflict with message of Vue 3 SFC
// eslint-disable-next-line no-undef
defineProps<{
  message: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  type: MESSAGE_TYPE;
}>();
</script>

<template>
  <div class="messages">
    <div v-if="message" :class="`message message--${type}`">
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss">
.messages {
  min-height: 20px;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid yellow;
  margin-bottom: 5px;

  .message {
    font-size: 12px;
    &--error {
      color: red;
    }

    &--warning {
      color: yellow;
    }
  }
}
</style>
