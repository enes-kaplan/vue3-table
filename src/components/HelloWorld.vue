<template>
  <div class="flex flex-col items-center gap-4">
    <div class="w-1/2">
      <my-table
        :columns="cols"
        :data="data"
        :pagination="pagination"
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
import { ref, computed } from 'vue'

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
        name: 'birthDate',
        text: 'Birth Date',
        dataType: 'daterange',
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
        birthDate: '1992-01-01',
        isApproved: true
      },
      {
        id: 2,
        name: 'Mary',
        surname: 'Sheep',
        birthDate: '1994-07-11',
        isApproved: false
      },
      {
        id: 3,
        name: 'Laurie',
        surname: 'Willif',
        birthDate: '1993-05-05',
        isApproved: false
      }
    ])

    const currentPage = ref(1)
    const perPage = ref(5)
    const pagination = computed(() => {
      const total = data.value.length
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
    })

    const customFunc = (row) => {
      console.log(`Name Surname: ${row.name} ${row.surname}`)
    }

    return { cols, data, pagination, customFunc }
  },
  components: { MyTable }
}
</script>
