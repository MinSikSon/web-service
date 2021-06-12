
let chatCount = 0;
let userNameList = [`박범진`, `see K`, `lyn C`, `SMS`];

// document.getElementById(`chat`).onkeyup = function (e) {
document.getElementById(`chat`).onkeypress = function (e) {
    if (e.code === `Enter` && e.target.value !== ``) {
        let _style = ``;
        if (chatCount % 2 === 1) {
            // _style = `margin-left:50%;`
        }
        let date = getToday();

        let _innerHTML = `<b>${userNameList[chatCount % 4]}</b> ${date}<br>${e.target.value}`
        let li = ElementCreator.CreateLi({ innerHTML: _innerHTML, style: _style });
        document.getElementById(`chat-screen`).appendChild(li);
        ElementCreator.ClearValueById(`chat`);
        chatCount++;

        console.log(`height`, height, document.getElementById(`chat`).scrollTop, document.getElementById(`chat`));
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