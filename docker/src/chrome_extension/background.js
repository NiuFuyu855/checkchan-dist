const a0_0x137ca5=a0_0x2d9d;(function(_0x4a65d3,_0x91ab98){const _0x5b2d07=a0_0x2d9d,_0x15a550=_0x4a65d3();while(!![]){try{const _0x1328f7=parseInt(_0x5b2d07(0x1d8))/0x1*(-parseInt(_0x5b2d07(0x1db))/0x2)+parseInt(_0x5b2d07(0x1df))/0x3*(parseInt(_0x5b2d07(0x1de))/0x4)+parseInt(_0x5b2d07(0x1e4))/0x5+parseInt(_0x5b2d07(0x1dd))/0x6*(parseInt(_0x5b2d07(0x1e0))/0x7)+parseInt(_0x5b2d07(0x1e3))/0x8*(-parseInt(_0x5b2d07(0x1e2))/0x9)+parseInt(_0x5b2d07(0x1dc))/0xa+parseInt(_0x5b2d07(0x1d9))/0xb;if(_0x1328f7===_0x91ab98)break;else _0x15a550['push'](_0x15a550['shift']());}catch(_0x3355e5){_0x15a550['push'](_0x15a550['shift']());}}}(a0_0x11d0,0x8142e));function a0_0x11d0(){const _0x371baf=['41218OiDSHJ','659820nhlzWQ','12vNotSu','4LXZCAj','469560xrZsyG','1615908ctCxZN','load\x20bg.js','36JqWlHx','411304eHLeXQ','1093960aMOxor','9tCvtHs','193655gXONuY','log'];a0_0x11d0=function(){return _0x371baf;};return a0_0x11d0();}let inspector={};console[a0_0x137ca5(0x1da)](a0_0x137ca5(0x1e1));async function show_inspector(tabid,inspector){inspector=new DomInspector({maxZIndex:9999,onClick:async path=>{const url='index.html#/check/add?path='+encodeURIComponent(path)+'&title='+encodeURIComponent(window.document.title)+'&url='+encodeURIComponent(window.location.href);console.log(url);const ret=await chrome.runtime.sendMessage({action:'redirect','url':url,'tabid':tabid});console.log('ret',ret,inspector);window.location.reload();}});inspector.enable();alert('可视化选择器已初始化\uFF0C请移动鼠标选择要监测的区域后点击\uFF0C取消请按ESC');console.log('inspector2',inspector);document.addEventListener('keyup',e=>{if(e.key==='Escape')inspector.disable();});}async function ck_get_content(path,delay=3000){function sleep(ms){return new Promise(resolve=>{setTimeout(resolve,ms);});}function dom_ready(ms){return new Promise(resolve=>{const handle=setInterval(()=>{console.log(document.readyState);if(document.readyState=='complete'){clearInterval(handle);resolve(true);}},1000);if(ms)setTimeout(resolve,ms);});}function dom_mul_select(path){let ret=window.document.querySelectorAll(path);if(!ret)return false;let texts=[];let html='';for(let item of ret){item.querySelectorAll('[src]').forEach(item=>{if(item.src.substr(0,4)!='http'){item.src=window.origin+(item.src.substr(0,1)=='/'?item.src:'/'+item.src);}});if(item.innerText)texts.push(item.innerText?.trim());html+=item.outerHTML?item.outerHTML+'<br/>':'';}return{text:path.indexOf(',')>=0?texts.join('\n'):texts[0]||'',html};}await dom_ready();if(delay>0)await sleep(delay);const ret=dom_mul_select(path);if(ret){return ret;}else{await sleep(3000);const ret2=dom_mul_select(path);if(ret2){return ret2;}else{await sleep(3000);const ret3=dom_mul_select(path);if(ret3)return ret;}}return false;}chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{if(request.action==='redirect'){((async()=>{const [tab]=await chrome.tabs.query({title:'Check酱'});const tab2=await chrome.tabs.get(request.tabid);console.log(tab2);const that_tab=tab||tab2;await chrome.tabs.update(that_tab.id,{'url':request.url,'active':true});await chrome.tabs.reload(that_tab.id);sendResponse({'message':'done',request});})());return true;}if(request.action==='fetch'){((async()=>{const tab=await chrome.tabs.create({'url':request.url,'active':false,'pinned':true});const r=await chrome.scripting.executeScript({target:{tabId:tab.id},function:ck_get_content,args:[request.path,request.delay]});const result=r[0]?.result;console.log('result',result);await chrome.tabs.remove(tab.id);sendResponse(result);})());return true;}sendResponse({});return true;});chrome.action.onClicked.addListener(function(activeTab){tab_init();});chrome.runtime.onInstalled.addListener(function(details){chrome.contextMenus.create({'id':`checkchanSelector`,'title':'定位监测对象','contexts':['all']});chrome.alarms.create('check_change',{when:Date.now(),periodInMinutes:1});chrome.alarms.create('auto_sync',{when:Date.now(),periodInMinutes:10});chrome.alarms.create('bg_cookie_sync',{when:Date.now(),periodInMinutes:61});console.log('create alarms');tab_init();});function a0_0x2d9d(_0x3c7bf5,_0xa4903e){const _0x11d03c=a0_0x11d0();return a0_0x2d9d=function(_0x2d9d02,_0x4bf899){_0x2d9d02=_0x2d9d02-0x1d8;let _0x555d8=_0x11d03c[_0x2d9d02];return _0x555d8;},a0_0x2d9d(_0x3c7bf5,_0xa4903e);}async function tab_init(){const [tab]=await chrome.tabs.query({title:'Check酱'});if(tab){await chrome.tabs.update(tab.id,{'active':true});}else{await chrome.tabs.create({'url':'index.html','pinned':true});}}function selector_init(tabid){chrome.scripting.executeScript({target:{tabId:tabid},function:show_inspector,args:[tabid,inspector]},injectionResults=>{console.log(injectionResults);});}chrome.contextMenus.onClicked.addListener(async e=>{console.log('menu clicked',e);const [tab]=await chrome.tabs.query({active:true,currentWindow:true});selector_init(tab.id);});function sleep(ms){return new Promise(resolve=>{setTimeout(resolve,ms);});}chrome.alarms.onAlarm.addListener(async a=>{if(a.name=='bg_cookie_sync'){console.log('bg_cookie_sync');const settings=await kv_load('settings');if(!settings._hosted_api_base)return false;if(parseInt(settings._hosted_auto_sync||0)<=0||parseInt(settings._hosted_sync_cookie||0)<=0)return false;console.log('bg_cookie_sync start',parseInt(settings._hosted_auto_sync||0),parseInt(settings._hosted_sync_cookie||0));const checks=await load_data('checks');const cookies=parseInt(settings._hosted_sync_cookie)>0?await get_cookie_by_checks(checks):[];const form=new FormData();form.append('key',settings._hosted_api_key||'');form.append('checks',JSON.stringify(checks));form.append('cookies',JSON.stringify(cookies));try{const response=await fetch(settings._hosted_api_base+'/checks/upload',{method:'POST',body:form});const ret=await response.json();console.log('ret',ret);return ret;}catch(error){console.log('请求服务器失败\u3002'+error);return false;}}});async function kv_save(data,key='settings'){let kv=[];for(const setting of data){kv.push({'key':setting,'value':this[setting]});}await save_data(kv,key);}async function kv_load(key='settings'){let opt={};const kv=await load_data(key);if(kv&&Array.isArray(kv))for(const item of kv){if(item.key)opt[item.key]=item.value||'';}return opt;}async function get_cookie_by_checks(checks){let ret_cookies={};if(chrome.cookies){const cookies=await chrome.cookies.getAll({});let domains=[];for(const item of checks){const domain=new URL(item.url).host;if(!domains.includes(domain))domains.push(domain);}for(const domain of domains){ret_cookies[domain]=[];for(const cookie of cookies){if(domain.indexOf(cookie.domain)>=0){ret_cookies[domain].push(cookie);}}}}else{console.log('not chrome cookie...');}return ret_cookies;}async function storage_set(key,value){return new Promise((resolve,reject)=>{chrome.storage.local.set({[key]:value},function(){return resolve(true);});});}async function storage_get(key){return new Promise((resolve,reject)=>{chrome.storage.local.get([key],function(result){if(result[key]===undefined){resolve(null);}else{resolve(result[key]);}});});}async function load_data(key='checks'){const data=chrome?.storage?await storage_get(key):window.localStorage.getItem(key);try{return JSON.parse(data);}catch(error){return data||[];}}async function save_data(data,key='checks'){const ret=chrome?.storage?await storage_set(key,JSON.stringify(data)):window.localStorage.setItem(key,JSON.stringify(data));return ret;}