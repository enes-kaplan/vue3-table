<template>
  <div class="flex flex-col items-center gap-4">
    <div class="w-1/2">
      <my-table
        :columns="cols"
        :data="data"
        locale="tr"
        is-filterable
        striped
      >
        <template #isApproved="row">
          <input type="checkbox" :checked="row.data.isApproved" disabled>
        </template>
        <template #actions="row">
          <button class="bg-green-500 hover:bg-green-600 text-white rounded-md p-2" @click="customFunc(row.data)">
            TEST
          </button>
        </template>
      </my-table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

import MyTable from './MyTable.vue'

export default {
  setup() {
    const cols = ref([
      {
        name: 'id',
        text: 'ID',
        align: 'center',
        isVisible: false
      },
      {
        name: 'name',
        text: 'Name',
        dataType: 'text',
        align: 'left',
        customClass: 'font-bold italic',
        isFilterable: true
      },
      {
        name: 'surname',
        text: 'Surname',
        dataType: 'select',
        align: 'left',
        isFilterable: true
      },
      {
        name: 'isApproved',
        text: 'Is Approved',
        dataType: 'boolean',
        align: 'center',
        isFilterable: true
      },
      {
        name: 'actions',
        text: 'Actions',
        align: 'center'
      }
    ])

    const data = ref([
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        isApproved: true
      },
      {
        id: 2,
        name: 'Mary',
        surname: 'Sheep',
        isApproved: false
      },
      {
        id: 3,
        name: 'Laurie',
        surname: 'Willif',
        isApproved: false
      }
    ])

    const customFunc = (row) => {
      console.log(`Name Surname: ${row.name} ${row.surname}`)
    }

    return { cols, data, customFunc }
  },
  components: { MyTable }
}
</script>
