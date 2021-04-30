let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main-container");
let body = document.body;
let plusBtn = document.querySelector(".fa-plus");
let delBtn = document.querySelector(".fa-times");
let deleteState = false;



plusBtn.addEventListener("click", createModal);
delBtn.addEventListener("click", setDeleteState);


function createModal() {
    let modal_container = document.querySelector(".modal_container");
    if (modal_container == null) {
        modal_container = document.createElement("div");
        modal_container.setAttribute("class", "modal_container");
        modal_container.innerHTML = `<div class="input_container">
    <textarea class="modal_input" placeholder="Enter Your Text Here"></textarea>
</div>
<div class="modal_filter_container">
    <div class="filter pink"></div>
    <div class="filter blue"></div>
    <div class="filter green"></div>
    <div class="filter black"></div>

</div>`
        body.appendChild(modal_container);
        handleModal(modal_container);
    }
    let textarea=document.querySelector(".modal_input");
    textarea.value="";

}

function handleModal(modal_container) {
    let cColor = "black";
    let borderSelect = document.querySelectorAll(".modal_filter_container .filter");
    borderSelect[3].classList.add("border");
    for (let i = 0; i < borderSelect.length; i++) {
        borderSelect[i].addEventListener("click", function (e) {
            borderSelect.forEach((filter) => {
                filter.classList.remove("border");

            })
            borderSelect[i].classList.add("border");
            cColor = borderSelect[i].classList[1];
        })
    }
    let textArea = document.querySelector(".modal_input");
    textArea.addEventListener("keypress", function (e) {
        if (e.key == "Enter" && textArea.value != "") {
            modal_container.remove();
            createTask(cColor, textArea.value)
        }
    })

}
function createTask(cColor, task) {
    let taskContainer = document.createElement("div")
    var uid = new ShortUniqueId();
    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `<div class="task_filter ${cColor}"></div>
    <div class="task_desc_container" contenteditable="true">
        <h3 class="uid">#${uid()}</h3>
        <div class="task_desc">${task}</div>
    </div>
</div>`;
    mainContainer.appendChild(taskContainer);
    let taskFilter = taskContainer.querySelector(".task_filter");
    taskFilter.addEventListener("click", changeColor);
    taskContainer.addEventListener("click", deleteTask)

}

function changeColor(e) {
    let taskFilter = e.currentTarget;
    let color = ["pink", "blue", "green", "black"];
    let cColor = taskFilter.classList[1];
    let idx = color.indexOf(cColor);
    let newColorIdx = (idx + 1) % 4;
    taskFilter.classList.remove(cColor);
    taskFilter.classList.add(color[newColorIdx]);

}

function setDeleteState(e) {
    let crossBtn = e.currentTarget;
    let parent = crossBtn.parentNode;
    if (deleteState == false) {
        parent.classList.add("active")
    } else {
        parent.classList.remove("active");
    }
    deleteState = !deleteState;

}

function deleteTask(e) {
    let taskContainer = e.currentTarget;
    if (deleteState) {
        taskContainer.remove();
    }

}


