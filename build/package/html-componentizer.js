!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),i=r(o);window.HtmlComponentizer=i.default},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(t,e,n){for(var r=!0;r;){var o=t,i=e,s=n;r=!1,null===o&&(o=Function.prototype);var a=Object.getOwnPropertyDescriptor(o,i);if(void 0!==a){if("value"in a)return a.value;var p=a.get;if(void 0===p)return;return p.call(s)}var u=Object.getPrototypeOf(o);if(null===u)return;t=u,e=i,n=s,r=!0,a=u=void 0}},s=function(t){function e(t){n(this,e),i(Object.getPrototypeOf(e.prototype),"constructor",this).call(this,t),this.handleRenderChild=this.renderChild.bind(this),this.state={htmlChildren:null},this.TagName=this.props.tag||"span"}return r(e,t),o(e,[{key:"componentDidMount",value:function(){this.process(this.props.content)}},{key:"componentDidUpdate",value:function(t,e){t.content!==this.props.content&&this.process(this.props.content)}},{key:"generateMatches",value:function(t){var e=this.props.component,n=[];if("function"==typeof e&&"string"==typeof t&&t.length&&this.props.match instanceof RegExp){var r=t.split(""),o=t.match(this.props.match);if(o){for(var i=0;i<o.length;i++){var s=o[i],a=r.join(""),p=r.splice(0,a.indexOf(s)).join("");n.push({props:{dangerouslySetInnerHTML:{__html:p}},tag:"span"}),n.push({props:{matchIndex:i,value:s},spread:["componentProps"],tag:e}),r.splice(0,s.length)}if(r.length){var p=r.join("");n.push({props:{dangerouslySetInnerHTML:{__html:p}},tag:"span"})}}else n.push({props:{dangerouslySetInnerHTML:{__html:t}},tag:"span"})}return n}},{key:"process",value:function(t){var n=this;"string"==typeof t&&t.length&&!function(){var r=[];/<(.*?)([^/])>/.test(t)?!function(){for(var n=t.split(""),o="",i=function(){for(var t="";" "!==n[0]&&">"!==n[0]&&"/"!==n[0]&&n.length;)t+=n.shift();return s(),t},s=function(){for(;">"!==n[0]&&n.length;)n.shift();">"===n[0]&&n.shift()},a=function(){o.length&&(r.push({props:{content:o,tag:"span"},spread:[""],tag:e}),o="")},p=function(t){return n.slice(0,t.length).join("")===t},u=function(){var t=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","video","vr","wbr"];return!t.find(function(t){return p("<"+t)})};n.length;)if("<"===n[0]&&u()){n.shift(),a();for(var l=i(),c="",f=1,h=!0;h&&n.length;)if("<"===n[0]&&u()){n.shift();var d="/"===n[0];d&&n.shift();var g=i();g===l&&(d?(f--,f<=0&&(h=!1)):f++),h&&(c+="<"+(d?"/":"")+g+">")}else c+=n.shift();r.push({props:{content:c,tag:l},spread:[""],tag:e})}else o+=n.shift();a()}():r=n.generateMatches(t),n.setState({htmlChildren:r})}()}},{key:"renderChild",value:function(t,e){var n=t.tag,r={};if(t.spread&&t.spread.length)for(var o=0;o<t.spread.length;o++){var i=t.spread[o];""===i?r=Object.assign(r,this.props):this.props[i]&&"object"==typeof this.props[i]&&(r=Object.assign(r,this.props[i]))}return t.props&&(r=Object.assign(r,t.props)),React.createElement(n,r)}},{key:"render",value:function(){return React.createElement(this.TagName,null,this.state.htmlChildren?this.state.htmlChildren.map(this.handleRenderChild):null)}}]),e}(React.Component);e.default=s,t.exports=e.default}]);
//# sourceMappingURL=html-componentizer.js.map