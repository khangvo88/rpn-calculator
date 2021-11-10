<script setup lang="ts">
import TerminalCursor from "./TerminalCursor.vue";
import { ref } from "vue";

import { ICommand } from "../types/Command";
import { IMessage, MESSAGE_TYPE } from "../types/Message";
import rpnCalculator from "../utils/calculator/RpnCalculator";
import MessageBlock from "./MessageBlock.vue";

// eslint-disable-next-line no-undef
defineProps<{ title?: string }>();

// eslint-disable-next-line no-undef
defineEmits<{
  (e: "closeTerminal"): void;
}>();

// history commands
let cmds = ref<ICommand[]>([]);
let combinedCmd = ref<string>("");
let message = ref<IMessage>({
  message: "",
  type: MESSAGE_TYPE.WARNING,
});

const appendCommand = (item: ICommand) => {
  cmds.value.push(item);
};

const setErrorMessage = (msg: string): void => {
  message.value = {
    message: msg,
    type: MESSAGE_TYPE.ERROR,
  };
};
const setWarningMessage = (msg: string): void => {
  message.value = {
    message: msg,
    type: MESSAGE_TYPE.WARNING,
  };
};
const clearMessage = (): void => {
  message.value = {
    message: "",
    type: MESSAGE_TYPE.WARNING,
  };
};
const resetCalculator = (): void => {
  combinedCmd.value = "";
  cmds.value = [];
  message.value = {
    message: "Your calculator was reset",
    type: MESSAGE_TYPE.WARNING,
  };
};

const receivedCommandHandler = function (msg: string): void {
  const inputValue: string = combinedCmd.value + " " + msg;
  const computedValues = rpnCalculator.process(inputValue);

  clearMessage();

  let response: string = msg;
  if (!computedValues?.length) {
    setErrorMessage(
      "There is something wrong with syntax. The calculator cleared"
    );
    combinedCmd.value = "";
  } else {
    const lastValue = Number(computedValues[computedValues.length - 1]);
    response = lastValue.toString();

    if (isNaN(lastValue) || !isFinite(lastValue)) {
      setWarningMessage("last computed is not a number. Reset last value");
      combinedCmd.value = "";
    } else {
      if (computedValues.length > 1) {
        setWarningMessage("Waiting for more input.");
      } else {
        clearMessage();
      }
      combinedCmd.value = computedValues.join(" ");
    }
  }

  const cmdItem: ICommand = {
    cmd: msg,
    response: response,
  };

  appendCommand(cmdItem);
};
</script>

<template>
  <div class="cli">
    <h1>{{ title }}</h1>
    <div class="description">
      <div>Enter q, or Ctrl + D to close the Calculator</div>
      <div>Enter c to reset the value</div>
    </div>
    <div class="combined-cmd last-value">Stored: {{ combinedCmd }}</div>

    <MessageBlock
      class="message-block"
      :message="message.message"
      :type="message.type"
    />
    <TerminalCursor
      @submit-command="receivedCommandHandler"
      @close-terminal="$emit('closeTerminal')"
      @send-error-message="setErrorMessage"
      @reset-keydown="resetCalculator"
    >
      <span v-for="(item, index) in cmds" :key="index">
        $ {{ item.cmd }}
        <div>{{ item.response }}</div>
        <br />
      </span>
    </TerminalCursor>
  </div>
</template>

<style lang="scss" scoped>
.cli {
  background-color: $color_cli_background;
  color: $color_cli_text;
  text-align: left;
  margin: 0;
  //width: 800px;
  width: calc(100vw - 20px);
  min-height: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;

  > * {
    margin-left: 10px;
    margin-right: 10px;
  }
}

h1 {
  padding-top: 10px;
  margin-bottom: 0.2em;
}

.message-block {
  margin-top: 10px;
  margin-bottom: 10px;
}

.description {
  margin-bottom: 20px;
}
</style>
