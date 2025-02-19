<script>
module.exports = {
  name: "input-text",
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
			<span class="link" v-if="showFAIRtext == false" @click="showFAIRtext = true"><small>learn more</small></span>
			<p class="fair-text" v-if="showFAIRtext">{{question.fair_text}} <span class="link" v-if="showFAIRtext == true" @click="showFAIRtext = false"><small>see less</small></span></p>
		</template>
		<p v-if="question.helper"><small v-html="toHTML(question.helper)"></small></p>
		<textarea v-if="question.type == 'long string'" rows="4" class="form-control" v-model.trim="answer"></textarea>
		<input v-if="question.type == 'string'" type="text" class="form-control" v-model.trim="answer">
		<input v-if="question.type == 'email'" type="email" class="form-control" v-model.trim="answer">
	</div>
</template>