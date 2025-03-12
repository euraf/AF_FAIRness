/*!
 * FAIRness scoring algorithm for dataset
 *
 * Licensed under MIT
 * 
 * Usage example:
 * 
 * var FAIR = new Data_FAIRness_scoring()
 * FAIR.score(dataset) // returns an object with the four scorings { F: ..., A: ..., I: ..., R: ... }
 * FAIR.score_f(dataset) // returns the value of the Findability scoring
 * FAIR.score_a(dataset) // returns the value of the Accessbility scoring
 * FAIR.score_i(dataset) // returns the value of the Interoperability scoring
 * FAIR.score_r(dataset) // returns the value of the Reusability scoring
 * 
 * The 'dataset' should be an Object containing the needed information from the 'datasets_form.json'
 * 
 */

function Data_FAIRness_scoring() {
    const _version = "1.0"
    const _description = "This first version of the Data FAIRness scoring was assessed during the DigitAF project as a first iteration. It serves as an initial evaluation and is expected to evolve with further refinements and improvements."

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

    function score_f(dataset) {

        var F1 = dataset.url_persistent == "Yes" ? 1 : 0
        var F2 = dataset.data_metadata == "Yes" ? 1 : 0
        var F3 = dataset.listed_other_databases == "Yes" ? 1 : 0

        return round((F1 + F2 + F3) / 3)
    }

    function score_a(dataset) {

        var A1 = 0
        if (dataset.access_barrier) {
          var scores = {
            "No, direct download/access through a web link": 1,
            "User registration needed": 1,
            "Access to the data needs to be granted (e.g. dataset owner needs to give permission after user registration; dataset owner sends data after receiving a request email)": 0.5,
            "Access to the data is evaluated before being granted, due to ethical, legal or contractual constrains (e.g. privacy, highly sensitive data)": 0.8
          }
          if (dataset.access_barrier in scores) {
            A1 = scores[dataset.access_barrier]
          } else {
            console.log("'access_barrier' answer is not valid: " + dataset.access_barrier)
          }
        }

        var A2 = 0
        if (dataset.documentation_accessible) {
          var scores = {
            "Yes": 1,
            "Some of it": 0.5,
            "No": 0,
            "Don't know": 0
          }
          if (dataset.documentation_accessible in scores) {
            A2 = scores[dataset.documentation_accessible]
          } else {
            console.log("'documentation_accessible' answer is not valid: " + dataset.documentation_accessible)
          }
        }

        return round((A1 + A2) / 2)
    }

    function score_i(dataset) {

        var I1 = 0
        if (dataset.data_formats && dataset.data_formats.length > 0) {
            var I1_score = []
            var scores = {
                "Widely used file formats (CSV, JSON, GeoJSON, SHP, GPX, KML, XML, TIFF, MP3, MP4, etc.)": 1,
                "Custom file formats (database specific, not widely used)": 0,
                "Static content (e.g. textual, reports on website pages, tables and graphs, PDF files)": 0,
                "Other": DEFAULT_SCORE_FOR_OTHER_ANSWERS
            }
            for (var data_format of dataset.data_formats) {
              if (data_format in scores) {
                I1_score.push(scores[data_format])
              } else if (validAnswer(data_format)) {
                  // other option
                  I1_score.push(DEFAULT_SCORE_FOR_OTHER_ANSWERS)
              } else {
                console.log("'data_formats' answer is not valid: " + dataset.data_formats)
              }
            }
            I1 = max(I1_score)
        }
  
        var I2 = 0
        if (dataset.data_metadata_vocabulary) {
            var scores = {
                "Yes": 1,
                "No": 0,
                "Don't know": 0
              }
            if (dataset.data_metadata_vocabulary in scores) {
                I2 = scores[dataset.data_metadata_vocabulary]
            } else {
                console.log("'data_metadata_vocabulary' answer is not valid: " + dataset.data_metadata_vocabulary)
            }
        }

        return round((I1 + I2) / 2)
    }

    function score_r(dataset) {
        
        var R1 = 0
        if (dataset.data_relevant_attributes) {
            var scores = {
                "Yes": 1,
                "Not completely": 0.5,
                "No": 0,
                "Don't know": 0
            }
            if (dataset.data_relevant_attributes in scores) {
                R1 = scores[dataset.data_relevant_attributes]
            } else {
                console.log("'data_relevant_attributes' answer is not valid: " + dataset.data_relevant_attributes)
            }
        }       
        
        var R2 = 0
        if (dataset.license) {
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
            if (dataset.license in scores) {
                R2 = scores[dataset.license]
            } else if (validAnswer(dataset.license)) {
                // other option
                R2 = DEFAULT_SCORE_FOR_OTHER_ANSWERS
            } else {
                console.log("'license' answer is not valid: " + dataset.license)
            }
        }

        var R3 = 0
        if (dataset.development_process) {
            var scores = {
                "Yes": 1,
                "Not completely": 0.5,
                "No": 0,
                "Don't know": 0
            }
            if (dataset.development_process in scores) {
                R3 = scores[dataset.development_process]
            } else {
                console.log("'development_process' answer is not valid: " + dataset.development_process)
            }
        }       

        return round((R1 + R2 + R3) / 3)
    }

    return {
        version: _version,
        score(dataset) {
            return {
                F: score_f(dataset),
                A: score_a(dataset),
                I: score_i(dataset),
                R: score_r(dataset)
            }
        },
        score_f: score_f,
        score_a: score_a,
        score_i: score_i,
        score_r: score_r
    }
}