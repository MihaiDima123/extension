chrome.runtime.sendMessage({
    message: "get_urls"
}, response =>{
    if(response.message = 'success'){
        for(ob of response.payload.urls){
            console.log(ob);
            // document.querySelector('div').innerHTML += ob.url+ '   '+ ob.accesedTimes +'  times' +'\n';
        }
    }
})