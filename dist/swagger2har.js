!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r(e.swagger2har={})}(this,function(e){"use strict";var r,t=(function(e){var r={string:"",number:0,integer:0,null:null,boolean:!1,object:{}};function t(e,r,t){return!t.requiredPropertiesOnly||t.requiredPropertiesOnly&&function(e,r){var t=!1;return(r=r||[]).forEach(function(r){r===e&&(t=!0)}),t}(e,r.required)}function i(e){return function(e){return Array.isArray(e)}(e.type)&&(e.type=e.type[0]),e.type}e.exports={instantiate:function(e,a){a=a||{};var n={};return function e(n,s,o){if(n){var p,u,f=i(n);if("object"===f&&n.properties)for(var c in o[s]=o[s]||{},n.properties)n.properties.hasOwnProperty(c)&&t(c,n,a)&&e(n.properties[c],c,o[s]);else if(n.allOf)for(p=0;p<n.allOf.length;p++)e(n.allOf[p],s,o);else if("array"===f){o[s]=[];var v=0;for((n.minItems||n.minItems>0)&&(v=n.minItems),p=0;p<v;p++)e(n.items,p,o[s])}else!function(e){return"[object Array]"===Object.prototype.toString.call(e.enum)}(n)?function(e){var t=e.type;return void 0!==r[t]}(n)&&(o[s]=function(e){var t=e.type;return e.default?e.default:r[t]}(n)):o[s]=(u=n).default?u.default:u.enum.length?u.enum[0]:void 0}}(e,"kek",n),n.kek}}}(r={exports:{}},r.exports),r.exports),i=(t.instantiate,t),a=function(e,r,t,i,a){void 0===a&&(a={});var s={method:t.toUpperCase(),url:i+r,headers:p(e,r,t),queryString:o(e,r,t,a),httpVersion:"HTTP/1.1",cookies:[],headersSize:0,bodySize:0},u=n(e,r,t);return u&&(s.postData=u),s},n=function(e,r,t){if(void 0!==e.paths[r][t].parameters)for(var a in e.paths[r][t].parameters){var n=e.paths[r][t].parameters[a];if(void 0!==n.in&&"body"===n.in.toLowerCase()&&void 0!==n.schema){var o;if(void 0===n.schema.$ref)o=n.schema;else if(/^http/.test(n.schema.$ref));else{var p=n.schema.$ref.split("/").slice(-1)[0];o=s(e,e.definitions[p])}return{mimeType:"application/json",text:JSON.stringify(i.instantiate(o))}}}return null},s=function e(r,t){if("object"===t.type){if(void 0!==t.properties)for(var i in t.properties){var a=t.properties[i];if("string"==typeof a.$ref&&!/^http/.test(a.$ref)){var n=a.$ref.split("/").slice(-1)[0];t.properties[i]=r.definitions[n]}e(r,t.properties[i])}}else if("array"===t.type&&void 0!==t.items)for(var s in t.items){if("$ref"===s&&!/^http/.test(t.items[s])){var o=t.items.$ref.split("/").slice(-1)[0];t.items=r.definitions[o]}e(r,t.items)}return t},o=function(e,r,t,i){void 0===i&&(i={});var a=[];if(void 0!==e.paths[r][t].parameters)for(var n in e.paths[r][t].parameters){var s=e.paths[r][t].parameters[n];"string"!=typeof s.$ref||/^http/.test(s.$ref)||(s=u(e,s.$ref)),void 0!==s.in&&"query"===s.in.toLowerCase()&&a.push({name:s.name,value:void 0===i[s.name]?void 0===s.default?e.openapi?"<SOME_"+s.schema.type.toUpperCase()+"_VALUE>":"<SOME_"+s.type.toUpperCase()+"_VALUE>":s.default+"":i[s.name]+""})}return a},p=function(e,r,t){var i,a,n,s=[],o=e.paths[r][t];if(void 0!==o.consumes)for(var p in o.consumes){var u=o.consumes[p];s.push({name:"accept",value:u})}if(void 0!==o.produces)for(var f in o.produces){var c=o.produces[f];s.push({name:"content-type",value:c})}if(void 0!==o.parameters)for(var v in o.parameters){var h=o.parameters[v];if(void 0!==h.in&&"header"===h.in.toLowerCase()){var l=e.openapi?h.schema.type:h.type;s.push({name:h.name,value:"<SOME_"+l.toUpperCase()+"_VALUE>"})}}var m=e.securityDefinitions||e.components&&e.components.securitySchemes,d=o.security||e.security;if(m&&d)for(var y in d){var b=Object.keys(d[y])[0],E=m[b];if(E&&E.type)switch(E.type.toLowerCase()){case"basic":i=b;break;case"apikey":"query"===E.in&&(a=b);break;case"oauth2":n=b}}return i?s.push({name:"Authorization",value:"Basic <USERNAME:PASSWORD>"}):a?s.push({name:m[a].name,value:"REPLACE_KEY_VALUE"}):n&&s.push({name:"Authorization",value:"Bearer <BEARER_TOKEN>"}),s},u=function(e,r){var t=r.split("/");if(t.length<=1)return{};return function e(r,i){if(i+1<t.length){var a=i+1;return e(r[t[i]],a)}return r[t[i]]}(e,1)};e.swagger2har=function(e,r){try{var t=r||function(e){var r="";return e.openapi?e.servers[0].url:(void 0!==e.schemes?r+=e.schemes[0]:r+="http","/"===e.basePath?r+="://"+e.host:r+="://"+e.host+e.basePath,r)}(e),i=[];return Object.keys(e.paths).forEach(function(r){Object.keys(e.paths[r]).forEach(function(n){var s=t+r,o=a(e,r,n,t);i.push({path:r,method:n.toUpperCase(),url:s,description:e.paths[r][n].description||"No description available",har:o})})}),i}catch(e){return console.error(e),null}},e.createHar=a,Object.defineProperty(e,"__esModule",{value:!0})});
