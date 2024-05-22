<script>
module.exports = {
  name: "checkbox",
  props: [ 'question', 'formData' ],
	computed: {
		value: {
			get() {
				if (this.question.id in this.formData) {
					return this.formData[this.question.id]
				} else {
					this.$set(this.formData, this.question.id, [])
					return this.formData[this.question.id]
				}
			},
			set(newValue) {
				this.$set(this.formData, this.question.id, newValue)
			}
		},
		answers() {
			if (this.question.id == 'software_proglanguage') {
				return this.question.answers.slice(0, this.question.answers.length/2)
			} else {
				return this.question.answers
			}
		},
		answers_2part() {
			if (this.question.id == 'software_proglanguage') {
				return this.question.answers.slice(this.question.answers.length/2, this.question.answers.length)
			} else {
				return null
			}
		}
	}
}
</script>

<template>
	<div>
		<label class="question-text">{{ question.text }} <template v-if="question.fair">[ {{ question.fair }} ]</template> <span class="compulsory" v-if="question.required">*</span></label>
		<div :class="{ row: answers_2part, proglang: answers_2part }">
			<div class="form-check" :class="{ 'col-6': answers_2part }">
				<div v-for="answer_element in answers" :key="answer_element">
					<input class="form-check-input" type="checkbox"
						:value ="answer_element"
						v-model="value">
					<label class="form-check-label">{{ answer_element }}</label>
				</div>
			</div>
			<div v-if="answers_2part" class="form-check col-6">
				<div v-for="answer_element in answers_2part" :key="answer_element">
					<input class="form-check-input" type="checkbox"
						:value ="answer_element"
						v-model="value">
					<label class="form-check-label">{{ answer_element }}</label>
				</div>
			</div>
		</div>
	</div>
</template>