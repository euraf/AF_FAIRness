<script>
module.exports = {
  name: "input-number",
  props: [ 'question', 'formData' ],
	data() {
    return {
      showFAIRtext: false
    }
  },
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
		<label class="question-text">{{ question.text }} <span class="compulsory" v-if="question.required">*</span></label>
		<template v-if="question.fair">
			<p class="badge badge-FAIR">FAIR principle &rarr; <b>{{ question.fair }}</b></p>
			<span class="link" v-if="showFAIRtext == false" @click="showFAIRtext = true"><small>learn more</small></span>
			<p class="fair-text" v-if="showFAIRtext">{{question.fair_text}} <span class="link" v-if="showFAIRtext == true" @click="showFAIRtext = false"><small>see less</small></span></p>
		</template>
		<p v-if="question.helper"><small>{{ question.helper }}</small></p>
		<input type="number" class="form-control" v-model.number="answer">
	</div>
</template>