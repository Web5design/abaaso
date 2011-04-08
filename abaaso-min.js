var abaaso=function(){var array={contains:function(instance,arg){try{if(!instance instanceof Array){throw new Error(label.error.expectedArray)}arg=(arg.toString().indexOf(",")>-1)?arg.split(","):arg;if(arg instanceof Array){var indexes=[],loop=args.length,i=null;for(i=0;i<loop;i++){indexes[i]=instance.index(arg[i])}return indexes}return instance.index(arg)}catch(e){error(e);return undefined}},diff:function(array1,array2){try{if((!array1 instanceof Array)&&(!array2 instanceof Array)){throw new Error(label.error.expectedArray)}return array1.filter(function(key){return(array2.indexOf(key)<0)})}catch(e){error(e);return undefined}},first:function(instance){try{if(!instance instanceof Array){throw new Error(label.error.expectedArray)}return instance[0]}catch(e){error(e);return undefined}},index:function(instance,arg){try{if(!instance instanceof Array){throw new Error(label.error.expectedArray)}var i=instance.length;while(i--){if(instance[i]==arg){return i}}return -1}catch(e){error(e);return -1}},indexed:function(instance){try{if(!instance instanceof Array){throw new Error(label.error.expectedArray)}var o,i=0,indexed=[];for(o in instance){if(typeof(instance[o])!="function"){indexed[i]=(instance[o] instanceof Array)?instance[o].indexed():instance[o];i++}}indexed.length=i;return indexed}catch(e){error(e);return undefined}},keys:function(instance){try{if(!instance instanceof Array){throw new Error(label.error.expectedArray)}var keys=[],i=null;for(i in instance){(typeof(instance[i])!="function")?keys.push(i):void (0)}return keys}catch(e){error(e);return undefined}},last:function(instance){try{if(!instance instanceof Array){throw new Error(label.error.expectedArray)}return(instance.length>1)?instance[(instance.length-1)]:instance[0]}catch(e){error(e);return undefined}},remove:function(instance,start,end){try{if(!instance instanceof Array){throw new Error(label.error.expectedArray)}var remaining;start=start||0;instance.fire("beforeRemove");remaining=instance.slice((end||start)+1||instance.length);instance.length=(start<0)?(instance.length+start):start;instance.push.apply(obj,remaining);instance.fire("afterRemove");return instance}catch(e){error(e);return undefined}},total:function(instance){try{if(!instance instanceof Array){throw new Error(label.error.expectedArray)}var i=0,arg;for(arg in instance){(typeof(instance[arg])!="function")?i++:void (0)}return i}catch(e){error(e);return -1}}};var cache={items:[],clean:function(){for(var uri in cache.items){((typeof(cache.items[uri])!="function")&&(cache.expired(uri)===true))?cache.expire(uri):void (0)}return},expire:function(uri){(cache.items[uri]!==undefined)?delete cache.items[uri]:void (0);return},expired:function(uri){var result=((cache.items[uri]!==undefined)&&(((cache.items[uri].headers.Expires!==undefined)&&(new Date(cache.items[uri].headers.Expires)<new Date()))||((client.ms>0)&&(cache.items[uri].headers.Date!==undefined)&&(new Date(cache.items[uri].headers.Date).setMilliseconds(new Date(cache.items[uri].headers.Date).getMilliseconds()+client.ms)>new Date()))||((client.ms>0)&&(new Date(cache.items[uri].epoch).setMilliseconds(new Date(cache.items[uri].epoch).getMilliseconds()+client.ms)>new Date()))))?true:false;return result},get:function(uri,expire){try{expire=(expire===false)?false:true;if(cache.items[uri]===undefined){return false}else{if(cache.items[uri].headers!==undefined){if(((cache.items[uri].headers.Pragma!==undefined)&&(cache.items[uri].headers.Pragma=="no-cache")&&(expire))||(cache.expired(cache.items[uri]))){cache.expire(uri);return false}else{return cache.items[uri]}}else{return cache.items[uri]}}}catch(e){error(e);return undefined}},set:function(uri,property,value){try{(cache.items[uri]===undefined)?cache.items[uri]={}:void (0);cache.items[uri][property]=value}catch(e){error(e)}}};var client={css3:(function(){if((this.chrome)&&(parseInt(client.version)>=6)){return true}if((this.firefox)&&(parseInt(client.version)>=3)){return true}if((this.ie)&&(parseInt(client.version)>=9)){return true}if((this.opera)&&(parseInt(client.version>=9))){return true}if((this.safari)&&(parseInt(client.version>=5))){return true}else{return false}}),chrome:(navigator.userAgent.toLowerCase().indexOf("chrome")>-1)?true:false,firefox:(navigator.userAgent.toLowerCase().indexOf("firefox")>-1)?true:false,ie:(navigator.userAgent.toLowerCase().indexOf("msie")>-1)?true:false,ms:0,opera:(navigator.userAgent.toLowerCase().indexOf("opera")>-1)?true:false,safari:(navigator.userAgent.toLowerCase().indexOf("safari")>-1)?true:false,version:(function(){if(this.chrome){return navigator.userAgent.replace(/(.*Chrome\/|Safari.*)/gi,"")}if(this.firefox){return navigator.userAgent.replace(/(.*Firefox\/)/gi,"")}if(this.ie){return navigator.userAgent.replace(/(.*MSIE|;.*)/gi,"")}if(this.opera){return navigator.userAgent.replace(/(.*Opera\/|\(.*)/gi,"")}if(this.safari){return navigator.userAgent.replace(/(.*Version\/|Safari.*)/gi,"")}else{return parseInt(navigator.appVersion)}}),del:function(uri,success,failure){try{if((uri=="")||(!success instanceof Function)){throw new Error(label.error.invalidArguments)}uri.toString().on("afterDelete",function(){cache.expire(uri);uri.toString().un("afterDelete","expire")},"expire").fire("beforeDelete");client.request(uri,success,"DELETE",null,failure)}catch(e){error(e);(failure instanceof Function)?failure(e):void (0)}},get:function(uri,success,failure){try{if((uri=="")||(!success instanceof Function)){throw new Error(label.error.invalidArguments)}uri.toString().fire("beforeGet");var cached=cache.get(uri);(!cached)?client.request(uri,success,"GET",null,failure):success(cached.response)}catch(e){error(e);(failure instanceof Function)?failure(e):void (0)}},put:function(uri,success,args,failure){try{if((uri=="")||(!success instanceof Function)||(args===undefined)||(typeof args!="object")){throw new Error(label.error.invalidArguments)}uri.toString().fire("beforePut");client.request(uri,success,"PUT",args,failure)}catch(e){error(e);(failure instanceof Function)?failure(e):void (0)}},post:function(uri,success,args,failure){try{if((uri=="")||(!success instanceof Function)||(args=="")){throw new Error(label.error.invalidArguments)}uri.toString().fire("beforePost");client.request(uri,success,"POST",args,failure)}catch(e){error(e);(failure instanceof Function)?failure(e):void (0)}},jsonp:function(uri,success,failure){try{if((uri=="")||(!success instanceof Function)){throw new Error(label.error.invalidArguments)}uri.toString().fire("beforeJSONP");client.request(uri,success,"JSONP",null,failure)}catch(e){error(e);(failure instanceof Function)?failure(e):void (0)}},request:function(uri,fn,type,args,ffn){if(((type.toLowerCase()=="post")||(type.toLowerCase()=="put"))&&(typeof args!="object")){throw new Error(label.error.invalidArguments)}if(type.toLowerCase()=="jsonp"){var uid="acb"+utility.id(),curi=uri,head=document.getElementsByTagName("head")[0];do{uid="acb"+utility.id()}while(abaaso.callback[uid]!==undefined);uri+="&"+new Date().getTime().toString();uri=uri.replace(/callback=\?/,"callback=abaaso.callback."+uid);abaaso.callback[uid]=function(response){curi.toString().fire("afterJSONP");fn(response);delete abaaso.callback[uid]};el.create("script",{src:uri,type:"text/javascript"},head)}else{var xhr=new XMLHttpRequest(),payload=((type.toLowerCase()=="post")||(type.toLowerCase()=="put"))?args:null,cached=cache.get(uri,false);uri.toString().fire("beforeXHR");xhr.onreadystatechange=function(){client.response(xhr,uri,fn,type,ffn)};xhr.open(type.toUpperCase(),uri,true);(payload!==null)?xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8"):void (0);((cached!==false)&&(cached.headers.ETag!==undefined))?xhr.setRequestHeader("ETag",cached.headers.ETag):void (0);xhr.send(payload)}},response:function(xhr,uri,fn,type,ffn){try{if(xhr.readyState==2){var headers=xhr.getAllResponseHeaders().split("\n"),i=null,loop=headers.length,items={};for(i=0;i<loop;i++){if(headers[i]!=""){var header=headers[i].toString(),value=header.substr((header.indexOf(":")+1),header.length).replace(/\s/,"");header=header.substr(0,header.indexOf(":")).replace(/\s/,"");items[header]=value}}cache.set(uri,"headers",items)}else{if(xhr.readyState==4){if((xhr.status==200)&&(xhr.responseText!="")){var state=null,s=abaaso.state;if(type!="DELETE"){cache.set(uri,"epoch",new Date());cache.set(uri,"response",xhr.responseText)}uri.toString().fire("afterXHR");uri.toString().fire("after"+type.toLowerCase().capitalize());uri=cache.get(uri,false);if((s.header!==null)&&(state=uri.headers[s.header])&&(state!==undefined)){s.previous=s.current;s.current=state;((s.previous!==null)&&(s.current!==null))?observer.replace(abaaso,state,s.previous,s.current,s.current):void (0);abaaso.fire(state)}(fn!==undefined)?fn(uri.response):void (0)}else{if(xhr.status==401){throw new Error(label.error.serverUnauthorized)}else{throw new Error(label.error.serverError)}}}}}catch(e){error(e);(ffn instanceof Function)?ffn(e):void (0)}}};var cookie={expire:function(name){(this.get(name)!==undefined)?this.set(name,"","-1s"):void (0)},get:function(name){return this.list()[name]},list:function(){var i=null,loop=null,item=null,items=null,result={};if((document.cookie)&&(document.cookie!="")){items=document.cookie.split(";");loop=items.length;for(i=0;i<loop;i++){item=items[i].split("=");result[decodeURIComponent(item[0].toString().trim())]=decodeURIComponent(item[1].toString().trim())}}return result},set:function(name,value,offset){offset=offset.toString()||"";var expire="",span=null,type=null,types=["d","h","m","s"],i=types.length;if(offset!=""){while(i--){if(offset.indexOf(types[i])>0){type=types[i];span=parseInt(offset.substring(0,offset.indexOf(type)));break}}if(isNaN(span)){throw new Error(label.error.invalidArguments)}expire=new Date();switch(type){case"d":expire.setDate(expire.getDate()+span);break;case"h":expire.setHours(expire.getHours()+span);break;case"m":expire.setMinutes(expire.getMinutes()+span);break;case"s":expire.setSeconds(expire.getSeconds()+span);break}}(expire!="")?expire="; expires="+expire.toUTCString():void (0);document.cookie=name.toString().trim()+"="+value+expire+"; path=/";return this.get(name)}};var data={keys:[],records:[],clear:function(){this.keys=[];this.records=[]},del:function(record){try{var key,index;if((record===undefined)||((typeof(record)!="string")&&(typeof(record)!="number"))){throw new Error(label.error.invalidArguments)}if(typeof(record)=="string"){key=this.keys[record];if(key===undefined){throw new Error(label.error.invalidArguments)}delete this.records[key.index];delete this.keys[record]}else{key=this.records[record].key;delete this.records[record];delete this.keys[key]}}catch(e){error(e)}},get:function(record){try{var r=[],i,start,end;if(typeof(record)=="string"){return(this.keys[record]!==undefined)?this.records[this.keys[record].index]:undefined}else{if(record instanceof Array){if(isNaN(record[0])||isNaN(record[1])){throw new Error(label.error.invalidArguments)}start=record[0]-1;end=record[1]-1;for(i=start;i<end;i++){(this.records[i]!==undefined)?r.push(this.records[i]):void (0)}return r}else{return this.records[record]}}}catch(e){error(e);return undefined}},set:function(key,data){try{if((key===undefined)||(typeof(data)!="object")){throw new Error(label.error.invalidArguments)}var record=((this.keys[key]===undefined)&&(this.records[key]===undefined))?undefined:this.get(key),arg,index;if(record===undefined){this.keys[key]={};index=this.records.total()+1;this.keys[key].index=index;this.records[index]=data;this.records[index].key=key;this.records[index].index=index;record=this.records[index]}else{for(arg in data){record[arg]=data[arg]}this.records[record.index]=record}return record}catch(e){error(e);return undefined}void (0)}};var el={clear:function(obj){try{if(obj instanceof Array){var loop=(!isNaN(obj.length))?obj.length:obj.total(),i=null;for(i=0;i<loop;i++){this.clear(obj[i])}return obj}else{obj=(typeof obj=="object")?obj:$(obj);if(obj!==null){obj.fire("beforeClear");if(typeof obj.reset=="function"){obj.reset()}else{if(obj.value!==undefined){obj.update({innerHTML:"",value:""})}else{obj.update({innerHTML:""})}}obj.fire("afterClear");return obj}else{throw new Error(label.error.elementNotFound)}}}catch(e){error(e);return undefined}},create:function(type,args,id){try{if(type===undefined){throw new Error(label.error.invalidArguments)}var obj,target;if(id!==undefined){target=(typeof id=="object")?id:$(id)}else{if((args!==undefined)&&((typeof(args)=="string")||(args.childNodes!==undefined))){target=args;(typeof(target)=="string")?target=$(target):void (0)}else{target=document.body}}if(target===undefined){throw new Error(label.error.invalidArguments)}obj=document.createElement(type);((args!==undefined)&&(typeof(args)!="string")&&(args.childNodes===undefined)&&(args.id!==undefined)&&($("#"+args.id)===undefined))?obj.id=args.id:obj.genID();((args!==undefined)&&(args.id!==undefined))?delete args.id:void (0);obj.fire("beforeCreate");((typeof(args)=="object")&&(args.childNodes===undefined))?obj.update(args):void (0);target.appendChild(obj);obj.fire("afterCreate");return obj}catch(e){error(e);return undefined}},css:function(content){try{var ss,css;ss=create("style",{type:"text/css"},$("head")[0]);if(ss.styleSheet){ss.styleSheet.cssText=content}else{css=document.createTextNode(content);ss.appendChild(css)}return ss}catch(e){error(e);return undefined}},destroy:function(obj){try{if(obj instanceof Array){var i=(!isNaN(obj.length))?obj.length:obj.total();while(i--){this.destroy(obj[i])}return obj}else{obj=(typeof obj=="object")?obj:$(obj);if(obj!==undefined){obj.fire("beforeDestroy");observer.remove(obj.id);obj.parentNode.removeChild(obj);obj.fire("afterDestroy")}return undefined}}catch(e){error(e);return undefined}},disable:function(obj){try{if(obj instanceof Array){var i=(!isNaN(obj.length))?obj.length:obj.total();while(i--){this.disable(obj[i])}return obj}else{obj=(typeof obj=="object")?obj:$(obj);if((obj!==undefined)&&(obj.disabled!==undefined)){obj.fire("beforeDisable");obj.disabled=true;obj.fire("afterDisable")}return obj}}catch(e){error(e);return undefined}},enable:function(obj){try{if(obj instanceof Array){var i=(!isNaN(obj.length))?obj.length:obj.total();while(i--){this.enable(obj[i])}return obj}else{obj=(typeof obj=="object")?obj:$(obj);if((obj!==undefined)&&(obj.disabled!==undefined)){obj.fire("beforeEnable");obj.disabled=false;obj.fire("afterEnable");instances.push(obj)}return obj}}catch(e){error(e);return undefined}},eventID:function(e,obj){return(window.event)?window.event.srcElement.id:obj.id},hide:function(obj){try{if(obj instanceof Array){var loop=(!isNaN(obj.length))?obj.length:obj.total(),i=null;for(i=0;i<loop;i++){this.hide(obj[i])}return obj}else{obj=(typeof obj=="object")?obj:$(obj);(obj.old===undefined)?obj.old={}:void (0);obj.old.display=obj.style.display;obj.style.display="none";return obj}}catch(e){error(e);return undefined}},position:function(obj){obj=(typeof obj=="object")?obj:$(obj);if(obj===undefined){throw new Error(label.error.invalidArguments)}var left=null,top=null;if(obj.offsetParent){left=obj.offsetLeft;top=obj.offsetTop;while(obj=obj.offsetParent){left+=obj.offsetLeft;top+=obj.offsetTop}}return[left,top]},show:function(obj){try{if(obj instanceof Array){var loop=(!isNaN(obj.length))?obj.length:obj.total(),i=null;for(i=0;i<loop;i++){this.show(obj[i])}return obj}else{obj=(typeof obj=="object")?obj:$(obj);obj.style.display=((obj.old!==undefined)&&(obj.old.display!==undefined)&&(obj.old.display!=""))?obj.old.display:"inherit";return obj}}catch(e){error(e);return undefined}},update:function(obj,args){try{if(obj instanceof Array){var loop=(!isNaN(obj.length))?obj.length:obj.total(),i=null;for(i=0;i<loop;i++){this.update(obj[i],args)}return obj}else{obj=(typeof obj=="object")?obj:$(obj);args=args||{};if(obj===undefined){throw new Error(label.error.invalidArguments)}obj.fire("beforeUpdate");if(obj){for(var i in args){switch(i){case"innerHTML":case"type":case"src":obj[i]=args[i];break;case"opacity":obj.opacity(args[i]);break;case"class":((client.ie)&&(client.version<8))?i="className":void (0);case"id":var o=observer.listeners;if(o[obj.id]!==undefined){o[args[i]]=[].concat(o[obj.id]);delete o[obj.id]}default:obj.setAttribute(i,args[i]);break}}obj.fire("afterUpdate");return obj}else{throw new Error(label.error.elementNotFound)}}}catch(e){error(e);return undefined}}};var number={even:function(arg){try{return((arg%2)===0)}catch(e){error(e);return undefined}},odd:function(arg){try{return !((arg%2)===0)}catch(e){error(e);return undefined}}};var json={decode:function(arg){try{return JSON.parse(arg)}catch(e){error(e);return undefined}},encode:function(arg){try{return JSON.stringify(arg)}catch(e){error(e);return undefined}}};var label={common:{back:"Back",cancel:"Cancel",clear:"Clear",close:"Close",cont:"Continue",del:"Delete",edit:"Edit",find:"Find",gen:"Generate",go:"Go",loading:"Loading",next:"Next",login:"Login",ran:"Random",save:"Save",search:"Search",submit:"Submit"},error:{databaseNotOpen:"Failed to open the Database, possibly exceeded Domain quota.",databaseNotSupported:"Client does not support local database storage.",databaseWarnInjection:"Possible SQL injection in database transaction, use the &#63; placeholder.",elementNotCreated:"Could not create the Element.",elementNotFound:"Could not find the Element.",expectedArray:"Expected an Array.",expectedArrayObject:"Expected an Array or Object.",expectedBoolean:"Expected a Boolean value.",expectedNumber:"Expected a Number.",expectedObject:"Expected an Object.",invalidArguments:"One or more arguments is invalid.",invalidDate:"Invalid Date.",invalidFields:"The following required fields are invalid: ",serverError:"A server error has occurred.",serverUnauthorized:"Unauthorized to access URI."}};var mouse={enabled:false,log:false,pos:{x:null,y:null},track:function(n){var m=abaaso.mouse;if(typeof(n)=="object"){var x,y,c=false;x=(n.pageX)?n.pageX:(document.body.scrollTop+n.clientX);y=(n.pageY)?n.pageY:(document.body.scrollLeft+n.clientY);if(m.pos.x!=x){m.pos.x=x;c=true}if(m.pos.y!=y){m.pos.y=y;c=true}if((c===true)&&(m.log===true)){try{console.log(m.pos.x+" : "+m.pos.y)}catch(e){abaaso.error(e)}}}else{if(typeof(n)=="boolean"){if(n===true){(document.addEventListener)?document.addEventListener("mousemove",abaaso.mouse.track,false):document.attachEvent("onmousemove",abaaso.mouse.track)}else{(document.removeEventListener)?document.removeEventListener("mousemove",abaaso.mouse.track,false):document.detachEvent("onmousemove",abaaso.mouse.track)}m.enabled=n}}return m}};var observer={listeners:[],add:function(obj,event,fn,id,scope,standby){try{if(obj instanceof Array){var loop=(!isNaN(obj.length))?obj.length:obj.total(),i=null;for(i=0;i<loop;i++){this.add(obj[i],event,fn,id,((scope===false)?obj[i]:scope),standby)}return obj}else{var instance=null,l=observer.listeners,o=(obj.id!==undefined)?obj.id:obj.toString();obj=(typeof obj=="object")?obj:((obj=="abaaso")?abaaso:$(obj));standby=((standby!==undefined)&&(standby===true))?true:false;if((o===undefined)||(event===undefined)||(!fn instanceof Function)||((standby)&&(id===undefined))){throw new Error(label.error.invalidArguments)}(l[o]===undefined)?l[o]=[]:void (0);(l[o][event]===undefined)?l[o][event]=[]:void (0);(l[o][event].active===undefined)?l[o][event].active=[]:void (0);var item={fn:fn};((scope!==undefined)&&(scope!==null))?item.scope=scope:void (0);if(!standby){(id!==undefined)?l[o][event].active[id]=item:l[o][event].active.push(item);instance=(o!="abaaso")?$("#"+o):null;((instance!==null)&&(instance!==undefined))?((typeof(instance.addEventListener)=="function")?instance.addEventListener(event,function(e){(!e)?e=window.event:void (0);e.cancelBubble=true;(typeof(e.stopPropagation)=="function")?e.stopPropagation():void (0);instance.fire(event)},false):instance.attachEvent("on"+event,function(e){(!e)?e=window.event:void (0);e.cancelBubble=true;(typeof(e.stopPropagation)=="function")?e.stopPropagation():void (0);instance.fire(event)})):void (0)}else{(l[o][event].standby===undefined)?l[o][event].standby=[]:void (0);l[o][event].standby[id]=item}return obj}}catch(e){error(e);return undefined}},fire:function(obj,event){try{if(obj instanceof Array){var loop=(!isNaN(obj.length))?obj.length:obj.total(),i=null;for(i=0;i<loop;i++){this.fire(obj[i],event)}return obj}else{obj=(typeof obj=="object")?obj:$(obj);var l=observer.listeners,o=(obj.id!==undefined)?obj.id:obj.toString(),i;if((o===undefined)||(o=="")||(obj===undefined)||(event===undefined)){throw new Error(label.error.invalidArguments)}var listeners=observer.list(obj,event).active;if(listeners!==undefined){for(i in listeners){if((listeners[i]!==undefined)&&(typeof(listeners[i])!="function")&&(listeners[i].fn)){if(listeners[i].scope!==undefined){var instance=(typeof(listeners[i].scope)=="object")?listeners[i].scope:$("#"+listeners[i].scope),fn=listeners[i].fn,scope=(instance!==undefined)?instance:listeners[i].scope;fn.call(scope)}else{listeners[i].fn()}}}}return obj}}catch(e){error(e);return undefined}},list:function(obj,event){try{if(obj===undefined){throw new Error(label.error.invalidArguments)}var l=observer.listeners,o=(obj.id!==undefined)?obj.id:obj.toString();return(l[o]!==undefined)?(((event!==undefined)&&(l[o][event]!==undefined))?l[o][event]:l[o]):[]}catch(e){error(e);return undefined}},remove:function(obj,event,id){try{if(obj instanceof Array){var loop=(!isNaN(obj.length))?obj.length:obj.total(),i=null;for(i=0;i<loop;i++){this.remove(obj[i],event,id)}return obj}else{var instance=null,o=(obj.id!==undefined)?obj.id:obj.toString(),l=observer.listeners;obj=(typeof obj=="object")?obj:((obj=="abaaso")?abaaso:$(obj));if((o===undefined)||(event===undefined)||(l[o]===undefined)||(l[o][event]===undefined)){return obj}else{if(id===undefined){delete l[o][event];instance=(o!="abaaso")?$("#"+o):null;((instance!==null)&&(instance!==undefined))?((typeof(instance.removeEventListener)=="function")?instance.removeEventListener(event,function(e){(!e)?e=window.event:void (0);e.cancelBubble=true;(typeof(e.stopPropagation)=="function")?e.stopPropagation():void (0);instance.fire(event)},false):instance.detachEvent("on"+event,function(e){(!e)?e=window.event:void (0);e.cancelBubble=true;(typeof(e.stopPropagation)=="function")?e.stopPropagation():void (0);instance.fire(event)})):void (0)}else{if(l[o][event].active[id]!==undefined){delete l[o][event].active[id];if((l[o][event].standby!==undefined)&&(l[o][event].standby[id]!==undefined)){delete l[o][event].standby[id]}}}return obj}}}catch(e){error(e);return undefined}},replace:function(obj,event,id,sId,listener){try{if(obj instanceof Array){var loop=(!isNaN(obj.length))?obj.length:obj.total(),i=null;for(i=0;i<loop;i++){this.replace(obj[i],event,id,sId,listener)}return obj}else{var l=observer.listeners,o=(obj.id!==undefined)?obj.id:obj.toString();obj=(typeof obj=="object")?obj:((obj=="abaaso")?abaaso:$(obj));if((o===undefined)||(event===undefined)||(id===undefined)||(sId===undefined)||(l[o]===undefined)||(l[o][event]===undefined)||(l[o][event].active===undefined)||(l[o][event].active[id]===undefined)){throw new Error(label.error.invalidArguments)}(l[o][event].standby===undefined)?l[o][event].standby=[]:void (0);if(typeof(listener)=="string"){if((l[o][event].standby[listener]===undefined)||(l[o][event].standby[listener].fn===undefined)){throw new Error(label.error.invalidArguments)}else{listener=l[o][event].standby[listener].fn}}else{if(!listener instanceof Function){throw new Error(label.error.invalidArguments)}}l[o][event].standby[sId]={fn:l[o][event].active[id].fn};l[o][event].active[id]={fn:listener};return obj}}catch(e){error(e);return undefined}}};var utility={$:function(arg,nodelist){var args,obj,i,loop,c,alt,find,contains,has,not,x,document=window.document,instances=[];alt=function(obj,state){var i,loop,instances=[];if(obj instanceof Array){loop=obj.length;for(i=0;i<loop;i++){(i.even()===state)?instances.push(obj[i]):void (0)}obj=instances}else{if(obj.childNodes.length>0){loop=obj.childNodes.length;for(i=0;i<loop;i++){(i.even()===state)?instances.push(obj.childNodes[i]):void (0)}obj=instances}else{obj=undefined}}return obj};find=function(obj,arg){arg=arg.split(/\s*,\s*/);var i,pattern,loop=arg.length,instances=[];for(i=0;i<loop;i++){pattern=new RegExp(arg[i].replace("*",".*"),"ig");(pattern.test(obj))?instances.push(arg[i]):void (0)}return(instances.length>0)?true:false};contains=function(obj,arg){var i,loop,instances=[];((obj instanceof Array)&&(obj.length==1))?obj=obj.first():void (0);if(obj instanceof Array){loop=obj.length;for(i=0;i<loop;i++){(obj[i].innerHTML.indexOf(arg)>=0)?instances.push(obj[i]):void (0)}return(instances.length==1)?instances[0]:instances}else{return(obj.innerHTML.indexOf(arg)>=0)?obj:undefined}};has=function(obj,arg){var i,loop,instances=[];((obj instanceof Array)&&(obj.length==1))?obj=obj.first():void (0);if(obj instanceof Array){var x,loop2;loop=obj.length;for(i=0;i<loop;i++){loop2=obj[i].childNodes.length;for(x=0;x<loop2;x++){obj[i].genID();((find(obj[i].childNodes[x].nodeName,arg)===true)&&(instances[obj[i].id]===undefined))?instances[obj[i].id]=obj[i]:void (0)}}instances=instances.indexed()}else{loop=obj.childNodes.length;for(i=0;i<loop;i++){(find(obj.childNodes[i].nodeName,arg)===true)?instances.push(obj.childNodes[i]):void (0)}}return instances};is=function(obj,arg){var i,loop,instances=[];((obj instanceof Array)&&(obj.length==1))?obj=obj.first():void (0);if(obj instanceof Array){loop=obj.length;for(i=0;i<loop;i++){obj[i].genID();((find(obj[i].nodeName,arg)===true)&&(instances[obj[i].id]===undefined))?instances[obj[i].id]=obj[i]:void (0)}instances=instances.indexed()}else{(find(obj.nodeName,arg)===true)?instances.push(obj):void (0)}return instances};not=function(obj,arg){var i,loop,instances=[];((obj instanceof Array)&&(obj.length==1))?obj=obj.first():void (0);if(obj instanceof Array){var x,loop2;loop=obj.length;for(i=0;i<loop;i++){loop2=obj[i].childNodes.length;for(x=0;x<loop2;x++){obj[i].genID();(find(obj[i].childNodes[x].nodeName,arg)===false)?((instances[obj[i].id]===undefined)?instances[obj[i].id]=obj[i]:void (0)):((instances[obj[i].id]!==undefined)?delete instances[obj[i].id]:void (0))}}instances=instances.indexed()}else{loop=obj.childNodes.length;for(i=0;i<loop;i++){(find(obj.childNodes[i].nodeName,arg)===false)?instances.push(obj.childNodes[i]):void (0)}}return instances};arg=(arg.toString().indexOf(",")>-1)?arg.split(/\s*,\s*/):arg;nodelist=(nodelist===true)?true:false;if(arg instanceof Array){loop=arg.length;for(i=0;i<loop;i++){instances.push($(arg[i],nodelist))}return instances}args=arg.split(/\.|:/).slice(1);if(arg.charAt(0)==":"){arg=":"}else{if(arg.charAt(0)=="."){arg=(args.length>0)?new String("."+args[0]):new String(arg);args=args.splice(1)}else{arg=(args.length>0)?new String(arg.split(/\.|:/)[0]):new String(arg)}}switch(arg.charAt(0)){case".":obj=document.getElementsByClassName(arg.substring(1));((nodelist===false)&&(!client.ie))?obj=Array.prototype.slice.call(obj):void (0);break;case"#":obj=document.getElementById(arg.substring(1));break;case":":obj=document.body.getElementsByTagName("*");if(nodelist===false){if(!client.ie){obj=Array.prototype.slice.call(obj)}else{var a=[],i,loop=obj.length;for(var i=0;i<loop;i++){a.push(obj[i])}obj=a}}break;default:obj=document.getElementsByTagName(arg);if(nodelist===false){if(!client.ie){obj=Array.prototype.slice.call(obj)}else{var a=[],i,loop=obj.length;for(var i=0;i<loop;i++){a.push(obj[i])}obj=a}}break}if(args.length>0){loop=args.length;for(i=0;i<loop;i++){if(obj===undefined){break}switch(args[i].toString().replace(/\(.*\)/,"")){case"contains":obj=contains(obj,args[i].toString().replace(/.*\(|'|"|\)/g,""));break;case"even":obj=alt(obj,true);break;case"first":obj=obj.first();break;case"has":obj=has(obj,args[i].toString().replace(/.*\(|'|"|\)/g,""));break;case"is":obj=is(obj,args[i].toString().replace(/.*\(|'|"|\)/g,""));break;case"last":obj=obj.last();break;case"not":obj=not(obj,args[i].toString().replace(/.*\(|'|"|\)/g,""));break;case"odd":obj=alt(obj,false);break;default:loop=obj.length;instances=[];for(x=0;x<loop;x++){c=obj[x].className.split(" ");(c.index(args[i])>-1)?instances.push(obj[x]):void (0)}obj=instances}if(obj instanceof Array){(obj.length===0)?obj=undefined:((obj.length==1)?obj=obj.first():void (0))}}}if(obj===null){obj=undefined}else{if(obj instanceof Array){obj=(obj.length===0)?undefined:((obj.length==1)?obj.first():obj)}}return obj},define:function(args,value,obj){args=args.split(".");obj=obj||this;var i=null,l=args.length,p=obj;for(i=0;i<l;i++){(p[args[i]]===undefined)?p[args[i]]=((i+1<l)?{}:((value!==undefined)?value:null)):((i+1>=l)?(p[args[i]]=(value!==undefined)?value:null):void (0));p=p[args[i]]}return obj},error:function(e){var err={name:((typeof e=="object")?e.name:"TypeError"),message:(typeof e=="object")?e.message:e};(e.number!==undefined)?(err.number=(e.number&65535)):void (0);((!client.ie)&&(console))?console.error(err.message):void (0);(error.events===undefined)?error.events=[]:void (0);error.events.push(err)},domID:function(id){try{return id.toString().replace(/(\&|,|(\s)|\/)/gi,"").toLowerCase()}catch(e){error(e);return undefined}},genID:function(obj){try{if(typeof(obj)!="object"){throw new Error(label.error.invalidArguments)}if((obj instanceof Array)||(obj.id!="")){return obj}var id="abaaso-"+utility.id();do{id="abaaso-"+utility.id()}while($("#"+id)!==undefined);obj.id=id;return obj}catch(e){error(e);return undefined}},id:function(){return Math.floor(Math.random()*1000000000)},loading:function(obj){try{if(obj instanceof Array){var loop=(!isNaN(obj.length))?obj.length:obj.total(),i=null;for(i=0;i<loop;i++){this.loading(obj[i])}return arg}else{if(abaaso.loading.url===null){throw new Error(label.error.elementNotFound)}obj=(typeof(obj)=="object")?obj:$(obj);if(obj===undefined){throw new Error(label.error.invalidArguments)}if(abaaso.loading.image===undefined){abaaso.loading.image=new Image();abaaso.loading.image.src=abaaso.loading.url}obj.genID();obj.clear();$("#"+obj.id).create("div",{id:obj.id+"_loading",style:"text-align:center"});$("#"+obj.id+"_loading").create("img",{alt:label.common.loading,src:abaaso.loading.image.src});return obj}}catch(e){error(e);return undefined}},proto:function(obj,type){try{if(typeof obj!="object"){throw new Error(label.error.invalidArguments)}var apply=function(obj,collection){var i=collection.length;while(i--){obj[collection[i].name]=collection[i].fn}};var methods={array:[{name:"contains",fn:function(arg){return abaaso.array.contains(this,arg)}},{name:"diff",fn:function(arg){return abaaso.array.diff(this,arg)}},{name:"first",fn:function(){return abaaso.array.first(this)}},{name:"index",fn:function(arg){return abaaso.array.index(this,arg)}},{name:"indexed",fn:function(){return abaaso.array.indexed(this)}},{name:"keys",fn:function(){return abaaso.array.keys(this)}},{name:"last",fn:function(arg){return abaaso.array.last(this)}},{name:"on",fn:function(event,listener,id,scope,standby){scope=scope||false;return abaaso.on(this,event,listener,id,scope,standby)}},{name:"remove",fn:function(arg){return abaaso.array.remove(this,arg)}},{name:"total",fn:function(){return abaaso.array.total(this)}}],element:[{name:"create",fn:function(type,args){this.genID();return abaaso.create(type,args,this)}},{name:"fade",fn:function(arg){this.genID();abaaso.fx.fade("#"+this.id,arg)}},{name:"get",fn:function(uri){this.fire("beforeGet");var cached=cache.get(uri);if(!cached){uri.toString().on("afterGet",function(){var response=cache.get(uri,false).response;(this.value!==undefined)?this.update({value:response}):this.update({innerHTML:response});uri.toString().un("afterGet","get");this.fire("afterGet")},"get",this);abaaso.get(uri)}else{(this.value!==undefined)?this.update({value:cached.response}):this.update({innerHTML:cached.response});this.fire("afterGet")}return this}},{name:"move",fn:function(pos,ms){this.genID();abaaso.fx.move(this,pos,ms)}},{name:"on",fn:function(event,listener,id,scope,standby){scope=scope||this;((this.id===undefined)||(this.id==""))?this.genID():void (0);return abaaso.on(this,event,listener,id,scope,standby)}},{name:"opacity",fn:function(arg){return abaaso.fx.opacity(this,arg)}},{name:"position",fn:function(){this.genID();return abaaso.el.position(this)}},{name:"text",fn:function(arg){this.genID();return abaaso.update(this,{innerHTML:arg})}},{name:"slide",fn:function(ms,pos,elastic){this.genID();abaaso.fx.slide("#"+this.id,ms,pos,elastic)}}],number:[{name:"even",fn:function(){return abaaso.number.even(this)}},{name:"odd",fn:function(){return abaaso.number.odd(this)}},{name:"on",fn:function(event,listener,id,scope,standby){scope=scope||this;return abaaso.on(this,event,listener,id,scope,standby)}}],shared:[{name:"clear",fn:function(){((typeof this=="object")&&((this.id===undefined)||(this.id=="")))?this.genID():void (0);(this instanceof String)?(this.constructor=new String("")):abaaso.clear(this);return this}},{name:"destroy",fn:function(){abaaso.destroy(this)}},{name:"disable",fn:function(){return abaaso.el.disable(this)}},{name:"domID",fn:function(){if(!this instanceof String){this.genID();return abaaso.domID(this.id)}return abaaso.domID(this)}},{name:"enable",fn:function(){return abaaso.el.enable(this)}},{name:"fire",fn:function(event){((!this instanceof String)&&((this.id===undefined)||(this.id=="")))?this.genID():void (0);return abaaso.fire(this,event)}},{name:"genID",fn:function(){return abaaso.genID(this)}},{name:"hide",fn:function(){this.genID();return abaaso.el.hide(this)}},{name:"listeners",fn:function(event){((!this instanceof String)&&((this.id===undefined)||(this.id=="")))?this.genID():void (0);return abaaso.listeners(this,event)}},{name:"loading",fn:function(){return abaaso.loading.create(this)}},{name:"show",fn:function(){this.genID();return abaaso.el.show(this)}},{name:"un",fn:function(event,id){((!this instanceof String)&&((this.id===undefined)||(this.id=="")))?this.genID():void (0);return abaaso.un(this,event,id)}},{name:"update",fn:function(args){this.genID();return abaaso.update(this,args)}}],string:[{name:"capitalize",fn:function(){return this.charAt(0).toUpperCase()+this.slice(1)}},{name:"on",fn:function(event,listener,id,scope,standby){scope=scope||this;return abaaso.on(this,event,listener,id,scope,standby)}},{name:"trim",fn:function(){return this.replace(/^\s+|\s+$/,"")}}]};apply(obj,methods[type]);apply(obj,methods.shared)}catch(e){error(e)}}};var validate={pattern:{domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?$/,ip:/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/,integer:/(^-?\d\d*$)/,email:/^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/,number:/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/,notEmpty:/\S/,phone:/^\([1-9]\d{2}\)\s?\d{3}\-\d{4}$/,string:/\w/},bool:function(arg){switch(arg){case true:case false:return arg;default:return false}},test:function(args){try{var exception=false,invalid=[],pattern=validate.pattern,value=null;for(var i in args){value=($(i).value)?$(i).value:$(i).innerHTML;switch(args[i]){case"boolean":if(!validate.bool(value)){invalid.push(i);exception=true}break;case"date":value=new String(value);if((!pattern.notEmpty.test(value))||(!new Date(value))){invalid.push(i);exception=true}break;case"domainip":value=new String(value);if((!pattern.domain.test(value))||(!pattern.ip.test(value))){invalid.push(i);exception=true}break;default:value=new String(value);var p=(pattern[args[i]])?pattern[args[i]]:args[i];if(!p.test(value)){invalid.push(i);exception=true}break}}return{pass:!exception,invalid:invalid}}catch(e){error(e);return{pass:false,invalid:{}}}}};var $=utility.$,error=utility.error;return{array:array,callback:[],client:{css3:client.css3,chrome:client.chrome,firefox:client.firefox,ie:client.ie,ms:client.ms,opera:client.opera,safari:client.safari,version:client.version,del:client.del,get:client.get,post:client.post,put:client.put,jsonp:client.jsonp},cookie:cookie,data:data,el:el,json:json,label:label,loading:{create:utility.loading,url:null},mouse:mouse,number:number,observer:{add:observer.add,fire:observer.fire,list:observer.list,remove:observer.remove},state:{current:null,header:null,previous:null},validate:validate,$:utility.$,clear:el.clear,clean:cache.clean,create:el.create,css:el.css,define:utility.define,del:client.del,destroy:el.destroy,domID:utility.domID,error:utility.error,fire:function(){var obj=(arguments[1]===undefined)?abaaso:arguments[0],event=(arguments[1]===undefined)?arguments[0]:arguments[1];return abaaso.observer.fire(obj,event)},genID:utility.genID,get:client.get,id:"abaaso",init:function(){abaaso.ready=true;utility.proto(Array.prototype,"array");utility.proto(Element.prototype,"element");(client.ie)?utility.proto(HTMLDocument.prototype,"element"):void (0);utility.proto(Number.prototype,"number");utility.proto(String.prototype,"string");window.onresize=function(){abaaso.fire("resize")};abaaso.timer.clean=setInterval(function(){abaaso.clean()},120000);if(typeof(document.getElementsByClassName)=="undefined"){document.getElementsByClassName=function(arg){var nodes=document.getElementsByTagName("*"),loop=nodes.length,i=null,obj=[],pattern=new RegExp("(^|\\s)"+arg+"(\\s|$)");for(i=0;i<loop;i++){(pattern.test(nodes[i].className))?obj.push(nodes[i]):void (0)}return obj}}if(typeof(Array.prototype.filter)=="undefined"){Array.prototype.filter=function(fn){if((this===void 0)||(this===null)||(typeof fn!=="function")){throw new Error(label.error.invalidArguments)}var i=null,t=Object(this),loop=t.length>>>0,result=[],prop=arguments[1];val=null;for(i=0;i<loop;i++){if(i in t){val=t[i];(fn.call(prop,val,i,t))?result.push(val):void (0)}}return result}}abaaso.fire("ready").un("ready");if(!client.ie){abaaso.timer.render=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(abaaso.timer.render);abaaso.fire("render").un("render")}},10)}delete abaaso.init},jsonp:client.jsonp,listeners:function(){var all=(arguments[1]!==undefined)?true:false;var obj=(all)?arguments[0]:abaaso,event=(all)?arguments[1]:arguments[0];return abaaso.observer.list(obj,event)},on:function(){var all=(arguments[2] instanceof Function)?true:false;var obj=(all)?arguments[0]:abaaso,event=(all)?arguments[1]:arguments[0],listener=(all)?arguments[2]:arguments[1],id=(all)?arguments[3]:arguments[2],scope=(all)?arguments[4]:arguments[3],standby=(all)?arguments[5]:arguments[4];return abaaso.observer.add(obj,event,listener,id,scope,standby)},position:el.position,post:client.post,put:client.put,ready:false,timer:{},un:function(){var all=(typeof arguments[0]=="string")?false:true;var obj=(all)?arguments[0]:abaaso,event=(all)?arguments[1]:arguments[0],id=(all)?arguments[2]:arguments[1];return abaaso.observer.remove(obj,event,id)},update:el.update,version:"1.3.9.4"}}();var $=function(arg,nodelist){return abaaso.$(arg,nodelist)};switch(true){case abaaso.client.chrome:case abaaso.client.firefox:case abaaso.client.safari:document.addEventListener("DOMContentLoaded",function(){abaaso.init()},false);break;default:abaaso.timer.init=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(abaaso.timer.init);abaaso.init();abaaso.fire("render").un("render")}},10)};
