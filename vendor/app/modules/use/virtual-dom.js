"use strict";

module.exports = function(el){

    const make = (dom) => {
        return Array.from(dom.getElementsByTagName('*'))
                    .filter(node => {
                        return node.nodeName !== "#text";
                    })
                    .map((node) => {

                      let cleaned = (scope) => {
                        return scope.replace(/\<(.*?)\>(.*?)\<\/(.*?)\>|<(.*?)\/?>/gim, (m) => {
                            return '';
                        }).replace(/\n/g, '').trim();
                      }

                      let make = (scope = [], type = 'str') => {
                          if(typeof scope === "string"){
                            // scope =  scope.replace(/\<(.*)\>(.*?)\<\/(.*?)\>/gim);
                            scope = cleaned(scope);
                            scope = [scope];
                          }
                          var s = [];
                          scope.map((n) => {
                            var m = n.match(/\$(.*?)\$/gim)
                            return (m !== null) ? m.map((nd) => s.push(nd.trim())) : [];
                          });
                          return s;
                      };


                      let makeAttr = (attrs) => {
                         var s = {};
                         attrs.map((n) => {
                            var t = ' '+ n.textContent + ' ';
                            var m = t.match(/\$(.*?)\$/gim);
                            return (m !== null) ? m.map((nd) => { s[n.name] = nd.trim().replace(/\(|\)/g, ''); }) : [];
                         });
                         return s;
                      };

                      var fnd = (node.attributes !== "undefined") ? node.attributes : [];
                      var getIn = (node) => (node.attributes !== "undefined") ? makeAttr(Array.from(node.attributes), 'dom') : [];
                      let scopee = [...Object.values(getIn(node)), ...make(node.innerHTML)];

                      return {
                        'elem': node,
                        'value': cleaned(node.innerHTML),
                        'attrs': fnd,
                        'tag': node.nodeName,
                        'scope': scopee,
                        'bind_in': getIn(node),
                      };

                    });
    };

    return make(el);

};