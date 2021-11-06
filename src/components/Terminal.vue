<script setup>
import Cursor from './Cursor.vue';
import {defineComponent} from "vue";

defineComponent({
  data() {
    return {
      cmds: [],
      historyValues: '',
      currentCmd: {
        value: '',
        position: 0
      }
    }
  },
  methods: {

  },
  computed: {
    cmds: {
      get() {
        return this.items;
      },
      set (val) {
        this.historyValues = this.historyValues + ' ' + val;
        let data = {
          cmd: val,
          response: 'TODO: calculate ' + this.historyValues
        }
      }
    }
  }
})
</script>

<template>
  <Cursor />
  <span>$ &nbsp;</span>
  <span v-for="(item, index) in c_cmd" :key="index"
  >$ {{ item.cmd }}
      <div>{{ item.response }}</div>
    <br />
  </span>

</template>

<style lang="scss">

</style>
