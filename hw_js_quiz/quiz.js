const DEBUG = false;

class Quiz {
    static QUIZ_ORDER = 0;
    static QUIZ_NUMBER = 0;
    static QUIZ_LIST = [];
    static QUIZ_SELECT = [];
    constructor(_title, _select, _answerIdx) {
        this.num = Quiz.QUIZ_NUMBER;
        Quiz.QUIZ_NUMBER += 1;
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
                if (DEBUG === true) console.log(this);
            }
        }
        Quiz.QUIZ_LIST.push(this);
    }

    get quizId() {
        return `quiz` + this.num;
    }

    setAnser(_idx) {
        this.answerIdx = _idx;
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
        if (DEBUG === true) console.log(_attr);
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
        if (DEBUG === true) console.log(`[CreateInput]`, _attr);
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
    if (DEBUG === true) console.log(`[DOMContentLoaded]`);

    RegistQuiz();

    // display first Quiz
    DisplayNextQuiz();
});

document.getElementById(`next-button`).onclick = function () {
    let radio = document.getElementsByClassName(`radio-button`);
    if (DEBUG === true) console.log(radio);
    let select = false;
    for (let i = 0; i < radio.length; i++) {
        if (true === !!radio[i].checked) {
            Quiz.QUIZ_SELECT.push(i);
            select = true;
            break;
        }
    }
    if (DEBUG === true) console.log(`Quiz.QUIZ_SELECT:`, Quiz.QUIZ_SELECT);

    if (false === select) {
        alert(`답 선택해!!`);
        return;
    }

    ClearQuiz();
    if (Quiz.QUIZ_ORDER < Quiz.QUIZ_NUMBER) {
        if (Quiz.QUIZ_ORDER + 1 === Quiz.QUIZ_NUMBER) {
            let score = 0;
            for (let i = 0; i < Quiz.QUIZ_NUMBER - 1; i++) {
                if (Quiz.QUIZ_SELECT[i] === Quiz.QUIZ_LIST[i].answerIdx) {
                    score++;
                }
            }
            Quiz.QUIZ_LIST[Quiz.QUIZ_ORDER].setAnser(score);
        }
        DisplayNextQuiz();
    }
    else if (Quiz.QUIZ_ORDER === Quiz.QUIZ_NUMBER) {
        DisplayFinal();
        // alert(`끝!!`);
    }
}

function DisplayNextQuiz() {
    // quiz 출력
    document.getElementById(`quiz-title`).appendChild(Quiz.QUIZ_LIST[Quiz.QUIZ_ORDER].divTitle);
    for (let i = 0; i < Quiz.QUIZ_LIST[Quiz.QUIZ_ORDER].divRadio.length; i++) {
        document.getElementById(`quiz-select`).appendChild(Quiz.QUIZ_LIST[Quiz.QUIZ_ORDER].divRadio[i]);
    }

    // footer 에 quiz 번호 출력
    document.getElementById(`quiz-id`).innerText = `${Quiz.QUIZ_ORDER + 1} / ${Quiz.QUIZ_NUMBER}`;

    Quiz.QUIZ_ORDER++;
}

function DisplayFinal() {
    let divTitle = ElementCreator.CreateDiv({ innerText: `당신의 점수는...!` });
    document.getElementById(`quiz-title`).appendChild(divTitle);

    // 점수계산
    let score = 0;
    for (let i = 0; i < Quiz.QUIZ_NUMBER; i++) {
        if (Quiz.QUIZ_SELECT[i] === Quiz.QUIZ_LIST[i].answerIdx) {
            score++;
        }
    }

    let divScore = ElementCreator.CreateDiv({ innerText: `점수: ${rescaleScore(score)} / ${rescaleScore(Quiz.QUIZ_NUMBER)}` });
    document.getElementById(`quiz-select`).appendChild(divScore);
}

function rescaleScore(_score) {
    return (_score / Quiz.QUIZ_NUMBER) * 100;
}

function ClearQuiz() {
    ElementCreator.ClearInnerHtmlById(`quiz-title`);
    ElementCreator.ClearInnerHtmlById(`quiz-select`);
}

function RegistQuiz() {
    // new Quiz(제목, 문제, 답);
    new Quiz(`궁금한거? = ?`, [1, 2, 3, 4, 5], 1);
    new Quiz(`1 + 1 = ?`, [1, 2, 3, 4, 5], 1);
    new Quiz(`내 나이는 몇 살 일까요??`, [`31살`, 32, 33, 34, 35], 2);
    new Quiz(`매드몬스터 멤버가 아닌 것을 고르시오.`, [`탄`, `제이호`, `포켓몬스터`], 2);
    new Quiz(`주식 연 수익이 24% 일 때, 자본이 2배가 될 때까지 얼마나 걸릴까요?`, [`3년`, `4년`, `5년`, `6년`], 0);
    new Quiz(`지금까지 총 몇 문제 맞춘거 같나요?`, [0, 1, 2, 3, 4], 4);
    new Quiz(`하이!!`, [0, 1, 2, 3, 4], 3);
    if (DEBUG === true) console.log(Quiz.QUIZ_LIST);
}