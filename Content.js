const buildPopup = (urls)=>{

    // chrome.runtime.onMessage.addListener(
    //     function(request, sender, sendResponse) {
    //         console.log(sender.tab ?
    //                 "from a content script:" + sender.tab.url :
    //                 "from the extension");
    
    //         if (request.greeting == "hello")
    //             sendResponse({farewell: "goodbye"});
    // });
      
}

var URL = window.location.origin;
var urls = [];

//get all urls
chrome.storage.local.get(['url'], (result) => {
 
    urls = result.url;

    let index = urls.findIndex((element)=> element.url === URL);

    if(urls!==undefined && index !== -1){
        urls[index].accesedTimes++;
    }else{
        let obj = {
            url: URL,
            accesedTimes: 1
        }
        urls = result.url !== undefined ? [ ...result.url, obj] : [obj];
    }

    console.log(urls);
    buildPopup(urls);

    chrome.storage.local.set({url: urls});

});


  


