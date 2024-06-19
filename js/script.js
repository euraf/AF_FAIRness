httpVueLoader.register(Vue, 'vue/filtering.vue');
httpVueLoader.register(Vue, 'vue/filter-checkbox.vue');
httpVueLoader.register(Vue, 'vue/sorting.vue');
httpVueLoader.register(Vue, 'vue/bottom.vue');
httpVueLoader.register(Vue, 'vue/top.vue');
httpVueLoader.register(Vue, 'vue/formelements/dropdown.vue');
httpVueLoader.register(Vue, 'vue/formelements/checkbox.vue');
httpVueLoader.register(Vue, 'vue/formelements/input-text.vue');
httpVueLoader.register(Vue, 'vue/formelements/input-number.vue');
httpVueLoader.register(Vue, 'vue/formelements/keywords.vue');

Object.filter = function(obj, predicate) {
	let result = {}, key;

	for (key in obj) {
			if (obj.hasOwnProperty(key) && predicate(obj[key])) {
					result[key] = obj[key];
			}
	}
	
	return result;
};

const router = new VueRouter({
	mode: 'history',
	base: window.location.pathname.substring(0, window.location.pathname.indexOf("AF_FAIRness")) + "AF_FAIRness/",
	routes: [
		{
			path: '/',
			name: 'homepage',
			component: httpVueLoader('vue/contents.vue'),
			meta: { title: "Agroforestry Tools & Data FAIRness"}
		},
		{
			path: '/data',
			name: 'datasets',
			component: httpVueLoader('vue/datasets.vue'),
			meta: { title: "Agroforestry Data Catalogue"}
		},
		{
			path: '/data/add',
			name: 'dataset_add',
			component: httpVueLoader('vue/resource_form.vue'),
			props: { data: true },
			meta: { title: "New Agroforestry Dataset"}
		},
		{
			path: '/data/fairness_self_assessment',
			name: 'datasets_self_assessment',
			component: httpVueLoader('vue/selfassessment.vue'),
			props: { data: true },
			meta: { title: "Agroforestry Data FAIRness Self-Assessment" }
		},
		{
			path: '/data/dataset/:id',
			name: 'dataset_page',
			props: { data: true },
			component: httpVueLoader('vue/datasetpage.vue'),
			meta: { title: "Agroforestry Data Catalogue" } // TODO add tool name to the page title
		},
		{
			path: '/data/dataset/:id/edit',
			name: 'dataset_edit',
			props: { data: true },
			component: httpVueLoader('vue/resource_form.vue'),
			meta: { title: "Editing Agroforestry Dataset" } // TODO add tool name to the page title
		},
		{
			path: '/tools',
			name: 'tools',
			component: httpVueLoader('vue/tools.vue'),
			meta: { title: "Agroforestry Tools Catalogue"}
		},
		{
			path: '/tools/add',
			name: 'tool_add',
			component: httpVueLoader('vue/resource_form.vue'),
			props: { tools: true },
			meta: { title: "New Agroforestry Tool"}
		},
		{
			path: '/tools/fairness_self_assessment',
			name: 'tools_self_assessment',
			component: httpVueLoader('vue/selfassessment.vue'),
			props: { tools: true },
			meta: { title: "Agroforestry Tools FAIRness Self-Assessment" }
		},
		{
			path: '/tools/tool/:id',
			name: 'toolpage',
			component: httpVueLoader('vue/toolpage.vue'),
			props: { tools: true },
			meta: { title: "Agroforestry Tools Catalogue" } // TODO add tool name to the page title
		},
		{
			path: '/tools/tool/:id/edit',
			name: 'toolpage_edit',
			component: httpVueLoader('vue/resource_form.vue'),
			props: { tools: true },
			meta: { title: "Editing Agroforestry Tool" } // TODO add tool name to the page title
		},
		{
			path: '*',
			name: 'notfound',
			component: httpVueLoader('vue/notfound.vue')
		},
	],
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

var VueBus = new Vue();

var app = '';

app = new Vue({
	el: '#app',
	router: router,
	data: {
		loaded: false,
		tools: [],
		tools_form: [],
		datasets: [],
		datasets_form: [],
		datasets_scoring: new Data_FAIRness_scoring(),
		tools_scoring: new Tools_FAIRness_scoring()
	},
	created() {
		this.loadData()
	},
	methods: {
		loadData() {
      var _this = this

			var baseurl = 'https://cdn.jsdelivr.net/gh/euraf/AF_FAIRness@main/'
			//var baseurl = ''
			
			var tools_list = $.getJSON(baseurl + 'catalogue/tools/tools_list.json')
			var datasets_list = $.getJSON(baseurl + 'catalogue/data/datasets_list.json')

			Promise.allSettled([tools_list, datasets_list]).then(function(list) {
				var tools = list[0].value
				var datasets = list[1].value

				var requests = []

				requests.push($.getJSON(baseurl + 'catalogue/tools/tools_form.json', 
				function (form) {
					_this.tools_form = form
				}))
	
				requests.push($.getJSON(baseurl + 'catalogue/data/datasets_form.json', 
				function (form) {
					_this.datasets_form = form
				}))

				for (var i = 0; i < tools.length; i++) {
					requests.push($.getJSON(baseurl + 'catalogue/tools/' + tools[i] + '.json', function (tool) {
							var score = _this.tools_scoring.score(tool)
							tool.findability_score = score.F
							tool.accessibility_score = score.A
							tool.interoperability_score = score.I
							tool.reusability_score = score.R
							_this.tools.push(tool)
					}))
				}
				for (var i = 0; i < datasets.length; i++) {
					requests.push($.getJSON(baseurl + 'catalogue/data/' + datasets[i] + '.json', function (dataset) {
							var score = _this.datasets_scoring.score(dataset)
							dataset.findability_score = score.F
							dataset.accessibility_score = score.A
							dataset.interoperability_score = score.I
							dataset.reusability_score = score.R
							_this.datasets.push(dataset)
					}))
				}

				Promise.allSettled(requests).then(function() {
					_this.loaded = true
				})
			})
		},
	}
});

function filterObject(obj, callback) {
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => callback(val, key)));
}

function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}


function scoreColor(score) {
	return {
		0: '#e43e3d', // red
		10: '#ea484d',
		20: '#ec654e',
		30: '#ef874c',
		40: '#f3a74c',
		50: '#f8c43d',
		60: '#e1c63b',
		70: '#c1cc36',
		80: '#9fcd35',
		90: '#7fcd31',
		100: '#5aaf2b' // green
	}[Math.round(score/10) * 10]
}

function validString(str) {
	if (typeof str == 'String') {
			str = str.trim()
	}
	return str !== null || str !== "null" || str !== "" || str !== undefined
}

function saveToolsCSV() {
	var output = []
	var tools = this.app.$root.$data.tools
	var form = this.app.$root.$data.tools_form
	var i = 0
	for (var tool of tools) {
		var headers = []
		var row = []
		for (var question of form) {
			if (i == 0) {
				var text = question.text
				text = "\"" + text + "\""
				text = text.replace(/(?:\r\n|\r|\n)/g, " ");
				headers.push(text)
			}
			var value = tool[question.id]
			if (question.id.includes('timestamp') && value) {
				var date = (new Date(value))
				value = Math.round(25569.0 + ((date.getTime() - (date.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24)), 0) // from js date to excel date
			}
			if (typeof value == 'object') {
				value = value.join(", ")
			}
			if (typeof value == 'string') {
				value = "\"" + value + "\""
				value = value.replaceAll(/(?:\r\n|\r|\n)/g, " ");
			}
			row.push(value)
		}
		if (i == 0) {
			output.push(headers)
		}
		output.push(row)
		i++
	}
	console.log(output)

	let csvContent = "data:text/csv;charset=utf-8," + output.map(e => e.join(",")).join("\n");

	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "AFCatalogue_Tools.csv");
	document.body.appendChild(link); // Required for FF

	link.click(); // This will download the data file named "my_data.csv".
}