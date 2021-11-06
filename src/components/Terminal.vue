<script setup lang="ts">
import Cursor from "./Cursor.vue";
import { defineProps, ref, defineEmits } from "vue";

import { ICommand } from "../types/Command";
import { reversePolish } from "../utils/calc";

defineProps<{ title: string }>();

defineEmits<{
  (e: "closeTerminal"): void;
}>();

let cmds = ref<ICommand[]>([]);
let combinedCmd = ref<string>("");

const appendCommand = (item: ICommand) => {
  cmds.value.push(item);
};

const receivedCommandHandler = function (msg: string): void {
  const inputValue: string = combinedCmd.value + " " + msg;
  const computedValue = reversePolish(inputValue);

  console.log(computedValue);

  let response: string = msg;
  if (computedValue !== "") {
    response = computedValue.toString();
    combinedCmd.value = "";
  } else {
    combinedCmd.value = inputValue;
  }

  const cmdItem: ICommand = {
    cmd: msg,
    response: response,
  };

  appendCommand(cmdItem);
};
</script>

<template>
  <div class="combined-cmd">
    {{ combinedCmd }}
  </div>

  <div class="cli">
    <h1>{{ title }}</h1>
    <div class="description">Enter q, or Ctrl + D to close the Calculator</div>
    <Cursor
      @submit-command="receivedCommandHandler"
      @close-terminal="$emit('closeTerminal')"
    >
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
