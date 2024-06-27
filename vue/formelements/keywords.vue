<script>
module.exports = {
  name: "input-text",
  props: [ 'question', 'formData' ],
	data() {
    return {
      showFAIRtext: false
    }
  },
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
		<label class="question-text">{{ question.text }} <span class="compulsory" v-if="question.required">*</span></label>
		<template v-if="question.fair">
			<p class="badge badge-FAIR">FAIR principle &rarr; <b>{{ question.fair }}</b></p>
			<span class="link" v-if="showFAIRtext == false" @click="showFAIRtext = true"><small>learn more</small></span>
			<p class="fair-text" v-if="showFAIRtext">{{question.fair_text}} <span class="link" v-if="showFAIRtext == true" @click="showFAIRtext = false"><small>see less</small></span></p>
		</template>
		<p v-if="question.helper"><small>{{ question.helper }}</small></p>
		<input type="text" class="form-control" v-model.trim.lazy="answer">
	</div>
</template>