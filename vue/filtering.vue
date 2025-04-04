<script>
module.exports = {
  name: "filtering",
	props: [ "elements", "form", "custom_filters" ],
  data() {
    return {
			search: {},
			filters: {},
			searchQuery: '',
			searchInName: true,
			searchInDescription: true,
			searchInKeywords: true
		}
	},
	mounted() {
		this.updateFilters()
	},
	watch: {
		form: {
			deep: true,
			handler: this.updateFilters
		},
		searchQuery() {
			VueBus.$emit('updateFiltered')
		},
		searchInName() {
			VueBus.$emit('updateFiltered')
		},
		searchInDescription() {
			VueBus.$emit('updateFiltered')
		},
		searchInKeywords() {
			VueBus.$emit('updateFiltered')
		}
	},
	methods: {
		updateFilters() {
			for (question of this.form) {
				if ('filter' in question && question.filter > 0) {
					this.$set(this.filters, question.id, question)
					this.$set(this.search, question.id, [])
				}
			}
			if (this.custom_filters) {
				for (custom_filter of this.custom_filters) {
					this.$set(this.filters, custom_filter.id, custom_filter)
					this.$set(this.search, custom_filter.id, [])
				}
			}
		},
		filtered(list, key) {
			var word = this.search[key].toLowerCase()
			return Array.of(list).filter(elem => elem.toLowerCase().includes(word))
		},
		filterAndSort(list) {
			return Object.values(list).sort((a, b) => a.filter > b.filter ? -1 : 1)
		},
	}
}
</script>

<template>
	<div>
		<div class="search-bar mb-4">
			<div class="form-group"> <!-- Added mb-4 class for margin bottom -->
				<label for="search">Search:</label>
				<input type="text" v-model="searchQuery" id="search" class="form-control">
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="searchName" v-model="searchInName">
				<label class="form-check-label" for="searchName">search in <em>name</em></label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="searchDescription" v-model="searchInDescription">
				<label class="form-check-label" for="searchDescription">search in <em>description</em></label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="searchKeywords" v-model="searchInKeywords">
				<label class="form-check-label" for="searchKeywords">search in <em>keywords</em></label>
			</div>
		</div>
		<label class="label-for-filters">I'm looking for:</label>
		<div class="accordion" id="accordionex">

			<div class="card" v-for="(filter, key) in filterAndSort(filters)" :key="key">
				<div class="card-header" id="headingOne">
					<h5 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" :data-target="'#collapseFilter' + filter.id">
							{{ filter.short_text }}
						</button>
					</h5>
				</div>

				<div :id="'collapseFilter' + filter.id" class="collapse" :class="{ 'add-scroll': filter.answers.length > 8 }">
					<div class="card-body">

						<!-- Search input -->
						<div class="input-group mb-3" v-if="filter.answers.length > 8">
							<input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" v-model="search[filter.id]">
							<div class="input-group-append">
								<span class="input-group-text" id="basic-addon2"><i class="fa-solid fa-magnifying-glass"></i></span>
							</div>
						</div>

						<!-- Checkboxes -->
						<filter-checkbox :filter="filter" :search="search" :elements="elements"></filter-checkbox>
						<!--div class="form-check" v-for="(answer, index) in filter.answers" :key="index">
							<input class="form-check-input" type="checkbox" :value="answer" id="defaultCheck1" v-model="search[filter.id]">
							<label class="form-check-label" for="defaultCheck1">
								{{ answer }}
							</label>
						</div-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>