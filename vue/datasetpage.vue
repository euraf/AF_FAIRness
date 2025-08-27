<script>
module.exports = {
  name: "datasetpage",
  data() {
    return {
      dataset: null
    }
  },
  mounted() {
    if (this.loaded) this.updateInfo(this.$route.params.id)
  },
  watch: {
    dataset_id(dataset_id) {
      if (this.loaded) this.updateInfo(dataset_id)
    },
    loaded() {
      this.updateInfo(this.dataset_id)
    }
  },
  computed: {
    dataset_id() {
      return this.$route.params.id
    },
    datasets() {
      return this.$root.$data.datasets
    },
    loaded() {
      return this.$root.$data.loaded
    },
    fairness_version() {
      return this.$root.$data.datasets_scoring.version
    }
  },
  methods: {
    updateInfo(dataset_id) {
      var hasDataset = this.datasets.filter(dataset => dataset.id === dataset_id)
      if (hasDataset.length == 1) this.dataset = hasDataset[0]
      if (hasDataset.length == 0) console.log(dataset_id + " does not exist.")
      if (hasDataset.length > 1) console.log(dataset_id + " has duplicate entries.")
    },
    imageLink(dataset) {
      if ('logo_url' in dataset) {
        return dataset.logo_url
      } else {
        return 'img/feature-image-default.svg'
      }
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
      <router-link to="/data"><i class="fas fa-angle-left"></i> Go back to the database</router-link>
    </div>
    <div v-if="dataset" class="toolpage card bg-white p-4">
      <div class="row">
        <div class="col-sm-6">
          <h5 class="card-title"><b>{{ dataset.name }}</b></h5>
        </div>
        <div class="col-sm-6 note text-right">
          <p>Do you want to improve this dataset's info? <router-link :to="'/data/dataset/' + dataset.id +'/edit'">Edit it here</router-link></p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <p class="btn-small-title">Description</p>
          <p>{{ dataset.description }}</p>
        </div>
        <div class="col-sm-3">
          <p class="btn-small-title">Link</p>
          <p><a :href="dataset.url" target="_blank">{{  dataset.url }}</a></p>
          <p class="btn-small-title">Keywords</p>
          <p>{{ dataset.keywords.join(', ') }}</p>
          <p class="btn-small-title">Data ownership</p>
          <p>{{ dataset.data_ownership }}</p>
          <p class="btn-small-title">Contact</p>
          <p>{{ dataset.data_contact }}</p>
          <p class="btn-small-title">Regional extent</p>
          <p>{{ dataset.data_collection_country }}</p>
          <p class="btn-small-title">Type of data</p>
          <p>{{ dataset.data_type.join(', ') }}</p>
        </div>
        <div class="col-sm-3">
          <p class="btn-small-title">Spatial scale</p>
          <p>{{ dataset.spatial_scales.join(', ') }}</p>
          <p class="btn-small-title">Spatial details</p>
          <p>{{ dataset.spatial_details }}</p>
          <p class="btn-small-title">Indicators</p>
          <p>{{ dataset.indicators.join(', ') }}</p>
          <p class="btn-small-title">Time step</p>
          <p>{{ dataset.time_steps.join(', ') }}</p>
          <div class="row">
            <div class="col-8 text-center details-block">
              <p class="btn-small-title">FAIRness score <small><b>v{{ fairness_version }}</b></small></p>
              <div class="score-bar">
                <p class="label">F</p>
                <div class="bar">
                  <div :style="'width:' + dataset.findability_score*0.75 + '%; background-color: ' + scoreColor(dataset.findability_score) + ';'"></div>
                  <p :class="{ 'ml-0': dataset.findability_score == 0 }">{{ dataset.findability_score }}%</p>
                </div>
              </div>
              <div class="score-bar">
                <p class="label">A</p>
                <div class="bar">
                  <div :style="'width:' + dataset.accessibility_score*0.75 + '%; background-color: ' + scoreColor(dataset.accessibility_score) + ';'"></div>
                  <p :class="{ 'ml-0': dataset.accessibility_score == 0 }">{{ dataset.accessibility_score }}%</p>
                </div>
              </div>
              <div class="score-bar">
                <p class="label">I</p>
                <div class="bar">
                  <div :style="'width:' + dataset.interoperability_score*0.75 + '%; background-color: ' + scoreColor(dataset.interoperability_score) + ';'"></div>
                  <p :class="{ 'ml-0': dataset.interoperability_score == 0 }">{{ dataset.interoperability_score }}%</p>
                </div>
              </div>
              <div class="score-bar">
                <p class="label">R</p>
                <div class="bar">
                  <div :style="'width:' + dataset.reusability_score*0.75 + '%; background-color: ' + scoreColor(dataset.reusability_score) + ';'"></div>
                  <p :class="{ 'ml-0': dataset.reusability_score == 0 }">{{ dataset.reusability_score }}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>