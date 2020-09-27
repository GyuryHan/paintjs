const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 400;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else
        ctx.lineTo(x, y);
        ctx.stroke();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // ctx.fillRect(시작할x좌표, y좌표, 사각형의 크기);
    }
}

function hadleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

//모바일
function handleStart(event) {
    // console.log(event);
    event.preventDefault();
    if(mode === 'fill'){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }else {
        ctx.beginPath();
        startPainting();
  }
}

function handleMove(event) {
    event.preventDefault();
    var touches = event.changedTouches;
    ctx.lineTo(touches[0].screenX, touches[0].screenY);
    ctx.stroke();
  }

function handleEnd(event) {
    event.preventDefault();
    ctx.closePath();
    stopPainting();
 }

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    // 캔버스를 클릭했을 때
    canvas.addEventListener("mouseup", stopPainting);
    // 마우스를 뗐을 때
    canvas.addEventListener("mouseleave", stopPainting);
    // 마우스가 캔버스를 나갔을 때
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", hadleCM);
    // 마우스 우클릭했을 때 저장버튼 안나오게
    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchmove", handleMove, false);
    canvas.addEventListener("touchend", handleEnd, false);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
    );
    // color의 값은 potato여도 상관없음

if(range) {
    range.addEventListener("input", handleRangeChange)
}

if(mode) {
    mode.addEventListener("click", handleModeClick)
}

if(save) {
    save.addEventListener("click", handleSaveClick)
}

