<script>
module.exports = {
  name: "dropdown",
  props: [ 'question', 'formData' ],
	computed: {
		answer: {
			get() {
				return this.question.id in this.formData ? this.formData[this.question.id] : null
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
		<select class="form-control" v-model="answer">
			<option value=null>- select an option -</option>
			<option v-for="answer_element in question.answers" :value="answer_element" :key="answer_element">{{ answer_element }}</option>
		</select>
	</div>
</template>