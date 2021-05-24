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
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async () => {
        const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
    
        if(resizedDetections !== undefined) {
            player.setY(mapCoords(resizedDetections.landmarks._positions[33]._y))
            // player.setY(mapCoords(resizedDetections.landmarks._positions[33]._y))
            resizedDetections.landmarks._positions = resizedDetections.landmarks._positions.slice(30, 37)
            // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

        }
      }, 20)
    })
}

function mapCoords(y) {
    const h = 500, a = 300, b = 400;
    const x = (h * (y - a)) / (b - a);

    return x;
}