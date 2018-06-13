document.getElementById('analyseButton').addEventListener('click', analyze)
// sampleUrl: http://cdn.emetro.co.kr/imagebank/2016/05/29/0480/20160529000115.jpg
function analyze () {
  var reqBody = {
    'url': document.getElementById('input').value
  }

  var myHeader = new Headers({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '4efdd4e59f884e9280171bd712e85ad4'
  })

  var initObject = {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: myHeader
  }

  var request = new Request('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=age,gender', initObject)

  function updateExaminedText (info) {
    var outputString = 'Age: ' + info.age
    outputString += '<br> Gender: ' + info.gender
    document.getElementById('info').innerHTML = outputString
  }

  fetch(request).then(function (response) {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(new Error(response))
    }
  }).then(function (response) {
    // display picture
    document.getElementById('output').innerHTML = ''
    document.getElementById('photo').src = document.getElementById('input').value
    // display result
    updateExaminedText(response[0].faceAttributes)
    // document.getElementById('output').innerHTML = 'Total Key Phrases: ' + response.documents[0].keyPhrases.length + '</br>' + response.documents[0].keyPhrases
  }).catch(function (err) {
    // alert(err)
    document.getElementById('output').innerHTML = ''
    document.getElementById('photo').src = document.getElementById('input').value
    document.getElementById('info').innerHTML = 'No Faces Detected'
  })
}
