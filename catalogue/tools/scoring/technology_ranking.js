/*!
 * Technology Ranking (Software / Programming languages)
 * 
 * »» For the programming languages:
 * 
 * Using the «Stack Overflow Developer Survey» 2023 > Technology > Most popular technologies
 * (https://survey.stackoverflow.co/2023/#technology-most-popular-technologies)
 * 
 * List retrieved as:
 * var technologies_score = [];
 * document.querySelectorAll("#most-popular-technologies-language td.label")
 * 	.forEach(function(el, idx) {
 *		var tech = x.innerText
 *  	obj[tech] = idx < 11 ? 1 : idx < 21 ? 0.8 : idx < 31 ? 0.6 : idx < 41 ? 0.4 : 0.2 })
 * 
 * »» For the software:
 * 
 * Manually added options.
 * 
 * 
 * »» Usage example:
 * 
 * var ranking = new TechnologyRanking()
 * var tech = "Microsoft Excel"
 * ranking.rank(tech) // { status: 'success', score: 0.8 }
 * 
 * The 'tech' should be a String containing one of the options available at 'tool_form.json'.
 * If your technology is not on the given list, purpose an update via Github Pull Request.
 * 
 */

function TechnologyRanking() {
	const _version = "1.0"

	const technologies_score = {
			"JavaScript": 1,
			"HTML/CSS": 1,
			"Python": 1,
			"SQL": 1,
			"TypeScript": 1,
			"Bash/Shell": 1,
			"Java": 1,
			"C#": 1,
			"C++": 1,
			"C": 1,
			"PHP": 1,
			"PowerShell": 0.8,
			"Go": 0.8,
			"Rust": 0.8,
			"Kotlin": 0.8,
			"Ruby": 0.8,
			"Lua": 0.8,
			"Dart": 0.8,
			"Assembly": 0.8,
			"Swift": 0.8,
			"R": 0.8,
			"Visual Basic (.Net)": 0.6,
			"MATLAB": 0.6,
			"VBA": 0.6,
			"Groovy": 0.6,
			"Delphi": 0.6,
			"Scala": 0.6,
			"Perl": 0.6,
			"Elixir": 0.6,
			"Objective-C": 0.6,
			"Haskell": 0.6,
			"GDScript": 0.4,
			"Lisp": 0.4,
			"Solidity": 0.4,
			"Clojure": 0.4,
			"Julia": 0.4,
			"Erlang": 0.4,
			"F#": 0.4,
			"Fortran": 0.4,
			"Prolog": 0.4,
			"Zig": 0.4,
			"Ada": 0.2,
			"OCaml": 0.2,
			"Apex": 0.2,
			"Cobol": 0.2,
			"SAS": 0.2,
			"Crystal": 0.2,
			"Nim": 0.2,
			"APL": 0.2,
			"Flow": 0.2,
			"Raku": 0.2,
			"Microsoft Excel": 0.8,
			"Oracle Apex": 0.2,
			"Outsystems": 0.2
	}

	function rank(tech) {
		if (tech in technologies_score) {
			return { status: 'success', score: technologies_score[tech] }
		} else {
			return { status: 'error', message: "No such technology. Purpose an update via Github Pull Request." }
		}
	}

	return {
		rank: rank
	}
	
}