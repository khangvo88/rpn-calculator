<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

import { ALLOWED_KEYS } from "../constants";

export default defineComponent({
  name: "TerminalCursor",
  emits: ["submitCommand"],
  setup() {
    const state = reactive({
      cmd: "",
      cursorPosition: 0 as number,
    });
    return {
      ...toRefs(state),
    };
  },
  computed: {
    cursorAtStart() {
      return this.cmd.length === 0 && this.cursorPosition === 0;
    },
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
  methods: {
    appendChar(char: string) {
      this.cmd =
        this.cmd.slice(0, this.cursorPosition + 1) +
        char +
        this.cmd.slice(this.cursorPosition + 1);
      this.cursorPosition += 1;
    },
    scrollToLastCommand() {
      // el.scrollTop = el.scrollHeight;

      this.$nextTick(() => {
        const el = this.$refs.currentCmd as HTMLElement;
        el.scrollIntoView();
      });
    },
    _deleteChar(position: number): void {
      if (position < 0 || position > this.cmd.length) {
        return;
      }
      const val = this.cmd;
      this.cmd = val.slice(0, position) + val.slice(position + 1);
      this.cursorPosition = Math.max(0, this.cursorPosition - 1);
    },
    enter(): void {
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
    down(e: { keyCode: number; key: string; meta: boolean }): void {
      console.log(e.key, e.keyCode, Number.isInteger(e.key), e);

      if (e.keyCode === 8 || e.key === "Backspace") {
        this._deleteChar(this.cursorPosition - 1);
      }

      if (!e.meta && ALLOWED_KEYS.includes(e.key)) {
        this.scrollToLastCommand();
        this.appendChar(e.key);
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
  <div>
    <div>CMD: {{ cmd }}</div>
    <div>Position: {{ cursorPosition }}</div>
    <div>{{ leftCmd }} | {{ rightCmd }}</div>

    <div>Cursor: {{ cursorAtStart ? "True" : "False" }}</div>
  </div>
  <div
    id="cmd"
    tabindex="0"
    @keydown="down"
    @keydown.enter="enter"
    @keydown.left="left"
    @keydown.right="right"
  >
    <slot></slot>
    <span ref="currentCmd" class="current-cmd">
      <span class="prefix">$ &nbsp;</span>

      <!-- eslint-disable vue/no-v-html -->
      <span class="left-cmd">
        <span
          v-for="(chr, idx) in leftCmd"
          :key="`l-${idx}`"
          class="char"
          v-html="chr !== ' ' ? chr : '&nbsp;'"
        ></span>
      </span>
      <span id="cursor">
        <span
          class="char"
          v-html="cursorCmd !== ' ' ? cursorCmd : '&nbsp;'"
        ></span>
      </span>

      <span class="right-cmd">
        <span
          v-for="(chr, idx) in rightCmd"
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
#cmd {
  background: $color_cli_background;
  flex-grow: 1;
  overflow: auto;
}

.char {
  display: inline-block;
}

#cursor {
  background-color: white;
  //opacity: 0.5;
}
</style>
