
<template>
  <img alt="Vue logo" src="./assets/logo.png" class="mx-auto">
  <div class="flex flex-col items-center gap-4 pb-8">
    <div>
      <my-table
        :columns="cols"
        :data="data"
        :pagination="pagination"
        locale="tr"
        is-filterable
        striped
      >
        <template #name="row">
          <input v-model="row.data.name" type="text" class="input-text">
        </template>
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

import MyTable from './components/MyTable.vue'

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
        isSortable: true,
        isFilterable: true
      },
      {
        name: 'surname',
        text: 'Surname',
        dataType: 'select',
        align: 'left',
        isSortable: true,
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
        isSortable: true,
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
      },
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
      },
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
      },
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

    const pagination = ref({ currentPage: 1, perPage: 5 })

    const customFunc = (row) => {
      console.log(`Name Surname: ${row.name} ${row.surname}`)
    }

    return { cols, data, pagination, customFunc }
  },
  components: { MyTable }
}
</script>

<style>
@import url('./assets/style.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
