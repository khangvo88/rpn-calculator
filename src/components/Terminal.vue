<script setup lang="ts">
import Cursor from "./Cursor.vue";
import { defineProps, ref } from "vue";

import { ICommand } from "../types/Command";
import { reversePolish } from "../utils/calc";

defineProps<{ title: string }>();

let cmds = ref<ICommand[]>([]);

const appendCommand = (item: ICommand) => {
  cmds.value.push(item);
};

const receivedCommandHandler = function (msg: string): void {
  const cmdItem: ICommand = {
    cmd: msg,
    response: reversePolish(msg).toString(),
  };

  appendCommand(cmdItem);
};
</script>

<template>
  <div class="cli">
    <h1>{{ title }}</h1>
    <div class="description">Enter q, or Ctrl + D to close the Calculator</div>
    <Cursor @submit-command="receivedCommandHandler">
      <span v-for="(item, index) in cmds" :key="index">
        $ {{ item.cmd }}
        <div>{{ item.response }}</div>
        <br />
      </span>
    </Cursor>
  </div>
</template>

<style lang="scss" scoped>
.cli {
  padding: 5px;
  background-color: $color_cli_background;
  color: $color_cli_text;
  text-align: left;
  margin: 0;
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
}

h1 {
  margin-top: 0;
  margin-bottom: 0.2em;
}

.description {
  margin-bottom: 20px;
}
</style>
