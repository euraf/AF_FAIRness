<script>
module.exports = {
  name: "contents",
  created() {
	},
  computed: {
    nr_tools() {
      return this.$root.$data.tools.length
    },
    nr_datasets() {
      return this.$root.$data.datasets.length
    },
    nr_projects() {
      return this.$root.$data.projects.length
    }
  },
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-4 about-tools text-center">
        <h3>Catalogue of Agroforestry</h3>
        <h1><router-link to="/tools"><b>Tools</b></router-link></h1>
        <h3><b class="nr">{{ nr_tools }}</b> tools currently available</h3>
        <p class="btn btn-primary pointer"><router-link :to="{ name: 'tool_add' }">Add yours here</router-link></p>
      </div>
      <div class="col-4 about-data text-center">
        <h3>Catalogue of Agroforestry</h3>
        <h1><router-link to="/data"><b>Data</b></router-link></h1>
        <h3><b class="nr">{{ nr_datasets }}</b> datasets currently available</h3>
        <p class="btn btn-primary pointer"><router-link :to="{ name: 'dataset_add' }">Contribute here</router-link></p>
      </div>
      <div class="col-4 about-projects text-center">
        <h3>Catalogue of Agroforestry</h3>
        <h1><router-link to="/projects"><b>Projects</b></router-link></h1>
        <h3><b class="nr">{{ nr_projects }}</b> projects currently available</h3>
        <p class="btn btn-primary pointer"><router-link :to="{ name: 'project_add' }">Expand the catalogue</router-link></p>
      </div>
      <div class="col-12 about-this">
        <h3>Purpose of this catalogue</h3>
        <p>Digital technologies offer unprecedented capacities to collect data and synthesise knowledge to support decision-making, as well as to reach out to a targeted audience, improve communication, and boost networking. Amongst initial interactions within the consortium, arose the suggestion of creating a catalogue of agroforestry related tools and datasets. Which components of agroforestry systems are least explored in these tools? Which indicators are analysed the most, or conversely, what are the knowledge gaps? Which tools and datasets could work together to generate more complete and meaningful outputs? These are all questions that could be addressed with a complete, diverse, and detailed database of the current digital agroforestry environment.</p>
        <p><span class="highlight">This <b>Online Agroforestry Tools, Data and Projects Catalogue</b> gathers tools and datasets in one place to ease their access.</span> Available filters allow users to search for resources depending on different criteria, depending on the user needs. A quick FAIRness score is available for each resource to enable an assessment preview of the easiness of their findability, accessibility, interoperability and reusability.</p>
        <p><span class="highlight">This is also part of the <b>Agroforestry Virtual Space</b>, together with the <a href="https://digitaf.eu/questions-answers/" target="_blank">AF Questions & Answers</a>, <a href="https://github.com/euraf" target="_blank">AF Code Github</a>, <a href="https://www.youtube.com/channel/UC-CqJO8goJC6MnpzClrDlYg" target="_blank">AF Tools Demo Videos</a> and <a href="https://zenodo.org/communities/euraf" target="_blank">AF Open Pub Zenodo</a>.</span></p>
      </div>
      <div class="col-12 about-fair text-justify">
        <h3>FAIRness scoring methodology</h3>
        <p>The <b>FAIRness score</b> concept is based on the <span class="highlight"><b>FAIR principles</b> (<a href="https://www.go-fair.org/" targte="_blank">https://www.go-fair.org/</a>)</span>, established in 2016, whose guidelines help to improve the Findability, Accessibility, Interoperability and Reusability of digital resources. These are fundamental aspects when trying to automate, connect and understand large volumes of dispersed and complex information. These high-level principles allow different communities to adapt and apply them to their context, although facing the challenge of not misinterpreting or distorting the original formulation.</p>
        <p>When applied to the «Agroforestry Tool and Data Catalogue», the «FAIRness score» will help users to better understand the state of development and openness of each tool and dataset. <span class="highlight">This automatically calculated, but human-verified, scoring system also works as a self-assessment for tool developers and data gatherers to understand their digital resources' strong points and improve their weaker spots. Its final goal is to help to increase accessibility and interoperability between tools and data whose developers and users seek continuous improvement.</span></p>
        <p>The general principles were adapted through a careful assessment of each principle, its applicability to the context of agroforestry data and tools, and its 'translation' into easier-to-understand questions. These questions, together with other general characterising questions, form an accessible, logical, and comprehensible questionnaire, the answers to which will allow for the FAIRness evaluation of agroforestry digital resources.</p>
        <p>The scoring is not based on a single final value, but instead on <span class="highlight">a four-fold result relating to each of the main principles: <b>Findability</b>, <b>Accessibility</b>, <b>Interoperability</b> and <b>Reusability</b></span>.</p>
      </div>
      <div class="col-12 about-digitaf">
        <h3><b>DigitAF</b> project</h3>
        <div class="row">
          <div class="col-2 logo text-center pt-4">
            <router-link to="/"><img src="img/digitaf_logo.png" /></router-link>
          </div>
          <div class="col-10">
            <p>The <b>DigitAF</b> research project (July 2022 - June 2026), funded by the European Commission, <span class="highlight">aims at a high quality implementation of agroforestry to foster climate change mitigation and adaptation in agriculture and to ensure sustainable management of natural resources. Our goal is to provide the main actor groups with tools answering their needs, in particular digital tools.</span> The three actors' groups that are target by DigitAF are:</p>
            <ul>
              <li><b>Policy actors</b>: policymakers and administrations concerned with applying agroforestry-related regulations, at regional, national and European levels, who set the scene for the adoption (or not) of agroforestry.</li>
              <li><b>Practitioners</b>: farmers, landowners and by extension, farm advisers playing an active role in designing and managing AFS and whose choices determine the agronomic, economic, environmental, and social performance at farm-level and beyond.</li>
              <li><b>Beneficiaries of AF products and services</b>: stakeholders in the value chain, including wholesalers, retailers, organisations trading the carbon sequestration and biodiversity benefits of AFS, and final consumers seeking verification of the benefits of AF in clear and accessible terms.</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12 about-deliverables">
        <h3>Related deliverables</h3>
        <p><b>Deliverable 4.5</b> Tool and data inventory and rating</p>
        <p><b>Deliverable 4.3</b> Data collating plan</p>
        <p><b>Deliverable 1.2</b> Report and database on availability of agri-environmental indices in MS at NUTS3, and options for data collection at farm scale</p>
      </div>
    </div>
	</div>
</template>