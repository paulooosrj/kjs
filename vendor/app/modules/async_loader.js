"use strict";

		var $e = Array.from(
		  document.querySelectorAll('[type="text/javascript-async"]')
		);

		const make_local = ($el) => {
			  $el.setAttribute("type", "text/javascript");
			  var require = `\nconst require = async (module) => { return await import(module); };\n`;
			  var transform = $el.innerHTML
			    .replace(/require/gim, "await require")
			    .replace(/import/gim, "await import")
			    .replace(/fetch/gim, "await fetch");
			  $el.innerHTML = "(async() => { " + require + transform + " })();";
		};

		const make_file = ($el) => {

			 fetch($el.getAttribute('src')).then((res) => {

			 		return res.text();

			 }).then((res) => {

			 	$el.setAttribute("type", "text/javascript");
			 	$el.removeAttribute("src");
			 	var require = `\nconst require = async (module) => { return await import(module); };\n`;
			 	var transform = res
			 		.replace(/require/gim, "await require")
			    	.replace(/import/gim, "await import")
			    	.replace(/fetch/gim, "await fetch");

			  	$el.innerHTML = "(async() => { " + require + transform + " })();";

			 }).catch((err) => new Error(err));

		};

		$e.map(function($el) {
		  	var type = ($el.getAttribute('src')) ? 'file' : 'local';
		  	var make = (type === "local") ? make_local : make_file;
		  	make($el);
		});