<template>
  <input class="input-text" @keyup="emitInput">
</template>

<script>
export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  emits: ['input'],
  setup(_props, context) {
    function emitInput(e) {
      context.emit('input', e)
    }
    return { emitInput }
  }
}
</script>
