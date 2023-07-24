const btn = document.getElementById('downloadCurrent');
const settings = document.getElementById('settings');

btn.addEventListener('click', async function onClick() {
  var imgs = document.getElementsByTagName('img');
  var imgSRCs = [];
  for (var i = 0; i < imgs.length; i++) {
    imgSRCs.push(imgs[i].src);
  }
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tab) {
    try {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab[0]['id'] },
          func: () => {
            var imgs = document.getElementsByTagName('img');
            var imgSRCs = [];
            for (i = 0; i < imgs.length; i++) {
              imgSRCs.push(imgs[i].src);
            }
            return imgSRCs;
          },
        },
        (res) => {
          chrome.storage.local.set({ imgSRCs: res[0].result });
          chrome.tabs.create({ url: '../scripts/page.html' });
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
