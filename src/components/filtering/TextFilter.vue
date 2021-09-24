<template>
  <div class="flex flex-row gap-2">
    <input v-model="filterText" type="text" class="input-text">
    <button v-if="filterText !== ''" class="focus:outline-none" @click="filterText = ''">
      <icon-cross class="w-6 h-6 text-gray-600" />
    </button>
    <button v-else class="cursor-default opacity-0">
      <icon-cross class="w-6 h-6 text-gray-600" />
    </button>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

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
    const filterText = ref('')

    watch(filterText, (newVal) => {
      emitInput(newVal)
    })

    function emitInput(value) {
      const emitObject = { column: props.column, value }
      context.emit('input', emitObject)
    }
    return { filterText }
  },
  components: {
    IconCross
  }
}
</script>
