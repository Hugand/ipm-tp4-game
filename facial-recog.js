const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

function initFaceRecog(mouse) {
    console.log("HELLOs")

    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            console.log("HELLOs")
            if(resizedDetections[0] !== undefined) {
                const {x, y} = mapCoords(resizedDetections[0].landmarks._positions[33], displaySize)
                // player.setY(mapCoords())
                mouse.newPos(x, y)
                // player.setY(mapCoords(resizedDetections.landmarks._positions[33]._y))
                // resizedDetections.landmarks._positions = resizedDetections.landmarks._positions.slice(30, 37)
                // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

            }
        }, 20)
    })
}

function mapCoords(landmarkPosition, displaySize) {
    const x = mapCoordsX(landmarkPosition._x, displaySize.width)
    const y = mapCoordsY(landmarkPosition._y, displaySize.height)

    return { x, y }
}

function mapCoordsY(y, dispHeight) {
    const h = 500, a = dispHeight / 2 - 50, b = dispHeight - a;
    const x = (h * (y - a)) / (b - a);

    return x;
}

function mapCoordsX(y, dispWidth) {
    const w = 600, a = dispWidth / 2 - 60, b = dispWidth - a;
    // y = w - y;
    const x = (w * (y - a)) / (b - a);

    return w - x;
}