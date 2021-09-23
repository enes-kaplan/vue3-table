<template>
  <select class="input-select" @change="emitInput">
    <option v-for="option in filterList" :key="option.key" :value="option.key">
      {{ option.text }}
    </option>
  </select>
  <!-- TODO: Option to clear selected value -->
</template>

<script>
import { computed } from 'vue'

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
    const filterList = computed(() => {
      const valueList = props.data.map(d => d[props.column.name])
      const uniqueValueList = [...new Set(valueList)]
      return uniqueValueList.map(m => {
        return { key: m, text: m }
      })
    })

    function emitInput(e) {
      const emitObject = { column: props.column, value: e.target.value }
      context.emit('input', emitObject)
    }
    return { filterList, emitInput }
  }
}
</script>
