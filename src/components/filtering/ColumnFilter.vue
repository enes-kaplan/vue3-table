<template>
  <th :class="{ 'bg-gray-300': !column.isFilterable }">
    <template v-if="column.isFilterable">
      <text-filter v-if="column.dataType === 'text'" :column="column" @input="emitInput" />
    </template>
    <template v-else>
      &nbsp;
    </template>
  </th>
</template>

<script>
import TextFilter from './TextFilter.vue'

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
      const emitObject = { column: props.column, value: e.value }
      context.emit('input', emitObject)
    }
    return { emitInput }
  },
  components: {
    TextFilter
  }
}
</script>
