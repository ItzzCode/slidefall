var tileRes = 50
var tileX = 8
var tileY = 5
var bgColor = 100

class sprite {
    // 2d list of RGBA values
    spriteData = [[[127, 127, 127, 1]]]
    attributes = {}
    constructor( spriteData, attributes ) {
        this.spriteData = spriteData
        this.attributes = attributes
    }
    
    displaySprite( x, y, size ) {
        noStroke()
        for( let y=0; y < this.spriteData.length; y++ ) {
            for( let x=0; x < this.spriteData.length; x++ ) {
                let color = this.spriteData[y][x]
                fill(`rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`)
                rect(x*size, y*size, 1, 1)
            }
        }
        noStroke()
    }
}

function setup() {
	//createCanvas(800, 600);
	createCanvas(tileX*tileRes, tileY*tileRes)
	textAlign(LEFT, TOP)
}

function draw() {
	for( let i = 0; i < tileY; i++ ) {
		for( let j = 0; j < tileX; j++ ) {
			fill(bgColor)
			rect(j*tileRes, i*tileRes, tileRes, tileRes)
		}
	}
    var a = new sprite([
        [
            [255, 0, 255, 1], [251, 72, 93, 1]
        ],[
            [255,99,99,0.7], [10, 2, 200, 1]
        ]
    ], {})
    a.displaySprite(0, 0, tileRes)
}