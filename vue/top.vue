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
	
	<div class="top row fixed-top">
		<div class="col-sm-7 text-center">
      <h1 class="title">{{ title }} <router-link v-if="$router.currentRoute.name !== 'homepage'" class="home-ico" to="/"><i class="fa-solid fa-house"></i></router-link></h1>
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