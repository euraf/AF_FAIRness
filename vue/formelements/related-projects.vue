<script>
module.exports = {
  name: "related-projects",
  props: [ 'question', 'formData', 'availableProjects' ],
  computed: {
    projects() {
      return Array.isArray(this.formData[this.question.id]) ? this.formData[this.question.id] : []
    },
    projectField() {
      return this.question.fields.find(field => field.id === 'project_id')
    },
    relationshipField() {
      return this.question.fields.find(field => field.id === 'relationship')
    },
    projectOptions() {
      return this.availableProjects.slice().sort((a, b) => this.projectLabel(a).localeCompare(this.projectLabel(b)))
    }
  },
  methods: {
    addProject() {
      const projects = this.projects.slice()
      projects.push({
        project_id: "",
        relationship: ""
      })
      this.$set(this.formData, this.question.id, projects)
    },
    removeProject(index) {
      const projects = this.projects.slice()
      projects.splice(index, 1)
      this.$set(this.formData, this.question.id, projects)
    },
    projectLabel(project) {
      if (project.acronym && project.name && project.acronym.toLowerCase() !== project.name.toLowerCase()) {
        return project.acronym + ' - ' + project.name
      }
      return project.acronym || project.name || project.id
    }
  }
}
</script>

<template>
  <div>
    <label class="question-text">{{ question.text }} <span class="compulsory" v-if="question.required">*</span></label>
    <p v-if="question.helper"><small>{{ question.helper }}</small></p>
    <div v-for="(project, index) in projects" :key="index" class="border rounded p-3 mb-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <strong>Related project {{ index + 1 }}</strong>
        <button type="button" class="btn btn-sm btn-outline-secondary" @click="removeProject(index)">Remove</button>
      </div>
      <div class="form-group">
        <label :for="'related-project-id-' + index">{{ projectField.text }} <span class="compulsory">*</span></label>
        <select :id="'related-project-id-' + index" class="form-control" v-model="project.project_id" required>
          <option value="">Select a project</option>
          <option v-for="catalogueProject in projectOptions" :key="catalogueProject.id" :value="catalogueProject.id">{{ projectLabel(catalogueProject) }}</option>
        </select>
      </div>
      <div class="form-group mb-0">
        <label :for="'related-project-relationship-' + index">{{ relationshipField.text }}</label>
        <textarea :id="'related-project-relationship-' + index" rows="3" class="form-control" v-model.trim="project.relationship"></textarea>
      </div>
    </div>
    <p class="mb-2"><small>If the project is not listed, <router-link :to="{ name: 'project_add' }" target="_blank">add it to the projects catalogue first</router-link>, then refresh this form.</small></p>
    <button type="button" class="btn btn-primary" @click="addProject">Add a related project</button>
  </div>
</template>
