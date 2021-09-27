<template>
  <table class="w-full border border-gray-400 border-collapse" :class="tableClass">
    <thead>
      <tr>
        <th v-for="col in visibleColumns" :key="col.name">
          {{ col.text }}
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
      <tr v-for="(row, i) in filteredData" :key="'td' + i" class="hover:bg-gray-200">
        <td
          v-for="(col, j) in visibleColumns"
          :key="'row-' + j + '-' + col.name"
          :class="columnClasses(col)"
        >
          <slot :name="col.name" :data="row">
            {{ row[col.name] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination v-if="paginationComp" :data="data" :pagination="paginationComp" @change-page="changePage" @change-per-page="changePerPage" />
</template>

<script>
import { ref, computed, watch } from 'vue'
import { applyFilter, applyPagination } from '../helpers/filtering.js'

import ColumnFilter from './filtering/ColumnFilter.vue'
import Pagination from './Pagination.vue'

export default {
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
      let data = applyFilter(props.columns, [...props.data], props.locale)
      if (props.pagination !== null) {
        data = applyPagination(data, paginationComp.value.from, paginationComp.value.to)
      }
      return data
    })

    const visibleColumns = computed(() => {
      return props.columns.filter(f => f.isVisible !== false)
    })

    const tableClass = computed(() => {
      return props.striped === true
        ? 'striped'
        : ''
    })

    const initialPage = props.pagination.currentPage ? props.pagination.currentPage : 1
    const currentPage = ref(initialPage)
    const initialPerPage = props.pagination.perPage
    const perPage = ref(initialPerPage)
    const paginationComp = computed(() => {
      if (props.pagination !== null) {
        const total = props.data.length
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

    return { filteredData, visibleColumns, paginationComp, tableClass, columnClasses, applyColumnFilter, changePage, changePerPage }
  },
  components: {
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
