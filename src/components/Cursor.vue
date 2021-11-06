<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

import { ALLOWED_KEYS } from "../constants";

export default defineComponent({
  name: "Cursor",
  emits: ["submitCommand"],
  setup(props) {
    const state = reactive({
      cmd: "",
      currentPosition: 0 as number,
    });
    return {
      ...toRefs(state),
    };
  },
  computed: {
    cursorEnd() {
      return this.currentPosition === this.cmd.length;
    },
  },
  methods: {
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
      this.currentPosition -= 1;
    },
    enter(): void {
      this.$emit("submitCommand", this.cmd);
      this.cmd = "";
      this.currentPosition = 0;

      this.scrollToLastCommand();
    },
    right(): void {
      this.currentPosition = Math.max(
        this.cmd.length,
        this.currentPosition + 1
      );
    },
    left(): void {
      this.currentPosition = Math.min(0, this.currentPosition - 1);
    },
    down(e: { keyCode: number; key: string; meta: boolean }): void {
      if (e.keyCode === 8 || e.key === "Backspace") {
        this._deleteChar(this.currentPosition - 1);
      }

      console.log(e.key, e.keyCode, Number.isInteger(e.key), e);

      if (!e.meta && ALLOWED_KEYS.includes(e.key)) {
        this.scrollToLastCommand();
        this.cmd = this.cmd + e.key;
        this.currentPosition += 1;
      }
    },
    del() {
      this._deleteChar(this.currentPosition);
    },
  },
});
</script>

<template>
  <div
    id="cmd"
    tabindex="1"
    @keydown="down"
    @keydown.enter="enter"
    @keydown.left="left"
    @keydown.right="right"
    @keydown.delete="del"
  >
    <slot></slot>
    <span ref="currentCmd" class="current-cmd">
      <span class="prefix">$ &nbsp;</span>
      <span v-for="(item, idx) in cmd" :key="idx">
        <div>
          {{ item }}
          <span v-if="idx === currentPosition"></span>
        </div>
      </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
#cmd {
  background: $color_cli_background;
  flex-grow: 1;
  overflow: auto;
}

.current-cmd {
  span > div {
    width: 9px;
    text-align: center;
    display: inline-block;
  }
}
</style>
