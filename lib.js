class ElementCreator {
    static ClearValueById(_id) {
        document.getElementById(_id).value = ``;
    }
    static ClearInnerTextById(_id) {
        document.getElementById(_id).innerText = ``;
    }
    static ClearInnerHtmlById(_id) {
        document.getElementById(_id).innerHTML = ``;
    }
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
        return input;
    }
    static CreateLi(_attr) {
        let li = document.createElement(`li`);
        li.innerText = _attr.innerText;
        li.innerHTML = _attr.innerHTML;
        // li.className = `content`;
        li.style = _attr.style;
        return li;
    }

    static CreateCanvas(attr) {
        let canvas = document.createElement(`canvas`);
        canvas.className = attr.className;
        canvas.id = attr.id;
        canvas.style = attr.style;

        return canvas;
    }

}