const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
lines = 32

points = []
for (i=0;i <= lines;i++){
  points[i] = [];
  for (j=0;j <= lines;j++){
    points[i][j] = Math.floor((Math.random() * 100)+1);
  }
}
points[0][lines] = 1;
points[lines][0] = 1;
function draw(){
  sf=canvas.width/lines
  context.fillStyle = '#f7f7f7';
  context.fillRect(0,0,canvas.width,canvas.height)
  context.strokeStyle="#027bd8";
  for (i = 0; i <= canvas.height ;i+= (sf)){
    line([0,i],[canvas.width,i])
    line([i,0],[i,canvas.height])
  }
  context.strokeStyle="black";
  for (i=0;i < points.length;i++){
    for(j=0; j < points[i].length;j++){
      if (points[i][j] == 1){
        point(i*(sf),j*(sf))
      }
    }
  }
}
function line(start,end){
  context.beginPath();
  context.moveTo(start[0],start[1]);
  context.lineTo(end[0],end[1]);
  context.stroke();
}
function point(x,y){
  context.beginPath();
  context.arc(x, y, 2, 0, 2 * Math.PI, false);
  context.stroke();
}
function round(number, precision) {
  var shift = function (number, exponent) {
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + exponent) : exponent));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}
function path(){
  context.strokeStyle="black";
  last = [0,lines*sf];
  final = [lines*sf,0];
  for (i=0;i <= lines;i++){
    corner = false
    for (j=0;j<=(i*2);j++){
      if (i / j == 1){
        corner = true
        y = lines - j
      }
      context.fillStyle = "black";
      context.font = "bold 16px Arial";
      if (!corner){
        if(points[i][lines - j] == 1 && last[0] < i*sf && last[1] >(lines - j)*sf && final[0] > i*sf && final[1] <(lines - j)*sf){
          line(last,[i*sf,(lines - j)*sf])
          context.fillText(round(-1*((lines - j)*sf -last[1])/((i*sf)-last[0]),3), ((i*sf) + last[0])/2, ((lines - j)*sf + last[1])/2);
          last = [i*sf,(lines - j)*sf]
        }
      } else {
        if(points[j-i][y] == 1 && last[0] < (j-i)*sf && last[1] > y*sf && final[0] > (j-i)*sf && final[1] < y*sf){
          line(last,[(j-i)*sf, y*sf])
          context.fillText(round(-1*((y*sf)-last[1])/(((j-i)*sf)-last[0]),3), ((j-i)*sf + last[0])/2, (y*sf + last[1])/2);
          last = [(j-i)*sf, y*sf]
        }
      }
    }
  }
  line(last,final)
  context.fillText(round(-1*(final[1]-last[1])/(final[0]-last[0]),3), (final[0] + last[0])/2, (final[1] + last[1])/2);
}
function mainLoop() {
draw()
path()
if (lines != document.getElementById("lines").value){
  lines = document.getElementById("lines").value;
  points = []
  for (i=0;i <= lines;i++){
    points[i] = [];
    for (j=0;j <= lines;j++){
      points[i][j] = Math.floor((Math.random() * 100)+1);;
    }
  }
  points[0][lines] = 1;
  points[lines][0] = 1;
}
requestAnimationFrame(mainLoop);
}
mainLoop();
