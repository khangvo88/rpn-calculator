<script setup lang="ts">
import Terminal from "./Terminal.vue";
import { ref } from "vue";
import { KEYCODE_D, KEYCODE_Q } from "../constants";

let terminalEnabled = ref(true);

const keydownHandler = (e: {
  key: string;
  keyCode: number;
  ctrlKey: boolean;
}): void => {
  if (
    terminalEnabled &&
    (e.keyCode === KEYCODE_Q || (e.keyCode === KEYCODE_D && e.ctrlKey))
  ) {
    terminalEnabled.value = false;
  }
};
</script>

<template>
  <div v-if="!terminalEnabled" class="calculator-info">
    <div>
      You have just closed the terminal, click below button to open again
    </div>
    <button @click="terminalEnabled = true">Open terminal</button>
  </div>

  <Terminal
    v-if="terminalEnabled"
    tabindex="-1"
    class="terminal"
    title="CLI RPN Calculator"
    @close-terminal="terminalEnabled = false"
    @keydown="keydownHandler"
  />
</template>

<style lang="scss" scoped>
.terminal {
  height: 80vh;
}

.calculator-info {
  position: fixed;
  top: 0;
  width: 100vw;
}
</style>
