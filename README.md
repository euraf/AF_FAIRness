# Agroforestry Tools and Data Catalogues
## Moving from Scattered to Converging Ecosystem

Digital technologies offer unprecedented capacities to collect data and synthesise knowledge to support decision-making, as well as to reach out to a targeted audience, improve communication, and boost networking. Amongst initial interactions within the [DigitAF](https://digitaf.eu/) consortium arose the suggestion of creating a catalogue of agroforestry related tools and data.

The online Agroforestry Tools and Data Catalogues is already implemented at https://euraf.github.io/AF_FAIRness/, and integrated in the DigitAF project website https://digitaf.eu/tools-and-data-catalogue. The acceptance and willingness to participate in this endeavour is growing, mostly driven by DigitAF consortium members and developers of tools used within the Living Labs. Ultimately, this will help increase knowledge about **which tools and datasets exist**, **how they can be made compatible with each other**, and **which topics have a tool-gap or data-gap** (and therefore the potential to develop new tools and gather new data).

The general intention is that any user may contribute with new tools and datasets to the database, edit any incomplete or outdated information about any of the digital resources, and that the interaction with the catalogue and results display should be easy and comprehensible. Available filters allow users to search for tools and datasets depending on different criteria, depending on the user needs. A quick FAIRness score is available for each digital resource to enable an assessment preview of the easiness of their findability, accessibility, interoperability and reusability.

## Before adding new entries to the catalogue: __how to store new tools and datasets?__

### Tools

Basic first steps:
1. [Install Git in your computer](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. [Create a Github Account](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github)
3. [Create a new repository and a new branch](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories?tool=webui#create-a-repository)
4. [Upload your tool's code to the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories?tool=webui#commit-your-first-change)

Cite and reference content on GitHub:
- Through Zenodo - ["Issuing a persistent identifier for your repository with Zenodo"](https://docs.github.com/en/repositories/archiving-a-github-repository/referencing-and-citing-content#issuing-a-persistent-identifier-for-your-repository-with-zenodo)
- Through FigShare - ["How to connect Figshare with your GitHub account"](https://help.figshare.com/article/how-to-connect-figshare-with-your-github-account)

### Datasets

Before joining the venture of providing data to the catalogue, a preliminary check should 
be made by whom is providing the data to ease the process: 

(1) Do you have your data in a repository with a DOI? 
- Yes: Proceed to step 5. 
- No: Proceed to step 2. 

(2) Does your institution have a repository that issues DOIs? 
- Yes: Provide the necessary information to your institutional repository, then proceed to step 5. 
- No: Proceed to step 3. 

(3) Do you have an account for dealing with repositories that issue DOIs (e.g. [Zenodo](https://zenodo.org/))? 
- Yes: Proceed to step 4. 
- No: Create a free account on Zenodo [here](https://help.zenodo.org/docs/get-started/create-an-account/). Then proceed to step 4. 

(4) Upload the data file to the repository while issuing the DOI. Provided you are the author or agree with the distribution license of the data/file, you may add the file to the [European Agroforestry Federation Zenodo community](https://zenodo.org/communities/euraf/). Then proceed to step 5.

(5) Submit your data information to the AF Data Catalogue. 

## __How to contribute with new__ tools, datasets or project __entries?__

### Through the catalogues forms

A very common way of **collecting information** is through a **questionnaire**. These catalogues have an incorporated form for tool and data collection, and should be used to add a new digital resource that might be useful.

- **Add a new tool:** https://euraf.github.io/AF_FAIRness/tools/add
- **Add a new dataset:** https://euraf.github.io/AF_FAIRness/data/add
- **Add a new project:** https://euraf.github.io/AF_FAIRness/projects/add

There are several questions, some related with the FAIRness score, that help characterise each resource in some detail. They are divided into general questions about the digital resource, some about more technical details, about its use, accessibility, and documentation. It takes about 10-15 minutes to complete. The only personal information collected is the user name and email to ask any follow-up questions that may arise.

When the information is saved, it's automatically uploaded to the GitHub repository. But behind  this simple process is a more complex mechanism:
- When the _Save_ button is clicked, the filled fields are validated. If any of the compulsory questions have not been answered, an alert is raised and the submission does not proceed.
- Once validated, the information is aggregated into a _JSON file_.
- A _POST HTTP request_ is made to the server. Using the [PyGitHub API](https://github.com/PyGithub/PyGithub), a _new branch_ is created and a _commit_ is made to a fork of the project's main repository. The use of a fork (an accessory repository) allows to guarantee the security of the access data (i.e. API Key) of the main repository, and there is no possibility of making changes directly to the main code without first being validated by one of the EURAF community members. This guarantees a data-quality check. After this, a _pull request_ is made to the main repository.
- This _pull request_ is checked by DigitAF partners and the European Agroforestry Federation (EURAF). If necessary, changes can be proposed/asked. If everything is in order, it is accepted and immediately integrated into the main code, with the information becoming part of the catalogue.

### The Geek Way

Entries can be added or edited directly in this GitHub repository (curated by [EURAF](https://euraf.net/)).

In detail, and as an example, to add a new tool consider that the `/catalogue/tools` folder includes:
- `tools_form.json` file, that holds every question whose answers represent the tool's respective data, which is then displayed and filtered;
- `tools_list.json` file, that contains the list of every reviewed tool;
- an individual `.json` file for each one of the tools.

Using common methods of Git:
1. Fork the repository;
2. Do your edits;
	- If adding a new tool:
		- Create a new file with your tool's name (using a simple string, avoiding illegal characters, symbols or spaces);
		- Fill in the needed fields, based on the indications given in the `tools_form.json`.
	- If editing an existing tool:
		- Open the tool's respective `.json` file;
		- Edit the needed fields, based on the indications given in the `tools_form.json`;
3. Commit your edits;
4. Create a pull request;
5. Wait for the team of curators to verify, request changes if necessary, and then merge your edits/tool which will become live in the online tool database.

## FAIRness scoring

The «FAIRness score» concept is based on the FAIR principles (https://www.go-fair.org/), established in 2016, whose guidelines help to improve the **Findability, Accessibility, Interoperability and Reusability** of digital resources. These are fundamental aspects when trying to automate, connect and understand large volumes of dispersed and complex information. These high-level principles allow different communities to adapt and apply them to their context, although facing the challenge of not misinterpreting or distorting the original formulation.

The «FAIRness score» helps users to better understand the state of development and openness of each tool and dataset, while also understanding how to improve the FAIRness of their own tools and data. In the Catalogues, the FAIRness score is automatically calculated, but human-verified.

The general principles were adapted through an assessment of each principle, its applicability to the context of agroforestry data and tools, and its 'translation' into easier-to-understand questions. The scoring will not be based on a single final value, but on a four-fold result instead. Based on this result, users will be able to quickly evaluate the resources that best meet their needs. The «FAIRness score» final goal is to help to increase accessibility and interoperability between tools and data whose developers and users seek continuous improvement.

The principles, the related questions, the background rationale and the evaluation methods, for both tools and data, are described in the following files:

- **Tools FAIRness scoring**
  - Questions and principles descriptions [tools_form.json](https://github.com/euraf/AF_FAIRness/blob/main/catalogue/tools/tools_form.json)
  - Calculation method [tools_fairness_scoring.js](https://github.com/euraf/AF_FAIRness/blob/main/catalogue/tools/scoring/tools_fairness_scoring.js)
- **Data FAIRness scoring**
  - Questions and principles descriptions [datasets_form.json](https://github.com/euraf/AF_FAIRness/blob/main/catalogue/data/datasets_form.json)
  - Calculation method [data_fairness_scoring.js](https://github.com/euraf/AF_FAIRness/blob/main/catalogue/data/scoring/data_fairness_scoring.js)

The answers to each question are evaluated on a scale of 0 to 1 point. Each principle is evaluated by the average of the values of the answers given. Exceptions to these rules are identified on a case-by-case basis. Please note that this initial setup may be adapted during the course of the project.

### FAIRness Self-Assessment

Additionally, a self-assessment scoring verification was developed for tool developers and data gatherers to understand their digital resources' strong points and improve their weaker spots concerning the FAIR principles, and are available at:

- **Tools FAIRness Self-Assessment:** https://euraf.github.io/AF_FAIRness/tools/fairness_self_assessment
- **Data FAIRness Self-Assessment:** https://euraf.github.io/AF_FAIRness/data/fairness_self_assessment


## How to integrate these catalogues into other websites
In order to contribute to the dissemination, use and legacy of the catalogues, this project can be easily integrated into other websites (e.g. the EURAF website, those of other projects or institutions embracing agroforestry systems).

Although the catalogues are prepared to be shown in different locations and having different color schemes, its operation of update and, more importantly, its database, will be centralised and unique (in the EURAF GitHub repository). 

### Via an iFrame
Since the catalogues are available in Github, it is possible to take advantage of the Github Pages functionality, through the Github-hosted link https://euraf.github.io/AF_FAIRness. The catalogue integration is possible via an iFrame to embed under the target website.

```<iframe src="https://euraf.github.io/AF_FAIRness" title="AF FAIRness"></iframe>```

### Customize the iFrame
It is customisable, making it fit the identity of the website itself. This is possible by adding a query to the URL integration string.

| Parameter | Value | Description |
| --------- | ----- | ----------- |
| **font-family** | String <br>*ex. "Ga+Maamli"* | Font family name |
| **font-url** | URL String <br>*ex. "https://fonts.googleapis.com/css2?family=Ga+Maamli"* | [Google Fonts](https://fonts.google.com/) embed URL |
| **color-primary** | HEX color (without #) <br>*ex. "b4d465"* | Main website color (headers, buttons, etc.) |
| **color-secondary** | HEX color (without #) <br>*ex. "5a9d43"* | Secondary website color (titles, labels) |
| **color-text** | HEX color (without #) <br>*ex. "000000"* | Website text color |
| **color-background** | HEX color (without #) <br>*ex. "f1f6f2"* | Website background color |

Following the above parameter examples, a full integration URL would be:

```<iframe src="https://euraf.github.io/AF_FAIRness?color-secondary=5a9d43&color-background=f1f6f2&color-primary=b4d465&font-url=https://fonts.googleapis.com/css2?family=Ga+Maamli&font-family=Ga+Maamli" title="AF FAIRness"></iframe>```

### Update URL of parent window (Wordpress example)
Updating the URL of the parent window is important for two reasons: (1) it makes it possible to share links to one of the catalogues or specific resources while maintaining the main address and (2) it improves the SEO of the pages where the iFrame is integrated.

Technically, this is possible by listening to a [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) that is sent whenever the route is updated. This message holds the object `{ af_fairness_url: NEW_PATH }` with the new path string (ex. `/tools/tool/open_farm_carbon_tracker`).

For example, the iFrame integration on the DigitAF project website is set up to accompany the navigation within the catalogue. If you want to share a specific link, it goes directly to the resource. So, both of the following URLs are directing to the same resource/page:
- https://euraf.github.io/AF_FAIRness/tools/tool/open_farm_carbon_tracker
- https://digitaf.eu/tools-and-data-catalogue/tools/tool/open_farm_carbon_tracker

### Wordpress URL update example

  1. Create a Page and add the iFrame. Save the iFrame (ex. #catalogue) and page (ex. 2345) IDs and the page slug (short url path, ex. /tools-and-data-catalogue).
  2. Copy the functions below to the functions.php: Admin menu > Appearance > Theme File Editor > Theme Functions
  3. Update the variables with "// UPDATE THIS" with your specific settings.
  4. Save changes.
  5. Update the permalinks: Admin menu > Settings > Permalinks > without changing anything, just click "Save".

```
/**
 *  AGROFORESTRY TOOLS AND DATA CATALOGUES INTEGRATION [WORDPRESS]
 */
function AF_FAIRness_integration() {
	
$AF_CATALOGUES_PAGE_ID = 2345; // UPDATE THIS
if (is_page ($AF_CATALOGUES_PAGE_ID)) {
    ?>
    <script>
		var AF_CATALOGUES_IFRAME_ID = '#catalogue' // UPDATE THIS
		var AF_CATALOGUES_PAGE_SLUG = '/tools-and-data-catalogue' // UPDATE THIS

		// query string for website customization
		var AF_CATALOGUES_QUERY = '?color-primary=b4d465&color-secondary=5a9d43&color-background=f1f6f2&color-text=f1f6f2&font-family=Ga+Maamli&font-url=https://fonts.googleapis.com/css2?family=Ga+Maamli' // UPDATE THIS
		
    var iFrame = jQuery(AF_CATALOGUES_IFRAME_ID);
		var currentPath = window.location.pathname.substring(AF_CATALOGUES_PAGE_SLUG.length)
		
		iFrame.attr('src', 'https://euraf.github.io/AF_FAIRness' + currentPath + AF_CATALOGUES_QUERY)
		iFrame.attr('data-src', 'https://euraf.github.io/AF_FAIRness' + currentPath + AF_CATALOGUES_QUERY)
		
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
		var eventer = window[eventMethod];
		var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

		// listen to postMessage from child window
		eventer(messageEvent, function(e) {
			var key = e.message ? "message" : "data";
			var data = e[key];
			if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
				if (data.hasOwnProperty('af_fairness_url')) {
					if (currentPath !== data.af_fairness_url) {
						// removing query
						const clean_url = data.af_fairness_url.split("?")[0];
						history.replaceState(null, null, AF_CATALOGUES_PAGE_SLUG + clean_url)
					}
				}
			}
		}, false);
    </script>
    <?php
   }
}
add_action('wp_footer', 'AF_FAIRness_integration');

function AF_FAIRness_integration_rewrite() {
$AF_CATALOGUES_PAGE_ID = 3901; // UPDATE THIS
$AF_CATALOGUES_PAGE_SLUG = '/tools-and-data-catalogue'; // UPDATE THIS
add_rewrite_rule(substr($AF_CATALOGUES_PAGE_SLUG, 1).'/(.+)', "index.php?page_id={$AF_CATALOGUES_PAGE_ID}", 'top');
}
add_action('init', 'AF_FAIRness_integration_rewrite');
/**
 * 	END OF AGROFORESTRY TOOLS AND DATA CATALOGUES INTEGRATION [WORDPRESS]
 */
```

# Acknowledgements

These catalogues were developed within the [DigitAF](https://digitaf.eu/) project. The DigitAF project has received funding from the European Union’s Horizon Europe research and innovation programme under Grant Agreement n.° 101059794.