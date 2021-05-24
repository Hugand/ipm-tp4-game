const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

function initFaceRecog(player) {
    video.addEventListener('play', () => {
    //   const canvas = faceapi.createCanvasFromMedia(video)
    //   document.body.append(canvas)
      const displaySize = { width: video.width, height: video.height }
    //   const displaySize = { width: 640, height: 480 }
    //   faceapi.matchDimensions(canvas, displaySize)
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
    
        if(resizedDetections[0] !== undefined) {
            // resizedDetections[0].landmarks._positions = resizedDetections[0].landmarks._positions.slice(33, 34)

            player.setY(mapCoords(resizedDetections[0].landmarks._positions[33]._y))
        }
      }, 200)
    })
}

function mapCoords(y) {
    const h = 500, a = 220, b = 280;
    const x = (h * (y - a)) / (b - a);

    return x;
}