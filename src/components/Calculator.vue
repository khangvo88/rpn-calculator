<script setup>

import Terminal from "./Terminal.vue";

</script>

<template>
  <div class="cli">
    <Terminal />
  </div>
</template>

<style lang="scss" scoped>

.cli {
  background-color: $color_cli_background;
  color: $color_cli_text;
  text-align: left;
  margin: 0;
  padding: 0;
  width: 800px;
  height: 400px;
}
</style>
