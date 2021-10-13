<template>
  <div v-if="column.dataType === 'date'" class="flex flex-row gap-2">
    <input v-model="date" :aria-label="column.name" role="filter" type="date" class="input-text w-full" @change="emitInput">
    <button v-if="date !== null" class="focus:outline-none" @click="date = null">
      <icon-cross class="w-6 h-6 text-gray-600" />
    </button>
    <button v-else class="cursor-default opacity-0">
      <icon-cross class="w-6 h-6 text-gray-600" />
    </button>
  </div>
  <div v-else class="flex flex-row gap-2">
    <input v-model="dateStart" :aria-label="column.name" role="filter-start" type="date" class="input-text w-full" @change="emitInput">
    <button v-if="dateStart !== null" class="focus:outline-none" @click="dateStart = null">
      <icon-cross class="w-6 h-6 text-gray-600" />
    </button>
    <button v-else class="cursor-default opacity-0">
      <icon-cross class="w-6 h-6 text-gray-600" />
    </button>
    <input v-model="dateEnd" :aria-label="column.name" role="filter-end" type="date" class="input-text w-full" @change="emitInput">
    <button v-if="dateEnd !== null" class="focus:outline-none" @click="dateEnd = null">
      <icon-cross class="w-6 h-6 text-gray-600" />
    </button>
    <button v-else class="cursor-default opacity-0">
      <icon-cross class="w-6 h-6 text-gray-600" />
    </button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

import IconCross from '../common/icons/IconCross.vue'

export default {
  props: {
    column: {
      type: Object,
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
  },
  components: {
    IconCross
  }
}
</script>
