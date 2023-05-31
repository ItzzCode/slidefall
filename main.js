var debug = true

var tileRes = 105
var tileX = 8
var tileY = 5
var bgColor = 255

var timeElapsed = 0
var physicsTime = 0

// every frames per second
var tickSpeed = 20

var selectedPlatform = 0

class sprite {
    // 2d list of RGBA values
    spriteData = [[[127, 127, 127, 1]]]
    
    // Colors
    static none = [0,0,0,0]

    static black = [0,0,0,1]
    static grey = [127,127,127,1]
    static gray = this.grey
    static white = [255,255,255,1]

    static red = [255,0,0,1]
    static green = [0,255,0,1]
    static blue = [0,0,255,1]

    static yellow = [255,255,0,1]
    static magenta = [255,0,255,1]
    static cyan = [0,255,255,1]

    static orange = [255,165,0,1]
    static brown = [166,104,41,1]
    
    constructor( spriteData ) {
        this.spriteData = spriteData
    }
}

class entity {
    sprite = new sprite()
    attributes = {}
    constructor( sprite, attributes ) {
        this.sprite = sprite
        this.attributes = attributes
    }

    displaySprite( x, y, tileSize, size ) {
        noStroke()
        for( let i=0; i < this.sprite.spriteData.length; i++ ) {
            for( let j=0; j < this.sprite.spriteData.length; j++ ) {
                let color = this.sprite.spriteData[i][j]
                fill(`rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`)
                rect((x*tileSize+j*size), (y*tileSize+i*size), size, size)
            }
        }
        stroke(0)
    }

    tileRelativeSize( tileSize ) {
        return tileSize / this.sprite.spriteData[0].length
    }
}

var sprites = {
    "player": new sprite(
        [
            [ sprite.none, sprite.none, sprite.none, sprite.black, sprite.none, sprite.none, sprite.none ],
            [ sprite.none, sprite.none, sprite.black, sprite.black, sprite.black, sprite.none, sprite.none ],
            [ sprite.none, sprite.black, sprite.none, sprite.black, sprite.none, sprite.black, sprite.none ],
            [ sprite.none, sprite.black, sprite.none, sprite.black, sprite.none, sprite.black, sprite.none ],
            [ sprite.none, sprite.none, sprite.none, sprite.black, sprite.none, sprite.none, sprite.none ],
            [ sprite.none, sprite.none, sprite.black, sprite.none, sprite.black, sprite.none, sprite.none ],
            [ sprite.none, sprite.none, sprite.black, sprite.none, sprite.black, sprite.none, sprite.none ],
        ]
    ),
    "platform": new sprite(
        [
            [ sprite.black, sprite.black, sprite.black ],
            [ sprite.none, sprite.black, sprite.none ],
            [ sprite.none, sprite.none, sprite.none ],
        ]
    ),
    "test": new sprite(
        [
            [ sprite.red, sprite.green, sprite.blue ],
            [ sprite.yellow, sprite.magenta, sprite.cyan ],
            [ sprite.orange, sprite.brown, sprite.grey ]
        ]
    )
}

var entities = []
entities.push(new entity(
    sprites["player"],
    {
        "type": "player",
        "position": [0, 0]
    }
))

function checkHit() {
    if (
        entities[getPlayerIndex()].attributes["position"][0] >= tileX || 
        entities[getPlayerIndex()].attributes["position"][0] < 0 ||
        entities[getPlayerIndex()].attributes["position"][1] >= tileY ||
        entities[getPlayerIndex()].attributes["position"][1] < 0 
    ) {
        entities[getPlayerIndex()].attributes["position"] = [0, tileY-1] 
    }
}

function addPlatforms() {
    for ( let i = 0; i < tileY; i++ ) {
        entities.push(new entity(
            sprites["platform"],
            {
                "type": "platform",
                "position": [i % tileX + 1, i]
            }
        ))
    }
}

function getPlayerIndex() {
    // there's gotta be a better way 
    return entities.indexOf(entities.find(element => element.attributes["type"] == "player"))
}

function platforms() {
    return entities.reduce((arr, element, i) => (
        (element.type == 'platform') && arr.push(i), arr), []
    )
}

function setup() {
	//createCanvas(800, 600);
	createCanvas(tileX*tileRes, tileY*tileRes)
	textAlign(LEFT, TOP)
    
    addPlatforms()
}

function run() {

    // time keeping
    timeElapsed++
    if ( entities[getPlayerIndex()].attributes["position"][1] != tileY-1 ) physicsTime++
    else physicsTime = 0

    checkHit()
 
    // Gravity ._.
    if ( physicsTime % tickSpeed == 0 && entities[getPlayerIndex()].attributes["position"][1] < tileY - 1 ) {
        entities[getPlayerIndex()].attributes["position"][1]++
    }

    // for testing, moving the platforms
    /*if ( timeElapsed % tickSpeed == 0 ) entities.forEach(element => {
        if ( element.attributes["type"] == "platform" ) {
            element.attributes["position"][0] += element.attributes["position"][0] == tileX - 1 ? -(tileX-1) : 1
        }
    });*/
}

function keyPressed() {
    // Movement
    switch ( keyCode ) {
        case DOWN_ARROW:
            if(entities[getPlayerIndex()].attributes["position"][1] < tileY - 1)
            entities[getPlayerIndex()].attributes["position"][1]++
            break;

        case UP_ARROW:
            if(entities[getPlayerIndex()].attributes["position"][1] > 0)
            entities[getPlayerIndex()].attributes["position"][1]--
            break;

        case RIGHT_ARROW:
            if(entities[getPlayerIndex()].attributes["position"][0] < tileX - 1)
            entities[getPlayerIndex()].attributes["position"][0]++
            break;

        case LEFT_ARROW:
            if(entities[getPlayerIndex()].attributes["position"][0] > 0)
            entities[getPlayerIndex()].attributes["position"][0]--
            break;
        
        default:
            break;
    }

    // Platforms
    switch ( key ) {
        case 'w':
            if ( platforms() )
            selectedPlatform -= 1
            break;
        
        case 's':
            selectedPlatform += 1
            break;
    
        default:
            break;
    }
}

function draw() {
    run()

	for ( let i = 0; i < tileY; i++ ) {
		for ( let j = 0; j < tileX; j++ ) {
			fill(bgColor)
			rect(j*tileRes, i*tileRes, tileRes, tileRes)
		}
	}

    //debug
    if ( debug ) {
        fill(0)
        textSize(20)
        text(entities[getPlayerIndex()].attributes["position"],0,0)
        text(timeElapsed,0,tileRes*1)
        text(physicsTime,0,tileRes*2)
        text(selectedPlatform,0,tileRes*3)
    }

    // display entities
    entities.forEach(element => {
        element.displaySprite(
            element.attributes["position"][0],
            element.attributes["position"][1],
            tileRes,
            element.tileRelativeSize(tileRes)
        )
    });
}