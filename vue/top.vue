<script>
module.exports = {
  name: "top",
	computed: {
		title() {
			/*if (this.$route.params.id) {
				var name = null
				if (this.$route.name.substring(0, 4) == "data") {
					var datasets = this.$root.$data.datasets.filter(dataset => dataset.id === this.$route.params.id)
					if (datasets.length > 0) {
						name = datasets[0].name
					} else {
						console.log("'id' not recognized")
					}
				} else if (this.$route.name.substring(0, 4) == "tool") {
					var tools = this.$root.$data.tools.filter(tool => tool.id === this.$route.params.id)
					if (tools.length > 0) {
						name = tools[0].name
					} else {
						console.log("'id' not recognized")
					}
				}
				return this.$route.meta.title + " \"" + name + "\""
			}*/
			return this.$route.meta.title
		}
	}
}
</script>

<template>
  <div class="top row no-gutters text-left fixed-top">
    <!--div class="logo col-1 text-center">
      <router-link to="/"><img src="img/digitaf_logo.png" /></router-link>
    </div-->
    <div class="title col-7 text-center">
      <h1>{{ title }}</h1>
    </div>
		<!--div class="col-12">
			<div class="menu row text-center">
				<div class="col"><router-link tag="button" class="home btn btn-primary" to="/">About</router-link></div>
				<div class="col"><router-link tag="button" class="btn btn-primary" :to="{ name: 'tools' }">Tools Catalogue</router-link></div>
				<div class="col"><router-link tag="button" class="btn btn-primary" :to="{ name: 'tool_add' }">+ New Tool</router-link></div>
				<div class="col"><router-link tag="button" class="btn btn-primary" :to="{ name: 'tools_self_assessment' }">Tool FAIRness Self-Assessment</router-link></div>
				<div class="col"><router-link tag="button" class="btn btn-primary" :to="{ name: 'datasets' }">Data Catalogue</router-link></div>
				<div class="col"><router-link tag="button" class="btn btn-primary" :to="{ name: 'dataset_add' }">+ New Dataset</router-link></div>
				<div class="col"><router-link tag="button" class="btn btn-primary" :to="{ name: 'datasets_self_assessment' }">Dataset FAIRness Self-Assessment</router-link></div>
				<div class="col"><router-link tag="button" class="btn btn-primary" :to="{ name: 'projects' }">Projects Catalogue</router-link></div>
				<div class="col"><router-link tag="button" class="btn btn-primary" :to="{ name: 'project_add' }">+ New Project</router-link></div>
			</div>
		</div-->
		<div class="col-5">
			<div class="menu row text-center">
				<div class="col"><router-link v-if="$router.currentRoute.name !== 'homepage'" tag="button" class="home btn btn-primary" to="/"><b>Home</b></router-link></div>
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