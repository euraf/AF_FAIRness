<script>
module.exports = {
  name: "input-text",
  props: [ 'question', 'formData' ],
	computed: {
		answer: {
			get() {
				if (this.question.id in this.formData && this.formData[this.question.id]) {
					return this.formData[this.question.id].join(', ')
				} else {
					return ''
				}
			},
			set(newValue) {
				if (newValue.includes(',')) {
					this.$set(this.formData, this.question.id, newValue.split(',').map(function(item) {
						return item.trim();
					}))
				} else if (newValue.includes(';')) {
					this.$set(this.formData, this.question.id, newValue.split(';').map(function(item) {
						return item.trim();
					}))
				} else {
					this.$set(this.formData, this.question.id, [newValue])
				}
			}
		}
	}
}
</script>

<template>
	<div>
		<label class="question-text">{{ question.text }} <template v-if="question.fair">[ {{ question.fair }} ]</template> <span class="compulsory" v-if="question.required">*</span></label>
		<small>{{ question.helper }}</small>
		<input type="text" class="form-control" v-model.trim.lazy="answer">
	</div>
</template>