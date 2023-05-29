const select = document.getElementById("select");
const deselect = document.getElementById("deselect");
const download = document.getElementById("download");
const duplicate = document.getElementById("duplicate")
var duplicateToggle = false;

chrome.storage.local.get(['imgsrcs'], function(item){
    for (i=0; i<item.imgsrcs.length; i++){
        var img = document.createElement('img');
        img.src = item.imgsrcs[i];
        img.style.width = '150px';
        img.style.height = 'auto';
        img.style.borderStyle = 'solid';
        img.style.borderColor = 'green';
        img.style.borderWidth = '5px';
        img.id = i;
        document.getElementById('body').appendChild(img);
        var divider = document.createElement('div');
        divider.style.width = '10px';
        divider.style.height = '0px';
        divider.style.display = 'inline-block';
        divider.id = "divider-"+i
        document.getElementById('body').appendChild(divider);
    }
})

select.addEventListener('click', async function onClick(){
    for(i=0;i<document.getElementsByTagName('img').length; i++){
        if (document.getElementsByTagName('img')[i].style.borderColor == 'red'){
            document.getElementsByTagName('img')[i].style.borderColor = 'green';
        }
    }
})

deselect.addEventListener('click', async function onClick(){
    for(i=0;i<document.getElementsByTagName('img').length; i++){
        if (document.getElementsByTagName('img')[i].style.borderColor == 'green'){
            document.getElementsByTagName('img')[i].style.borderColor = 'red';
        }
    }
})

download.addEventListener('click', async function onClick(){
    for(i=0;i<document.getElementsByTagName('img').length; i++){
        if (document.getElementsByTagName('img')[i].style.borderColor == 'green'){
            chrome.downloads.download({url:document.getElementsByTagName('img')[i].src, filename: "Image-Result-"+i+".png"})
        }
    }
})

duplicate.addEventListener('click', async function onClick(){
    if (!duplicateToggle){
        chrome.storage.local.get(['imgsrcs'], function(item){
            var imgsrcs = item.imgsrcs;
            j=0;
            while (document.getElementsByTagName('img').length > 1){
                document.getElementById(j).remove();
                document.getElementById("divider-"+j).remove();
                j++;
            }
            var uniqueimgs = [...new Set(imgsrcs)];
            uniqueimgs = uniqueimgs.filter(function(value, index, arr){
                return value != "chrome-extension://oggkcffnmfbaojfnbjfnikjmdbdepjle/rdshckmockup.png";
            });
            console.log(imgsrcs);
            console.log(uniqueimgs);
            for (k=0; k<uniqueimgs.length; k++){
                var img = document.createElement('img');
                img.src = uniqueimgs[k];
                img.style.width = '150px';
                img.style.height = 'auto';
                img.style.borderStyle = 'solid';
                img.style.borderColor = 'green';
                img.style.borderWidth = '5px';
                img.id = k;
                document.getElementById('body').appendChild(img);
                var divider = document.createElement('div');
                divider.style.width = '10px';
                divider.style.height = '0px';
                divider.style.display = 'inline-block';
                divider.id = "divider-"+k
                document.getElementById('body').appendChild(divider);
            }
        })
        duplicateToggle = true;
    }else{
        j=0;
        while (document.getElementsByTagName('img').length > 1){
            document.getElementById(j).remove();
            document.getElementById("divider-"+j).remove();
            j++;
        }
        chrome.storage.local.get(['imgsrcs'], function(item){
            var imgsrcs = item.imgsrcs;
            imgsrcs = imgsrcs.filter(function(value, index, arr){
                return value != "chrome-extension://oggkcffnmfbaojfnbjfnikjmdbdepjle/rdshckmockup.png";
            });
            for (i=0; i<imgsrcs.length; i++){
                var img = document.createElement('img');
                img.src = imgsrcs[i];
                img.style.width = '150px';
                img.style.height = 'auto';
                img.style.borderStyle = 'solid';
                img.style.borderColor = 'green';
                img.style.borderWidth = '5px';
                img.id = i;
                document.getElementById('body').appendChild(img);
                var divider = document.createElement('div');
                divider.style.width = '10px';
                divider.style.height = '0px';
                divider.style.display = 'inline-block';
                divider.id = "divider-"+i
                document.getElementById('body').appendChild(divider);
            }
        })
        duplicateToggle = false;
    }
})

window.onclick = e =>{
    if (e.target.id = parseInt(e.target.id, 10)){
        if (document.getElementById(e.target.id).style.borderColor == 'green')
        {
            document.getElementById(e.target.id).style.borderColor ='red'
        }
        else
        {
            document.getElementById(e.target.id).style.borderColor ='green';
        }
    }
    else if (e.target.id == 0)
    {
        if (document.getElementById(0).style.borderColor == 'green')
        {
            document.getElementById(0).style.borderColor ='red'
        }
        else
        {
            document.getElementById(0).style.borderColor ='green';
        }
    }
}