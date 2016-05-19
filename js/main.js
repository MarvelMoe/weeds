function colorMaker() {
    var streams = []
    var numPoints = 3
    var gravity = 0.1
    var canvas = document.getElementById("canvas")
    var context = canvas.getContext("2d")
    var width = canvas.width
    var height = canvas.height
    var weedMaker = {
        x: width * Math.random() * 1,
        y: height
    }

    function initialize(p) {
        p.x = weedMaker.x
        p.y = weedMaker.y
        p.vx = Math.random() * 4 - 2
            // randomize in multiple directions
        p.vy = Math.random() * -5 - 4
            // random negative value for vertical drawing
        p.radius = Math.random() * 2 + 1
            // randomize sizes
        p.color = makeGreen()
            // randomize  green from array
    }

    function makeGreen() {
            var colorArray = ["rgb(124,252,0)", "rgb(50,205,50)",
                "rgb(34,139,34)", "rgb(173,255,47)", "rgb(0,255,127)",
                "rgb(46,139,87)", "rgb(107,142,35)", "rgb(0,128,0)"
            ]
            var number = Math.floor(Math.random() * colorArray.length);
            return colorArray[number]
        }
        // randomly shoots 8 different shades of green 

    function update() {

            var len = streams.length
            for (var i = 0; i < len; i += 1) {
                var dot = streams[i]
                dot.vy += gravity
                dot.x += dot.vx
                dot.y += dot.vy
                if (dot.x > width ||
                    dot.x < 5 ||
                    dot.y > height ||
                    dot.y < 5) {
                    initialize(dot)
                }
            }
        }
        //makes sure they reproduce like horny rabbits 

    function draw() {

        var tall = streams.length;
        context.fillStyle = "rgba(0,0,0,0.0)";
        context.fillRect(0, 0, width, height);
        for (var i = 0; i < tall; i += 1) {
            var dot = streams[i];
            context.fillStyle = dot.color;
            context.beginPath();
            context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, false);
            context.fill();
            context.shadowColor = "#000"
            context.shadowOffsetX = 10;
            context.shadowOffsetY = 10;
            context.shadowBlur = 10;
            //opacity must be 0.0 on fillStyle and shadow gives 3D effect

        }
    }

    function addDot() {
            var dot;
            if (streams.length < numPoints) {
                dot = {};
                initialize(dot);
                streams.push(dot);
            }
        }
        //incrementing colors via update function

    setInterval(function() {
        addDot();
        update();
        draw();

    }, 1000 / 36);
    //36 fps is about right

    document.getElementById('button').addEventListener('click', function() {
        streams = 0;
        context.clearRect(0, 0, 1200, 1000);
    }, false);

}
canvas.addEventListener("click", colorMaker)