<template>
  <input class="input-text" @keyup="emitInput">
</template>

<script>
export default {
  props: {
    column: {
      type: Object,
      required: true
    }
  },
  emits: ['input'],
  setup(props, context) {
    function emitInput(e) {
      const emitObject = { column: props.column, value: e.target.value }
      context.emit('input', emitObject)
    }
    return { emitInput }
  }

}
</script>
