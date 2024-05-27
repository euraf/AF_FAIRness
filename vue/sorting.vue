<script>
module.exports = {
  name: "sorting",
	data() {
		return {
			sorting_options: {
				last_added: {
					name: "Last added",
					fn: function(arr) {
						return arr.sort((a, b) => a.timestamp_creation > b.timestamp_creation ? -1 : 1)
					}
				},
				a_z: {
					name: "A-Z",
					fn: function(arr) {
						return arr.sort((a, b) => a.name.localeCompare(b.name))
					}
				},
				z_a: {
					name: "Z-A",
					fn: function(arr) {
						return arr.sort((a, b) => -a.name.localeCompare(b.name))
					}
				},
				findability: {
					name: "Findability score",
					fn: function(arr) {
						return arr.sort((a, b) => a.findability_score > b.findability_score ? -1 : 1)
					}
				},
				accessbility: {
					name: "Accessibility score",
					fn: function(arr) {
						return arr.sort((a, b) => a.accessibility_score > b.accessibility_score ? -1 : 1)
					}
				},
				interoperability: {
					name: "Interoperability score",
					fn: function(arr) {
						return arr.sort((a, b) => a.interoperability_score > b.interoperability_score ? -1 : 1)
					}
				},
				reusability: {
					name: "Reusability score",
					fn: function(arr) {
						return arr.sort((a, b) => a.reusability_score > b.reusability_score ? -1 : 1)
					}
				},
			},
			selected_option: "last_added"
		}
	},
	computed: {
		answer: {
			get() {
				return this.selected_option
			},
			set(newValue) {
				if (newValue != this.selected_option) {
					this.selected_option = newValue
					VueBus.$emit("updateSorting")
				}
			}
		}
	}
}
</script>

<template>
	<div class="row no-gutters">
		<div class="col"><p class="text-right pr-2">Sort by</p></div>
		<div class="col"><select class="form-control" v-model="answer">
			<option v-for="option, option_value in sorting_options" :value="option_value" :key="option_value">{{ option.name }}</option>
		</select></div>
	</div>
</template>