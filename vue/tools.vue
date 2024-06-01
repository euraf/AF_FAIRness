<script>
module.exports = {
  name: "tools",
  data() {
    return {
      filteredTools: []
    }
  },
  created() {
    VueBus.$on('updateFiltered', this.updateFiltered)
    VueBus.$on('updateSorting', this.updateSorting)
    this.setupTools()
  },
  watch: {
    tools: {
      deep: true,
      handler() {
        this.setupTools()
      }
    }
  },
  computed: {
    tools() {
      return this.$root.$data.tools
    },
    form() {
      return this.$root.$data.tools_form
    }
  },
  methods: {
    isEven(num) {
      return num % 2 == 0;
    },
    calculateAverageOfArray(arr) {
        var total = 0;
        var count = 0;

        jQuery.each(arr, function(index, value) {
            total += value;
            count++;
        });

        return total / count;
    },
    arrayHasAnswer(arr) {
        var count = 0;
        jQuery.each(arr, function(index, value) {
            if (value !== null, value !== "") count++;
        });
        return count > 0;
    },
    scoreColor: scoreColor,
    updateSorting() {
      if (!('sorting' in this.$refs)) {
        return
      }
      var sorting_data = this.$refs.sorting.$data
      var sorting_option = sorting_data.sorting_options[sorting_data.selected_option]
      this.filteredTools = sorting_option.fn(this.filteredTools)
    },
    setupTools() {
      this.filteredTools = this.tools.slice().sort((a, b) => a.timestamp_creation > b.timestamp_creation ? -1 : 1)
    },
    updateFiltered() {
      if (!('filtering' in this.$refs)) {
        return
      }
      var filters = this.$refs.filtering.$data.filters
      var search = this.$refs.filtering.$data.search
      this.filteredTools = Object.values(this.tools).filter(function(tool) {
        var yesOrNo = true

        for (const [filter_id, filter_value] of Object.entries(search)) {

          if (filter_value.length > 0) {

            toolValue = tool[filter_id]

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
    imageLink(tool) {
      if ('logo_url' in tool) {
        return tool.logo_url
      } else {
        return 'img/feature-image-default.svg'
      }
    },
    truncateDescription(description) {
      var MAX_LEN = 400
      if (description.length > MAX_LEN) return description.substr(0, 400) + '...'
      else return description
    }
  }
}
</script>

<template>
  <div>
    <div class="row no-gutters">
      <div class="col-2">
        <div class="col-12 text-center">
          <p class="btn btn-primary pointer"><router-link :to="{ name: 'tool_add' }">Add a <b>new tool</b></router-link></p>
        </div>
        <div class="col-12 text-center">
          <p>Do a self-assessment of the FAIRness of your tool <b><router-link to="/tools/fairness_self_assessment">here</router-link>.</b></p>
        </div>
        <filtering ref="filtering" :elements="filteredTools" :form="form"></filtering>
      </div>
      <div class="col-10">
        <div class="col-12 row no-gutters mb-3 sorting">
          <div class="col-6">
            <p v-if="filteredTools.length > 1">Displaying {{ filteredTools.length }} tools</p>
            <p v-if="filteredTools.length == 1">Displaying 1 tool</p>
            <p v-if="filteredTools.length == 0">No tools to display</p>
          </div>
          <sorting ref="sorting" class="col-6"></sorting>
        </div>
        <div class="col-12">
          <div class="row tools">
            <div class="col-4 mb-4" v-for="tool in filteredTools" :key="tool.id">
              <div class="card tool">
                <router-link :to="'/tools/tool/' + tool.id"><img class="card-img-top tool-cover" :src="imageLink(tool)" :alt="tool.name"></router-link>
                <div class="card-body row">
                  <div class="col-12">
                    <h5 class="card-title text-center"><b><router-link :to="'/tools/tool/' + tool.id">{{ tool.name }}</router-link></b></h5>
                  </div>
                  <div class="col-12 text-center">
                    <p class="card-text">{{ truncateDescription(tool.description) }}</p>
                  </div>
                  <div class="col-12 text-center my-3">
                    <p><span class="btn-crop mr-1 px-3 py-1" v-if="tool.system_components.includes('Crop')">Crop</span> <span class="btn-tree mr-1 px-3 py-1" v-if="tool.system_components.includes('Tree')">Tree</span> <span class="btn-livestock mr-1 px-3 py-1" v-if="tool.system_components.includes('Livestock')">Livestock</span> <span class="btn-people mr-1 px-3 py-1" v-if="tool.system_components.includes('People')">People</span> <span class="btn-soil mr-1 px-3 py-1" v-if="tool.system_components.includes('Soil')">Soil</span></p>
                  </div>
                  <div class="col-4 text-center details-block">
                    <template v-if="'spatial_scales' in tool && arrayHasAnswer(tool.spatial_scales)">
                      <p class="btn-small-title">Spatial scale</p>
                      <p v-for="(scale, index) in tool.spatial_scales" :key="index">{{ scale }}</p>
                    </template>
                  </div>
                  <div class="col-4 text-center details-block">
                    <template v-if="'time_steps' in tool && arrayHasAnswer(tool.time_steps)">
                      <p class="btn-small-title">Time step</p>
                      <p v-for="(time, index) in tool.time_steps" :key="index">{{ time }}</p>
                    </template>
                  </div>
                  <div class="col-4 text-center details-block">
                    <p class="btn-small-title">FAIRness score</p>
                    <div class="score-bar">
                      <p class="label">F</p>
                      <div class="bar">
                        <div :style="'width:' + tool.findability_score*0.75 + '%; background-color: ' + scoreColor(tool.findability_score) + ';'"></div>
                        <p :class="{ 'ml-0': tool.findability_score == 0 }">{{ tool.findability_score }}%</p>
                      </div>
                    </div>
                    <div class="score-bar">
                      <p class="label">A</p>
                      <div class="bar">
                        <div :style="'width:' + tool.accessibility_score*0.75 + '%; background-color: ' + scoreColor(tool.accessibility_score) + ';'"></div>
                        <p :class="{ 'ml-0': tool.accessibility_score == 0 }">{{ tool.accessibility_score }}%</p>
                      </div>
                    </div>
                    <div class="score-bar">
                      <p class="label">I</p>
                      <div class="bar">
                        <div :style="'width:' + tool.interoperability_score*0.75 + '%; background-color: ' + scoreColor(tool.interoperability_score) + ';'"></div>
                        <p :class="{ 'ml-0': tool.interoperability_score == 0 }">{{ tool.interoperability_score }}%</p>
                      </div>
                    </div>
                    <div class="score-bar">
                      <p class="label">R</p>
                      <div class="bar">
                        <div :style="'width:' + tool.reusability_score*0.75 + '%; background-color: ' + scoreColor(tool.reusability_score) + ';'"></div>
                        <p :class="{ 'ml-0': tool.reusability_score == 0 }">{{ tool.reusability_score }}%</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-4 text-center details-block">
                    <template v-if="'software_proglanguage' in tool && arrayHasAnswer(tool.software_proglanguage)">
                      <p class="btn-small-title">Stack</p>
                      <p v-for="(scale, index) in tool.software_proglanguage" :key="index">{{ scale }}</p>
                    </template>
                  </div>
                  <div class="col-4 text-center details-block">
                    <template v-if="'license' in tool && tool.license">
                      <p class="btn-small-title">License</p>
                      <p>{{ tool.license }}</p>
                    </template>
                  </div>
                  <div class="col-4 text-center details-block">
                    <template v-if="'digitaf_tool_demo_video' in tool && tool.digitaf_tool_demo_video">
                      <p class="btn-small-title">Demonstration video</p>
                      <router-link :to="'tools/tool/' + tool.id" :tool="tool"><img class="demo-video img-fluid" src="img/digitaf_demo_video.png"></router-link>
                    </template>
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