

function startVideo(stateMachine) {
  navigator.getUserMedia(
    { video: {} },
    stream => {
        video.srcObject = stream
        // stateMachine.finishLoadingApi()
    },
    err => console.error(err)
  )
}

function initFaceRecog(mouse, stateMachine) {
    const video = document.getElementById('video')

    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
      //   faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
      //   faceapi.nets.faceExpressionNet.loadFromUri('./models')
    ]).then(() => startVideo(stateMachine))

    video.addEventListener('play', () => {
        // const canvas = faceapi.createCanvasFromMedia(video)
        // document.body.append(canvas)
        const displaySize = { width: video.width, height: video.height }
        // faceapi.matchDimensions(canvas, displaySize)
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.2, inputSize: 160})).withFaceLandmarks()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            if(resizedDetections[0] !== undefined) {
                // Index 33 is the tip of the nose
                const {x, y} = mapCoords(resizedDetections[0].landmarks._positions[33], displaySize)
                mouse.newPos(x, y)
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