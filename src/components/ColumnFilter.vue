<template>
  <th :class="{ 'bg-gray-300': !column.isFilterable }">
    <template v-if="column.isFilterable">
      <input class="input-text" @keyup="emitInput">
    </template>
    <template v-else>
      &nbsp;
    </template>
  </th>
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
  setup(props, context) {
    function emitInput(e) {
      const emitObject = { column: props.column, value: e.target.value }
      context.emit('input', emitObject)
    }
    return { emitInput }
  }
}
</script>
