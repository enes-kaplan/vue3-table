<template>
  <div class="flex flex-col items-center gap-4">
    <div class="w-1/2">
      <my-table :columns="cols" :data="data" locale="tr" is-filterable
                striped
      >
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
        isFilterable: true,
        isVisible: true
      },
      {
        name: 'surname',
        text: 'Surname',
        dataType: 'select',
        align: 'left',
        isFilterable: true,
        isVisible: true
      },
      {
        name: 'actions',
        text: 'Actions',
        align: 'center',
        isVisible: true
      }
    ])

    const data = ref([
      {
        id: 1,
        name: 'John',
        surname: 'Doe'
      },
      {
        id: 2,
        name: 'Mary',
        surname: 'Sheep'
      },
      {
        id: 3,
        name: 'Laurie',
        surname: 'Willif'
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
