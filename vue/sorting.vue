<script>
module.exports = {
  name: "sorting",
	props: {
		sorting_options_remove: Array,
		sorting_options_update: Object
	},
	data() {
		return {
			sorting_options: {
				last_added: {
					name: "Last added",
					fn: function(arr) {
						return arr.sort((a, b) => a.timestamp_creation > b.timestamp_creation ? -1 : 1)
					}
				},
				last_updated: {
					name: "Last updated",
					fn: function(arr) {
						return arr.sort((a, b) => a.timestamp_lastedit > b.timestamp_lastedit ? -1 : 1)
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
					VueBus.$emit("updateSorting", this.sorters[newValue])
				}
			}
		},
		sorters() {
			var _this = this
			var options = Object.assign({}, this.sorting_options)
			if (this.sorting_options_remove && this.sorting_options_remove.length > 1) {
				options = filterObject(this.sorting_options, function(val, key) {
					return !_this.sorting_options_remove.includes(key)
				})
			}
			if (this.sorting_options_update) {
				options = Object.assign(options, this.sorting_options_update)
			}
			return options
		}
	}
}
</script>

<template>
	<div class="col-sm-6">
		<div class="row no-gutters">
			<div class="col-3 col-sm-6">
				<p class="sort-by">Sort by</p>
			</div>
			<div class="col-9 col-sm-6">
				<select class="form-control" v-model="answer">
					<option v-for="option, option_value in sorters" :value="option_value" :key="option_value">{{ option.name }}</option>
				</select>
			</div>
		</div>
	</div>
</template>