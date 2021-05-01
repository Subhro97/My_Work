let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main-container");
let body = document.body;
let plusBtn = document.querySelector(".fa-plus");
let delBtn = document.querySelector(".fa-times");
let deleteState = false;

let taskArr = [];
if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));
    for (let i = 0; i < taskArr.length; i++) {
        let { color, task, id } = taskArr[i];
        createTask(color, task, false, id);

    }
}



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
    let textarea = document.querySelector(".modal_input");
    textarea.value = "";

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
            createTask(cColor, textArea.value, true);
        }
    })

}
function createTask(cColor, task, flag, id) {
    let taskContainer = document.createElement("div")
    let uidFn = new ShortUniqueId();
    let uid = id || uidFn();
    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `<div class="task_filter ${cColor}"></div>
    <div class="task_desc_container">
        <h3 class="uid">#${uid}</h3>
        <div class="task_desc" contenteditable="true">${task}</div>
    </div>
</div>`;

    if (flag == true) {
        let obj = { "color": cColor, "id": uid, "task": task };
        taskArr.push(obj);
        let finalArr = JSON.stringify(taskArr);
        localStorage.setItem("allTask", finalArr);
    }
    mainContainer.appendChild(taskContainer);
    let taskFilter = taskContainer.querySelector(".task_filter");
    taskFilter.addEventListener("click", changeColor);
    taskContainer.addEventListener("click", deleteTask);
    let taskDesc = taskContainer.querySelector(".task_desc");
    taskDesc.addEventListener("keypress", editTask);

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

function editTask(e) {
    let taskDesc = e.currentTarget;
    let uidElem = taskDesc.parentNode.children[0];
    let uid = uidElem.innerText.split("#")[1];
    for (let i = 0; i < taskArr.length; i++) {
        let { id } = taskArr[i];
        if (id == uid) {
            taskArr[i].task = taskDesc.innerText;
            let finalTaskArr = JSON.stringify(taskArr);
            localStorage.setItem("allTask", finalTaskArr);
            break;
        }
    }


}

function deleteTask(e) {
    let taskContainer = e.currentTarget;
    if (deleteState) {
        let uidElem = taskContainer.querySelector(".uid");
        let uid = uidElem.innerText.split("#")[1];
        for (let i = 0; i < taskArr.length; i++) {
            let { id } = taskArr[i];
            if (id == uid) {
                taskArr.splice(i, 1);
                let finalTaskArr = JSON.stringify(taskArr);
                localStorage.setItem("allTask", finalTaskArr);
                taskContainer.remove();
                break;
            }
        }

    }

}


