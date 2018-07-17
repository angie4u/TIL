# Node, 쉬운듯 보이면서도 이해하기 무척 어려운..
Node란 무엇일까? JavaScript를 이용하여 서버사이드 요청을 처리할 수 있게하는 플랫폼이다.
Node는 싱글스레드 기반으로 요청을 처리한다! 라고 생각되는데 이번에 Edx에서 Node.js 심화과정을 들으면서 알게되었는데 사실이 아니었다. 
Node는 일반적으로 **이벤트 루프**라는 바구니에 해야할일들을 차곡차곡 쌓아놓고 처리하고, 이 이벤트루프가 바로 싱글스레드! 라는 것이지 노드에서 실행하는 모든 작업이 싱글스레드로 처리되는 것은 아니다.
예를들어, 네트워크 요청등과 같은 작업은 직접 처리하지 않고 OS에게 위임한다. 그리고는 결과를 거두어들인다...
OS는 자신의 자원을 총동원하여 빠르게 처리하고 결과값을 가져다 바친다... 그래서 수행시간을 찍어보면 여러개 요청을 해도 동시에 수행되는 것을 확인할 수 있다. 
Node의 수행순서는 꽤나 이해하기 어렵다.. 
다음의 골치아픈 예제의 수행순서를 상상해보자!

```
const https = require('https')
const crypto = require('crypto')
const fs = require('fs')

const start = Date.now()

function doRequest () {
  https.request('https://www.google.com', res => {
    res.on('data', () => {})
    res.on('end', () => {
      console.log(Date.now() - start)
    })
  }).end()
}

function doHash () {
  crypto.pbkdf2('abc', '1', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start)
  })
}

doRequest()

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start)
})

doHash()
doHash()
doHash()
doHash()

```
