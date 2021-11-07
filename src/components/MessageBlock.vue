<script lang="ts" setup>
import { defineProps } from "vue";
import { MESSAGE_TYPE } from "../types/Message";


defineProps<{
  message: any; // has error on if defined string
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
