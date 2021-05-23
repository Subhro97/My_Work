let vidRecordBtn = document.querySelector("#record-video");
let videoPlayer = document.querySelector("video");
let chunks = [];
let mediaRecorder;
let recordState = false;
let constraints = { audio: true, video: true };

vidRecordBtn.addEventListener("click", function () {
  if (mediaRecorder != undefined) {
    if (recordState == false) {
      recordState = true;
      mediaRecorder.start();
      vidRecordBtn.innerText = "Recording...";
    } else {
      recordState = false;
      mediaRecorder.stop();
      vidRecordBtn.innerText = "Record";
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
