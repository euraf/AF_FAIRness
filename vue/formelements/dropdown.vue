<script>
module.exports = {
  name: "dropdown",
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
		<label class="question-text">{{ question.text }} <span class="compulsory" v-if="question.required">*</span></label>
		<template v-if="question.fair">
			<p class="badge badge-FAIR">FAIR principle &rarr; <b>{{ question.fair }}</b></p>
			<span class="link" v-if="showFAIRtext == false" @click="showFAIRtext = true"><small>learn more</small></span>
			<p class="fair-text" v-if="showFAIRtext"><span v-html="toHTML(question.fair_text)"></span><span class="link" v-if="showFAIRtext == true" @click="showFAIRtext = false"><small>see less</small></span></p>
		</template>
		<p v-if="question.helper"><small v-html="toHTML(question.helper)"></small></p>
		<select class="form-control" v-model="answer">
			<option value=null>- select an option -</option>
			<option v-for="answer_element in question.answers" :value="answer_element" :key="answer_element">{{ answer_element }}</option>
		</select>
	</div>
</template>