var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){var e=void 0,f=window,i="push",j="replace",k="length";var l=f,q=document,r=l.location,v=function(){},w=/\[native code\]/,x=function(a,b,d){return a[b]=a[b]||d},y=function(a){for(var b=0;b<this[k];b++)if(this[b]===a)return b;return-1},z=function(){var a;if((a=Object.create)&&w.test(a))a=a(null);else{a={};for(var b in a)a[b]=e}return a},A=x(l,"gapi",{});var B;B=x(l,"___jsl",z());x(B,"I",0);x(B,"hel",10);var C=function(){var a=r.href,b;if(B.dpo)b=B.h;else{b=B.h;var d=RegExp("([#].*&|[#])jsh=([^&#]*)","g"),g=RegExp("([?#].*&|[?#])jsh=([^&#]*)","g");if(a=a&&(d.exec(a)||g.exec(a)))try{b=decodeURIComponent(a[2])}catch(c){}}return b},D=function(a){return x(x(B,"H",z()),a,z())};var J=x(B,"perf",z()),K=x(J,"g",z());x(J,"i",z());var L=x(J,"r",[]);z();z();var M=function(a,b){K[a]=b||(new Date).getTime();"function"===typeof L?L(a,e,e):L[i]([a,e,e])};var N=z(),O=[],S;S={a:"callback",f:"sync",b:"config",c:"_c",d:"h",i:"platform",g:"jsl",TIMEOUT:"timeout",e:"ontimeout"};O[i]([S.g,function(a){for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var d=a[b];"object"==typeof d?B[b]=x(B,b,[]).concat(d):x(B,b,d)}if(a=a.u)b=x(B,"us",[]),b[i](a),(d=/^https:(.*)$/.exec(a))&&b[i]("http:"+d[1]),x(B,"u",a)}]);var U=decodeURI("%73cript");N.m=function(a){var b=B.ms||"https://apis.google.com",a=a[0],d;if(!(d=!a))d=0<=a.indexOf("..");if(d)throw"Bad hint";return b+"/"+a[j](/^\//,"")};
var V=function(a){return a.join(",")[j](/\./g,"_")[j](/-/g,"_")},W=function(a,b){for(var d=[],g=0;g<a[k];++g){var c=a[g];c&&0>y.call(b,c)&&d[i](c)}return d},X=/[@"'<>#\?&%]/,aa=/^https?:\/\/[^\/\?#]+\.google\.com(:\d+)?\/[^\?#]+$/,ba=/\/cb=/g,Y=function(a){var b=q.createElement(U);b.setAttribute("src",a);b.async="true";a=q.getElementsByTagName(U)[0];a.parentNode.insertBefore(b,a)},$=function(a,b){var d=b||{};"function"==typeof b&&(d={},d[S.a]=b);var g=d,c=g&&g[S.c];if(c)for(var h=0;h<O[k];h++){var m=
O[h][0],s=O[h][1];s&&Object.prototype.hasOwnProperty.call(c,m)&&s(c[m],a,g)}if(!(g=d[S.d]))if(g=C(),!g)throw"Bad hint";var t=g,P=d[S.a],E=d[S.b],c=d[S.TIMEOUT],F=d[S.e],Q=null,R=!1;if(c&&!F||!c&&F)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var g=x(D(t),"r",[]).sort(),G=x(D(t),"L",[]).sort(),T=function(a){if(R)return 0;l.clearTimeout(Q);G[i].apply(G,u);var b=((A||{}).config||{}).update;b?b(E):E&&x(B,"cu",[])[i](E);a&&Z(function(){var b;b=t===C()?x(A,"_",z()):
z();b=x(D(t),"_",b);a(b)});P&&P();return 1};0<c&&(Q=l.setTimeout(function(){R=!0;F()},c));if(a){c=a.split(":").sort();h=[];m=e;for(s=0;s<c[k];s++){var H=c[s];H!=m&&h[i](H);m=H}c=h}else c=[];var u=W(c,G);if(!u[k])return T();var u=W(c,g),n=x(B,"CP",[]),p=n[k];n[p]=function(a){if(!a)return 0;var b=function(){n[p]=null;return T(a)};if(0<p&&n[p-1])n[p]=b;else for(b();(b=n[++p])&&b(););};if(!u[k])return n[p](v);var I="loaded_"+B.I++;A[I]=function(a){n[p](a);A[I]=null};c=t.split(";");c=(h=N[c.shift()])&&
h(c);if(!c)throw"Bad hint:"+t;h=c=c[j]("__features__",V(u))[j](/\/$/,"")+(g[k]?"/ed=1/exm="+V(g):"")+("/cb=gapi."+I);m=h.match(ba);if(!m||!(1===m[k]&&aa.test(h)&&!X.test(h)))throw"Bad URL "+c;g[i].apply(g,u);d[S.f]||l.___gapisync?(d=c,"loading"!=q.readyState?Y(d):q.write("<"+U+' src="'+encodeURI(d)+'"></'+U+">")):Y(c)};var Z=function(a){if(B.hee&&0<B.hel)try{return a()}catch(b){B.hel--,$("debug_error",function(){f.___jsl.hefn(b)})}else return a()};A.load=function(a,b){return Z(function(){return $(a,b)})};M("bs0",f.gapi._bs);M("bs1");delete f.gapi._bs;})();
gapi.load("client",{callback:window["gapi_onload"],_c:{"jsl":{"u":"https://apis.google.com/js/client.js","dpo":false,"hee":true,"ci":{"services":{},"inline":{"css":1},"lexps":[34,69,71,65,36,76,40,74,15,45,17,51,61,60,30],"oauth-flow":{},"report":{},"iframes":{"additnow":{"url":"https://apis.google.com/additnow/additnow.html?bsv=pr"},"plus":{"methods":["onauth"],"url":":socialhost:/u/:session_index:/_/pages/badge?bsv=pr"},":socialhost:":"https://plusone.google.com","plus_connect":{"params":{"redirectUri":"","clientId":""},"url":":socialhost:/:session_prefix:_/widget/render/plus?bsv=pr"},"plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/plus/circle?bsv=pr"},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?bsv=pr"},":signuphost:":"https://plus.google.com","plusone":{"preloadUrl":["https://ssl.gstatic.com/s2/oz/images/stars/po/Publisher/sprite4-a67f741843ffc4220554c34bd01bb0bb.png"],"params":{"count":"","url":"","size":""},"url":":socialhost:/:session_prefix:_/+1/fastbutton?bsv=pr"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/+1/sharebutton?plusShare=true&bsv=pr"}},"isPlusUser":true,"debug":{"host":"https://plusone.google.com","reportExceptionRate":0.05,"rethrowException":true},"csi":{"rate":0},"googleapis.config":{"mobilesignupurl":"https://m.google.com/app/plus/oob?"}},"h":"m;/_/apps-static/_/js/gapi/__features__/rt=j/ver=GIFMQ5wkzqo.es_419./sv=1/am=!qJoTPiXYHR-YY0x1eg/d=1/rs=AItRSTNvY8uPyGCgAlCiUbesxvnWSMdz4g","fp":"714b54eeb921cb3e2963a9c016500f8621d9ce7e"},"fp":"714b54eeb921cb3e2963a9c016500f8621d9ce7e"}});