<script>
import { ref, reactive } from 'vue'

import MyTable from './MyTable.vue'

export default {
  setup() {
    const cols = ref([
      {
        name: 'id',
        text: 'ID',
        align: 'center',
        isVisible: true
      },
      {
        name: 'name',
        text: 'Ad',
        align: 'left',
        isVisible: true
      },
      {
        name: 'surname',
        text: 'Soyad',
        align: 'left',
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

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="w-1/2">
      <my-table :columns="cols" :data="data" />
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
