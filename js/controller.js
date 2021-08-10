'use strict'
const gElCanvas = document.getElementById('my-canvas');
const gCtx = gElCanvas.getContext('2d');
let gColor
let gCanvasColor
let gCurrBrushSize

let gCurrPos;
let gPrevPos;
let gCurrShape = 'line';
let gIsDrawing = false;
const gTouchEvs = ['touchmove', 'touchstart', 'touchend'];

function onInit() {
 gColor='#e66465';
 gCurrBrushSize = 3;

    gCanvasColor='#FFF9F1'
    resizeCanvas()
    addListeners();
}
function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}
function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}
function onDown(ev) {
    gPrevPos = getEvPos(ev);
    gIsDrawing = true;
}
function onMove(ev) {
    if (!gIsDrawing) return;
    gCurrPos = getEvPos(ev);
    drawShape();
    gPrevPos = gCurrPos;
}
function onUp() {
    gIsDrawing = false;
}
function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos;
}
function drawShape() {

    switch (gCurrShape) {
        case 'rect':
            drawRect();
            break;
        case 'line':
            drawLine();
            break;  
        case 'circle':
            drawCircle();
            break;  
            case 'triangle':
                drawTriangle();
                break;  

    }
}

function drawRect() {
    const width = Math.abs(gCurrPos.x - gPrevPos.x)
    const height = Math.abs(gCurrPos.y - gPrevPos.y)
    const newX = gCurrPos.x - width / 2;
    const newY = gCurrPos.y - height / 2;

    gCtx.beginPath();
    gCtx.lineWidth =gCurrBrushSize;
    gCtx.rect(newX, newY, width, height);
    gCtx.strokeStyle = gColor;
    gCtx.stroke();
}

function drawCircle() {
    const radious = Math.abs(gCurrPos.x - gPrevPos.x);
    gCtx.beginPath();
    gCtx.lineWidth =gCurrBrushSize;
    gCtx.arc(gCurrPos.x, gCurrPos.y, radious, 0, 2 * Math.PI);
    gCtx.strokeStyle = gColor;
    gCtx.stroke();

}

function drawLine() {
    gCtx.lineWidth = gCurrBrushSize;
    gCtx.moveTo(gCurrPos.x, gCurrPos.y)
    gCtx.lineTo(gPrevPos.x, gPrevPos.y)
    gCtx.strokeStyle = gColor;
    gCtx.stroke();

    gPrevPos.x = gCurrPos.x;
    gPrevPos.y = gCurrPos.y;
}
function onSetShape(shape) {
    setShape(shape)
}
function onSetColor(color) {
    setColor(color)
}
function onSetCanvasColor(color) {
    setCanvasColor(color)
    renderCanvas()
}
function onSetBrushSize(size) {
    setBrushSize(size)
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
function renderCanvas() {
    gCtx.save()
    gCtx.fillStyle = gCanvasColor
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.restore()
}
function onClear(){
    document.querySelector('.bg-color').value='#FFF9F1'
    document.querySelector('.b-color').value='#e66465'
    document.querySelector('.brush').value='1'
    onInit()

}