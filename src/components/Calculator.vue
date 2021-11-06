<script setup>
import Terminal from "./Terminal.vue";
import { ref } from "vue";

let terminalEnabled = ref(true);
</script>

<template>
  <div>My title</div>
  <div v-if="!terminalEnabled">
    <div>
      You have just closed the terminal, click below button to open again
    </div>
    <button @click="terminalEnabled = true">Open terminal</button>
  </div>

  <Terminal
    v-if="terminalEnabled"
    title="My Calculator"
    @close-terminal="terminalEnabled = false"
  />
</template>

<style lang="scss" scoped></style>
