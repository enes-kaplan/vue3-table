<template>
  <div class="flex justify-center items-center m-auto">
    <Switch v-model:checked="isChecked" label="" />
    <!-- TODO: Option to clear selected value -->
  </div>
</template>

<script>
import { ref, watch } from 'vue'

import Switch from '../common/Switch.vue'

export default {
  props: {
    column: {
      type: Object,
      required: true
    }
  },
  emits: ['input'],
  setup(props, context) {
    const isChecked = ref(false)

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
    Switch
  }
}
</script>
