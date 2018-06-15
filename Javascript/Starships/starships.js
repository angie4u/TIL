var ship1Id, ship2Id

document.getElementById('compare').addEventListener('click', function () {
  run(gen).catch(function (err) {
    alert(err.message)
  })
})

function initColor () {
  // document.getElementById('name1').innerHTML = ship1.name
  document.getElementById('cost1').style.backgroundColor = 'white'
  document.getElementById('speed1').style.backgroundColor = 'white'
  document.getElementById('size1').style.backgroundColor = 'white'
  document.getElementById('psg1').style.backgroundColor = 'white'
  // document.getElementById('name2').innerHTML = ship2.name
  document.getElementById('cost2').style.backgroundColor = 'white'
  document.getElementById('speed2').style.backgroundColor = 'white'
  document.getElementById('size2').style.backgroundColor = 'white'
  document.getElementById('psg2').style.backgroundColor = 'white'
}

function run (genFunc) {
  initColor()
  const genObject = genFunc() // creating a generator object

  function iterate (iteration) { // recursive function to iterate through promises
    if (iteration.done) // stop iterating when done and return the final value wrapped in a promise
        { return Promise.resolve(iteration.value) }
    return Promise.resolve(iteration.value) // returns a promise with its then() and catch() methods filled
        .then(x => iterate(genObject.next(x))) // calls recursive function on the next value to be iterated
        .catch(x => iterate(genObject.throw(x))) // throws an error if a rejection is encountered
  }

  try {
    return iterate(genObject.next()) // starts the recursive loop
  } catch (ex) {
    return Promise.reject(ex) // returns a rejected promise if an exception is caught
  }
}

function * gen () {
    // Get the shipId
  ship1Id = document.getElementById('ship1').value
  ship2Id = document.getElementById('ship2').value

    // check if input is valid
    //   if (document.getElementById('input').value > 7 || document.getElementById('input').value < 1) {
    //     throw new Error('Invalid Input - Enter a number between 1 and 7')
    //   }

    // fetch the ship

  var ship1Response = yield fetch('https://swapi.co/api/starships/' + ship1Id + '/')
  var ship1 = yield ship1Response.json()

  document.getElementById('name1').innerHTML = ship1.name
  document.getElementById('cost1').innerHTML = ship1.cost_in_credits
  document.getElementById('speed1').innerHTML = ship1.max_atmosphering_speed
  document.getElementById('size1').innerHTML = ship1.cargo_capacity
  document.getElementById('psg1').innerHTML = ship1.passengers

  var ship2Response = yield fetch('https://swapi.co/api/starships/' + ship2Id + '/')
  var ship2 = yield ship2Response.json()

  document.getElementById('name2').innerHTML = ship2.name
  document.getElementById('cost2').innerHTML = ship2.cost_in_credits
  document.getElementById('speed2').innerHTML = ship2.max_atmosphering_speed
  document.getElementById('size2').innerHTML = ship2.cargo_capacity
  document.getElementById('psg2').innerHTML = ship2.passengers

  if (ship1Id !== ship2Id) {
    // different cost
    ship1.cost_in_credits = parseInt(ship1.cost_in_credits)
    ship2.cost_in_credits = parseInt(ship2.cost_in_credits)

    if (ship1.cost_in_credits !== ship2.cost_in_credits) {
      if (ship1.cost_in_credits > ship2.cost_in_credits) {
        document.getElementById('cost1').style.backgroundColor = 'red'
      } else {
        document.getElementById('cost2').style.backgroundColor = 'red'
      }
    }

    ship1.max_atmosphering_speed = parseInt(ship1.max_atmosphering_speed)
    ship2.max_atmosphering_speed = parseInt(ship2.max_atmosphering_speed)
    // different speed
    if (ship1.max_atmosphering_speed !== ship2.max_atmosphering_speed) {
      if (ship1.max_atmosphering_speed > ship2.max_atmosphering_speed) {
        document.getElementById('speed1').style.backgroundColor = 'red'
      } else {
        document.getElementById('speed2').style.backgroundColor = 'red'
      }
    }

    ship1.cargo_capacity = parseInt(ship1.cargo_capacity)
    ship2.cargo_capacity = parseInt(ship2.cargo_capacity)

    // different size
    if (ship1.cargo_capacity !== ship2.cargo_capacity) {
      if (ship1.cargo_capacity > ship2.cargo_capacity) {
        document.getElementById('size1').style.backgroundColor = 'red'
      } else {
        document.getElementById('size2').style.backgroundColor = 'red'
      }
    }

    ship1.passengers = parseInt(ship1.passengers)
    ship2.passengers = parseInt(ship2.passengers)

    // different passenger
    if (ship1.passengers !== ship2.passengers) {
      if (ship1.passengers > ship2.passengers) {
        document.getElementById('psg1').style.backgroundColor = 'red'
      } else {
        document.getElementById('psg2').style.backgroundColor = 'red'
      }
    }
  }
}
