<script>
module.exports = {
  name: "input-number",
  props: [ 'question', 'formData' ],
	data() {
    return {
      showFAIRtext: false
    }
  },
	methods: {
		toHTML(str) {
			const urlRegex = /https?:\/\/[^\s]+/g;
			return str.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
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
			<span class="link d-print-none" v-if="showFAIRtext == false" @click="showFAIRtext = true"><small>learn more</small></span>
			<p class="fair-text" v-if="showFAIRtext"><span v-html="toHTML(question.fair_text)"></span><span class="link d-print-none" v-if="showFAIRtext == true" @click="showFAIRtext = false"><small>see less</small></span></p>
			<p class="fair-text only-print"><span v-html="toHTML(question.fair_text)"></span></p>
		</template>
		<p v-if="question.helper"><small v-html="toHTML(question.helper)"></small></p>
		<input type="number" class="form-control" v-model.number="answer">
	</div>
</template>