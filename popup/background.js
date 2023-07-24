const btn = document.getElementById('downloadCurrent');

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
          browser.storage.local.set({ imgSRCs: res[0].result });
          browser.tabs.create({ url: '../scripts/page.html' });
        }
      );
    } catch (e) {
      console.log(e.name);
    }
  });
});
