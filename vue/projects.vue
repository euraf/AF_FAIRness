<script>
module.exports = {
  name: "projects",
  data() {
    return {
      current_sorting_option: {
        name: "Last added",
        fn: function(arr) {
          return arr.sort((a, b) => a.timestamp_creation > b.timestamp_creation ? -1 : 1)
        }
      },
      filteredProjects: [],
      sorting_options_update: {
        a_z: {
					name: "A-Z",
					fn: function(arr) {
						return arr.sort((a, b) => a.acronym.localeCompare(b.acronym))
					}
				},
				z_a: {
					name: "Z-A",
					fn: function(arr) {
						return arr.sort((a, b) => -a.acronym.localeCompare(b.acronym))
					}
				},
        oldest: {
          name: "Oldest",
          fn: function(arr) {
            return arr.sort(function(a, b) {
              var a_arr = a.start_date.split('/')
              var b_arr = b.start_date.split('/')
              return new Date(a_arr[2], a_arr[1]-1, a_arr[0]).getTime() < new Date(b_arr[2], b_arr[1]-1, b_arr[0]).getTime() ? -1 : 1
            })
          }
        },
        newest: {
          name: "Newest",
          fn: function(arr) {
            return arr.sort(function(a, b) {
              var a_arr = a.start_date.split('/')
              var b_arr = b.start_date.split('/')
              return new Date(a_arr[2], a_arr[1]-1, a_arr[0]).getTime() < new Date(b_arr[2], b_arr[1]-1, b_arr[0]).getTime() ? 1 : -1
            })
          }
        }
      }
    }
  },
  created() {
    VueBus.$on('updateFiltered', this.updateFiltered)
    VueBus.$on('updateSorting', this.updateSorting)
    this.setupProjects()
  },
  watch: {
    projects: {
      deep: true,
      handler() {
        this.setupProjects()
      }
    }
  },
  computed: {
    projects() {
      return this.$root.$data.projects
    },
    form() {
      return this.$root.$data.projects_form
    },
    custom_filters() {
      var _this = this
      return [
        {
          id: 'programme',
          short_text: "Programme",
          answers: [...new Set(_this.projects.map(x => x.programme))].sort((a, b) => a.localeCompare(b)),
          type: "tag"
        },
        {
          id: 'start_date',
          short_text: "Start year",
          answers: [...new Set(_this.projects.map(x => x.start_date.substr(6)))].sort((a, b) => a.localeCompare(b)),
          type: "tag",
          custom_fn: function(str_date, str_date_to_filter) {
            return str_date.includes(str_date_to_filter)
          }
        },
        {
          id: 'end_date',
          short_text: "End year",
          answers: [...new Set(_this.projects.map(x => x.end_date.substr(6)))].sort((a, b) => a.localeCompare(b)),
          type: "tag",
          custom_fn: function(str_date, str_date_to_filter) {
            return str_date.includes(str_date_to_filter)
          }
        }
      ]
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
      if (sorting_option) {
        this.current_sorting_option = sorting_option
      } else {
        sorting_option = this.current_sorting_option
      }
      this.filteredProjects = sorting_option.fn(this.filteredProjects)
    },
    setupProjects() {
      this.filteredProjects = this.current_sorting_option.fn(this.projects.slice())
    },
    updateFiltered() {
      if (!('filtering' in this.$refs)) {
        return
      }
      var filters = this.$refs.filtering.$data.filters
      var search = this.$refs.filtering.$data.search
      var searchQuery = this.$refs.filtering.$data.searchQuery
      var searchInName = this.$refs.filtering.$data.searchInName
      var searchInDescription = this.$refs.filtering.$data.searchInDescription
      var searchInKeywords = this.$refs.filtering.$data.searchInKeywords

      this.filteredProjects = Object.values(this.projects).filter(function(project) {
        var yesOrNo = true
        
        if (validString(searchQuery)) {
          var inName = false
          var inDescription = false
          var inKeywords = false

          if (searchInName) {
            if (project.name.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
              inName = true
            }
          }
          if (searchInDescription) {
            if (project.description.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
              inDescription = true
            }
          }
          if (searchInKeywords) {
            if (project.keywords.filter(function(keyword) {
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

            toolValue = project[filter_id]

            if (toolValue == "") {
              yesOrNo = yesOrNo && false

            } else {
              var filter = filters[filter_id]

              if (filter.custom_fn) {
                yesOrNo = yesOrNo && filter.custom_fn(toolValue, filter_value[0])

              } else if ('answers' in filter) {

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
  <div class="catalogue row">
    <div class="d-sm-none drawer drawer-left slide" tabindex="-1" role="dialog" id="drawer-2">
      <div class="drawer-content" role="document">
        <filtering ref="filtering" :elements="filteredProjects" :form="form"></filtering>
      </div>
    </div>
    <div class="d-none d-sm-block col-sm-2">
      <div class="text-center">
        <p class="btn btn-primary pointer"><router-link :to="{ name: 'project_add' }"><b>+ New Project</b></router-link></p>
      </div>
      <filtering ref="filtering" :elements="filteredProjects" :form="form"  :custom_filters="custom_filters"></filtering>
    </div>
    <div class="col-sm-10">
        <div class="row no-gutters mb-3 sorting">
          <div class="d-sm-none col-4 col-sm-6 mb-2">
            <p class="btn btn-primary" data-toggle="drawer" data-target="#drawer-2"><i class="fa-solid fa-arrow-left-long"></i> Filters</p>
          </div>
          <div class="d-sm-none col-4 col-sm-6 mb-2">
            <p class="btn btn-primary pointer"><router-link :to="{ name: 'project_add' }"><b>+ New Project</b></router-link></p>
          </div>
          <div class="displaying col-4 col-sm-6 mb-2">
            <p v-if="filteredProjects.length > 1">Displaying <b>{{ filteredProjects.length }}</b> projects</p>
            <p v-if="filteredProjects.length == 1">Displaying <b>1</b> project</p>
            <p v-if="filteredProjects.length == 0">No projects to display</p>
          </div>
          <sorting ref="sorting" :sorting_options_remove="[ 'findability', 'accessbility', 'interoperability', 'reusability' ]" :sorting_options_update="sorting_options_update"></sorting>
          <div class="col-12 projects mt-4">
            <div class="row">
              <div class="col-12 mb-4" v-for="project in filteredProjects" :key="project.id">
              <div class="card project">
                <div class="card-body">
                  <div class="row no-gutters">
                    <div class="col-sm-2 project-cover text-center">
                      <div class="vertical-helper"></div><img v-if="project.logo_url" class="img-fluid mini" :src="project.logo_url" :alt="project.acronym">
                    </div>
                    <div class="col-sm-10 details">
                      <div class="row">
                        <div class="col-12">
                          <h5 class="card-title mb-2"><router-link :to="'/projects/project/' + project.id" :project="project"><b>{{ project.acronym }} </b> - {{ project.name }}</router-link></h5>
                          <p><span class="badge badge-project" :class="'badge-' + project.programme.replace(' ', '_').toLowerCase()"><b>{{ project.programme }}</b></span> {{ project.start_date }} - {{ project.end_date }}</p>
                          <p class="mb-0">{{ truncateDescription(project.description) }}</p>
                        </div>
                      </div>
                    </div>
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