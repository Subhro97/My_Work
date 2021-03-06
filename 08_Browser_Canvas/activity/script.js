let vidRecordBtn = document.querySelector("#record-video");
let captureBtn = document.querySelector('#click-picture');
let videoPlayer = document.querySelector("video");
let chunks = [];
let mediaRecorder;
let recordState = false;
let constraints = { audio: true, video: true };

let filter='';

let allFilters=document.querySelectorAll('.filter');

let currZoom=1;
let zoomInBtn=document.getElementById("in");
let zoomOutBtn=document.getElementById("out");

zoomInBtn.addEventListener("click",function(){
  let vidScale=Number(videoPlayer.style.transform.split("(")[1].split(")")[0]);
  if(vidScale<3){
    currZoom=vidScale+0.1;
    videoPlayer.style.transform=`scale(${currZoom})`;
  }
})
zoomOutBtn.addEventListener("click",function(){
  let vidScale=Number(videoPlayer.style.transform.split("(")[1].split(")")[0]);
  if(vidScale>1){
    currZoom=vidScale-0.1;
    videoPlayer.style.transform=`scale(${currZoom})`;
  }
})

for(let i=0;i<allFilters.length;i++){
  allFilters[i].addEventListener("click",function(e){
    filter=e.currentTarget.style.backgroundColor;
    removeFilter();
    addFilterToScreen(filter);

  })
}

function addFilterToScreen(filterColor){
  let filter=document.createElement('div');
  filter.classList.add('on-screen-filter');
  filter.style.height="100vh";
  filter.style.width="100vw";
  filter.style.position="fixed";
  filter.style.top="0px";
  filter.style.backgroundColor=`${filterColor}`;
  document.querySelector('body').appendChild(filter);
}

function removeFilter(){
  let el=document.querySelector('.on-screen-filter');
  if(el){
    el.remove();
  }
}

vidRecordBtn.addEventListener("click", function () {
  if (mediaRecorder != undefined) {
    let innerDiv=vidRecordBtn.querySelector('#record-div');
    if (recordState == false) {
      recordState = true;
      innerDiv.classList.add('recording-animation');
      currZoom=1;
      videoPlayer.style.transform=`scale(${currZoom})`;
      mediaRecorder.start();
    } else {
      recordState = false;
      innerDiv.classList.remove('recording-animation');
      mediaRecorder.stop();
    }
  }
});

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(function (mediaStream) {
    videoPlayer.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = function (e) {
      let blob = new Blob(chunks, { type: "video/mp4" });
      chunks = [];
      let blobURL = URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = blobURL;
      link.download = "video.mp4";
      link.click();
      link.remove();
    };
  })
  .catch(function (err) {
    console.log(err);
  });

  captureBtn.addEventListener('click',function()
{
    let innerDiv = captureBtn.querySelector('#click-div');
    innerDiv.classList.add('capture-animation');
    console.log(('clicked'));
    capture();

    setTimeout(function(){
        innerDiv.classList.remove('capture-animation');
    },1000);
})
function capture()
{
    let c = document.createElement('canvas');
    c.width = videoPlayer.videoWidth;
    c.height = videoPlayer.videoHeight;
    let tool = c.getContext('2d');
    tool.translate(c.width/2,c.height/2);
    tool.scale(currZoom,currZoom);
    tool.translate(-c.width/2,-c.height/2);

    tool.drawImage(videoPlayer,0,0);
    if(filter!=''){
      tool.fillStyle=filter;
      tool.fillRect(0,0,c.width,c.height);
    }
    let link = document.createElement('a');
    link.download = 'image.png';
    link.href = c.toDataURL();
    link.click();
    link.remove();
    c.remove();
}
