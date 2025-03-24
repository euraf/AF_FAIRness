<script>
module.exports = {
  name: "toolpage",
  data() {
    return {
      tool: null
    }
  },
  mounted() {
    if (this.loaded) this.updateInfo(this.$route.params.id)
  },
  watch: {
    tool_id(tool_id) {
      if (this.loaded) this.updateInfo(tool_id)
    },
    loaded() {
      this.updateInfo(this.tool_id)
    }
  },
  computed: {
    tool_id() {
      return this.$route.params.id
    },
    tools() {
      return this.$root.$data.tools
    },
    loaded() {
      return this.$root.$data.loaded
    },
    indicators() {
      return this.$root.$data.tools_form.filter(x => x.id == 'indicators')[0]
    },
    fairness_version() {
      return this.$root.$data.tools_scoring.version
    }
  },
  methods: {
    updateInfo(tool_id) {
      var hasTool = this.tools.filter(tool => tool.id === tool_id)
      if (hasTool.length == 1) this.tool = hasTool[0]
      if (hasTool.length == 0) console.log(tool_id + " does not exist.")
      if (hasTool.length > 1) console.log(tool_id + " has duplicate entries.")
    },
    imageLink(tool) {
      if ('logo_url' in tool) {
        return tool.logo_url
      } else {
        return 'img/feature-image-default.svg'
      }
    },
    setLinks(text) {
      if (text) {
        const Rexp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(Rexp, "<a href='$1' target='_blank'>$1</a>");
      }
    },
    scoreColor: scoreColor,
    formatDate(str) {
      var date = new Date(str)
      return date.toLocaleDateString('en-gb', { day: 'numeric', month: 'long', year: 'numeric' })
    }
  }
}
</script>

<template>
  <div v-if="loaded">
    <div class="note text-left mb-2">
      <router-link to="/tools"><i class="fas fa-angle-left"></i> Go back to the database</router-link>
    </div>
    <div v-if="tool" class="toolpage">
      <div class="row">

        <div class="col-12 d-sm-none">
          <div class="row"><!-- record details block mobile -->
            <div class="col-7 tool-dates">
              <p class="mb-0"><span class="btn-small-title">Record created on</span> {{ formatDate(tool.timestamp_creation) }}</p>
              <p><span class="btn-small-title">Record last updated on</span> {{ formatDate(tool.timestamp_lastedit) }}</p>
            </div>
            <div class="col-5 text-right">
              <p class="tool-url badge"><router-link class="font-weight-bold" :to="'/tools/tool/' + tool.id +'/edit'">Edit tool</router-link></p>
            </div>
          </div>
        </div><!-- end of record details block mobile -->

        <div class="col-sm-8"><!-- left block -->
          <div class="row">

            <div class="col-12"><!-- general block -->
              <div class="card bg-white p-4">
                <div class="row">
                  <div class="col-sm-3">
                    <div class="row">
                      <div class="col-12">
                        <img class="img-fluid tool-cover" :src="imageLink(tool)" :alt="tool.name">
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-9">
                    <h5 class="card-title"><b>{{ tool.name }}</b><span class="badge">{{ tool.status }}</span></h5>
                    <div class="tool-url badge text-left mb-4">
                      <p class="mb-1">Launch the tool ↴</p>
                      <p class="mb-1"><a :href="tool.url" target="_blank">{{ tool.url }}</a></p>
                    </div>
                    <p class="btn-small-title">Primary purpose(s)</p>
                    <p><span class="btn-purpose mr-1 px-3 py-1" v-if="tool.primary_purpose.includes('Research')"><i class="fa-solid fa-microscope"></i> Research</span> <span class="btn-purpose mr-1 px-3 py-1" v-if="tool.primary_purpose.includes('Education and training')"><i class="fa-solid fa-graduation-cap"></i> Education and training</span> <span class="btn-purpose mr-1 px-3 py-1" v-if="tool.primary_purpose.includes('Decision support')"><i class="fa-solid fa-diagram-project"></i> Decision support</span></p>
                    <p class="btn-small-title">Keywords</p>
                    <p>{{ tool.keywords.join(', ') }}</p>
                    <p class="btn-small-title">Description</p>
                    <p v-if="tool.description_full">{{ tool.description_full }}</p>
                    <p v-else>{{ tool.description }}</p>
                  </div>
                </div>
              </div>
            </div><!-- end of general block -->

            <div class="col-sm-6 pt-4"><!-- developer block -->
              <div class="card bg-white p-4">
                <div class="row">
                  <div class="col-12">
                    <p class="btn-small-title">Developed by</p>
                    <p class="mb-0" v-html="setLinks(tool.developers)"></p>
                    <p v-html="setLinks(tool.organizations)"></p>
                    <p class="btn-small-title">Contact</p>
                    <p>{{ tool.contact }}</p>
                    <p v-if="tool.tool_project == 'Yes'" class="btn-small-title">Developed/Improved under project(s)</p>
                    <p v-if="tool.tool_project == 'Yes'" class="mb-0">{{ tool.tool_project_name }}</p>
                  </div>
                </div>
              </div>
            </div><!-- end of developer block -->

            <div class="col-sm-6 pt-4"><!-- tech details block -->
              <div class="card bg-white p-4">
                <div class="row">
                  <div class="col-6">
                    <p class="btn-small-title">Stack</p>
                    <p v-for="(scale, index) in tool.software_proglanguage" :key="'stack'+index" :class="{ 'mb-0': index < tool.software_proglanguage.length-1}">{{ scale }}</p>
                  </div>
                  <div class="col-6">
                    <p class="btn-small-title">License</p>
                    <p>{{ tool.license }}</p>
                  </div>
                  <div class="col-6">
                    <p v-if="tool.year_release" class="btn-small-title">Release year</p>
                    <p v-if="tool.year_release">{{ tool.year_release }}</p>
                  </div>
                  <div class="col-6">
                    <p v-if="tool.year_lastupdate" class="btn-small-title">Last update</p>
                    <p v-if="tool.year_lastupdate">{{ tool.year_lastupdate }}</p>
                  </div>
                  <div class="col-12">
                    <p class="btn-small-title">Mininum requirements to operate de tool</p>
                    <p v-for="req, index in tool.minimum_req" :key="'min_req_'+index" :class="{ 'mb-0': index < tool.minimum_req.length-1}">{{ req }}</p>
                  </div>
                </div>
              </div>
            </div><!-- end of tech details block -->
            
            <div class="col-sm-12 pt-4"><!-- documentation block -->
              <div class="card bg-white p-4">
                <div class="row">
                  <div class="col-12">
                    <p class="btn-small-title mb-2">Documentation</p>
                    <p v-html="setLinks(tool.url_documentation)"></p>
                  </div>
                  <div class="col-12">
                    <p class="btn-small-title mb-2">Theoretical background</p>
                    <p v-html="setLinks(tool.documentation_theoretical_background_list)"></p>
                  </div>
                </div>
              </div>
            </div><!-- end of documentation block -->

          </div>
        </div><!-- end of left block -->

        <div class="col-sm-4 mt-4 mt-sm-0 pl-sm-0"><!-- right block -->
          <div class="row">

            <div class="d-none d-sm-block col-sm-12"><!-- record details block -->
                <div class="row">
                  <div class="col-7 tool-dates">
                    <p class="mb-0"><span class="btn-small-title">Record created on</span> {{ formatDate(tool.timestamp_creation) }}</p>
                    <p><span class="btn-small-title">Record last updated on</span> {{ formatDate(tool.timestamp_lastedit) }}</p>
                  </div>
                  <div class="col-5 text-right">
                    <p class="tool-url badge"><router-link class="font-weight-bold" :to="'/tools/tool/' + tool.id +'/edit'">Edit tool</router-link></p>
                  </div>
                </div>
            </div><!-- end of record details block -->

            <div class="col-12"><!-- tool details block -->
              <div class="card bg-white p-4">
                <div class="row">
                  <div class="col-12 text-center mb-4">
                    <p class="btn-small-title">FAIRness score <small><b>v{{ fairness_version }}</b></small></p>
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
                  <div class="col-12">
                    <p class="btn-small-title">Primary usages</p>
                    <p v-for="usage, index in tool.usages_most_relevant" :key="'usage_'+index" :class="{ 'mb-0': index < tool.usages_most_relevant.length-1}">{{ usage }}</p>
                  </div>
                  <div class="col-12">
                    <p class="btn-small-title mb-2">Systems</p>
                    <p><span class="btn-crop mr-1 px-3 py-1" :class="{ active: tool.systems.includes('Agriculture') }">Agriculture</span> <span class="btn-tree mr-1 px-3 py-1" :class="{ active: tool.systems.includes('Forestry') }">Forestry</span> <span class="btn-agroforestry mr-1 px-3 py-1" :class="{ active: tool.systems.includes('Agroforestry') }">Agroforestry</span> <span class="btn-natural mr-1 px-3 py-1" :class="{ active: tool.systems.includes('Natural/Wild') }">Natural/Wild</span></p>
                  </div>
                  <div class="col-12">
                    <p class="btn-small-title mb-2">System components</p>
                    <p><span class="btn-crop mr-1 px-3 py-1" :class="{ active: tool.system_components.includes('Crop') }"><i class="fa-solid fa-seedling"></i> Crop</span> <span class="btn-tree mr-1 px-3 py-1" :class="{ active: tool.system_components.includes('Tree') }"><i class="fa-solid fa-tree"></i> Tree</span> <span class="btn-livestock mr-1 px-3 py-1" :class="{ active: tool.system_components.includes('Livestock') }"><i class="fa-solid fa-cow"></i> Livestock</span> <span class="btn-people mr-1 px-3 py-1" :class="{ active: tool.system_components.includes('People') }"><i class="fa-solid fa-person"></i> People</span> <span class="btn-soil mr-1 px-3 py-1" :class="{ active: tool.system_components.includes('Soil') }"><i class="fa-solid fa-layer-group"></i> Soil</span></p>
                  </div>
                  <div class="col-6">
                    <p class="btn-small-title">Indicators</p>
                    <p v-for="ind, index in tool.indicators" :key="'ind_'+index" class="indicator active" :class="{ 'mb-0': index < tool.indicators.length-1}">{{ ind }}</p>
                  </div>
                  <div class="col-6">
                    <template v-if="tool.indicators_other">
                      <p class="btn-small-title">Other indicators</p>
                      <p v-for="ind, index in tool.indicators_other.split(',')" :key="'ind_other_'+index" class="indicator active" :class="{ 'mb-0': index < tool.indicators_other.split(',').length-1}">{{ ind }}</p>
                    </template>
                  </div>
                  <div class="col-6">
                    <p class="btn-small-title">Spatial scale(s)</p>
                    <p v-for="(scale, index) in tool.spatial_scales" :key="'spatial'+index" :class="{ 'mb-0': index < tool.spatial_scales.length-1}">{{ scale }}</p>
                  </div>
                  <div class="col-6">
                    <p class="btn-small-title">Time step(s)</p>
                    <p v-for="(time, index) in tool.time_steps" :key="'time-'+index" :class="{ 'mb-0': index < tool.time_steps.length-1}">{{ time }}</p>
                  </div>
                </div>
              </div>
            </div><!-- end of tool details block -->

            <div class="col-12 pt-4"><!-- training block -->
              <div class="card bg-white p-4">
                <div class="row">
                  <div class="col-12" v-if="'digitaf_tool_demo_video' in tool && tool.digitaf_tool_demo_video">
                    <p class="btn-small-title mb-2">Demonstration video</p>
                    <iframe class="youtube-video" :src="'https://www.youtube.com/embed/' + tool.digitaf_tool_demo_video.slice(tool.digitaf_tool_demo_video.indexOf('=')+1)" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                  <div class="col-12">
                    <p class="btn-small-title mb-2">Training materials</p>
                    <p v-html="setLinks(tool.url_training_materials)"></p>
                  </div>
                </div>
              </div>
            </div><!-- training block -->

          </div>
        </div><!-- end of right block -->

      </div>
    </div>
  </div>
</template>