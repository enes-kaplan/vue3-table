<template>
	<table class="border border-gray-400 border-collapse">
		<thead>
			<tr>
				<th v-for="col in visibleColumns" :key="col.name">
					{{ col.text }}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(row, i) in data" :key="i" class="hover:bg-gray-200" :class="{ 'bg-gray-100': i % 2 === 1 }">
				<td v-for="col in visibleColumns" :key="'row-i-' + col.name">
					{{ row[col.name] }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
	props: ['columns', 'data'],
	setup() {

	},
	computed: {
		visibleColumns() {
			return this.columns.filter(f => f.isVisible === true)
		}
	}
}
</script>

<style>
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