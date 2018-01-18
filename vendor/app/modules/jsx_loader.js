global.parse_jsx = jsx => {
  let remove_whitespace = tpl => tpl.replace(/(\n|\s\s)/g, "");
  let clean = remove_whitespace(jsx);
  let matches = clean.match(/(?!\((.*)\)\{)\((.*?)\)\;/g);
  let is_html = code => /\<(.*)\>(.*)\<\/(.*)\>/.test(code);

  if (!Array.isArray(matches)) return;
  
  Array.from(matches).map((m) => {
  	if(is_html(m)){
      let novo = m;
      novo = novo.replace(/[\(|\)]/gim, '`')
                .replace(/\{/gim, '${')
                .replace(/\}/gim, '}')
              .replace(/\s\s/gim, '').trim() + '\n';
      clean = clean.replace(m, novo);
    }
  });

  var rt = `
                var exports = {},
                    module = {exports: {}};
                ${clean}
                return Object.assign({}, module.exports, exports);
          `;
  return new Function(rt);
};

global.jsx_loader = async function(jsx_file){

  let prefix = "./";
  jsx_loader.folder_jsx = jsx_loader.folder_jsx || "jsx/";
  var path = prefix + jsx_loader.folder_jsx + jsx_file + ".jsx";
  var code = await fetch(path);
  code = await code.text();
  return parse_jsx(code)();

};