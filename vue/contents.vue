<script>
module.exports = {
  name: "contents",
  created() {
	},
  computed: {
    nr_tools() {
      return this.$root.$data.tools.length
    },
    latest_tools() {
      return this.$root.$data.tools.toSorted((a, b) => a.timestamp_creation > b.timestamp_creation ? -1 : 1)
    },
    tools_three_months() {
      var d = new Date()
      d.setMonth(d.getMonth() - 3)
      return this.$root.$data.tools.filter(function(tool) {
        return new Date(tool.timestamp_creation) > d
      }).length
    },
    tools_contributors() {
      var contributors = []
      var tools_sorted = this.$root.$data.tools.toSorted((a, b) => a.timestamp_lastedit > b.timestamp_lastedit ? -1 : 1)
      for (var i = 0; i < tools_sorted.length; i++) {
        var tool = tools_sorted[i]
        if (tool.timestamp_lastedit > tool.timestamp_creation) {
          /*if (tool.editor_name.indexOf(' ') < 0) {
            contributors.push(tool.editor_name)
          } else {
            var name_arr = tool.editor_name.split(' ')
            contributors.push(name_arr[0] + ' ' + name_arr[name_arr.length-1])
          }*/
          contributors.push(tool.editor_name)
        } else {
          /*if (tool.submitter_name.indexOf(' ') < 0) {
            contributors.push(tool.submitter_name)
          } else {
            var name_arr = tool.submitter_name.split(' ')
            contributors.push(name_arr[0] + ' ' + name_arr[name_arr.length-1])
          }*/
          contributors.push(tool.submitter_name)
        }
        var finished_set = new Set(contributors)
        if (finished_set.size === 3) {
          return Array.from(finished_set)
        }
      }
    },
    nr_datasets() {
      return this.$root.$data.datasets.length
    },
    latest_datasets() {
      return this.$root.$data.datasets.toSorted((a, b) => a.timestamp_creation > b.timestamp_creation ? -1 : 1)
    },
    datasets_three_months() {
      var d = new Date()
      d.setMonth(d.getMonth() - 3)
      return this.$root.$data.datasets.filter(function(tool) {
        return new Date(tool.timestamp_creation) > d
      }).length
    },
    datasets_contributors() {
      var contributors = []
      var tools_sorted = this.$root.$data.datasets.toSorted((a, b) => a.timestamp_lastedit > b.timestamp_lastedit ? -1 : 1)
      for (var i = 0; i < tools_sorted.length; i++) {
        var tool = tools_sorted[i]
        if (tool.timestamp_lastedit > tool.timestamp_creation) {
          /*if (tool.editor_name.indexOf(' ') < 0) {
            contributors.push(tool.editor_name)
          } else {
            var name_arr = tool.editor_name.split(' ')
            contributors.push(name_arr[0] + ' ' + name_arr[name_arr.length-1])
          }*/
          contributors.push(tool.editor_name)
        } else {
          /*if (tool.submitter_name.indexOf(' ') < 0) {
            contributors.push(tool.submitter_name)
          } else {
            var name_arr = tool.submitter_name.split(' ')
            contributors.push(name_arr[0] + ' ' + name_arr[name_arr.length-1])
          }*/
          contributors.push(tool.submitter_name)
        }
        var finished_set = new Set(contributors)
        if (finished_set.size === 3) {
          return Array.from(finished_set)
        }
      }
    },
    nr_projects() {
      return this.$root.$data.projects.length
    },
    latest_projects() {
      return this.$root.$data.projects.toSorted((a, b) => a.timestamp_creation > b.timestamp_creation ? -1 : 1)
    },
    projects_three_months() {
      var d = new Date()
      d.setMonth(d.getMonth() - 3)
      return this.$root.$data.projects.filter(function(tool) {
        return new Date(tool.timestamp_creation) > d
      }).length
    },
    projects_contributors() {
      var contributors = []
      var tools_sorted = this.$root.$data.projects.toSorted((a, b) => a.timestamp_lastedit > b.timestamp_lastedit ? -1 : 1)
      for (var i = 0; i < tools_sorted.length; i++) {
        var tool = tools_sorted[i]
        if (tool.timestamp_lastedit > tool.timestamp_creation) {
          /*if (tool.editor_name.indexOf(' ') < 0) {
            contributors.push(tool.editor_name)
          } else {
            var name_arr = tool.editor_name.split(' ')
            contributors.push(name_arr[0] + ' ' + name_arr[name_arr.length-1])
          }*/
          contributors.push(tool.editor_name)
        } else {
          /*if (tool.submitter_name.indexOf(' ') < 0) {
            contributors.push(tool.submitter_name)
          } else {
            var name_arr = tool.submitter_name.split(' ')
            contributors.push(name_arr[0] + ' ' + name_arr[name_arr.length-1])
          }*/
          contributors.push(tool.submitter_name)
        }
        var finished_set = new Set(contributors)
        if (finished_set.size === 3) {
          return Array.from(finished_set)
        }
      }
    },
  },
  methods: {
    imageLink(tool) {
      if ('logo_url' in tool) {
        return tool.logo_url
      } else {
        return 'img/feature-image-default.svg'
      }
    },
  }
}
</script>

<template>
  <div class="home-screen row">
    <div class="col-sm-12 home-block tools-catalogue">
      <div class="row">
        <div class="col-sm-6">
          <h3 class="mb-sm-4"><router-link class="text-color" :to="{ name: 'tools' }"><strong><i class="fa-solid fa-screwdriver-wrench mr-2"></i> Tools</strong> Catalogue</router-link></h3>
        </div>
        <div class="col-sm-6 text-right">
          <p class="mt-sm-3 mb-3"><router-link class="text-color" :to="{ name: 'tools' }"><b class="nr">{{ nr_tools }}</b> tools currently available</router-link></p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3 text-center">
          <div class="card stats shadow-sm">
            <div class="row">
              <div class="col-3 col-sm-4 left text-center"><p class="highlight">{{ tools_three_months }}</p></div>
              <div class="col-9 col-sm-8 right text-left"><p><strong>new tools</strong> in the last three months</p></div>
              <div class="col-12 right text-center"><p class="btn btn-secondary add-btn pointer"><router-link :to="{ name: 'tool_add' }">Add yours here!</router-link></p></div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card stats shadow-sm">
            <div class="row">
              <div class="col-3 col-sm-2 left"><i class="fa-solid fa-people-group fa-2xl"></i></div>
              <div class="col-9 col-sm-10 right text-right"><p>A big thank you to <strong>{{ tools_contributors[0] }}</strong>, <strong>{{ tools_contributors[1] }}</strong> and <strong>{{ tools_contributors[2] }}</strong> for their recent contributions.</p></div>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <router-link class="pointer" :to="'/tools/tool/' + latest_tools[0].id">
            <div class="card stats shadow-sm">
              <div class="row">
                <div class="col-3 col-sm-2 left"><img class="img-fluid tool-cover" :src="imageLink(latest_tools[0])" :alt="latest_tools[0].name"></div>
                <div class="col-9 col-sm-10 right text-right"><p>Check out the latest addition:</p><p><strong>{{ latest_tools[0].name }}</strong></p></div>
              </div>
            </div>
          </router-link>
            <div class="mt-2 text-center">
              <p class="btn btn-secondary pointer mb-0"><router-link :to="{ name: 'tools' }">Browse all tools <i class="fa-solid fa-screwdriver-wrench ml-2"></i></router-link></p>
            </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 home-block data-catalogue">
      <div class="row">
        <div class="col-sm-6">
          <h3 class="mb-sm-4"><router-link class="text-color" :to="{ name: 'datasets' }"><strong><i class="fa-solid fa-database mr-2"></i> Data</strong> Catalogue</router-link></h3>
        </div>
        <div class="col-sm-6 text-right">
          <p class="mt-sm-3 mb-3"><router-link class="text-color" :to="{ name: 'datasets' }"><b class="nr">{{ nr_datasets }}</b> datasets currently available</router-link></p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3 text-center">
          <div class="card stats shadow-sm">
            <div class="row">
              <div class="col-3 col-sm-4 left text-center"><p class="highlight">{{ datasets_three_months }}</p></div>
              <div class="col-9 col-sm-8 right text-left"><p><strong>new datasets</strong> in the last three months</p></div>
              <div class="col-12 right text-center">
                <p class="btn btn-primary add-btn pointer"><router-link :to="{ name: 'dataset_add' }">Contribute here!</router-link></p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card stats shadow-sm">
            <div class="row">
              <div class="col-3 col-sm-2 left"><i class="fa-solid fa-people-group fa-2xl"></i></div>
              <div class="col-9 col-sm-10 right text-right"><p>Many thanks to <strong>{{ datasets_contributors[0] }}</strong>, <strong>{{ datasets_contributors[1] }}</strong> and <strong>{{ datasets_contributors[2] }}</strong> for contributing with dataset references.</p></div>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <router-link class="pointer" :to="'/data/dataset/' + latest_datasets[0].id">
            <div class="card stats shadow-sm">
              <div class="row">
                <div class="col-3 col-sm-2 left"></div>
                <div class="col-9 col-sm-10 right text-right"><p>Take a look at the newest addition:</p><p><strong>{{ latest_datasets[0].name }}</strong></p></div>
              </div>
            </div>
          </router-link>
            <div class="mt-2 text-center">
              <p class="btn btn-primary pointer mb-0"><router-link :to="{ name: 'data' }">Explore the data catalogue <i class="fa-solid fa-database ml-2"></i></router-link></p>
            </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 home-block projects-catalogue">
      <div class="row">
        <div class="col-sm-6">
          <h3 class="mb-sm-4"><router-link class="text-color" :to="{ name: 'projects' }"><strong><i class="fa-solid fa-folder-tree mr-2"></i> Projects</strong> Catalogue</router-link></h3>
        </div>
        <div class="col-sm-6 text-right">
          <p class="mt-sm-3 mb-3"><router-link class="text-color" :to="{ name: 'projects' }"><b class="nr">{{ nr_projects }}</b> projects currently available</router-link></p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3 text-center">
          <div class="card stats shadow-sm">
            <div class="row">
              <div class="col-3 col-sm-4 left text-right"><p class="highlight">{{ projects_three_months }}</p></div>
              <div class="col-9 col-sm-8 right text-right"><p><strong>new projects</strong> in the last three months</p></div>
              <div class="col-12 right text-center">
                <p class="btn btn-grey add-btn pointer"><router-link :to="{ name: 'project_add' }">Submit yours here!</router-link></p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card stats shadow-sm">
            <div class="row">
              <div class="col-3 col-sm-2 left"><i class="fa-solid fa-people-group fa-2xl"></i></div>
              <div class="col-9 col-sm-10 right text-right"><p>Thank you to <strong>{{ projects_contributors[0] }}</strong>, <strong>{{ projects_contributors[1] }}</strong> and <strong>{{ projects_contributors[2] }}</strong> for contributing with project references.</p></div>
            </div>
          </div>
        </div>
        <div class="col-sm-5">
          <router-link class="pointer" :to="'/projects/project/' + latest_projects[0].id">
            <div class="card stats shadow-sm">
              <div class="row">
                <div class="col-3 col-sm-2 left"><img class="img-fluid tool-cover" :src="imageLink(latest_projects[0])" :alt="latest_projects[0].name"></div>
                <div class="col-9 col-sm-10 right text-right"><p>Discover the most recent addition:</p><p><strong>{{ latest_projects[0].name }}</strong></p></div>
              </div>
            </div>
          </router-link>
            <div class="mt-2 text-center">
              <p class="btn btn-grey pointer mb-0"><router-link :to="{ name: 'projects' }">View projects list <i class="fa-solid fa-folder-tree ml-2"></i></router-link></p>
            </div>
        </div>
      </div>
    </div>
    <div class="col-12 home-block about-this">
      <h3>Purpose of this catalogue</h3>
      <p>Digital technologies offer unprecedented capacities to collect data and synthesise knowledge to support decision-making, as well as to reach out to a targeted audience, improve communication, and boost networking. Amongst initial interactions within the consortium, arose the suggestion of creating a catalogue of agroforestry related tools and datasets. Which components of agroforestry systems are least explored in these tools? Which indicators are analysed the most, or conversely, what are the knowledge gaps? Which tools and datasets could work together to generate more complete and meaningful outputs? These are all questions that could be addressed with a complete, diverse, and detailed database of the current digital agroforestry environment.</p>
      <p><span class="highlight">This <b>Online Agroforestry Tools, Data and Projects Catalogue</b> gathers tools and datasets in one place to ease their access.</span> Available filters allow users to search for resources depending on different criteria, depending on the user needs. A quick FAIRness score is available for each resource to enable an assessment preview of the easiness of their findability, accessibility, interoperability and reusability.</p>
      <p><span class="highlight">This is also part of the <b>Agroforestry Virtual Space</b>, together with the <a href="https://digitaf.eu/questions-answers/" target="_blank">AF Questions & Answers</a>, <a href="https://github.com/euraf" target="_blank">AF Code Github</a>, <a href="https://www.youtube.com/channel/UC-CqJO8goJC6MnpzClrDlYg" target="_blank">AF Tools Demo Videos</a> and <a href="https://zenodo.org/communities/euraf" target="_blank">AF Open Pub Zenodo</a>.</span></p>
    </div>
    <div class="col-12 home-block about-fair">
      <h3>FAIRness scoring methodology</h3>
      <p>The <b>FAIRness score</b> concept is based on the <span class="highlight"><b>FAIR principles</b> (<a href="https://www.go-fair.org/" targte="_blank">https://www.go-fair.org/</a>)</span>, established in 2016, whose guidelines help to improve the Findability, Accessibility, Interoperability and Reusability of digital resources. These are fundamental aspects when trying to automate, connect and understand large volumes of dispersed and complex information. These high-level principles allow different communities to adapt and apply them to their context, although facing the challenge of not misinterpreting or distorting the original formulation.</p>
      <p>When applied to the «Agroforestry Tool and Data Catalogue», the «FAIRness score» will help users to better understand the state of development and openness of each tool and dataset. <span class="highlight">This automatically calculated, but human-verified, scoring system also works as a self-assessment for tool developers and data gatherers to understand their digital resources' strong points and improve their weaker spots. Its final goal is to help to increase accessibility and interoperability between tools and data whose developers and users seek continuous improvement.</span></p>
      <p>The general principles were adapted through a careful assessment of each principle, its applicability to the context of agroforestry data and tools, and its 'translation' into easier-to-understand questions. These questions, together with other general characterising questions, form an accessible, logical, and comprehensible questionnaire, the answers to which will allow for the FAIRness evaluation of agroforestry digital resources.</p>
      <p>The scoring is not based on a single final value, but instead on <span class="highlight">a four-fold result relating to each of the main principles: <b>Findability</b>, <b>Accessibility</b>, <b>Interoperability</b> and <b>Reusability</b></span>.</p>
    </div>
    <div class="col-12 home-block about-digitaf">
      <h3><b>DigitAF</b> project</h3>
      <div class="row">
        <div class="col-sm-2 logo text-center pt-4">
          <router-link to="/"><img src="img/digitaf_logo.png" /></router-link>
        </div>
        <div class="col-sm-10">
          <p>The <b>DigitAF</b> research project (July 2022 - June 2026), funded by the European Commission, <span class="highlight">aims at a high quality implementation of agroforestry to foster climate change mitigation and adaptation in agriculture and to ensure sustainable management of natural resources. Our goal is to provide the main actor groups with tools answering their needs, in particular digital tools.</span> The three actors' groups that are target by DigitAF are:</p>
          <ul>
            <li><b>Policy actors</b>: policymakers and administrations concerned with applying agroforestry-related regulations, at regional, national and European levels, who set the scene for the adoption (or not) of agroforestry.</li>
            <li><b>Practitioners</b>: farmers, landowners and by extension, farm advisers playing an active role in designing and managing AFS and whose choices determine the agronomic, economic, environmental, and social performance at farm-level and beyond.</li>
            <li><b>Beneficiaries of AF products and services</b>: stakeholders in the value chain, including wholesalers, retailers, organisations trading the carbon sequestration and biodiversity benefits of AFS, and final consumers seeking verification of the benefits of AF in clear and accessible terms.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-12 home-block about-deliverables">
      <h3>Related deliverables</h3>
      <p><b>Deliverable 4.5</b> Tool and data inventory and rating</p>
      <p><b>Deliverable 4.3</b> Data collating plan</p>
      <p><b>Deliverable 1.2</b> Report and database on availability of agri-environmental indices in MS at NUTS3, and options for data collection at farm scale</p>
    </div>
  </div>
</template>