const btn = document.getElementById("downloadCurrent");
const settings = document.getElementById("settings");

btn.addEventListener('click', async function onClick(){
  var imgs = document.getElementsByTagName("img");
  var imgsrcs = [];
  for (var i=0; i<imgs.length; i++){
    imgsrcs.push(imgs[i].src)
  }
  let queryOptions = { active: true, lastFocusedWindow: true};
  let [tab] = await chrome.tabs.query(queryOptions);
  chrome.scripting.executeScript({
    target: { tabId: tab.id},
    func: () =>{
      var imgs = document.getElementsByTagName("img")
      var imgsrcs = [];
      for(i=0; i<imgs.length; i++){
        imgsrcs.push(imgs[i].src)
      }
      return imgsrcs;
    },},
    (res) => {
      chrome.storage.local.set({"imgsrcs": res[0].result})
      chrome.tabs.create({url: '/page.html'});
    },
    )
});

settings.addEventListener('click', function onClick(){
  chrome.tabs.create({url: 'chrome://settings/downloads'});
})