# Agroforestry Tools and Data Catalogues
## Moving from Scattered to Converging Ecosystem

Digital technologies offer unprecedented capacities to collect data and synthesise knowledge to support decision-making, as well as to reach out to a targeted audience, improve communication, and boost networking. Amongst initial interactions within the [DigitAF](https://digitaf.eu/) consortium arose the suggestion of creating a catalogue of agroforestry related tools and data.

The online Agroforestry Tools and Data Catalogues is already implemented at https://euraf.github.io/AF_FAIRness/, and integrated in the DigitAF project website https://digitaf.eu/tools-and-data-catalogue. The acceptance and willingness to participate in this endeavour is growing, mostly driven by DigitAF consortium members and developers of tools used within the Living Labs. Ultimately, this will help increase knowledge about **which tools and datasets exist**, **how they can be made compatible with each other**, and **which topics have a tool-gap or data-gap** (and therefore the potential to develop new tools and gather new data).

The general intention is that any user may contribute with new tools and datasets to the database, edit any incomplete or outdated information about any of the digital resources, and that the interaction with the catalogue and results display should be easy and comprehensible. Available filters allow users to search for tools and datasets depending on different criteria, depending on the user needs. A quick FAIRness score is available for each digital resource to enable an assessment preview of the easiness of their findability, accessibility, interoperability and reusability.

## How to contribute with new tools and datasets?
### Through the catalogues forms

A very common way of **collecting information** is through a **questionnaire**. These catalogues have an incorporated form for tool and data collection, and should be used to add a new digital resource that might be useful.

- **Add a new tool:** https://euraf.github.io/AF_FAIRness/tools/add
- **Add a new dataset:** https://euraf.github.io/AF_FAIRness/datas/add

There are several questions, some related with the FAIRness score, that help characterise each resource in some detail. They are divided into general questions about the digital resource, some about more technical details, about its use, accessibility, and documentation. It takes about 10-15 minutes to complete. The only personal information collected is the user name and email to ask any follow-up questions that may arise.

When the information is saved, it's automatically uploaded to the GitHub repository. But behind  this simple process is a more complex mechanism:
- When the _Save_ button is clicked, the filled fields are validated. If any of the compulsory questions have not been answered, an alert is raised and the submission does not proceed.
- Once validated, the information is aggregated into a _JSON file_.
- A _POST HTTP request_ is made to the server. Using the [PyGitHub API](https://github.com/PyGithub/PyGithub), a _new branch_ is created and a _commit_ is made to a fork of the project's main repository. The use of a fork (an accessory repository) allows to guarantee the security of the access data (i.e. API Key) of the main repository, and there is no possibility of making changes directly to the main code without first being validated by one of the EURAF community members. This guarantees a data-quality check.
- Taking advantage of the _Github Actions_ functionality, whenever new branches are detected (i.e. submission of new tools or datasets) a _pull request_ is made to the main repository.
- This _pull request_ is checked by DigitAF partners and the European Agroforestry Federation (EURAF). If necessary, changes can be proposed/asked. If everything is in order, it is accepted and immediately integrated into the main code, with the information becoming part of the catalogue.

### The Geek Way

Tools can be added or edited directly in this GitHub repository (curated by [EURAF](https://euraf.net/)).

In detail, to add a new tool consider that the `/catalogue/tools` folder includes:
- `tools_form.json` file, that holds every question whose answers represent the tool's respective data, which is then displayed and filtered;
- `tools_list.json` file, that contains the list of every reviewed tool;
- `tools_template.json` file, that contains the list of every reviewed tool;
- an individual `.json` file for each one of the tools.

Using common methods of Git:
1. Fork the repository;
2. Do your edits;
	- If adding a new tool:
		- Create a new file with your tool's name (using a simple string, avoiding illegal characters, symbols or spaces);
		- Copy the `tools_template.json` content and past it into the new file;
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

## Acknowledgements

This database was developed within the [DigitAF](https://digitaf.eu/) project. The DigitAF project has received funding from the European Union’s Horizon Europe research and innovation programme under Grant Agreement n.° 101059794.