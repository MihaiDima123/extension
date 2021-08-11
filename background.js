chrome.tabs.onUpdated.addListener((tabId, changeInfo,tab)=>{

    if(changeInfo.status === 'complete' && /^http/.test(tab.url)){
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: [ "./foreground.js" ]
        }).then(()=>{
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                var URL = tabs[0].url;
                var urls = [];
                chrome.storage.local.get(['urls'], (result) => {
                    urls = result.urls;
                    if(urls === undefined){
                        chrome.storage.local.set(
                            {urls: [URL]}
                        );
                        return;
                    }
                    let index = urls.findIndex((element)=> element.url === URL);
                    if(urls!==undefined && index !== -1){
                        urls[index].accesedTimes++;
                    }else{
                        let obj = {
                            url: URL,
                            accesedTimes: 1
                        }
                        urls = result.urls !== undefined ? [ ...result.urls, obj] : [obj];
                    }
                    console.log(urls);
                    chrome.storage.local.set({urls: urls});     
                });
           });
        })
        .catch(err=>{
            console.log(err);
        })
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.message === 'get_name'){
        chrome.storage.local.get("name", data=>{
            if(chrome.runtime.lastError){
                sendResponse({
                    message: 'fail'
                });
            }else{
                sendResponse({
                    message: 'success',
                    payload: data.name
                });
            }

        });
        //assync code in there
        return true;
    }
})

