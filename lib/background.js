const btn = document.getElementById('downloadCurrent');
const settings = document.getElementById('settings');

btn.addEventListener('click', async function onClick() {
  var imgs = document.getElementsByTagName('img');
  var imgsrcs = [];
  for (var i = 0; i < imgs.length; i++) {
    imgsrcs.push(imgs[i].src);
  }
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tab) {
    try {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab[0]['id'] },
          func: () => {
            var imgs = document.getElementsByTagName('img');
            var imgsrcs = [];
            for (i = 0; i < imgs.length; i++) {
              imgsrcs.push(imgs[i].src);
            }
            return imgsrcs;
          },
        },
        (res) => {
          chrome.storage.local.set({ imgsrcs: res[0].result });
          chrome.tabs.create({ url: 'lib/page.html' });
        }
      );
    } catch (e) {
      console.log(e.name);
    }
  });
});

settings.addEventListener('click', function onClick() {
  chrome.tabs.create({ url: 'chrome://settings/downloads' });
});
