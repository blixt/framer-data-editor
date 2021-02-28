var e,t,n,r,a,o,s=Object.prototype.hasOwnProperty,l=Object.getOwnPropertySymbols,i=Object.prototype.propertyIsEnumerable,c=Object.assign,u=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},p=(e,t,n)=>(u(e,t,"read from private field"),n?n.call(e):t.get(e)),m=(e,t,n,r)=>(u(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n);import{r as d,F as h,A as f,f as E,a as v}from"./vendor.58770692.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const r=new URL(e,location),a=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,o)=>{const s=new URL(e,r);if(self[t].moduleMap[s])return n(self[t].moduleMap[s]);const l=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){o(new Error(`Failed to import: ${e}`)),a(i)},onload(){n(self[t].moduleMap[s]),a(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("assets/");var b="_app_ehc26_1",_="_preview_ehc26_9",y="_column_ehc26_23",w="_config_ehc26_30",g="_helper_ehc26_43";let k;const C={};function $(e){if(!e.__FramerMetadata__)return[];const t=[];return Object.entries(e.__FramerMetadata__.exports).forEach((([n,r])=>{if(console.log(n,r),"reactComponent"!==r.type)return;const a=function(e){const t=e.framerVariables||e.framervariables;if(!t)return[];const n=[],r=JSON.parse(t);for(const a in r){const e=r[a];"string"==typeof e&&n.push(e)}return n}(r.annotations),o=e[n];t.push({component:o,exportSpecifier:n,variableProps:a})})),t}var S="_button_5fumm_1",x="_primary_5fumm_20";function M({disabled:e,text:t="Click Me",primary:n=!1,onClick:r}){return d.createElement("div",{className:S+(n&&" "+x),onClick:e?void 0:r},t)}var N="_hStack_z4htb_1",O="_vStack_z4htb_1";function P({children:e,className:t}){return d.createElement("div",{className:N+(t?" "+t:"")},e)}function j({children:e,className:t}){return d.createElement("div",{className:O+(t?" "+t:"")},e)}function R({onComponent:e}){const[t,n]=d.useState(""),[r,a]=d.useState(!1),o=d.useCallback((e=>n(e.target.value)),[]),s=d.useCallback((()=>{a(!0),function(e,t){if(!t)return e();if(void 0===k){const e=document.createElement("link").relList;k=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in C)return;C[e]=!0;const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${n}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":k,t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t?new Promise(((e,t)=>{r.addEventListener("load",e),r.addEventListener("error",t)})):void 0}))).then((()=>e()))}((()=>__import__(t)),void 0).then((n=>{const r=$(n);if(0===r.length)throw Error("Module did not contain any components");e(c(c({},r[0]),{importURL:t}))})).catch((e=>{console.warn(e),a(!1)}))}),[e,t]),l=d.useCallback((e=>{"Enter"!==e.key&&"Return"!==e.key||s()}),[s]);return d.createElement(P,null,d.createElement("input",{disabled:r,onChange:o,onDoubleClick:()=>n("https://framer.com/m/News-Article-j4Jp.js"),onKeyDown:l,placeholder:"https://…",value:t}),d.createElement(M,{disabled:r,onClick:s,primary:!0,text:"Go"}))}!function(){const e=window;e.React=d,e.Framer=h}();var D="_componentWrapper_1rfla_1";function F({Component:e,props:t}){const n=e.defaultProps&&e.defaultProps.width?e.defaultProps.width:300,r=e.defaultProps&&e.defaultProps.height?e.defaultProps.height:200,a=(t&&t.length>0?t:[{}]).map(((t,a)=>d.createElement(f,{key:a},d.createElement(e,c({width:n,height:r},t))))),o=r*a.length+10*(a.length-1);return d.createElement("div",{className:D,style:{width:n,height:o}},d.createElement(E.Stack,{direction:"vertical",gap:10,width:n,height:o},a))}var L="_field_1phht_1";function A({children:e,label:t}){return d.createElement(P,{className:L},d.createElement("strong",null,t),e)}var U="_subtitle_bjcf1_1";function J({children:e}){return d.createElement("div",{className:U},e)}var W="_title_4i1en_1";function I({children:e}){return d.createElement("div",{className:W},e)}function B({onDataSource:e}){const[t,n]=d.useState(""),[r,a]=d.useState("root"),o=d.useCallback((e=>{n(e.target.value)}),[]),[s,l]=d.useState(null);d.useEffect((()=>{try{if("https:"!==new URL(t).protocol)return}catch(n){return}let e=!0;return fetch(t).then((e=>e.json())).then((t=>{e&&l(t)})).catch((t=>{e&&(console.warn("Could not get data:",t),l(null))})),()=>{e=!1}}),[t]);const i=d.useMemo((()=>{if(!s)return null;try{const e=new Function("root",`return ${r}`)(s);return Array.isArray(e)?e:(console.warn("Value is not array:",e),null)}catch(e){return console.warn("Could not extract value:",e.message),null}}),[s,r]),c=d.useRef(e);c.current=e,d.useEffect((()=>{var e;null==(e=c.current)||e.call(c,i?{url:t,expression:r,root:i}:null)}),[i]);const u=d.useCallback((e=>{a(e.target.value)}),[]);return d.createElement(j,null,d.createElement(I,null,"Find some data"),d.createElement(A,{label:"JSON URL"},d.createElement("input",{placeholder:"https://…",onChange:o,onDoubleClick:()=>n("https://www.spaceflightnewsapi.net/api/v2/articles"),value:t})),d.createElement(A,{label:"Expression"},d.createElement("input",{placeholder:"root.someArray",onChange:u,value:r})),d.createElement(J,null,"Pick an array value in the ",d.createElement("code",null,"root")," variable."))}function V({onChange:e,name:t}){const[n,r]=d.useState(""),a=d.useCallback((e=>{r(e.target.value)}),[]),o=`item.${t}`,s=d.useCallback((()=>{r((e=>e||o))}),[o]),l=d.useRef(e);return l.current=e,d.useEffect((()=>{var e;null==(e=l.current)||e.call(l,n)}),[n]),d.createElement(A,{label:t},d.createElement("input",{onChange:a,onDoubleClick:s,placeholder:o,value:n}))}function z({onPropChange:e,variableProps:t}){const n=d.useMemo((()=>t?t.map((t=>d.createElement(V,{key:t,onChange:n=>{e({name:t,expression:n})},name:t}))):null),[e,t]);return n?d.createElement(j,null,d.createElement(I,null,"Hook up the data"),n):d.createElement(j,null,d.createElement(I,null,"Pick a component"),d.createElement(J,null,"First, pick a component with property controls."))}class H extends d.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(){}render(){return this.state.hasError?d.createElement("b",null,"Something went wrong."):this.props.children}}class T{constructor(){e.set(this,void 0),t.set(this,void 0),m(this,e,[]),m(this,t,['import * as React from "react";'])}addExport(t,n){p(this,e).push({exportable:t,alias:n})}addImport(e,n,r){if(!r){if("default"===e)throw Error("Alias must be specified for default imports");r=e}const a="default"===e?r:r===e?`{ ${e} }`:`{ ${e} as ${r} }`;p(this,t).push(`import ${a} from ${JSON.stringify(n)};`)}build(){return[...p(this,t),"",...this.buildExports()].join("\n")}buildExports(){return[p(this,e).map((({exportable:e,alias:t})=>e.build(t))).join("\n\n")]}}e=new WeakMap,t=new WeakMap;class q{constructor(e,t){n.set(this,void 0),r.set(this,void 0),a.set(this,void 0),o.set(this,void 0),m(this,n,""),m(this,a,[]),m(this,o,e),m(this,r,t)}addAnnotation(e,t){p(this,a).push(`@${e} ${t}`)}build(e){return[...this.buildJSDoc(),`${e?"function":"export function"} ${p(this,o)}() {`,...this.buildBody(),"}",...this.buildDisplayName(),...this.buildExportAlias(e)].join("\n")}setBody(e){m(this,n,e.trim())}buildBody(){return p(this,n)?p(this,n).split("\n").map((e=>`  ${e}`)):[]}buildDisplayName(){return p(this,r)?["",`${p(this,o)}.displayName = ${JSON.stringify(p(this,r))};`]:[]}buildExportAlias(e){return e?e===p(this,o)?["",`export ${p(this,o)};`]:"default"===e?["",`export default ${p(this,o)};`]:["",`export { ${p(this,o)} as ${e} };`]:[]}buildJSDoc(){return 0===p(this,a).length?[]:["/**",...p(this,a).map((e=>` * ${e}`))," */"]}}function G(){const[e,t]=d.useState(null),[n,r]=d.useState(null),[a,o]=d.useState({}),u=d.useCallback((({name:e,expression:t})=>{if(t)try{const n=new Function("item",`return ${t}`);o((r=>c(c({},r),{[e]:{expression:t,extractFn:n}})))}catch(n){console.warn(`Could not use item expression "${t}":`,n.message)}else o((t=>{const{[e]:n}=t;var r;return((e,t)=>{var n={};for(var r in e)s.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&l)for(var r of l(e))t.indexOf(r)<0&&i.call(e,r)&&(n[r]=e[r]);return n})(t,[(r=e,"symbol"==typeof r?r:r+"")])}))}),[]),p=d.useMemo((()=>{if(null==n?void 0:n.root)return n.root.map((e=>{const t={};for(const r in a)try{t[r]=a[r].extractFn(e)}catch(n){console.warn(`Failed to extract item props for ${r}:`,n.message)}return t}))}),[a,n]),m=d.useMemo((()=>e&&n?function(e,t,n){const r=new T;r.addImport("Stack","framer");const a=new q("DataComponent","My Data Component");a.addAnnotation("framerIntrinsicWidth",200),a.addAnnotation("framerIntrinsicHeight",200),r.addExport(a,"default");const o="Component";r.addImport(e.exportSpecifier,e.importURL,o);const s=[o,"key={i}"];for(const i in n)s.push(`${i}={${n[i].expression}}`);const l=`<${s.join(" ")} />`;return a.setBody(`\nconst [data, setData] = React.useState([])\nReact.useEffect(() => {\n  let active = true;\n  fetch(${JSON.stringify(t.url)})\n    .then(r => r.json())\n    .then(root => {\n      if (!active) return\n      setData(${t.expression})\n    })\n  return () => {\n    active = false;\n  }\n}, [])\nconst instances = React.useMemo(() => data.map((item, i) => {\n  return ${l}\n}), [data])\nreturn (\n  <Stack gap={10} direction="vertical" width="100%" height="100%">{instances}</Stack>\n)\n`),r.build()}(e,n,a):""),[n,e,a]),h=d.useCallback((()=>{var e;m&&(null==(e=window.parent)||e.postMessage(JSON.stringify({type:"updateSource",source:m}),"*"))}),[m]);return d.createElement("div",{className:b},d.createElement("div",{className:`${_} ${g}`},d.createElement(H,null,e?d.createElement(F,{Component:e.component,props:p}):d.createElement(R,{onComponent:t}))),d.createElement("div",{className:y},d.createElement("div",{className:w},d.createElement(B,{onDataSource:r}),d.createElement(z,{variableProps:null==e?void 0:e.variableProps,onPropChange:u})),d.createElement(M,{onClick:h,primary:!0,text:"Save"})))}n=new WeakMap,r=new WeakMap,a=new WeakMap,o=new WeakMap;v.render(d.createElement(d.StrictMode,null,d.createElement(G,null)),document.getElementById("root"));
