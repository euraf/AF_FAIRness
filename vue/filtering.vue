<script>
module.exports = {
  name: "filtering",
	props: [ "elements", "form" ],
  data() {
    return {
			search: {},
			filters: {}
		}
	},
	mounted() {
		this.updateFilters()
	},
	watch: {
		form: {
			deep: true,
			handler: this.updateFilters
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
		<div class="accordion" id="accordionex">

			<div class="card" v-for="(filter, key) in filterAndSort(filters)" :key="key">
				<div class="card-header" id="headingOne">
					<h5 class="mb-0">
						<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" :data-target="'#collapseFilter' + filter.id">
							{{ filter.short_text }}
						</button>
					</h5>
				</div>

				<div :id="'collapseFilter' + filter.id" class="collapse show" :class="{ 'add-scroll': filter.answers.length > 8 }">
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