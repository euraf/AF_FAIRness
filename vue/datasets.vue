<script>
module.exports = {
  name: "datasets",
  data() {
    return {
      filteredDatasets: []
    }
  },
  created() {
    VueBus.$on('updateFiltered', this.updateFiltered)
    VueBus.$on('updateSorting', this.updateSorting)
    this.setupDatasets()
  },
  watch: {
    datasets: {
      deep: true,
      handler() {
        this.setupDatasets()
      }
    }
  },
  computed: {
    datasets() {
      return this.$root.$data.datasets
    },
    form() {
      return this.$root.$data.datasets_form
    }
  },
  methods: {
    isEven(num) {
      return num % 2 == 0;
    },
    arrayHasAnswer(arr) {
        var count = 0;
        jQuery.each(arr, function(index, value) {
            if (value !== null, value !== "") count++;
        });
        return count > 0;
    },
    updateSorting(sorting_option) {
      this.filteredDatasets = sorting_option.fn(this.filteredDatasets)
    },
    setupDatasets() {
      this.filteredDatasets = this.datasets.slice().sort((a, b) => a.timestamp_creation > b.timestamp_creation ? -1 : 1)
    },
    updateFiltered() {
      if (!('filtering' in this.$refs && this.$refs.filtering)) {
        return
      }
      var filters = this.$refs.filtering.$data.filters
      var search = this.$refs.filtering.$data.search
      var searchQuery = this.$refs.filtering.$data.searchQuery
      var searchInName = this.$refs.filtering.$data.searchInName
      var searchInDescription = this.$refs.filtering.$data.searchInDescription
      var searchInKeywords = this.$refs.filtering.$data.searchInKeywords

      this.filteredDatasets = Object.values(this.datasets).filter(function(dataset) {
        var yesOrNo = true
        
        if (validString(searchQuery)) {
          var inName = false
          var inDescription = false
          var inKeywords = false

          if (searchInName) {
            if (dataset.name.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
              inName = true
            }
          }
          if (searchInDescription) {
            if (dataset.description.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
              inDescription = true
            }
          }
          if (searchInKeywords) {
            if (dataset.keywords.filter(function(keyword) {
              return keyword.toLowerCase().includes(searchQuery.toLowerCase().trim())
            }).length > 0) {
              inKeywords = true
            }
          }
          if (searchInName || searchInDescription || searchInKeywords) {
            if (inName || inDescription || inKeywords) {
              yesOrNo = yesOrNo && true
            } else {
              yesOrNo = yesOrNo && false
            }
          }
        }

        for (const [filter_id, filter_value] of Object.entries(search)) {

          if (filter_value.length > 0) {

            toolValue = dataset[filter_id]

            if (toolValue == "") {
              yesOrNo = yesOrNo && false

            } else {
              var filter = filters[filter_id]
              
              if ('answers' in filter) {

                if (filter.type.includes('array')) {
                  yesOrNo = yesOrNo && filter_value.every(a => toolValue.includes(a))
                } else {
                  yesOrNo = yesOrNo && filter_value.includes(toolValue)
                }

              } else {
                // TODO to be implemented
              }
            }
          } else {
            continue;
          }
        }
        return yesOrNo
      })
      this.updateSorting()
    },
    imageLink(dataset) {
      if ('logo_url' in dataset) {
        return dataset.logo_url
      } else {
        return 'img/feature-image-default.svg'
      }
    },
    truncateDescription(description) {
      var MAX_LEN = 400
      if (description.length > MAX_LEN) return description.substr(0, 400) + '...'
      else return description
    },
    scoreColor: scoreColor
  }
}
</script>

<template>
  <div>
    <div class="row no-gutters">
      <div class="col-2">
        <div class="col-12 text-center">
          <p class="btn btn-primary pointer"><router-link :to="{ name: 'dataset_add' }"><b>+ New Dataset</b></router-link></p>
        </div>
        <div class="col-12 text-center">
          <p>Do a self-assessment of the FAIRness of your dataset <b><router-link to="/data/fairness_self_assessment">here</router-link>.</b></p>
        </div>
        <filtering ref="filtering" :elements="filteredDatasets" :form="form"></filtering>
      </div>
      <div class="col-10">
        <div class="col-12 row no-gutters mb-3 sorting">
          <div class="col-6">
            <p v-if="filteredDatasets.length > 1">Displaying <b>{{ filteredDatasets.length }}</b> datasets</p>
            <p v-if="filteredDatasets.length == 1">Displaying <b>1</b> dataset</p>
            <p v-if="filteredDatasets.length == 0">No datasets to display</p>
          </div>
          <sorting ref="sorting" class="col-6"></sorting>
        </div>
        <div class="col-12">
          <div class="row datasets">
            <div class="col-6 mb-4" v-for="dataset in filteredDatasets" :key="dataset.id">
              <div class="card dataset">
                <div class="card-body row">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-12">
                        <h5 class="card-title"><b><router-link :to="'/data/dataset/' + dataset.id" :dataset="dataset">{{ dataset.name }}</router-link></b></h5>
                        <p class="btn-small-title text-left">Keywords</p>
                        <p class="topic">{{ dataset.keywords.join(", ") }}</p>
                        <!--p class="btn-small-title text-left">Type of data</p>
                        <p class="topic">{{ dataset.data_type.join(", ") + dataset.data_type_other }}</p-->
                      </div>
                      <div class="offset-2 col-8 text-center details-block">
                        <p class="btn-small-title">FAIRness score</p>
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
                  <div class="col-6">
                    <p class="card-text">{{ truncateDescription(dataset.description) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>