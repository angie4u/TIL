// global variables
// this is interval obj to handle count time. By passing this obj, we can record time or stop timer
var interval
var time = 0
var isStarted = false

function startTimer () {
  interval = setInterval(function () {
    time += 0.01
    document.getElementById('currentTime').innerHTML = time.toFixed(2)
  }, 10)
  isStarted = true
}

function resetTimer () {
  clearInterval(interval)
  time = 0
  document.getElementById('currentTime').innerHTML = '0'
  document.getElementById('pastTime').innerHTML = ''
  isStarted = false
}

function record () {
  document.getElementById('pastTime').innerHTML += time.toFixed(2)
  document.getElementById('pastTime').innerHTML += '<br/>'
}
function keyboardHandle (event) {
  var pressedKey = event.keyCode
  if (pressedKey == 83) {
    // 83 == s
    if (!isStarted) {
      startTimer()
    } else {
      // Timer is already started. We need to stop it!
      document.getElementById('currentTime').innerHTML = time.toFixed(2)
      clearInterval(interval)
      isStarted = false
    }
  } else if (pressedKey == 84) {
    // 84 == t
    record()
  } else if (pressedKey == 82) {
    // 82 == r
    resetTimer()
  }
}

setup()

function setup () {
    // button
  var startBtn = document.getElementById('start')
  startBtn.addEventListener('click', function () {
    if (!isStarted) {
      startTimer()
    } else {
      // Timer is already started. We need to stop it!
      document.getElementById('currentTime').innerHTML = time.toFixed(2)
      clearInterval(interval)
      isStarted = false
    }
  })

  var resetBtn = document.getElementById('reset')

  resetBtn.addEventListener('click', function () {
    resetTimer()
  })

  var recordBtn = document.getElementById('record')

  recordBtn.addEventListener('click', function () {
    record()
  })
  keyboardHandle(event)
}
