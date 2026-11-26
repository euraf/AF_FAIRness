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
    projectCatalogue() {
      return this.$root.$data.projects
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
    projectForId(projectId) {
      return this.projectCatalogue.find(project => project.id === projectId)
    },
    projectLabel(project) {
      if (project.acronym && project.name && project.acronym.toLowerCase() !== project.name.toLowerCase()) {
        return project.acronym + ' - ' + project.name
      }
      return project.acronym || project.name || project.id
    },
    setLinks(text) {
      if (text) {
        const Rexp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(Rexp, "<a href='$1' target='_blank'>$1</a>");
      }
    },
    demoVideoValue(tool) {
      if (!tool || !('url_demo_video' in tool) || !tool.url_demo_video) return ''
      return tool.url_demo_video.trim()
    },
    demoVideoType(tool) {
      const value = this.demoVideoValue(tool)
      if (!value) return null
      if (this.videoSourceType(value)) return 'file'
      if (this.youtubeEmbedUrl(value)) return 'youtube'
      return null
    },
    videoSourceType(value) {
      if (!value) return null

      const videoTypes = {
        mp4: 'video/mp4',
        m4v: 'video/mp4',
        webm: 'video/webm',
        ogv: 'video/ogg',
        ogg: 'video/ogg'
      }

      const match = value.match(/\.([a-z0-9]+)(\?.*)?$/i)
      if (!match) return null
      return videoTypes[match[1].toLowerCase()] || null
    },
    youtubeEmbedUrl(value) {
      if (!value) return null
      if (/^[A-Za-z0-9_-]{11}$/.test(value)) {
        return 'https://www.youtube.com/embed/' + value
      }

      try {
        const parsedUrl = new URL(value)
        const hostname = parsedUrl.hostname.replace(/^www\./, '')

        if (hostname === 'youtu.be') {
          const videoId = parsedUrl.pathname.replace(/^\//, '')
          return videoId ? 'https://www.youtube.com/embed/' + videoId : null
        }

        if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
          if (parsedUrl.pathname === '/watch') {
            const videoId = parsedUrl.searchParams.get('v')
            return videoId ? 'https://www.youtube.com/embed/' + videoId : null
          }

          if (parsedUrl.pathname.startsWith('/embed/')) {
            const videoId = parsedUrl.pathname.split('/embed/')[1]
            return videoId ? 'https://www.youtube.com/embed/' + videoId : null
          }

          if (parsedUrl.pathname.startsWith('/shorts/')) {
            const videoId = parsedUrl.pathname.split('/shorts/')[1]
            return videoId ? 'https://www.youtube.com/embed/' + videoId : null
          }
        }
      } catch (error) {
        return null
      }

      return null
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
    <div class="note text-left py-2">
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
                    <p class="tool-field-label">Description</p>
                    <p v-if="tool.description_full">{{ tool.description_full }}</p>
                    <p v-else>{{ tool.description }}</p>
                    <template v-if="tool.keywords && tool.keywords.length">
                      <p class="tool-field-label">Keywords</p>
                      <p class="mb-0">{{ tool.keywords.join(', ') }}</p>
                    </template>
                  </div>
                </div>
              </div>
            </div><!-- end of general block -->

            <div class="col-sm-6 pt-4"><!-- developer block -->
              <div class="card bg-white p-4">
                <div class="row">
                  <div class="col-12">
                    <h2 class="tool-section-title">People &amp; projects</h2>
                    <template v-if="tool.developers">
                      <p class="tool-field-label">Developed by</p>
                      <p class="mb-0" v-html="setLinks(tool.developers)"></p>
                    </template>
                    <template v-if="tool.organizations">
                      <p class="tool-field-label">Organizations</p>
                      <p v-html="setLinks(tool.organizations)"></p>
                    </template>
                    <template v-if="tool.contact">
                      <p class="tool-field-label">Contact</p>
                      <p>{{ tool.contact }}</p>
                    </template>
                    <div v-if="tool.related_projects && tool.related_projects.length">
                      <p class="tool-field-label">Related projects in the catalogue</p>
                      <div v-for="(project, index) in tool.related_projects" :key="'project_' + index" class="related-project-item mb-3">
                        <p class="mb-1">
                          <router-link v-if="projectForId(project.project_id)" class="related-project-link" :to="'/projects/project/' + project.project_id">
                            <i class="fa-solid fa-folder-tree" aria-hidden="true"></i>
                            <span>{{ projectLabel(projectForId(project.project_id)) }}</span>
                            <small class="related-project-link-hint">View catalogue entry <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></small>
                          </router-link>
                          <span v-else class="related-project-missing">{{ project.project_id }} <small>(not found in the Projects Catalogue)</small></span>
                        </p>
                        <p v-if="project.relationship" class="related-project-relationship"><strong>Relationship to this tool:</strong> {{ project.relationship }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div><!-- end of developer block -->

            <div class="col-sm-6 pt-4"><!-- tech details block -->
              <div class="card bg-white p-4">
                <div class="row">
                  <div class="col-12">
                    <h2 class="tool-section-title">Technical details</h2>
                  </div>
                  <div class="col-6">
                    <p class="tool-field-label">Software / programming languages</p>
                    <p v-for="(language, index) in tool.software_proglanguage" :key="'stack'+index" :class="{ 'mb-0': index < tool.software_proglanguage.length-1}">{{ language }}</p>
                    <p v-if="tool.software_proglanguage_other" class="mb-0">{{ tool.software_proglanguage_other }}</p>
                  </div>
                  <div class="col-6">
                    <p class="tool-field-label">License</p>
                    <p>{{ tool.license }}</p>
                    <p v-if="tool.license_other">{{ tool.license_other }}</p>
                    <p v-if="tool.license_url"><a :href="tool.license_url" target="_blank" rel="noopener noreferrer">View license</a></p>
                  </div>
                  <div class="col-6" v-if="tool.year_release">
                    <p class="tool-field-label">Release year</p>
                    <p>{{ tool.year_release }}</p>
                  </div>
                  <div class="col-6" v-if="tool.year_lastupdate">
                    <p class="tool-field-label">Last updated</p>
                    <p>{{ tool.year_lastupdate }}</p>
                  </div>
                  <div class="col-12">
                    <p class="tool-field-label">Minimum requirements</p>
                    <p v-for="req, index in tool.minimum_req" :key="'min_req_'+index" :class="{ 'mb-0': index < tool.minimum_req.length-1}">{{ req }}</p>
                    <p v-if="tool.minimum_req_other">{{ tool.minimum_req_other }}</p>
                  </div>
                  <div class="col-12">
                    <p class="tool-field-label">Previous versions available</p>
                    <p class="mb-0">{{ tool.previous_versions_available }}</p>
                  </div>
                </div>
              </div>
            </div><!-- end of tech details block -->

            <div class="col-sm-12 pt-4"><!-- data formats block -->
              <div class="card bg-white p-4">
                <h2 class="tool-section-title">Data inputs &amp; outputs</h2>
                <div class="row">
                  <div class="col-sm-6">
                    <h3 class="tool-subsection-title">Input</h3>
                    <p class="tool-field-label mb-1">How data is entered</p>
                    <p v-for="(protocol, index) in tool.input_data_protocols" :key="'input-protocol-'+index" class="mb-0">{{ protocol }}</p>
                    <p class="tool-field-label mb-1 mt-2">Accepted data</p>
                    <p v-for="(format, index) in tool.input_data_formats" :key="'input-format-'+index" class="mb-0">{{ format }}</p>
                    <p v-if="tool.input_data_formats_other" class="mb-0">{{ tool.input_data_formats_other }}</p>
                    <p v-for="(format, index) in tool.input_data_file_formats" :key="'input-file-format-'+index" class="mb-0">{{ format }}</p>
                    <p v-if="tool.input_data_file_formats_other" class="mb-0">{{ tool.input_data_file_formats_other }}</p>
                  </div>
                  <div class="col-sm-6">
                    <h3 class="tool-subsection-title">Output</h3>
                    <p class="tool-field-label mb-1">Generated data</p>
                    <p v-for="(format, index) in tool.output_data_formats" :key="'output-format-'+index" class="mb-0">{{ format }}</p>
                    <p v-if="tool.output_data_formats_other" class="mb-0">{{ tool.output_data_formats_other }}</p>
                    <p v-for="(format, index) in tool.output_data_file_formats" :key="'output-file-format-'+index" class="mb-0">{{ format }}</p>
                    <p v-if="tool.output_data_file_formats_other" class="mb-0">{{ tool.output_data_file_formats_other }}</p>
                  </div>
                </div>
              </div>
            </div><!-- end of data formats block -->

            <div class="col-sm-12 pt-4"><!-- documentation block -->
              <div class="card bg-white p-4">
                <div class="row">
                  <div class="col-12">
                    <h2 class="tool-section-title">Documentation &amp; learning</h2>
                  </div>
                  <div class="col-sm-6">
                    <h3 class="tool-subsection-title">Documentation</h3>
                    <p><b>Availability:</b> {{ tool.documentation_available }}</p>
                    <p><b>Accessibility:</b> {{ tool.documentation_accessible }}</p>
                    <p v-if="tool.url_documentation" v-html="setLinks(tool.url_documentation)"></p>
                    <p><b>Theoretical background:</b> {{ tool.documentation_theoretical_background }}</p>
                    <p v-if="tool.documentation_theoretical_background_list" v-html="setLinks(tool.documentation_theoretical_background_list)"></p>
                  </div>
                  <div class="col-sm-6">
                    <h3 class="tool-subsection-title">Training</h3>
                    <p v-if="tool.training_materials"><b>Training materials available:</b> {{ tool.training_materials }}</p>
                    <p v-if="tool.url_training_materials" v-html="setLinks(tool.url_training_materials)"></p>
                    <div v-if="demoVideoType(tool)">
                      <p class="tool-field-label">Demonstration video</p>
                      <iframe v-if="demoVideoType(tool) == 'youtube'" class="youtube-video" :src="youtubeEmbedUrl(demoVideoValue(tool))" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      <video v-else-if="demoVideoType(tool) == 'file'" class="youtube-video" controls preload="metadata">
                        <source :src="demoVideoValue(tool)" :type="videoSourceType(demoVideoValue(tool))">
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  <div class="col-12">
                    <h3 class="tool-subsection-title">Reuse &amp; provenance</h3>
                    <p><b>Data provenance:</b> {{ tool.data_provenance }}</p>
                    <p><b>Development process documented:</b> {{ tool.development_process }}</p>
                    <p><b>Contribution guidance:</b> {{ tool.documentation_contribute }}</p>
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
                    <h2 class="tool-section-title">FAIRness assessment</h2>
                    <p class="tool-field-label">FAIRness score <small><b>v{{ fairness_version }}</b></small></p>
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
                    <h3 class="tool-subsection-title">Who it serves &amp; what it supports</h3>
                    <p v-if="tool.end_users && tool.end_users.length" class="tool-field-label">Potential users</p>
                    <p v-for="(user, index) in tool.end_users" :key="'user-'+index" :class="{ 'mb-0': index < tool.end_users.length-1}">{{ user }}</p>
                    <p v-if="tool.end_users_other">{{ tool.end_users_other }}</p>
                    <p v-if="tool.usages_most_relevant && tool.usages_most_relevant.length" class="tool-field-label mt-3">Primary usages</p>
                    <p v-for="usage, index in tool.usages_most_relevant" :key="'usage_'+index" :class="{ 'mb-0': index < tool.usages_most_relevant.length-1}">{{ usage }}</p>
                    <p v-if="tool.usages_least_relevant && tool.usages_least_relevant.length" class="tool-field-label mt-3">Less relevant for</p>
                    <p v-for="(usage, index) in tool.usages_least_relevant" :key="'usage-least-'+index" :class="{ 'mb-0': index < tool.usages_least_relevant.length-1}">{{ usage }}</p>
                    <p v-if="tool.languages && tool.languages.length" class="tool-field-label mt-3">Available languages</p>
                    <p v-for="(language, index) in tool.languages" :key="'language-'+index" :class="{ 'mb-0': index < tool.languages.length-1}">{{ language }}</p>
                    <p v-if="tool.languages_other">{{ tool.languages_other }}</p>
                  </div>
                  <div class="col-12">
                    <h3 class="tool-subsection-title">Agroforestry scope</h3>
                    <p class="tool-field-label mb-2">Systems</p>
                    <p><span class="btn-crop mr-1 px-3 py-1" :class="{ active: tool.systems.includes('Agriculture') }">Agriculture</span> <span class="btn-tree mr-1 px-3 py-1" :class="{ active: tool.systems.includes('Forestry') }">Forestry</span> <span class="btn-agroforestry mr-1 px-3 py-1" :class="{ active: tool.systems.includes('Agroforestry') }">Agroforestry</span> <span class="btn-natural mr-1 px-3 py-1" :class="{ active: tool.systems.includes('Natural/Wild') }">Natural/Wild</span> <span class="btn-natural mr-1 px-3 py-1" :class="{ active: tool.systems.includes('Urban') }">Urban</span></p>
                  </div>
                  <div class="col-12">
                    <p class="tool-field-label mb-2">System components</p>
                    <p><span class="btn-crop mr-1 px-3 py-1" :class="{ active: tool.system_components.includes('Crop') }"><i class="fa-solid fa-seedling"></i> Crop</span> <span class="btn-tree mr-1 px-3 py-1" :class="{ active: tool.system_components.includes('Tree') }"><i class="fa-solid fa-tree"></i> Tree</span> <span class="btn-livestock mr-1 px-3 py-1" :class="{ active: tool.system_components.includes('Livestock') }"><i class="fa-solid fa-cow"></i> Livestock</span> <span class="btn-people mr-1 px-3 py-1" :class="{ active: tool.system_components.includes('People') }"><i class="fa-solid fa-person"></i> People</span> <span class="btn-soil mr-1 px-3 py-1" :class="{ active: tool.system_components.includes('Soil') }"><i class="fa-solid fa-layer-group"></i> Soil</span></p>
                  </div>
                  <div class="col-6">
                    <p class="tool-field-label">Indicators</p>
                    <p v-for="ind, index in tool.indicators" :key="'ind_'+index" class="indicator active" :class="{ 'mb-0': index < tool.indicators.length-1}">{{ ind }}</p>
                  </div>
                  <div class="col-6">
                    <template v-if="tool.indicators_other">
                      <p class="tool-field-label">Other indicators</p>
                      <p v-for="ind, index in tool.indicators_other.split(',')" :key="'ind_other_'+index" class="indicator active" :class="{ 'mb-0': index < tool.indicators_other.split(',').length-1}">{{ ind }}</p>
                    </template>
                  </div>
                  <div class="col-6">
                    <p class="tool-field-label">Spatial scale(s)</p>
                    <p v-for="(scale, index) in tool.spatial_scales" :key="'spatial'+index" :class="{ 'mb-0': index < tool.spatial_scales.length-1}">{{ scale }}</p>
                  </div>
                  <div class="col-6">
                    <p class="tool-field-label">Time step(s)</p>
                    <p v-for="(time, index) in tool.time_steps" :key="'time-'+index" :class="{ 'mb-0': index < tool.time_steps.length-1}">{{ time }}</p>
                  </div>
                  <div class="col-12">
                    <p v-if="tool.spatial_scales_other"><b>Other spatial scales:</b> {{ tool.spatial_scales_other }}</p>
                    <p v-if="tool.time_steps_other"><b>Other time steps:</b> {{ tool.time_steps_other }}</p>
                  </div>
                </div>
              </div>
            </div><!-- end of tool details block -->

            <div class="col-12 pt-4"><!-- access and interoperability block -->
              <div class="card bg-white p-4">
                <div class="row">
                  <div class="col-12">
                    <h2 class="tool-section-title">Access &amp; interoperability</h2>
                  </div>
                  <div class="col-12">
                    <p><b>Access:</b> {{ tool.access_barrier }}</p>
                    <p v-if="tool.access_procedure"><b>How to request access:</b> {{ tool.access_procedure }}</p>
                    <p v-if="tool.access_procedure_documentation"><b>Access procedure documented:</b> {{ tool.access_procedure_documentation }}</p>
                    <p><b>Persistent identifier:</b> {{ tool.url_persistent }}</p>
                  </div>
                  <div class="col-12">
                    <p class="tool-field-label">Listed in other databases</p>
                    <p>{{ tool.listed_other_databases }}</p>
                    <p v-if="tool.listed_other_databases_list">{{ tool.listed_other_databases_list }}</p>
                    <p class="tool-field-label">Integrated with other tools or services</p>
                    <p>{{ tool.integrated_other_tools }}</p>
                    <p v-if="tool.integrated_other_tools_list">{{ tool.integrated_other_tools_list }}</p>
                  </div>
                </div>
              </div>
            </div><!-- access and interoperability block -->

          </div>
        </div><!-- end of right block -->

      </div>
    </div>
  </div>
</template>