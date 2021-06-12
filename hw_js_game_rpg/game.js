// 모기 잡기 게임으로 전환
// 마우스 이동 최단거리

function main() {
    document.addEventListener(`DOMContentLoaded`, function () {
        console.log(`GAME START!`);
        document.getElementById(`info_id`).innerText = `LEVEL: ${gameStatus.level}, SCORE: ${gameStatus.curLevelScore} (TOTAL: ${gameStatus.sumScore})`;
        gameStatus.time.push(new Date());
        gameStatus.Init();
        if (gameStatus.start === false) {
            gameStatus.start = true;
            myLoop();
        }
    });
}
main();

document.getElementsByTagName(`html`)[0].onkeypress = function (e) {
    if (e.key === `Enter`) {
        console.log(e.key, gameStatus.start);
        if (gameStatus.start === false) {
            gameStatus.Init();
            gameStatus.start = true;
            myLoop();
        }
        else {
            gameStatus.Init();
        }
        console.log(e.key, gameStatus.start);
    }
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
let gameStatus = {
    level: 0,
    interval: 2500,
    curLevelScore: 0,
    sumScore: 0,
    loopCount: 0,
    canvasList: new Array(),
    time: new Array(),
    start: false,
    Init: function () {
        for (canvas of this.canvasList) {
            console.log(canvas);
            canvas.remove();
        }
        this.loopCount = 0;
        this.start = false;
        this.sumScore = 0;
        this.curLevelScore = 0;
        this.level = 0;
        document.getElementById(`info_id`).innerText = `LEVEL: ${gameStatus.level}, SCORE: ${gameStatus.curLevelScore} (TOTAL: ${gameStatus.sumScore})`;
    }
}
function myLoop() {
    let interval = gameStatus.interval - (200 * gameStatus.level);
    setTimeout(function () {
        newCanvas();
        gameStatus.loopCount++;
        console.log(interval, gameStatus.loopCount);
        if (gameStatus.start === true) {
            if (gameStatus.loopCount < 15) {
                myLoop();
            }
            else {
                console.log(`GAME END`);
                alert(`END! \n재시작 하려면 Enter 키를 누르세요.`);
                gameStatus.Init();
                return;
            }
        }
    }, interval);
}

function newCanvas() {
    console.log(gameStatus.canvasList.length);
    let canvas = ElementCreator.CreateCanvas({
        className: `canvasClass`,
        id: `canvas_id_${gameStatus.canvasList.length}_${gameStatus.sumScore}`,
        style: `position:fixed; left:${getRandomArbitrary(0, 500)}px; top:${getRandomArbitrary(0, 500)}px; width:${50 - (gameStatus.level * 5)}px; height:${50 - (gameStatus.level * 5)}px; background:green;`
    });

    canvas.onclick = RemoveCanvas;
    document.getElementById(`container_id`).appendChild(canvas);
    gameStatus.canvasList.push(canvas);
}

function RemoveCanvas(e) {
    console.log(`[RemoveCanvas]`, e.toElement);
    gameStatus.canvasList.pop(e.toElement);
    console.log(`gameStatus.canvasList`, gameStatus.canvasList);
    e.toElement.remove();
    gameStatus.curLevelScore++;
    gameStatus.sumScore++;
    document.getElementById(`info_id`).innerText = `LEVEL: ${gameStatus.level}, SCORE: ${gameStatus.curLevelScore} (TOTAL: ${gameStatus.sumScore})`;
    if (gameStatus.curLevelScore === 5) {
        gameStatus.loopCount = 100; // stop
        console.log(gameStatus.canvasList.length, gameStatus.canvasList);
        for (canvas of gameStatus.canvasList) {
            console.log(canvas);
            canvas.remove();
        }
        gameStatus.level++;
        gameStatus.curLevelScore = 0;
        gameStatus.loopCount = 0; // stop
        gameStatus.time.push(new Date());
        document.getElementById(`info_id`).innerText = `LEVEL: ${gameStatus.level}, SCORE: ${gameStatus.curLevelScore} (TOTAL: ${gameStatus.sumScore})`;
        let sec = getTime(gameStatus.time[gameStatus.level], gameStatus.time[gameStatus.level - 1]);
        document.getElementById(`info_id`).innerText += `\nLEVEL ${gameStatus.level - 1} 기록: ${sec}`;

        if (gameStatus.level === 10) {
            alert(`게임 성공!!!!\n재시작 하려면 Enter 키를 누르세요.`);
            gameStatus.start = false;
        }
    }
}

function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let hh = `오후`;
    if (date.getHours() < 12) {
        hh = `오전`;
    }
    let hour = ("0" + date.getHours()).slice(-2);
    let minute = ("0" + date.getMinutes()).slice(-2);
    // return year + "-" + month + "-" + day;
    return hh + " " + hour + ":" + minute;
}

function getTime(end, start) {
    let interval = end - start;
    console.log(`interval`, interval);
    // return year + "-" + month + "-" + day;
    return interval / 1000;
}