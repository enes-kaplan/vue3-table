<template>
  <table class="w-full border border-gray-400 border-collapse" :class="tableClass">
    <thead>
      <tr>
        <th v-for="col in visibleColumns" :key="col.name">
          <div class="flex flex-row gap-2 items-center" :class="{ 'hover:text-blue-600 cursor-pointer': col.isSortable }" @click="toggleSorting(col)">
            {{ col.text }}
            <span v-if="col.isSortable">
              <icon-sort-ascending class="w-5 h-5" v-if="sorting.column === col.name && sorting.direction === 'asc'" />
              <icon-sort-descending class="w-5 h-5" v-else-if="sorting.column === col.name && sorting.direction === 'desc'" />
              <div class="w-5 h-5" v-else />
            </span>
          </div>
        </th>
      </tr>
      <tr v-if="isFilterable">
        <ColumnFilter
          v-for="(col, i) in visibleColumns"
          :key="'filter-' + i + '-' + col.name"
          :column="col"
          :data="data"
          @input="applyColumnFilter"
        />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in paginatedData" :key="'td' + i" class="hover:bg-gray-200">
        <td
          v-for="(col, j) in visibleColumns"
          :key="'row-' + j + '-' + col.name"
          :class="columnClasses(col)"
          :aria-label="col.name"
          role="cell"
        >
          <slot :name="col.name" :data="row">
            {{ row[col.name] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination
    v-if="paginationComp"
    :data="data"
    :pagination="paginationComp"
    @change-page="changePage"
    @change-per-page="changePerPage"
  />
</template>

<script>
import { ref, computed, watch } from 'vue'
import { applyFilter, applySorting, applyPagination } from '../helpers/filtering.js'

import IconSortAscending from './common/icons/IconSortAscending.vue'
import IconSortDescending from './common/icons/IconSortDescending.vue'
import ColumnFilter from './filtering/ColumnFilter.vue'
import Pagination from './Pagination.vue'

export default {
  name: 'VueTable',
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      default: () => null,
      required: false
    },
    locale: {
      type: String,
      default: () => 'en-US',
      required: false
    },
    isFilterable: {
      type: Boolean,
      default: () => false,
      required: false
    },
    striped: {
      type: Boolean,
      default: () => false,
      required: false
    }
  },
  setup(props) {
    const filteredData = computed(() => {
      return applyFilter(props.columns, [...props.data], props.locale)
    })

    const sortedData = computed(() => {
      return applySorting([...filteredData.value], sorting.value.column, sorting.value.direction, props.locale)
    })

    const paginatedData = computed(() => {
      return paginationComp.value !== null
        ? applyPagination([...sortedData.value], paginationComp.value.from, paginationComp.value.to)
        : filteredData.value
    })

    const visibleColumns = computed(() => {
      return props.columns.filter(f => f.isVisible !== false)
    })

    const tableClass = computed(() => {
      return props.striped === true
        ? 'striped'
        : ''
    })

    const sorting = ref({ column: null, direction: null })

    const initialPage = props.pagination.currentPage ? props.pagination.currentPage : 1
    const currentPage = ref(initialPage)
    const initialPerPage = props.pagination.perPage
    const perPage = ref(initialPerPage)
    const paginationComp = computed(() => {
      if (props.pagination !== null) {
        const total = filteredData.value ? filteredData.value.length : 0
        const lastPage = Math.floor(total / perPage.value) + 1
        const from = (currentPage.value - 1) * perPage.value
        const to = currentPage.value * perPage.value

        return {
          currentPage,
          perPage,
          total,
          lastPage,
          from,
          to
        }
      } else {
        return null
      }
    })

    watch([currentPage, paginationComp], () => {
      if (paginationComp.value.from > paginationComp.value.total) {
        currentPage.value--
      }
    })

    function toggleSorting(col) {
      const directionCycle = ['asc', 'desc', null]
      const currentIndex = directionCycle.findIndex(f => f === sorting.value.direction)
      const direction = directionCycle[(currentIndex + 1) % 3]
      sorting.value = { column: col.name, direction }
    }

    function changePage(newPage) {
      currentPage.value = newPage
    }

    function changePerPage(newPerPage) {
      perPage.value = newPerPage
    }

    function columnClasses(col) {
      const classList = []
      if (col.align === 'left') {
        classList.push('text-left')
      } else if (col.align === 'right') {
        classList.push('text-right')
      } else {
        classList.push('text-center')
      }
      if (col.customClass) {
        classList.push(col.customClass)
      }
      return classList
    }

    function applyColumnFilter(filterOptions) {
      const filteredColumn = props.columns.find(f => f.name === filterOptions.column.name)
      filteredColumn.filterValue = filterOptions.value
    }

    return { paginatedData, visibleColumns, toggleSorting, sorting, paginationComp, tableClass, columnClasses, applyColumnFilter, changePage, changePerPage }
  },
  components: {
    IconSortAscending,
    IconSortDescending,
    ColumnFilter,
    Pagination
  }
}
</script>

<style>
.striped > tbody tr:nth-child(even) {
  @apply bg-gray-100;
}
thead > tr {
  @apply divide-x divide-gray-400 border-b border-gray-400;
}
tbody > tr {
  @apply divide-x divide-gray-400;
}
th, td {
  @apply p-2;
}
</style>
