<template>
  <div class="flex justify-center items-center m-auto" :class="{ 'cleared': isChecked === null }">
    <Switch v-model:checked="isChecked" label="" class="w-16" />
    <button v-if="isChecked !== null" class="focus:outline-none" @click="isChecked = null">
      <icon-cross class="w-6 h-6 text-gray-600" />
    </button>
    <button v-else class="cursor-default opacity-0">
      <icon-cross class="w-6 h-6 text-gray-600" />
    </button>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

import Switch from '../common/Switch.vue'
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
    const isChecked = ref(null)

    watch(isChecked, (newVal) => {
      emitInput(newVal)
    })

    function emitInput(value) {
      const emitObject = { column: props.column, value }
      context.emit('input', emitObject)
    }
    return { isChecked }
  },
  components: {
    Switch,
    IconCross
  }
}
</script>
