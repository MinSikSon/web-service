class Quiz {
    static QUIZ_ORDER = 0;
    static QUIZ_LIST = [];
    static QUIZ_NUMBER = 0;
    static QUIZ_SELECT = [];
    constructor(_title, _select, _answerIdx) {
        this.num = Quiz.QUIZ_NUMBER++;
        this.title = _title;
        this.select = Array();
        this.answerIdx = _answerIdx;

        this.divTitle = ElementCreator.CreateDiv({ className: `quiz`, id: this.quizId });
        this.divTitle.innerText = this.title;

        this.divRadio = Array();
        for (let i = 0; i < _select.length; i++) {
            this.select.push(_select[i]);
            this.divRadio.push(ElementCreator.CreateRadio({ className: `radio`, id: i, innerText: _select[i], value: i }));
            this.divRadio[i].onclick = function () {
                console.log(this);
            }
        }
        Quiz.QUIZ_LIST.push(this);
    }

    get quizId() {
        return `quiz` + this.num;
    }
}

class ElementCreator {
    static CreateDiv(_attr) {
        let div = document.createElement(`div`);
        div.id = _attr.id;
        div.className = _attr.className;
        div.innerText = _attr.innerText;
        return div;
    }
    static CreateRadio(_attr) {
        // console.log(_attr);
        let label = this.CreateLabel({ className: _attr.className + `-label`, id: `label` + _attr.id, innerText: _attr.innerText });
        let radio = this.CreateInput({ type: `radio`, name: `radio-option`, className: _attr.className + `-button`, id: `radio` + _attr.id, innerText: _attr.innerText });

        label.appendChild(radio);
        return label;
    }

    static CreateLabel(_attr) {
        let label = document.createElement(`label`);
        label.className = _attr.className;
        label.id = _attr.id;
        label.innerText = _attr.innerText;

        return label;
    }

    static CreateInput(_attr) {
        // console.log(`[CreateInput]`, _attr);
        let input = document.createElement(`input`);
        input.type = _attr.type;
        input.name = _attr.name;
        input.className = _attr.className;
        input.id = _attr.id;
        input.innerText = _attr.innerText;
        return input
    }

    static ClearInnerHtmlById(_id) {
        document.getElementById(_id).innerHTML = ``;
    }
}

document.addEventListener(`DOMContentLoaded`, function () {
    console.log(`[DOMContentLoaded]`);

    RegistQuiz();

    // display first Quiz
    DisplayQuiz();
});

document.getElementById(`next-button`).onclick = function () {
    let radio = document.getElementsByClassName(`radio-button`);
    console.log(radio);
    let select = false;
    for (let i = 0; i < radio.length; i++) {
        if (true === !!radio[i].checked) {
            Quiz.QUIZ_SELECT.push(i);
            select = true;
            break;
        }
    }
    console.log(`Quiz.QUIZ_SELECT:`, Quiz.QUIZ_SELECT);

    if (false === select) {
        alert(`답 선택해!!`);
        return;
    }

    ClearQuiz();
    if (Quiz.QUIZ_ORDER < Quiz.QUIZ_NUMBER) {
        DisplayQuiz();
    }
    else if (Quiz.QUIZ_ORDER === Quiz.QUIZ_NUMBER) {
        DisplayFinal();
        // alert(`끝!!`);
    }
}

function RegistQuiz() {
    new Quiz(`1+1 ?`, [1, 2, 3, 4, 5], 1);
    new Quiz(`내 나이는?`, [31, 32, 33, 34, 35], 2);
    new Quiz(`매드몬스터 멤버 이름이 아닌 것은?`, [`탄`, `제이호`, `포켓몬스터`], 2);
    console.log(Quiz.QUIZ_LIST);
}


function DisplayQuiz() {
    document.getElementById(`quiz-id`).innerText = Quiz.QUIZ_ORDER;
    document.getElementById(`quiz-title`).appendChild(Quiz.QUIZ_LIST[Quiz.QUIZ_ORDER].divTitle);
    for (let i = 0; i < Quiz.QUIZ_LIST[Quiz.QUIZ_ORDER].divRadio.length; i++) {
        document.getElementById(`quiz-select`).appendChild(Quiz.QUIZ_LIST[Quiz.QUIZ_ORDER].divRadio[i]);
    }

    Quiz.QUIZ_ORDER++;
}

function DisplayFinal() {
    let divTitle = ElementCreator.CreateDiv({ innerText: `당신의 점수는...!` });
    document.getElementById(`quiz-title`).appendChild(divTitle);
    let score = 0;
    for (let i = 0; i < Quiz.QUIZ_NUMBER; i++) {
        if (Quiz.QUIZ_SELECT[i] === Quiz.QUIZ_LIST[i].answerIdx) {
            score += 10;
        }
    }
    let divScore = ElementCreator.CreateDiv({ innerText: `점수: ${score} / ${Quiz.QUIZ_NUMBER * 10}` });
    document.getElementById(`quiz-select`).appendChild(divScore);

}

function ClearQuiz() {
    ElementCreator.ClearInnerHtmlById(`quiz-title`);
    ElementCreator.ClearInnerHtmlById(`quiz-select`);
}