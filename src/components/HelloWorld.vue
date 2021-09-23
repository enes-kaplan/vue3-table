<template>
  <div class="flex flex-col items-center gap-4">
    <div class="w-1/2">
      <my-table :columns="cols" :data="data">
        <template #actions>
          <button class="bg-green-500 hover:bg-green-600 text-white rounded-md p-2">
            DEL
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
        align: 'left',
        isVisible: true
      },
      {
        name: 'surname',
        text: 'Surname',
        align: 'left',
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

    return { cols, data }
  },
  components: { MyTable }
}
</script>
