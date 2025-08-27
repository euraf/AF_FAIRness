<script>
module.exports = {
  name: "projectpage",
  data() {
    return {
      project: null
    }
  },
  mounted() {
    if (this.loaded) this.updateInfo(this.$route.params.id)
  },
  watch: {
    project_id(project_id) {
      if (this.loaded) this.updateInfo(project_id)
    },
    loaded() {
      this.updateInfo(this.project_id)
    }
  },
  computed: {
    project_id() {
      return this.$route.params.id
    },
    projects() {
      return this.$root.$data.projects
    },
    loaded() {
      return this.$root.$data.loaded
    }
  },
  methods: {
    updateInfo(project_id) {
      var hasproject = this.projects.filter(project => project.id === project_id)
      if (hasproject.length == 1) this.project = hasproject[0]
      if (hasproject.length == 0) console.log(project_id + " does not exist.")
      if (hasproject.length > 1) console.log(project_id + " has duplicate entries.")
    },
    setLinks(text) {
      const Rexp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(Rexp, "<a href='$1' target='_blank'>$1</a>");
    },
    scoreColor: scoreColor
  }
}
</script>

<template>
  <div v-if="loaded">
    <div class="note text-left py-2">
      <router-link to="/projects"><i class="fas fa-angle-left"></i> Go back to the database</router-link>
    </div>
    <div v-if="project" class="toolpage card bg-white p-4">
      <div class="row">
        <div class="col-sm-6">
          <h5 class="card-title"><b>{{ project.name }}</b></h5>
        </div>
        <div class="col-sm-6 note text-right">
          <p>Do you want to improve this project's info? <router-link :to="'/projects/project/' + project.id +'/edit'">Edit it here</router-link></p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-9">
          <p class="btn-small-title">Description</p>
          <p>{{ project.description }}</p>
        </div>
        <div class="col-sm-3">
          <div class="project-cover text-center mb-4">
            <img v-if="project.logo_url" class="img-fluid mini" :src="project.logo_url" :alt="project.acronym">
          </div>
          <template v-if="project.project_url">
            <p class="btn-small-title">Project website</p>
            <p><a :href="project.project_url" target="_blank">{{  project.project_url }}</a></p>
          </template>
          <template v-if="project.project_funding_programme_listing">
            <p class="btn-small-title">Funding programme listing</p>
            <p><a :href="project.project_funding_programme_listing" target="_blank">{{  project.project_funding_programme_listing }}</a></p>
          </template>
          <template v-if="project.project_url_other">
            <p class="btn-small-title">Other relevant link</p>
            <p><a :href="project.project_url_other" target="_blank">{{  project.project_url_other }}</a></p>
          </template>
          <p class="btn-small-title">Keywords</p>
          <p>{{ project.keywords.join(', ') }}</p>
          <p class="btn-small-title">Start date - End date</p>
          <p>{{ project.start_date }} - {{ project.end_date }}</p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>