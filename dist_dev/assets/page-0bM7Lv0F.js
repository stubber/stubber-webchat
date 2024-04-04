const ee=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;var y=Array.isArray||function(e){return Object.prototype.toString.call(e)=="[object Array]"},v=A,q=E,F=z,G=C,K=O,V=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function E(e){for(var t=[],n=0,r=0,i="",a;(a=V.exec(e))!=null;){var o=a[0],s=a[1],h=a.index;if(i+=e.slice(r,h),r=h+o.length,s){i+=s[1];continue}i&&(t.push(i),i="");var c=a[2],f=a[3],S=a[4],$=a[5],m=a[6],H=a[7],j=m==="+"||m==="*",B=m==="?"||m==="*",U=c||"/",N=S||$||(H?".*":"[^"+U+"]+?");t.push({name:f||n++,prefix:c||"",delimiter:U,optional:B,repeat:j,pattern:D(N)})}return r<e.length&&(i+=e.substr(r)),i&&t.push(i),t}function z(e){return C(E(e))}function C(e){for(var t=new Array(e.length),n=0;n<e.length;n++)typeof e[n]=="object"&&(t[n]=new RegExp("^"+e[n].pattern+"$"));return function(r){for(var i="",a=r||{},o=0;o<e.length;o++){var s=e[o];if(typeof s=="string"){i+=s;continue}var h=a[s.name],c;if(h==null){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to be defined')}if(y(h)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but received "'+h+'"');if(h.length===0){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var f=0;f<h.length;f++){if(c=encodeURIComponent(h[f]),!t[o].test(c))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'", but received "'+c+'"');i+=(f===0?s.prefix:s.delimiter)+c}continue}if(c=encodeURIComponent(h),!t[o].test(c))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but received "'+c+'"');i+=s.prefix+c}return i}}function L(e){return e.replace(/([.+*?=^!:${}()[\]|\/])/g,"\\$1")}function D(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function R(e,t){return e.keys=t,e}function P(e){return e.sensitive?"":"i"}function W(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return R(e,t)}function Z(e,t,n){for(var r=[],i=0;i<e.length;i++)r.push(A(e[i],t,n).source);var a=new RegExp("(?:"+r.join("|")+")",P(n));return R(a,t)}function X(e,t,n){for(var r=E(e),i=O(r,n),a=0;a<r.length;a++)typeof r[a]!="string"&&t.push(r[a]);return R(i,t)}function O(e,t){t=t||{};for(var n=t.strict,r=t.end!==!1,i="",a=e[e.length-1],o=typeof a=="string"&&/\/$/.test(a),s=0;s<e.length;s++){var h=e[s];if(typeof h=="string")i+=L(h);else{var c=L(h.prefix),f=h.pattern;h.repeat&&(f+="(?:"+c+f+")*"),h.optional?c?f="(?:"+c+"("+f+"))?":f="("+f+")?":f=c+"("+f+")",i+=f}}return n||(i=(o?i.slice(0,-2):i)+"(?:\\/(?=$))?"),r?i+="$":i+=n&&o?"":"(?=\\/|$)",new RegExp("^"+i,P(t))}function A(e,t,n){return t=t||[],y(t)?n||(n={}):(n=t,t=[]),e instanceof RegExp?W(e,t):y(e)?Z(e,t,n):X(e,t,n)}v.parse=q;v.compile=F;v.tokensToFunction=G;v.tokensToRegExp=K;var d=typeof document<"u",l=typeof window<"u",_=typeof history<"u",k=typeof process<"u",x=d&&document.ontouchstart?"touchstart":"click",u=l&&!!(window.history.location||window.location);function p(){this.callbacks=[],this.exits=[],this.current="",this.len=0,this._decodeURLComponents=!0,this._base="",this._strict=!1,this._running=!1,this._hashbang=!1,this.clickHandler=this.clickHandler.bind(this),this._onpopstate=this._onpopstate.bind(this)}p.prototype.configure=function(e){var t=e||{};this._window=t.window||l&&window,this._decodeURLComponents=t.decodeURLComponents!==!1,this._popstate=t.popstate!==!1&&l,this._click=t.click!==!1&&d,this._hashbang=!!t.hashbang;var n=this._window;this._popstate?n.addEventListener("popstate",this._onpopstate,!1):l&&n.removeEventListener("popstate",this._onpopstate,!1),this._click?n.document.addEventListener(x,this.clickHandler,!1):d&&n.document.removeEventListener(x,this.clickHandler,!1),this._hashbang&&l&&!_?n.addEventListener("hashchange",this._onpopstate,!1):l&&n.removeEventListener("hashchange",this._onpopstate,!1)};p.prototype.base=function(e){if(arguments.length===0)return this._base;this._base=e};p.prototype._getBase=function(){var e=this._base;if(e)return e;var t=l&&this._window&&this._window.location;return l&&this._hashbang&&t&&t.protocol==="file:"&&(e=t.pathname),e};p.prototype.strict=function(e){if(arguments.length===0)return this._strict;this._strict=e};p.prototype.start=function(e){var t=e||{};if(this.configure(t),t.dispatch!==!1){this._running=!0;var n;if(u){var r=this._window,i=r.location;this._hashbang&&~i.hash.indexOf("#!")?n=i.hash.substr(2)+i.search:this._hashbang?n=i.search+i.hash:n=i.pathname+i.search+i.hash}this.replace(n,null,!0,t.dispatch)}};p.prototype.stop=function(){if(this._running){this.current="",this.len=0,this._running=!1;var e=this._window;this._click&&e.document.removeEventListener(x,this.clickHandler,!1),l&&e.removeEventListener("popstate",this._onpopstate,!1),l&&e.removeEventListener("hashchange",this._onpopstate,!1)}};p.prototype.show=function(e,t,n,r){var i=new g(e,t,this),a=this.prevContext;return this.prevContext=i,this.current=i.path,n!==!1&&this.dispatch(i,a),i.handled!==!1&&r!==!1&&i.pushState(),i};p.prototype.back=function(e,t){var n=this;if(this.len>0){var r=this._window;_&&r.history.back(),this.len--}else setTimeout(e?function(){n.show(e,t)}:function(){n.show(n._getBase(),t)})};p.prototype.redirect=function(e,t){var n=this;typeof e=="string"&&typeof t=="string"&&b.call(this,e,function(r){setTimeout(function(){n.replace(t)},0)}),typeof e=="string"&&typeof t>"u"&&setTimeout(function(){n.replace(e)},0)};p.prototype.replace=function(e,t,n,r){var i=new g(e,t,this),a=this.prevContext;return this.prevContext=i,this.current=i.path,i.init=n,i.save(),r!==!1&&this.dispatch(i,a),i};p.prototype.dispatch=function(e,t){var n=0,r=0,i=this;function a(){var s=i.exits[r++];if(!s)return o();s(t,a)}function o(){var s=i.callbacks[n++];if(e.path!==i.current){e.handled=!1;return}if(!s)return J.call(i,e);s(e,o)}t?a():o()};p.prototype.exit=function(e,t){if(typeof e=="function")return this.exit("*",e);for(var n=new w(e,null,this),r=1;r<arguments.length;++r)this.exits.push(n.middleware(arguments[r]))};p.prototype.clickHandler=function(e){if(this._which(e)===1&&!(e.metaKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented){var t=e.target,n=e.path||(e.composedPath?e.composedPath():null);if(n){for(var r=0;r<n.length;r++)if(n[r].nodeName&&n[r].nodeName.toUpperCase()==="A"&&n[r].href){t=n[r];break}}for(;t&&t.nodeName.toUpperCase()!=="A";)t=t.parentNode;if(!(!t||t.nodeName.toUpperCase()!=="A")){var i=typeof t.href=="object"&&t.href.constructor.name==="SVGAnimatedString";if(!(t.hasAttribute("download")||t.getAttribute("rel")==="external")){var a=t.getAttribute("href");if(!(!this._hashbang&&this._samePath(t)&&(t.hash||a==="#"))&&!(a&&a.indexOf("mailto:")>-1)&&!(i?t.target.baseVal:t.target)&&!(!i&&!this.sameOrigin(t.href))){var o=i?t.href.baseVal:t.pathname+t.search+(t.hash||"");o=o[0]!=="/"?"/"+o:o,k&&o.match(/^\/[a-zA-Z]:\//)&&(o=o.replace(/^\/[a-zA-Z]:\//,"/"));var s=o,h=this._getBase();o.indexOf(h)===0&&(o=o.substr(h.length)),this._hashbang&&(o=o.replace("#!","")),!(h&&s===o&&(!u||this._window.location.protocol!=="file:"))&&(e.preventDefault(),this.show(s))}}}}};p.prototype._onpopstate=function(){var e=!1;return l?(d&&document.readyState==="complete"?e=!0:window.addEventListener("load",function(){setTimeout(function(){e=!0},0)}),function(n){if(e){var r=this;if(n.state){var i=n.state.path;r.replace(i,n.state)}else if(u){var a=r._window.location;r.show(a.pathname+a.search+a.hash,void 0,void 0,!1)}}}):function(){}}();p.prototype._which=function(e){return e=e||l&&this._window.event,e.which==null?e.button:e.which};p.prototype._toURL=function(e){var t=this._window;if(typeof URL=="function"&&u)return new URL(e,t.location.toString());if(d){var n=t.document.createElement("a");return n.href=e,n}};p.prototype.sameOrigin=function(e){if(!e||!u)return!1;var t=this._toURL(e),n=this._window,r=n.location;return r.protocol===t.protocol&&r.hostname===t.hostname&&(r.port===t.port||r.port===""&&(t.port==80||t.port==443))};p.prototype._samePath=function(e){if(!u)return!1;var t=this._window,n=t.location;return e.pathname===n.pathname&&e.search===n.search};p.prototype._decodeURLEncodedURIComponent=function(e){return typeof e!="string"?e:this._decodeURLComponents?decodeURIComponent(e.replace(/\+/g," ")):e};function I(){var e=new p;function t(){return b.apply(e,arguments)}return t.callbacks=e.callbacks,t.exits=e.exits,t.base=e.base.bind(e),t.strict=e.strict.bind(e),t.start=e.start.bind(e),t.stop=e.stop.bind(e),t.show=e.show.bind(e),t.back=e.back.bind(e),t.redirect=e.redirect.bind(e),t.replace=e.replace.bind(e),t.dispatch=e.dispatch.bind(e),t.exit=e.exit.bind(e),t.configure=e.configure.bind(e),t.sameOrigin=e.sameOrigin.bind(e),t.clickHandler=e.clickHandler.bind(e),t.create=I,Object.defineProperty(t,"len",{get:function(){return e.len},set:function(n){e.len=n}}),Object.defineProperty(t,"current",{get:function(){return e.current},set:function(n){e.current=n}}),t.Context=g,t.Route=w,t}function b(e,t){if(typeof e=="function")return b.call(this,"*",e);if(typeof t=="function")for(var n=new w(e,null,this),r=1;r<arguments.length;++r)this.callbacks.push(n.middleware(arguments[r]));else typeof e=="string"?this[typeof t=="string"?"redirect":"show"](e,t):this.start(e)}function J(e){if(!e.handled){var t,n=this,r=n._window;n._hashbang?t=u&&this._getBase()+r.location.hash.replace("#!",""):t=u&&r.location.pathname+r.location.search,t!==e.canonicalPath&&(n.stop(),e.handled=!1,u&&(r.location.href=e.canonicalPath))}}function M(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function g(e,t,n){var r=this.page=n||b,i=r._window,a=r._hashbang,o=r._getBase();e[0]==="/"&&e.indexOf(o)!==0&&(e=o+(a?"#!":"")+e);var s=e.indexOf("?");this.canonicalPath=e;var h=new RegExp("^"+M(o));if(this.path=e.replace(h,"")||"/",a&&(this.path=this.path.replace("#!","")||"/"),this.title=d&&i.document.title,this.state=t||{},this.state.path=e,this.querystring=~s?r._decodeURLEncodedURIComponent(e.slice(s+1)):"",this.pathname=r._decodeURLEncodedURIComponent(~s?e.slice(0,s):e),this.params={},this.hash="",!a){if(!~this.path.indexOf("#"))return;var c=this.path.split("#");this.path=this.pathname=c[0],this.hash=r._decodeURLEncodedURIComponent(c[1])||"",this.querystring=this.querystring.split("#")[0]}}g.prototype.pushState=function(){var e=this.page,t=e._window,n=e._hashbang;e.len++,_&&t.history.pushState(this.state,this.title,n&&this.path!=="/"?"#!"+this.path:this.canonicalPath)};g.prototype.save=function(){var e=this.page;_&&e._window.history.replaceState(this.state,this.title,e._hashbang&&this.path!=="/"?"#!"+this.path:this.canonicalPath)};function w(e,t,n){var r=this.page=n||T,i=t||{};i.strict=i.strict||r._strict,this.path=e==="*"?"(.*)":e,this.method="GET",this.regexp=v(this.path,this.keys=[],i)}w.prototype.middleware=function(e){var t=this;return function(n,r){if(t.match(n.path,n.params))return n.routePath=t.path,e(n,r);r()}};w.prototype.match=function(e,t){var n=this.keys,r=e.indexOf("?"),i=~r?e.slice(0,r):e,a=this.regexp.exec(decodeURIComponent(i));if(!a)return!1;delete t[0];for(var o=1,s=a.length;o<s;++o){var h=n[o-1],c=this.page._decodeURLEncodedURIComponent(a[o]);(c!==void 0||!hasOwnProperty.call(t,h.name))&&(t[h.name]=c)}return!0};var T=I(),Q=T,Y=T;Q.default=Y;export{ee as g,Q as p};