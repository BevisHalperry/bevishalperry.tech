var canvas
var ctx

var bg
var sprites
var bevi

var numBevi = 30
var G = 0.1

var maxMass = 10

init()

function init() {
  setupSprites().then(function() {
    canvas = document.getElementById("space")
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight

    ctx = canvas.getContext("2d")

    setup()
    setInterval(run, 30)
  })
}

function setupSprites() {
  return new Promise(function(resolve, reject) {
    bg = new Image()
    bg.src = "img/bg.png"
    bg.onload = function() {
      var sprite1 = new Image()
      sprite1.src = "img/1.png"
      sprite1.onload = function() {
        sprites = []
        sprites.push(sprite1)

        var sprite2 = new Image()
        sprite2.src = "img/2.png"
        sprite2.onload = function() {
          sprites.push(sprite2)
          resolve()
        }
      }
    }
  })
}

function setup() {
  bevi = []
  for (var i = 0; i < numBevi; i++) {
    bevi.push(initBevis())
  }
}

function run() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bg, 0, 0)
  renderAll()
  advanceAll()
}

function renderAll() {
  bevi.forEach(function(bevis) {
    var size = Math.sqrt(bevis.m) * 5
    ctx.drawImage(bevis.img, bevis.pos.x, bevis.pos.y, size, size)
  })
}

function advanceAll() {
  var acc
  bevi.forEach(function(bevis) {
    acc = accelFor(bevis)
    bevis.vel = vadd(bevis.vel, acc)
    bevis.pos = vadd(bevis.pos, bevis.vel)
  })
}

function initBevis() {
  var m = randomMass()
  return {
    img: randomImg(),
    pos: randomPos(),
    vel: randomDirection(m),
    m: m
  }
}

function randomPos() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height
  }
}

function randomDirection(m) {
  return {
    x: (Math.random() - 0.5) * 10 / (m * 2),
    y: (Math.random() - 0.5) * 10 / (m * 2)
  }
}

function randomMass() {
  return Math.pow(Math.floor(1 + (Math.random() * maxMass)), 2)
}

function randomImg() {
  return sprites[Math.floor(Math.random() * sprites.length)]
}

// Physics Shit

function accelFor(b) {
  var sum = {x: 0, y: 0}

  bevi.forEach(function(otherBevis) {
    if (b === otherBevis) return

    sum = vadd(sum, attractionBetween(b, otherBevis))
  })

  return sum
}

function attractionBetween(b1, b2) {
  var vTowards = vsub(b2.pos, b1.pos)
  var mag = vmag(vTowards)
  var pull = (G * b2.m)/(mag * mag * b1.m)
  return vscale(vTowards, pull)
}

// Vector shit

function vadd(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  }
}

function vsub(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  }
}

function vmag(a) {
  return Math.sqrt((a.x * a.x) + (a.y * a.y))
}

function vscale(a, sf) {
  return {
    x: a.x * sf,
    y: a.y * sf
  }
}

function vident(a) {
  return vscale(a, 1/mag(a))
}
