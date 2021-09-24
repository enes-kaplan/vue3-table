<template>
  <div class="flex flex-row justify-between items-center w-full px-2 mt-4">
    <div class="flex flex-row justify-between items-center gap-1">
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
    <div class="flex flex-row justify-between items-center gap-2 text-gray-600">
      <select v-model="perPage" class="input-text" @change="changePerPage">
        <option>
          5
        </option>
        <option>
          10
        </option>
        <option>
          20
        </option>
        <option>
          50
        </option>
      </select>
      items per page
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

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
  emits: ['changePage', 'changePerPage'],
  setup(props, context) {
    const perPage = ref(props.pagination.perPage)
    function changePage(page) {
      if (props.pagination.currentPage !== page) {
        context.emit('changePage', page)
      }
    }

    function changePerPage(e) {
      context.emit('changePerPage', parseInt(e.target.value))
    }

    return { perPage, changePage, changePerPage }
  }
}
</script>
