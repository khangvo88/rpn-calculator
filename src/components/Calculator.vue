<script setup>
import Terminal from "./Terminal.vue";
import { ref } from "vue";

let terminalEnabled = ref(true);
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
    class="terminal"
    title="CLI RPN Calculator"
    @close-terminal="terminalEnabled = false"
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
