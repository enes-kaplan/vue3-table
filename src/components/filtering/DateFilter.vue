<template>
  <template v-if="column.dataType === 'date'">
    <input v-model="date" type="date" class="input-text" @change="emitInput">
  </template>
  <div class="flex flex-row gap-2" v-else>
    <input v-model="dateStart" type="date" class="input-text" @change="emitInput">
    <input v-model="dateEnd" type="date" class="input-text" @change="emitInput">
  </div>
</template>

<script>
import { ref, computed } from 'vue'

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
    const date = ref(null)
    const dateStart = ref(null)
    const dateEnd = ref(null)

    const filterList = computed(() => {
      const valueList = props.data.map(d => d[props.column.name])
      const uniqueValueList = [...new Set(valueList)]
      return uniqueValueList.map(m => {
        return { key: m, text: m }
      })
    })

    function emitInput(e) {
      const emitValues = { date, dateStart, dateEnd }
      const emitObject = { column: props.column, value: emitValues }
      context.emit('input', emitObject)
    }

    return { date, dateStart, dateEnd, filterList, emitInput }
  }
}
</script>
