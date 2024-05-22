<script>
module.exports = {
  name: "selfassessment",
  props: {
    tools: Boolean,
    data: Boolean
  },
  data() {
    return {
        formData: {},
        TOOLS_FORM_HALF: 6,
        DATA_FORM_HALF: 5
    }
  },
  watch: {
    formData: {
        deep: true,
        handler() {
            this.updateScoring()
        }
    }
  },
  computed: {
    tools_form() {
        return this.$root.$data.tools_form
    },
    datasets_form() {
      return this.$root.$data.datasets_form
    },
    form() {
        if (this.tools) {
            return this.$root.$data.tools_form.filter(question => 'fair' in question)
        } else if (this.data) {
            return this.$root.$data.datasets_form.filter(question => 'fair' in question)
        }
    },
    form_1part() {
        if (this.tools) {
            return this.form.slice(0, this.TOOLS_FORM_HALF)
        } else if (this.data) {
            return this.form.slice(0, this.DATA_FORM_HALF)
        }
    },
    form_2part() {
        if (this.tools) {
            return this.form.slice(this.TOOLS_FORM_HALF, this.form.length)
        } else if (this.data) {
            return this.form.slice(this.DATA_FORM_HALF, this.form.length)
        }
    }
  },
  methods: {
    scoreColor(score) {
      return {
        0: '#e43e3d', // red
        10: '#ea484d',
        20: '#ec654e',
        30: '#ef874c',
        40: '#f3a74c',
        50: '#f8c43d',
        60: '#e1c63b',
        70: '#c1cc36',
        80: '#9fcd35',
        90: '#7fcd31',
        100: '#5aaf2b' // green
      }[Math.round(score/10) * 10]
    },
    updateScoring() {
        var FAIR = null
        if (this.tools) {
            FAIR = new Tools_FAIRness_scoring()
        } else if (this.data) {
            FAIR = new Data_FAIRness_scoring()
        }
        var scores = FAIR.score(this.formData)
        this.$set(this.formData, 'findability_score', scores.F)
        this.$set(this.formData, 'accessibility_score', scores.A)
        this.$set(this.formData, 'interoperability_score', scores.I)
        this.$set(this.formData, 'reusability_score', scores.R)
    }
  }
}
</script>

<template>
    <div>
        <div class="row form form-self-assessment">
            <div class="col-6">
                <div class="form-group" v-for="question in form_1part" :key="question.id" :v-model="formData[question.id]">
                    <dropdown v-if="question.type == 'tag'" :question="question" :form-data="formData"></dropdown>
                    <checkbox v-if="question.type == 'array of tags'" :question="question" :form-data="formData"></checkbox>
                    <input-text v-if="question.type == 'string' || question.type == 'long string' || question.type == 'email'" :question="question" :form-data="formData"></input-text>
                    <keywords v-if="question.type == 'array of strings'" :question="question" :form-data="formData"></keywords>
                    <input-number v-if="question.type == 'integer'" :question="question" :form-data="formData"></input-number>
                </div>
            </div>
            <div class="col-6">
                <div class="form-group" v-for="question in form_2part" :key="question.id" :v-model="formData[question.id]">
                    <dropdown v-if="question.type == 'tag'" :question="question" :form-data="formData"></dropdown>
                    <checkbox v-if="question.type == 'array of tags'" :question="question" :form-data="formData"></checkbox>
                    <input-text v-if="question.type == 'string' || question.type == 'email'" :question="question" :form-data="formData"></input-text>
                    <keywords v-if="question.type == 'array of strings'" :question="question" :form-data="formData"></keywords>
                    <input-number v-if="question.type == 'integer'" :question="question" :form-data="formData"></input-number>
                </div>
            </div>
        </div>
        <div class="scoring-block">
            <p class="small-title"><b>FAIRness score</b></p>
            <div class="score-bar">
                <p class="label">F</p>
                <div class="bar">
                    <div :style="'width:' + formData.findability_score*0.75 + '%; background-color: ' + scoreColor(formData.findability_score) + ';'"></div>
                    <p :class="{ 'ml-0': formData.findability_score == 0 }">{{ formData.findability_score }}%</p>
                </div>
            </div>
            <div class="score-bar">
                <p class="label">A</p>
                <div class="bar">
                    <div :style="'width:' + formData.accessibility_score*0.75 + '%; background-color: ' + scoreColor(formData.accessibility_score) + ';'"></div>
                    <p :class="{ 'ml-0': formData.accessibility_score == 0 }">{{ formData.accessibility_score }}%</p>
                </div>
            </div>
            <div class="score-bar">
                <p class="label">I</p>
                <div class="bar">
                    <div :style="'width:' + formData.interoperability_score*0.75 + '%; background-color: ' + scoreColor(formData.interoperability_score) + ';'"></div>
                    <p :class="{ 'ml-0': formData.interoperability_score == 0 }">{{ formData.interoperability_score }}%</p>
                </div>
            </div>
            <div class="score-bar">
                <p class="label">R</p>
                <div class="bar">
                    <div :style="'width:' + formData.reusability_score*0.75 + '%; background-color: ' + scoreColor(formData.reusability_score) + ';'"></div>
                    <p :class="{ 'ml-0': formData.reusability_score == 0 }">{{ formData.reusability_score }}%</p>
                </div>
            </div>
        </div>
    </div>
</template>
