/*!
 * FAIRness scoring algorithm for tools
 *
 * Licensed under MIT
 * 
 * Usage example:
 * 
 * var FAIR = new Tools_FAIRness_scoring()
 * FAIR.score(tool) // returns an object with the four scorings { F: ..., A: ..., I: ..., R: ... }
 * FAIR.score_f(tool) // returns the value of the Findability scoring
 * FAIR.score_a(tool) // returns the value of the Accessbility scoring
 * FAIR.score_i(tool) // returns the value of the Interoperability scoring
 * FAIR.score_r(tool) // returns the value of the Reusability scoring
 * 
 * The 'tool' should be an Object containing the needed information from the 'tool_form.json'
 * 
 */

function Tools_FAIRness_scoring() {
    const _version = "1.0"
    const _description = "This first version of the Tools FAIRness scoring was assessed during the DigitAF project as a first iteration. It serves as an initial evaluation and is expected to evolve with further refinements and improvements."

    const _using_form_version = "1.0"

    const DEFAULT_SCORE_FOR_OTHER_ANSWERS = 0.2

    function round(score) {
        // rounding to 0-100 percentage, no decimals
        return Math.round(score * 100)
    }

    function avg(arr_numbers) {
        return arr_numbers.reduce((accum, value) => accum + value, 0) / arr_numbers.length
    }

    function max(arr_numbers) {
        for (nr of arr_numbers) {
            if (validAnswer(nr)) {
                return Math.max(...arr_numbers)
            }
        }
        return 0
    }

    function validAnswer(str) {
        if (typeof str == 'String') {
            str = str.trim()
        }
        return str !== null || str !== "null" || str !== "" || str !== undefined
    }

    function score_f(tool) {
        /**
         * FINDABILITY
         * 
         * The assets should be easy to find, both for humans and for computers.
         * @param {object} - Tool information
         * @returns {number} - Value of the Findability scoring
         */

        var F1 = tool.url_persistent == "Yes" ? 1 : 0
        var F2 = tool.documentation_available == "Yes" ? 1 : 0
        var F3 = tool.listed_other_databases == "Yes" ? 1 : 0

        return round((F1 + F2 + F3) / 3)
    }

    function score_a(tool) {
        /**
         * ACCESSIBILITY
         * 
         * Once users find the digital tool assets, they need to know how they can be accessed, possibly including authentication and authorization. Protocols for retrieving those assets should be made explicit, for both humans and computers.
         * @param {object} - Tool information
         * @returns {number} - Value of the Accessibility scoring
         */

        var A1 = 0
        if (tool.access_barrier) {
          var scores = {
            "No, direct download/access through a web link": 1,
            "User registration needed": 1,
            "Access to the tool needs to be granted (e.g. tool owner needs to give permission after user registration; tool owner sends tool after receiving a request email)": 0.5,
            "Access to the tool is evaluated before being granted, due to ethical, legal or contractual constrains (e.g. privacy, highly sensitive data)": 0.8,
            "Paywall": 0
          }
          if (tool.access_barrier in scores) {
            A1 = scores[tool.access_barrier]
          } else {
            console.log("'access_barrier' answer is not valid: " + tool.access_barrier)
          }
        }

        var A2 = 0
        if (tool.documentation_accessible) {
          var scores = {
            "Yes": 1,
            "Some of it": 0.5,
            "No": 0,
            "Don't know": 0
          }
          if (tool.documentation_accessible in scores) {
            A2 = scores[tool.documentation_accessible]
          } else {
            console.log("'documentation_accessible' answer is not valid: " + tool.documentation_accessible)
          }
        }

        var A3 = 0
        if (tool.minimum_req && tool.minimum_req.length > 0) {
          var A3_scores = []
          var scores = {
            "Internet connection": 0.5,
            "Desktop computer (e.g. optimized for wider screens)": 1,
            "Mobile phone (e.g. works on small screens; use the camera)": 1,
            "Open source software/programming language": 1,
            "Licensed software/programming language": 0,
            "Virtual reality headset or other specialized devices": 0.2,
            "Cross-platform tool (works in Windows, Mac and Linux)": 1,
            "Specific operating system: Windows": 0.5,
            "Specific operating system: Mac": 0.5,
            "Specific operating system: Linux": 0.5,
            "Other": DEFAULT_SCORE_FOR_OTHER_ANSWERS
          }
          for (var min_req of tool.minimum_req) {
            if (min_req in scores) {
                A3_scores.push(scores[min_req])
            } else if (validAnswer(min_req)) {
                // other option
                A3_scores.push(DEFAULT_SCORE_FOR_OTHER_ANSWERS)
            } else {
                console.log("'minimum_req' has an answer that is not valid: " + min_req)
            }
          }
          A3 = avg(A3_scores)
        }

        var A4 = 0
        if (tool.languages && tool.languages.length > 0) {
            var nr_lang = 0
            for (lang in tool.languages) {
                if (validAnswer(lang)) {
                    nr_lang++
                }
            }
            if (nr_lang > 3) {
                A4 = 1
            } else if (nr_lang == 3) {
                A4 = 0.8
            } else if (nr_lang == 2) {
                A4 = 0.5
            }
        }

        var A5 = 0
        if (tool.training_materials) {
            var scores = {
              "Yes": 1,
              "No": 0,
              "Don't know": 0
            }
            if (tool.training_materials in scores) {
                A5 = scores[tool.training_materials]
            } else {
                console.log("'training_materials' answer is not valid: " + tool.training_materials)
            }
        }

        return round((A1 + A2 + A3 + A4 + A5) / 5)
    }

    function score_i(tool) {
        /**
         * INTEROPERABILITY
         * 
         * Interoperability core resides in facilitating the input and output of data from one tool to the next. When these mechanisms are facilitated, through modern exchange protocols and widely used file formats, these interchanges are made easier, and the tool environment enhanced by having different tools and models working together.
         * @param {object} - Tool information
         * @returns {number} - Value of the Interoperability scoring
         */

        var subcriteria_count = 6

        var I1 = 0
        if (tool.software_proglanguage && tool.software_proglanguage.length > 0) {
          var I1_score = []
          var tech_ranking = new TechnologyRanking()

          for (prog_lang of tool.software_proglanguage) {
            var ranking = tech_ranking.rank(prog_lang)
            if (ranking.status == 'success') {
                I1_score.push(ranking.score)
            } else if (validAnswer(prog_lang)) { // 'error', non existent
                I1_score.push(DEFAULT_SCORE_FOR_OTHER_ANSWERS)
            } else {
                console.log("'software_proglanguage' has an answer that is not valid: " + prog_lang)
            }
          }
          I1 = avg(I1_score)
        }
  
        var I2 = 0
        if (tool.input_data_protocols && tool.input_data_protocols.length > 0) {
            var I2_score = []
            var data_protocols = {
                "User enters data manually": 0,
                "Data entry can be partially automated programmatically (e.g. loading files with previously defined setups)": 0.5,
                "Data entry can be fully automated programmatically (e.g. automatically run a script for multiple scenarios)": 1
            }
            for (var data_protocol in data_protocols) {
                if (tool.input_data_protocols.includes(data_protocol)) {
                    I2_score.push(data_protocols[data_protocol])
                }
            }
            I2 = max(I2_score)
        }
  
        var I3 = 0
        if (tool.input_data_formats && tool.input_data_formats.length > 0) {
            var I3_score = []
            var scores = {
                "Widely used file formats (CSV, JSON, XML, etc.)": 1,
                "Custom file formats": 0.2,
                "HTTP (query string parameters, data in request body & file uploads)": 1,
                "Other": DEFAULT_SCORE_FOR_OTHER_ANSWERS
            }
            for (var data_format of tool.input_data_formats) {
              if (data_format in scores) {
                I3_score.push(scores[data_format])
              } else if (validAnswer(data_format)) {
                  // other option
                  I3_score.push(DEFAULT_SCORE_FOR_OTHER_ANSWERS)
              } else {
                console.log("'input_data_formats' has an answer that is not valid: " + data_format)
              }
            }
            I3 = max(I3_score)
        }
  
        var I4 = 0
        if (tool.output_data_formats && tool.output_data_formats.length > 0) {
            var I4_score = []
            var scores = {
                "Widely used file formats (CSV, JSON, XML, etc.)": 1,
                "Custom file formats": 0.2,
                "Static content (e.g. reports on website pages, tables and graphs in the tool's interface, PDF files)": 0,
                "Other": DEFAULT_SCORE_FOR_OTHER_ANSWERS
            }
            for (var data_format of tool.output_data_formats) {
                if (data_format in scores) {
                    I4_score.push(scores[data_format])
                } else if (validAnswer(data_format)) {
                    // other option
                    I4_score.push(DEFAULT_SCORE_FOR_OTHER_ANSWERS)
                } else {
                    console.log("'output_data_formats' has an answer that is not valid: " + data_format)
                  }
            }
            I4 = max(I4_score)
        }
  
        var I5 = 0
        if (tool.previous_versions_available) {
            var scores = {
                "Yes": 1,
                "No": 0,
                "Only one version exists": 0, // not scored
                "Don't know": 0
            }
            if (tool.previous_versions_available in scores) {
                I5 = scores[tool.previous_versions_available]
                if (tool.previous_versions_available == "Only one version exists") subcriteria_count--
            } else if (validAnswer(tool.previous_versions_available)) {
                // other option
                I5 = DEFAULT_SCORE_FOR_OTHER_ANSWERS
            } else {
                console.log("'previous_versions_available' answer is not valid: " + tool.previous_versions_available)
            }
        }
  
        var I6 = 0
        if (tool.integrated_other_tools) {
            I6 = {
                "Yes": 1,
                "No": 0,
                "Don't know": 0
            }
            if (tool.integrated_other_tools in scores) {
                I6 = scores[tool.integrated_other_tools]
            } else if (validAnswer(tool.integrated_other_tools)) {
                // other option
                I6 = DEFAULT_SCORE_FOR_OTHER_ANSWERS
            } else {
                console.log("'integrated_other_tools' answer is not valid: " + tool.integrated_other_tools)
            }
        }
        
        return round((I1 + I2 + I3 + I4 + I5 + I6) / subcriteria_count)
    }

    function score_r(tool) {
        /**
         * REUSABILITY
         * 
         * Reusability implies that several questions are addressed. Should a tool be reused? That is, if it makes sense to use it in some situation, if it is relevant for the task at hand, if its developing development assumptions fit the new project. Can a tool be reused and under what conditions? For this, knowing the usage rights licence is essential, and all the implications that it implies.
         * @param {object} - Tool information
         * @returns {number} - Value of the Reusability scoring
         */
        
        var R1 = 0
        if (tool.license) {
            var scores = {
                "MIT License": 1,
                "Apache License 2.0": 1,
                "GNU General Public License (GPL)": 1,
                "Creative Commons BY": 1,
                "Creative Commons BY-SA": 1,
                "Creative Commons BY-NC": 0.5,
                "Creative Commons BY-NC-SA": 0.5,
                "Creative Commons BY-ND": 0.2,
                "Creative Commons BY-NC-ND": 0.2,
                "Creative Commons Zero (CC0)": 1,
                "Proprietary": 0,
                "Not stated": 0,
                "Don't know": 0,
                "Other": DEFAULT_SCORE_FOR_OTHER_ANSWERS
            }
            if (tool.license in scores) {
                R1 = scores[tool.license]
            } else if (validAnswer(tool.license)) {
                // other option
                R1 = DEFAULT_SCORE_FOR_OTHER_ANSWERS
            } else {
                console.log("'license' answer is not valid: " + tool.license)
            }
        }

        var R2 = 0
        if (tool.data_provenance) {
            var scores = {
                "Yes": 1,
                "Incomplete": 0.5,
                "No": 0,
                "Don't know": 0
            }
            if (tool.data_provenance in scores) {
                R2 = scores[tool.data_provenance]
            } else if (validAnswer(tool.data_provenance)) {
                // other option
                R2 = DEFAULT_SCORE_FOR_OTHER_ANSWERS
            } else {
                console.log("'data_provenance' answer is not valid: " + tool.data_provenance)
            }
        }

        var R3 = 0
        if (tool.development_process) {
            var scores = {
                "Yes": 1,
                "Not completely": 0.5,
                "No": 0,
                "Don't know": 0
            }
            if (tool.development_process in scores) {
                R3 = scores[tool.development_process]
            } else if (validAnswer(tool.development_process)) {
                // other option
                R3 = DEFAULT_SCORE_FOR_OTHER_ANSWERS
            } else {
                console.log("'development_process' answer is not valid: " + tool.development_process)
            }
        }

        var R4 = 0
        if (tool.documentation_contribute) {
            var scores = {
                "Yes": 1,
                "No": 0,
                "Don't know": 0
            }
            if (tool.documentation_contribute in scores) {
                R4 = scores[tool.documentation_contribute]
            } else if (validAnswer(tool.documentation_contribute)) {
                // other option
                R4 = DEFAULT_SCORE_FOR_OTHER_ANSWERS
            } else {
                console.log("'documentation_contribute' answer is not valid: " + tool.documentation_contribute)
            }
        }

        return round((R1 + R2 + R3 + R4) / 4)
    }

    return {
        version: _version,
        score(tool) {
            return {
                F: score_f(tool),
                A: score_a(tool),
                I: score_i(tool),
                R: score_r(tool)
            }
        },
        score_f: score_f,
        score_a: score_a,
        score_i: score_i,
        score_r: score_r
    }
}