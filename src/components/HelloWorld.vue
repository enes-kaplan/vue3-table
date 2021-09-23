<script>
import { ref, reactive } from 'vue'

export default {
	props: ['msg'],
	setup() {
		const count = ref(3)

		let cols = ref([
			{
				name: 'id',
				text: 'ID',
				isVisible: true
			},
			{
				name: 'name',
				text: 'Ad',
				isVisible: true
			},
			{
				name: 'surname',
				text: 'Soyad',
				isVisible: true
			}
		])

		let data = ref([
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

		return { count, cols, data }
	},
	components: { MyTable }
}

import MyTable from '/src/components/MyTable.vue'
</script>

<template>
  <div class="flex flex-col items-center gap-4">
		<h1>{{ msg }}</h1>
		<p>
			Recommended IDE setup:
			<a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
			+
			<a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
		</p>
		<p>
			<a href="https://vitejs.dev/guide/features.html" target="_blank">
				Vite Documentation
			</a>
			|
			<a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
		</p>
		<button type="button" @click="count++">count is: {{ count }}</button>
		<p>
			Edit
			<code>components/HelloWorld.vue</code> to test hot module replacement.
		</p>
		
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
