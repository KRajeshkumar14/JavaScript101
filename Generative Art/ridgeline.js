//initial boilerplate setup for canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d')

var size = 500;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
ctx.scale(dpr, dpr);
ctx.lineWidth = 2;

//now to set-up the lines and points
var step = 10;
var lines = [];

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//and on to create the flippin' lines
for(var i =step; i <= size - step; i += step) {
    var line = []
    for(var j = step; j <= size - step; j += step) {
        var distanceToCenter = Math.abs(j - size / 2);
        var variance = Math.max(size / 2 - 50 - distanceToCenter,0);
        var random = Math.random()*variance/3 *-1;
        var point = {x: j, y: i + random};
        line.push(point);
    }
    lines.push(line);
}

//define a color palette for the strokes
var stroke_colors = ['#F71F1F','#323232', '#9C9999', '#707070', '#FAFAFA']

//now to draw all of em'
for(var i = 5; i < lines.length - 2; i++) {
    ctx.beginPath();
    ctx.moveTo(lines[i][0].x, lines[i][0].y);

    for(var j = 0; j < lines[i].length - 2; j++) {
        var xc = (lines[i][j].x + lines[i][j + 1].x)/2;
        var yc = (lines[i][j].y + lines[i][j + 1].y)/2;
        ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
    }
    ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
    ctx.strokeStyle = stroke_colors[i % stroke_colors.length]
    ctx.fillStyle = "black"
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fill();
    ctx.restore();
    ctx.stroke();
}
