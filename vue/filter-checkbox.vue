<script>
module.exports = {
  name: "filter-checkbox",
  props: [ 'filter', 'search', 'elements' ],
	data() {
		return {
		}
	},
	computed: {
		value: {
			get() {
				return this.search[this.filter.id]
			},
			set(newValue) {
				this.$set(this.search, this.filter.id, newValue)
				VueBus.$emit('updateFiltered')
			}
		},
		cleanedAnwers() {
			return this.removeOther(this.filter.answers)
		}
	},
	methods: {
		removeOther(arr) {
			if (arr[arr.length-1] == "Other") {
				return arr.slice(0, -1) //this.orderByFrequency(arr.slice(0, -1))
			} else {
				return arr //this.orderByFrequency(arr)
			}
		},
		/*orderByFrequency(arr) { // does not work properly with v-for, needs review
			return arr.sort((a, b) => this.numberAvailable(a) > this.numberAvailable(b) ? -1 : 1)
		},*/
		numberAvailable(answer) {
			var filter_id = this.filter.id
			var filter_custom_fn = this.filter.custom_fn

			return this.elements.filter(function(element) {
				var elementAnswer = element[filter_id]
				if (Array.isArray(elementAnswer)) {
					return elementAnswer.includes(answer)
				} else if (filter_custom_fn) {
					return filter_custom_fn(elementAnswer, answer)
			 	} else {
					return element[filter_id] == answer
				}
			}).length
		},
		getText(idx) {
			if ('answers_text' in this.filter) {
				return this.filter.answers_text[idx]
			} else {
				return this.filter.answers[idx]
			}

		}
	}
}
</script>

<template>
	<div>
		<div class="form-check mb-1" v-for="(answer, index) in cleanedAnwers" :key="index">
			<input class="form-check-input" type="checkbox" :disabled="numberAvailable(answer) == 0"
				:value ="answer"
				v-model="value">
			<label class="form-check-label">{{ getText(index) }} <span class="option-nr">({{ numberAvailable(answer) }})</span></label>
		</div>
	</div>
</template>