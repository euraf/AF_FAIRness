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
      const Rexp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(Rexp, "<a href='$1' target='_blank'>$1</a>");
    },
    scoreColor: scoreColor
  }
}
</script>

<template>
  <div v-if="loaded">
    <div class="note text-left mb-2">
      <router-link to="/tools"><i class="fas fa-angle-left"></i> Go back to the database</router-link>
    </div>
    <div v-if="tool" class="toolpage card bg-white p-4">
      <div class="row">
        <div class="col-6">
          <h5 class="card-title"><b>{{ tool.name }}</b></h5>
        </div>
        <div class="col-6 note text-right">
          <p>Do you want to improve this dataset's info? <router-link :to="'/tools/tool/' + tool.id +'/edit'">Edit it here</router-link></p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <img class="img-fluid tool-cover" :src="imageLink(tool)" :alt="tool.name">
        </div>
        <div class="col-4">
          <div class="row">
            <div class="col-12">
              <p class="btn-small-title">Link</p>
              <p><a :href="tool.url" target="_blank">{{ tool.url }}</a></p>
            </div>
            <div class="col-12">
              <p class="btn-small-title">Description</p>
              <p v-if="tool.description_full">{{ tool.description_full }}</p>
              <p v-else>{{ tool.description_brief }}</p>
            </div>
            <div class="col-12">
              <p class="btn-small-title">Keywords</p>
              <p>{{ tool.keywords.join(', ') }}</p>
            </div>
            <div class="col-12">
              <p class="btn-small-title">Developed by</p>
              <p class="mb-0" v-html="setLinks(tool.developers)"></p>
              <p v-html="setLinks(tool.organizations)"></p>
            </div>
            <div class="col-12">
              <p class="btn-small-title">Contact</p>
              <p>{{ tool.contact }}</p>
            </div>
            <div class="col-6" v-if="tool.year_release">
              <p class="btn-small-title">Release year</p>
              <p>{{ tool.year_release }}</p>
            </div>
            <div class="col-6" v-if="tool.year_lastupdate">
              <p class="btn-small-title">Last update</p>
              <p>{{ tool.year_lastupdate }}</p>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="col-12">
            <p class="btn-small-title">Status</p>
            <p>{{ tool.status }}</p>
          </div>
          <div class="col-12">
            <p class="btn-small-title mb-2">Systems</p>
            <p><span class="btn-crop mr-1 px-3 py-1" v-if="tool.systems.includes('Agriculture')">Agriculture</span> <span class="btn-tree mr-1 px-3 py-1" v-if="tool.systems.includes('Forestry')">Forestry</span> <span class="btn-agroforestry mr-1 px-3 py-1" v-if="tool.systems.includes('Agroforestry')">Agroforestry</span> <span class="btn-natural mr-1 px-3 py-1" v-if="tool.systems.includes('Natural/Wild')">Natural/Wild</span></p>
          </div>
          <div class="col-12">
            <p class="btn-small-title mb-2">System components</p>
            <p><span class="btn-crop mr-1 px-3 py-1" v-if="tool.system_components.includes('Crop')">Crop</span> <span class="btn-tree mr-1 px-3 py-1" v-if="tool.system_components.includes('Tree')">Tree</span> <span class="btn-livestock mr-1 px-3 py-1" v-if="tool.system_components.includes('Livestock')">Livestock</span> <span class="btn-people mr-1 px-3 py-1" v-if="tool.system_components.includes('People')">People</span> <span class="btn-soil mr-1 px-3 py-1" v-if="tool.system_components.includes('Soil')">Soil</span></p>
          </div>
          <div class="col-12">
            <p class="btn-small-title">Indicators</p>
            <p>{{ tool.indicators.join(', ') }}</p>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-6">
                <p class="btn-small-title">Spatial scale</p>
                <p v-for="(scale, index) in tool.spatial_scales" :key="'spatial'+index" :class="{ 'mb-0': index < tool.spatial_scales.length-1}">{{ scale }}</p>
              </div>
              <div class="col-6">
                <p class="btn-small-title">Time step</p>
                <p v-for="(time, index) in tool.time_steps" :key="'time-'+index" :class="{ 'mb-0': index < tool.time_steps.length-1}">{{ time }}</p>
              </div>
              <div class="col-6">
                <p class="btn-small-title">Stack</p>
                <p v-for="(scale, index) in tool.software_proglanguage" :key="'stack'+index" :class="{ 'mb-0': index < tool.software_proglanguage.length-1}">{{ scale }}</p>
              </div>
              <div class="col-6">
                <p class="btn-small-title">License</p>
                <p>{{ tool.license }}</p>
              </div>
            </div>
          </div>
          <div class="col-12">
            <p class="btn-small-title">Mininum requirements to operate de tool</p>
            <p v-for="req, index in tool.minimum_req" :key="'min_req_'+index" :class="{ 'mb-0': index < tool.minimum_req.length-1}">{{ req }}</p>
          </div>
          <div class="col-12" v-if="'digitaf_tool_demo_video' in tool && tool.digitaf_tool_demo_video">
            <p class="btn-small-title mb-2">DigitAF demonstration video</p>
            <iframe class="youtube-video" :src="'https://www.youtube.com/embed/' + tool.digitaf_tool_demo_video.slice(tool.digitaf_tool_demo_video.indexOf('=')+1)" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>