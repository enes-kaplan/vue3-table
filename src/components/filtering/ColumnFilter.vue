<template>
  <th :class="{ 'bg-gray-300': !column.isFilterable }">
    <template v-if="column.isFilterable">
      <text-filter v-if="column.dataType === 'text'" :column="column" @input="emitInput" />
      <select-filter v-else-if="column.dataType === 'select'" :column="column" :data="data" @input="emitInput" />
      <boolean-filter v-else-if="column.dataType === 'boolean'" :column="column" @input="emitInput" />
      <date-filter v-else-if="column.dataType === 'date' || column.dataType === 'daterange'" :column="column" @input="emitInput" />
    </template>
    <template v-else>
      &nbsp;
    </template>
  </th>
</template>

<script>
import TextFilter from './TextFilter.vue'
import SelectFilter from './SelectFilter.vue'
import BooleanFilter from './BooleanFilter.vue'
import DateFilter from './DateFilter.vue'

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
    TextFilter,
    SelectFilter,
    BooleanFilter,
    DateFilter
  }
}
</script>
