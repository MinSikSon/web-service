document.addEventListener(`DOMContentLoaded`, function () {
    console.log(`ready`);
});

function AddToDoByEnter() {
    console.log(`AddToDoByEnter`);
    let bEnterPressed = window.event.keyCode === 13;
    if (false === !!bEnterPressed) {
        return;
    }
    AddToDo();
}

class Content {
    constructor(itemId, text) {
        this.itemId = itemId;
        this.text = text;
        this.checked = false;
    }

    create() {
        let new_item = document.createElement(`div`);
        let classGroupName = `item_${this.itemId}`;
        new_item.className = `contents ${classGroupName}`;
        new_item.id = `item_${this.itemId}`; // classGroupName 과 동일. delete 시 사용
        // new_item.onclick = FinishToDo;
        let to_do_list = document.getElementById(`to-do-list`);
        to_do_list.appendChild(new_item);

        // create element div - content_1
        let new_item_content_1 = document.createElement(`div`);
        new_item_content_1.className = `${classGroupName}`;
        new_item_content_1.id = `item_${this.itemId}_content_1`;
        new_item_content_1.innerText = this.text;
        new_item_content_1.onclick = FinishToDo;

        new_item.appendChild(new_item_content_1);

        // create element button - content_2
        let new_item_content_2 = document.createElement(`button`);
        new_item_content_2.className = `${classGroupName}`;
        new_item_content_2.id = `item_${this.itemId}_content_2`;
        new_item_content_2.innerText = `x`;
        new_item_content_2.onclick = DeleteItemAndRebuildList; // TODO: click 하면 list 에서 제거
        new_item.appendChild(new_item_content_2);

        document.getElementById(`input-main`).value = ``; // clear <input>
    }

    FinishToDo() {
        console.log(`FinishToDo() id: ${this.id}`);
        let prevColor = document.getElementById(`${this.id}`).style.color;
        console.log(`prevColor: ${prevColor}`);
        if (prevColor === `red`) {
            document.getElementById(`${this.id}`).style.color = `black`;
        }
        else {
            document.getElementById(`${this.id}`).style.color = `red`;
        }
    }
}

function DeleteItemAndRebuildList() {
    console.log(`[DeleteItemAndRebuildList]`);
    console.log(`this.className: ${this.className}`);
    document.getElementsByClassName(this.className)[0].innerHTML = ``;
}

function FinishToDo() {
    console.log(`FinishToDo() id: ${this.id}`);
    let prevColor = document.getElementById(`${this.id}`).style.color;
    console.log(`prevColor: ${prevColor}`);
    if (prevColor === `red`) {
        document.getElementById(`${this.id}`).style.color = `black`;
    }
    else {
        document.getElementById(`${this.id}`).style.color = `red`;
    }
}


let itemIdx = 0;
function AddToDo() {
    let inputValue = document.getElementById(`input-main`).value;
    if (inputValue === ``) {
        return;
    }

    // create element div - item
    let new_item = new Content(itemIdx++, inputValue);
    new_item.create();
}

