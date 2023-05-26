var tileRes = 50
var tileX = 1
var tileY = 100
var bgColor = 100

// every frames per second
var tickSpeed = 20

var playerPos = [0, 0]


class sprite {
    // 2d list of RGBA values
    spriteData = [[[127, 127, 127, 1]]]
    
    static blank = [0,0,0,0]

    constructor( spriteData ) {
        this.spriteData = spriteData
    }
    
    displaySprite( x, y, tileSize, size ) {
        noStroke()
        for( let i=0; i < this.spriteData.length; i++ ) {
            for( let j=0; j < this.spriteData.length; j++ ) {
                let color = this.spriteData[i][j]
                fill(`rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`)
                rect((x*tileSize+j*size), (y*tileSize+i*size), size, size)
            }
        }
        stroke(0)
    }

    tileRelativeSize( tileSize ) {
        return tileSize/this.spriteData[0].length
    }
}

var playerSprite = new sprite([
    [ sprite.blank, sprite.blank, [0,0,0,1], sprite.blank, sprite.blank ],
    [ sprite.blank, [0,0,0,1], [0,0,0,1], [0,0,0,1], sprite.blank ],
    [ sprite.blank, sprite.blank, [0,0,0,1], sprite.blank, sprite.blank ],
    [ sprite.blank, sprite.blank, [0,0,0,1], sprite.blank, sprite.blank ],
    [ sprite.blank, [0,0,0,1], sprite.blank, [0,0,0,1], sprite.blank ],
])

class entity {
    sprite = new sprite()
    attributes = {}
    constructor( sprite, attributes ) {
        this.sprite = sprite
        this.attributes = attributes
    }
}

function setup() {
	//createCanvas(800, 600);
	createCanvas(tileX*tileRes, tileY*tileRes)
	textAlign(LEFT, TOP)
}

function run() {
    // do stuff?
}

function keyPressed() {
    if ( key ==  's' ) {
        playerPos[1]++
   } else if ( key ==  'w' ) {
        playerPos[1]--
   } else if ( key ==  'd' ) {
        playerPos[0]++
   } else if ( key ==  'a' ) {
        playerPos[0]--
    }
}

function draw() {
    run()

    fill(0)

	for ( let i = 0; i < tileY; i++ ) {
		for ( let j = 0; j < tileX; j++ ) {
			fill(bgColor)
			rect(j*tileRes, i*tileRes, tileRes, tileRes)
		}
	}
    
    playerSprite.displaySprite(playerPos[0], playerPos[1], tileRes, playerSprite.tileRelativeSize(tileRes))
}