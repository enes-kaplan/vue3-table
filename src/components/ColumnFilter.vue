<template>
  <input class="input-text" @keyup="emitInput">
</template>

<script>
export default {
  emits: ['input'],
  setup(_props, context) {
    function emitInput(e) {
      context.emit('input', e)
    }

    return { emitInput }
  }
}
</script>
