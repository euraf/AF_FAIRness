<script>
module.exports = {
  name: "top",
	computed: {
		title() {
			if (this.$route.params && this.$route.params.id) {
				var name = null
				if (this.$route.meta && this.$route.meta.isData) {
					var datasets = this.$root.$data.datasets.filter(dataset => dataset.id === this.$route.params.id)
					if (datasets.length > 0) {
						name = datasets[0].name
					} else {
						console.log("'id' not recognized")
					}
				} else if (this.$route.meta && this.$route.meta.isTools) {
					var tools = this.$root.$data.tools.filter(tool => tool.id === this.$route.params.id)
					if (tools.length > 0) {
						name = tools[0].name
					} else {
						console.log("'id' not recognized")
					}
				} else if (this.$route.meta && this.$route.meta.isProjects) {
					var projects = this.$root.$data.projects.filter(project => project.id === this.$route.params.id)
					if (project.length > 0) {
						name = projects[0].name
					} else {
						console.log("'id' not recognized")
					}
				}
				if (name) {
					return name + ' - ' + this.$route.meta.title
				}
			}
			return this.$route.meta.title
		}
	}
}
</script>

<template>
	
	<div class="top row fixed-top">
		<div class="col-sm-1 text-center" v-if="$router.currentRoute.name !== 'homepage'" >
			<h5 class="p-0 m-0"><router-link class="home-ico" to="/"><i class="fa-solid fa-house"></i></router-link></h5>
		</div>
		<div class="text-center" :class="{'col-sm-6': $router.currentRoute.name !== 'homepage', 'col-sm-7': $router.currentRoute.name === 'homepage'}">
			<h1 class="title">{{ title }}</h1>
		</div>
		<div class="col-sm-5">
			<div class="menu row text-center">
				<div class="col dropdown">
					<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
						<b>Tools</b>
					</button>
					<div class="dropdown-menu dropdown-menu-right text-center">
						<router-link tag="button" class="dropdown-item" :to="{ name: 'tool_add' }"><b>+ New Tool</b></router-link>
						<router-link tag="button" class="dropdown-item" :to="{ name: 'tools' }">Tools Catalogue</router-link>
						<router-link tag="button" class="dropdown-item" :to="{ name: 'tools_self_assessment' }">FAIRness Self-Assessment</router-link>
					</div>
				</div>
				<div class="col dropdown">
					<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
						<b>Data</b>
					</button>
					<div class="dropdown-menu dropdown-menu-right text-center">
						<router-link tag="button" class="dropdown-item" :to="{ name: 'dataset_add' }"><b>+ New Dataset</b></router-link>
						<router-link tag="button" class="dropdown-item" :to="{ name: 'datasets' }">Data Catalogue</router-link>
						<router-link tag="button" class="dropdown-item" :to="{ name: 'datasets_self_assessment' }">FAIRness Self-Assessment</router-link>
					</div>
				</div>
				
				<div class="col dropdown">
					<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
						<b>Projects</b>
					</button>
					<div class="dropdown-menu dropdown-menu-right text-center">
						<router-link tag="button" class="dropdown-item" :to="{ name: 'project_add' }"><b>+ New Project</b></router-link>
						<router-link tag="button" class="dropdown-item" :to="{ name: 'projects' }">Projects Catalogue</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>