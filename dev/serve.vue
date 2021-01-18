<script>
import Vue from 'vue';
import KeyboardComp from '@/keyboard-comp.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    KeyboardComp
  }
});
</script>

<template>
  <div id="app">
    <keyboard-comp />
  </div>
</template>
