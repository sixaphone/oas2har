!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):e.swagger2har=r()}(this,function(){"use strict";var e,r=(function(e){var r={string:"",number:0,integer:0,null:null,boolean:!1,object:{}};function t(e,r,t){return!t.requiredPropertiesOnly||t.requiredPropertiesOnly&&function(e,r){var t=!1;return(r=r||[]).forEach(function(r){r===e&&(t=!0)}),t}(e,r.required)}function i(e){return function(e){return Array.isArray(e)}(e.type)&&(e.type=e.type[0]),e.type}e.exports={instantiate:function(e,n){n=n||{};var a={};return function e(a,s,o){if(a){var p,u,f=i(a);if("object"===f&&a.properties)for(var c in o[s]=o[s]||{},a.properties)a.properties.hasOwnProperty(c)&&t(c,a,n)&&e(a.properties[c],c,o[s]);else if(a.allOf)for(p=0;p<a.allOf.length;p++)e(a.allOf[p],s,o);else if("array"===f){o[s]=[];var v=0;for((a.minItems||a.minItems>0)&&(v=a.minItems),p=0;p<v;p++)e(a.items,p,o[s])}else!function(e){return"[object Array]"===Object.prototype.toString.call(e.enum)}(a)?function(e){var t=e.type;return void 0!==r[t]}(a)&&(o[s]=function(e){var t=e.type;return e.default?e.default:r[t]}(a)):o[s]=(u=a).default?u.default:u.enum.length?u.enum[0]:void 0}}(e,"kek",a),a.kek}}}(e={exports:{}},e.exports),e.exports),t=(r.instantiate,r),i=function(e,r,i){if(void 0!==e.paths[r][i].parameters)for(var a in e.paths[r][i].parameters){var s=e.paths[r][i].parameters[a];if(void 0!==s.in&&"body"===s.in.toLowerCase()&&void 0!==s.schema){var o;if(void 0===s.schema.$ref)o=s.schema;else if(/^http/.test(s.schema.$ref));else{var p=s.schema.$ref.split("/").slice(-1)[0];o=n(e,e.definitions[p])}return{mimeType:"application/json",text:JSON.stringify(t.instantiate(o))}}}return null},n=function e(r,t){if("object"===t.type){if(void 0!==t.properties)for(var i in t.properties){var n=t.properties[i];if("string"==typeof n.$ref&&!/^http/.test(n.$ref)){var a=n.$ref.split("/").slice(-1)[0];t.properties[i]=r.definitions[a]}e(r,t.properties[i])}}else if("array"===t.type&&void 0!==t.items)for(var s in t.items){if("$ref"===s&&!/^http/.test(t.items[s])){var o=t.items.$ref.split("/").slice(-1)[0];t.items=r.definitions[o]}e(r,t.items)}return t},a=function(e,r,t,i){void 0===i&&(i={});var n=[];if(void 0!==e.paths[r][t].parameters)for(var a in e.paths[r][t].parameters){var s=e.paths[r][t].parameters[a];"string"!=typeof s.$ref||/^http/.test(s.$ref)||(s=o(e,s.$ref)),void 0!==s.in&&"query"===s.in.toLowerCase()&&n.push({name:s.name,value:void 0===i[s.name]?void 0===s.default?e.openapi?"<SOME_"+s.schema.type.toUpperCase()+"_VALUE>":"<SOME_"+s.type.toUpperCase()+"_VALUE>":s.default+"":i[s.name]+""})}return n},s=function(e,r,t){var i,n,a,s=[],o=e.paths[r][t];if(void 0!==o.consumes)for(var p in o.consumes){var u=o.consumes[p];s.push({name:"accept",value:u})}if(void 0!==o.produces)for(var f in o.produces){var c=o.produces[f];s.push({name:"content-type",value:c})}if(void 0!==o.parameters)for(var v in o.parameters){var h=o.parameters[v];void 0!==h.in&&"header"===h.in.toLowerCase()&&s.push({name:h.name,value:"<SOME_"+h.type.toUpperCase()+"_VALUE>"})}var m=e.securityDefinitions||e.components&&e.components.securitySchemes,l=o.security||e.security;if(m&&l)for(var d in l){var y=Object.keys(l[d])[0],b=m[y];if(b&&b.type)switch(b.type.toLowerCase()){case"basic":i=y;break;case"apikey":"query"===b.in&&(n=y);break;case"oauth2":a=y}}return i?s.push({name:"Authorization",value:"Basic <USERNAME:PASSWORD>"}):n?s.push({name:m[n].name,value:"REPLACE_KEY_VALUE"}):a&&s.push({name:"Authorization",value:"Bearer <BEARER_TOKEN>"}),s},o=function(e,r){var t=r.split("/");if(t.length<=1)return{};return function e(r,i){if(i+1<t.length){var n=i+1;return e(r[t[i]],n)}return r[t[i]]}(e,1)};return function(e,r){try{var t=r||function(e){var r="";return e.openapi?e.servers[0].url:(void 0!==e.schemes?r+=e.schemes[0]:r+="http","/"===e.basePath?r+="://"+e.host:r+="://"+e.host+e.basePath,r)}(e),n=[];return Object.keys(e.paths).forEach(function(r){Object.keys(e.paths[r]).forEach(function(o){var p=t+r,u=function(e,r,t,n,o){void 0===o&&(o={});var p={method:t.toUpperCase(),url:n+r,headers:s(e,r,t),queryString:a(e,r,t,o),httpVersion:"HTTP/1.1",cookies:[],headersSize:0,bodySize:0},u=i(e,r,t);return u&&(p.postData=u),p}(e,r,o,t);n.push({path:r,method:o.toUpperCase(),url:p,description:e.paths[r][o].description||"No description available",har:u})})}),n}catch(e){return console.error(e),null}}});