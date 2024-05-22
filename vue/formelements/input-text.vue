<script>
module.exports = {
  name: "input-text",
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
		<textarea v-if="question.type == 'long string'" rows="2" class="form-control" v-model.trim="answer"></textarea>
		<input v-if="question.type == 'string'" type="text" class="form-control" v-model.trim="answer">
		<input v-if="question.type == 'email'" type="email" class="form-control" v-model.trim="answer">
	</div>
</template>