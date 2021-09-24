<template>
  <div class="flex flex-row items-center gap-1 mt-4">
    <button
      v-for="page in pagination.lastPage"
      :key="page"
      :class="{ 'bg-blue-500 text-white italic': pagination.currentPage.value === page, 'text-blue-500 hover:underline': pagination.currentPage.value !== page }"
      class="w-8 h-8 text-lg font-semibold focus:outline-none"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      default: () => null,
      required: false
    }
  },
  emits: ['changePage'],
  setup(props, context) {
    function changePage(page) {
      if (props.pagination.currentPage !== page) {
        context.emit('changePage', page)
      }
    }

    return { changePage }
  }
}
</script>
