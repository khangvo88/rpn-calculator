<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

import {
  ALLOWED_KEYS,
  KEYCODE_ARROW_LEFT,
  KEYCODE_ARROW_RIGHT,
  KEYCODE_BACKSPACE,
  KEYCODE_C,
  KEYCODE_CTRL,
  KEYCODE_D,
  KEYCODE_ENTER,
  KEYCODE_Q,
  KEYCODE_SHIFT,
  KEYCODE_TAB,
} from "../constants";
import rpnCalculator from "@App/utils/calculator/RpnCalculator";

export default defineComponent({
  name: "TerminalCursor",
  // TODO: add typescript-check for emits
  emits: ["submitCommand", "closeTerminal", "sendErrorMessage", "resetKeydown"],
  setup() {
    // TODO: split cmd into composes and cursor into `composable/input.js` && `composable/cursor.js`
    const state = reactive({
      cmd: "",
      cursorPosition: 0 as number,
      isFocus: false,
    });
    return {
      ...toRefs(state),
    };
  },
  computed: {
    leftCmd() {
      return this.cmd.slice(0, Math.max(0, this.cursorPosition));
    },
    rightCmd() {
      return this.cmd.slice(this.cursorPosition + 1);
    },
    cursorCmd() {
      return this.cmd?.[this.cursorPosition] || " ";
    },
  },
  created() {
    const keysInOperators = [
      ...new Set(rpnCalculator.getAllowedOperators().join("").split("")),
    ];

    this.$options.allowedKeys = ALLOWED_KEYS.concat(keysInOperators);

    this.focusCursor();
  },
  methods: {
    _appendChar(char: string) {
      this.cmd =
        this.cmd.slice(0, this.cursorPosition + 1) +
        char +
        this.cmd.slice(this.cursorPosition + 1);
      this.cursorPosition += 1;
    },
    _deleteChar(position: number): void {
      if (position < 0 || position > this.cmd.length) {
        return;
      }
      const val = this.cmd;
      this.cmd = val.slice(0, position) + val.slice(position + 1);
      this.cursorPosition = Math.max(0, this.cursorPosition - 1);
    },
    scrollToLastCommand() {
      this.$nextTick(() => {
        const el = this.$refs.currentCmd as HTMLElement;
        el.scrollIntoView();
      });
    },
    focusCursor() {
      this.$nextTick(() => {
        (this.$refs.currentCmd as HTMLElement).focus();
      });
    },
    enter(): void {
      if (!this.cmd) {
        this.$emit("sendErrorMessage", "Please input some values");
        return;
      }

      this.$emit("submitCommand", this.cmd);
      this.cmd = "";
      this.cursorPosition = 0;

      this.scrollToLastCommand();
    },
    right(): void {
      this.cursorPosition = Math.min(this.cmd.length, this.cursorPosition + 1);
    },
    left(): void {
      this.cursorPosition = Math.max(0, this.cursorPosition - 1);
    },
    down(e: {
      keyCode: number;
      key: string;
      metaKey: boolean;
      ctrlKey: boolean;
    }): void {
      // TODO: implement Ctrl + W
      // TODO: implement Cmd + Left, Cmd + Right
      // TODO: implement up (history)1273098612983

      if (e.keyCode === KEYCODE_BACKSPACE || e.key === "Backspace") {
        this._deleteChar(this.cursorPosition - 1);
        return;
      }
      if (e.keyCode === KEYCODE_Q || (e.keyCode === KEYCODE_D && e.ctrlKey)) {
        this.$emit("closeTerminal");
        return;
      }
      if (e.keyCode === KEYCODE_C) {
        this.cmd = "";
        this.$emit("resetKeydown");
        this.focusCursor();
        return;
      }

      if (this.$options.allowedKeys.includes(e.key)) {
        if (e.key === "Tab" || e.keyCode === KEYCODE_TAB) {
          this._appendChar(" ");
        } else {
          this._appendChar(e.key);
        }
        this.scrollToLastCommand();
      } else {
        if (
          e.keyCode !== KEYCODE_SHIFT &&
          e.keyCode !== KEYCODE_ENTER &&
          e.keyCode !== KEYCODE_CTRL &&
          e.keyCode !== KEYCODE_ARROW_LEFT &&
          e.keyCode !== KEYCODE_ARROW_RIGHT &&
          !e.metaKey
        ) {
          const msg = `Sorry. "${e.key}" (Code: ${e.keyCode}) are not allowed in this terminal.`;
          this.$emit("sendErrorMessage", msg);
        }
      }
    },
    // del() {
    //   console.log('del');
    //   this._deleteChar(this.cursorPosition);
    // },
  },
});
</script>

<template>
  <!--  &lt;!&ndash; For debug only  &ndash;&gt;-->
  <!--  <div class="terminal-description">-->
  <!--    <div>-->
  <!--      <div>CMD: {{ cmd }} </div>-->
  <!--      <div>Position: {{ cursorPosition }}</div>-->
  <!--    </div>-->
  <!--  </div>-->

  <div
    id="cmd"
    tabindex="0"
    @keydown="down"
    @keydown.enter="enter"
    @keydown.left="left"
    @keydown.right="right"
    @focusin="isFocus = true"
    @focusout="isFocus = false"
  >
    <slot></slot>
    <span ref="currentCmd" class="current-cmd" tabindex="-1">
      <span class="prefix">$ &nbsp;</span>

      <!-- eslint-disable vue/no-v-html -->
      <span class="left-cmd">
        <span
          v-for="(chr, idx) in Array.from(leftCmd)"
          :key="`l-${idx}`"
          class="char"
          v-html="chr !== ' ' ? chr : '&nbsp;'"
        ></span>
      </span>
      <span id="cursor" :class="{ flicker: isFocus }">
        <span
          class="char"
          v-html="cursorCmd !== ' ' ? cursorCmd : '&nbsp;'"
        ></span>
      </span>

      <span class="right-cmd">
        <span
          v-for="(chr, idx) in Array.from(rightCmd)"
          :key="`r-${idx}`"
          class="char"
          v-html="chr !== ' ' ? chr : '&nbsp;'"
        ></span>
      </span>
      <!--eslint-enable-->
    </span>
  </div>
</template>

<style lang="scss" scoped>
@keyframes flickerAnimation {
  0% {
    background-color: rgba(white, 0.5);
  }
  50% {
    background-color: rgba(white, 0);
  }
  100% {
    background-color: rgba(white, 0.5);
  }
}

#cmd {
  background: $color_cli_background;
  flex-grow: 1;
  overflow: auto;
}

.char {
  display: inline-block;
}

.current-cmd:focus {
  outline: none;
}

#cursor {
  background-color: rgba(white, 0.5);

  &.flicker {
    animation: flickerAnimation 1s infinite;
  }
}

.terminal-description {
  min-height: 20px;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid yellow;
  margin-bottom: 5px;
}
</style>
