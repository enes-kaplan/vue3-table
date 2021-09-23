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
</template>

<script>
import { computed } from 'vue'
import { applyFilter } from '../helpers/filtering.js'

import ColumnFilter from './filtering/ColumnFilter.vue'

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
    const visibleColumns = computed(() => {
      return props.columns.filter(f => f.isVisible !== false)
    })

    const tableClass = computed(() => {
      return props.striped === true
        ? 'striped'
        : ''
    })

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
      console.log('BEFORE', props.columns)
      const filteredColumn = props.columns.find(f => f.name === filterOptions.column.name)
      filteredColumn.filterValue = filterOptions.value
      console.log('AFTER', props.columns)
    }

    return { filteredData, visibleColumns, tableClass, columnClasses, applyColumnFilter }
  },
  components: {
    ColumnFilter
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
