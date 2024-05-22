<script>
module.exports = {
  name: "input-number",
  props: [ 'question', 'formData' ],
	computed: {
		answer: {
			get() {
				return this.formData[this.question.id]
			},
			set(newValue) {
				this.$set(this.formData, this.question.id, newValue)
			}
		}
	}
}
</script>

<template>
	<div>
		<label class="question-text">{{ question.text }} <template v-if="question.fair">[ {{ question.fair }} ]</template> <span class="compulsory" v-if="question.required">*</span></label>
		<input type="number" class="form-control" v-model.number="answer">
	</div>
</template>