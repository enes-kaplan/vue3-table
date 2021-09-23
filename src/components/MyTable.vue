<template>
  <table class="w-full border border-gray-400 border-collapse" :class="tableClass">
    <thead>
      <tr>
        <th v-for="col in visibleColumns" :key="col.name">
          {{ col.text }}
        </th>
      </tr>
      <tr v-if="isFilterable">
        <th
          v-for="(col, i) in visibleColumns"
          :key="'filter-' + i + '-' + col.name"
          :class="{ 'bg-gray-300': !col.isFilterable }"
        >
          <ColumnFilter v-if="col.isFilterable" :column="col" :data="data" @input="test" />
          <div>&nbsp;</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in data" :key="'td' + i" class="hover:bg-gray-200">
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

import ColumnFilter from './ColumnFilter.vue'

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
    const visibleColumns = computed(() => {
      return props.columns.filter(f => f.isVisible === true)
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

    function test(tval) {
      console.log('My Value Is: ', tval)
    }

    return { visibleColumns, tableClass, columnClasses }
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
