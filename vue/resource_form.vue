<script>
module.exports = {
  name: "resource_form",
  props: {
    isTools: Boolean,
    isData: Boolean,
    isProjects: Boolean
  },
  data() {
    return {
        formData: {},
        isSaving: false,
        isRetrieving: false,
        isRetrieved: false,
        pr_number: null
    }
  },
  mounted() {
    if (this.id) {
        var resource = this.resources.filter(el => el.id == this.id)
        if (resource.length > 0) {
            this.formData = Object.assign({}, resource[0])
        }
    }
  },
  watch: {
    formData: {
        deep: true,
        handler() {
            // this.updateScoring()
        }
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    resources() {
        if (this.isTools) {
            return this.$root.$data.tools
        } else if (this.isData) {
            return this.$root.$data.datasets
        } else if (this.isProjects) {
            return this.$root.$data.projects
        }
    },
    tools_form() {
        return this.$root.$data.tools_form
    },
    datasets_form() {
      return this.$root.$data.datasets_form
    },
    projects_form() {
      return this.$root.$data.projects_form
    },
    form() {
        var obj = {}
        if (this.isTools) {
            obj = this.$root.$data.tools_form.filter(question => question.id !== 'id')
        } else if (this.isData) {
            obj = this.$root.$data.datasets_form.filter(question => question.id !== 'id')
        } else if (this.isProjects) {
            obj = this.$root.$data.projects_form.filter(question => question.id !== 'id')
        }
        if (this.creating) {
            obj = obj.filter(question => question.id !== 'editor_name' && question.id !== 'editor_email' )
        } else if (this.editing) {
            obj = obj.filter(question => question.id !== 'submitter_name' && question.id !== 'submitter_email' )
        }
        return obj
    },
    editing() {
        if (this.id) return true
        return false   
    },
    creating() {
        return !this.editing
    },
    modalMessageSuccess() {
        return "The " + (this.isTools ? "tool" : (this.isData ? "dataset" : "project")) + " was sucessfully " + (this.editing ? "edited." : "created.") + " A Pull Request was created in the EURAF/AF_FAIRness repository. You can follow it at <a target='_blank' href='https://github.com/euraf/AF_FAIRness/pull/" + this.pr_number + "'>https://github.com/euraf/AF_FAIRness/pull/" + this.pr_number +"</a>."
    },
    modalMessageError() {
        return "An error occurred while performing this action. Please try again and, if the error persists, <a href='mailto:anatomas@mvarc.eu'>let us know</a>."
    }
  },
  methods: {
    /* scoreColor(score) {
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
        if (this.isTools) {
            FAIR = new Tools_FAIRness_scoring()
        } else if (this.isData) {
            FAIR = new Data_FAIRness_scoring()
        }
        var scores = FAIR.score(this.formData)
        this.$set(this.formData, 'findability_score', scores.F)
        this.$set(this.formData, 'accessibility_score', scores.A)
        this.$set(this.formData, 'interoperability_score', scores.I)
        this.$set(this.formData, 'reusability_score', scores.R)
    },*/
    isValid(answer) {
        return answer !== null && answer !== "null" && answer !== undefined && answer !== ""
    },
    sanitizeName(name) {
        return name.replaceAll(/[^a-z0-9 ]/gi, '').replaceAll(' ', '_').toLowerCase();
    },
    verifyCompulsory() {
        var ignore_list = []
        if (this.creating) {
            ignore_list = [ "id", "timestamp_creation", "timestamp_lastedit", "editor_name", "editor_email" ]
        } else if (this.editing) {
            ignore_list = [ "timestamp_lastedit" ]
        }
        for (question of this.form) {
            if (ignore_list.includes(question.id)) {
                continue;
            }
            if (question.required) {
                if (question.id in this.formData && this.isValid(this.formData[question.id])) {
                    // continue
                } else {
                    alert('Please answer all compulsory questions.\nQuestion missing an answer: ' + question.text)
                    return false
                }
            }
        }
        return true
    },
    hasOther(question_code) {
        var dependent_question = this.form.filter(question => question.id == question_code)[0]
        if (dependent_question.type.includes('array')) {
            if (question_code in this.formData) {
                return this.formData[question_code].includes('Other')
            }
        } else {
            return this.formData[question_code] == 'Other'
        }
        return false
    },
    prepareDate(originalDateString) {
        const date = new Date(originalDateString);

        // Check if the date is valid
        if (!isNaN(date)) {
            // Format the date to "dd/mm/yyyy"
            const formattedDate = date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            return formattedDate
        } else {
            console.error("Invalid date format");
            return null
        }
    },
    retrieve(db) {
        var _this = this
        if (this.isProjects) {
            if (db == 'cordis') {
                this.isRetrieving = true
                var url = this.formData.retrieve_from_cordis
                try {
                    // Fetch the HTML content of the page
                    $.ajax({
                        url: url,
                        type: 'GET',
                        success: function(response){
                            // Parse the HTML content
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(response, 'text/html');

                            // Extract the desired elements using the provided selectors
                            _this.$set(_this.formData, 'acronym', doc.querySelector('.c-project-info__acronym')?.textContent.trim())
                            _this.$set(_this.formData, 'code', doc.querySelector('.c-project-info__id')?.textContent.trim().replace(/[\n\t]/g, '').replace(':', ': '))
                            _this.$set(_this.formData, 'name', doc.querySelector('.c-header-project__title')?.textContent.trim())
                            _this.$set(_this.formData, 'programme', doc.querySelector("body > div.o-wrapper.o-wrapper--webux > nav > ol > li:nth-child(4) > a")?.textContent.trim())
                            if (doc.querySelector('.c-header-description__text')) {
                                _this.$set(_this.formData, 'description', doc.querySelector('.c-header-description__text')?.textContent.trim())
                            } else if (doc.querySelector('.c-article__text')) {
                                _this.$set(_this.formData, 'description', doc.querySelector('.c-article__text')?.textContent.trim())
                            }
                            _this.$set(_this.formData, 'keywords', Array.from(doc.querySelectorAll('.c-factsheet__pills li'))?.map(el => el.textContent.trim()))
                            _this.$set(_this.formData, 'lead', doc.querySelector('.coordinated.coordinated-name')?.childNodes[0].textContent.trim())
                            _this.$set(_this.formData, 'project_url', doc.querySelector('.c-project-info__link')?.href.trim())
                            _this.$set(_this.formData, 'project_funding_programme_listing', url)
                            _this.$set(_this.formData, 'start_date', _this.prepareDate(doc.querySelector('.c-project-info__timeline .c-project-info__label')?.nextSibling.textContent.trim()))
                            _this.$set(_this.formData, 'end_date', _this.prepareDate(doc.querySelector('.c-project-info__timeline .t-text-align-right .c-project-info__label')?.nextSibling.textContent.trim()))  
                            _this.isRetrieving = false
                            _this.isRetrieved = true
                        }
                    })    
                } catch(err) {
                    _this.isRetrieved = false
                    console.log(err)
                }
            }
        }
    },
    print() {
        window.print()
    },
    save() {
        var _this = this
        this.isSaving = true
        if (!this.verifyCompulsory()) {
            this.isSaving = false
            return
        }

        if (this.creating) {
            if (this.isProjects) {
                this.formData.id = this.sanitizeName(this.formData.acronym)
            } else {
                this.formData.id = this.sanitizeName(this.formData.name)
            }
            this.formData.timestamp_creation = Date.now()
            this.formData.timestamp_lastedit = Date.now()

        } else if (this.editing) {
            this.formData.timestamp_lastedit = Date.now()
        }

        delete this.formData.findability_score
        delete this.formData.accessibility_score
        delete this.formData.interoperability_score
        delete this.formData.reusability_score

        var action = this.creating ? "create" : "update"
        var resources = this.isData ? "data" : (this.isTools ? "tools" : "projects")
        var databody = this.formData
        
        $.ajax({
            url: "https://mvarc.eu/tools/dev/AF_FAIRness_py",
            type: "post",
            data: { action: action, resources: resources, data: JSON.stringify(databody, null, 4) },
            dataType: "json"

        }).always(function(data, textStatus, response) {
            _this.isSaving = false
            console.log(data)
            console.log(response)

            if (response.status == 200) {
                _this.pr_number = data.pr_number
                $('#saveSuccess').modal('show')
                _this.formData = {}

            } else if (response.status == 400) {
                _this.pr_number = null
                $('#saveError').modal('show')

            } else {
                console.log(response);
                _this.pr_number = null
                $('#saveError').modal('show')
            }
        })
    }
  }
}
</script>

<template>
    <div>
        <button class="btn in-view btn-primary mr-2" @click="print()">Print the form for offline completion</button>
        <div class="row form form-add">
            <div class="offset-sm-2 col-sm-8">
                <div class="form-group" v-for="question in form" :key="question.id" :v-model="formData[question.id]">
                    <div class="special-form-group" v-if="question.id == 'retrieve_from_cordis'">
                        <input-text :question="question" :form-data="formData"></input-text>
                        <p class="mt-2"><button id="retrieve" class="btn btn-primary mr-2 pointer" @click="retrieve('cordis')" :disabled="isRetrieving">{{ isRetrieving ? 'Retrieving...' : 'Retrieve data' }}</button><small v-if="isRetrieved"><em>Data successfully retrieved for {{ formData.retrieve_from_cordis }}</em></small></p>
                    </div>
                    <template v-else>
                        <div class="only-print mb-4" v-if="'for' in question"><p class="ml-0">If you selected "Other", please specify: __________________________________</p></div>
                        <input-text v-if="'for' in question" :question="question" :form-data="formData" v-show="hasOther(question.for)" class="question-conditional"></input-text>
                        <dropdown v-else-if="question.type == 'tag'" :question="question" :form-data="formData"></dropdown>
                        <checkbox v-else-if="question.type == 'array of tags'" :question="question" :form-data="formData"></checkbox>
                        <input-text v-else-if="question.type == 'string' || question.type == 'long string' || question.type == 'email'" :question="question" :form-data="formData"></input-text>
                        <keywords v-else-if="question.type == 'array of strings'" :question="question" :form-data="formData"></keywords>
                        <input-number v-else-if="question.type == 'integer'" :question="question" :form-data="formData"></input-number>
                    </template>
                </div>
                <div class="d-flex">
                    <button id="save" class="btn btn-primary mr-2" :class="{ pointer: !isSaving }" @click="save()" :disabled="isSaving">{{ isSaving? 'Saving...' : 'Save' }}</button>
                    <div v-if="isSaving" class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="saveSuccess">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title w-100"><i class="fas fa-check-circle"></i> Success</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p v-html="modalMessageSuccess"></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="saveError">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h5 class="modal-title w-100"><i class="far fa-question-circle"></i> Something didn't work</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p v-html="modalMessageError"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
