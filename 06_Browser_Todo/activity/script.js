let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main-container");
let body = document.body;
let plusBtn = document.querySelector(".fa-plus")
for (let i = 0; i < colorBtn.length; i++) {
    colorBtn[i].addEventListener("click", function (e) {
        let color = colorBtn[i].classList[1];
        mainContainer.style.backgroundColor = color;

    })
}

plusBtn.addEventListener("click", createModal);

function createModal() {
    let modal_container = document.createElement("div");
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

function handleModal(modal_container) {
    let cColor="black";
    let borderSelect = document.querySelectorAll(".modal_filter_container .filter");
    borderSelect[3].classList.add("border");
    for (let i = 0; i < borderSelect.length; i++) {
        borderSelect[i].addEventListener("click", function (e) {
            borderSelect.forEach((filter)=>{
                filter.classList.remove("border");

            })
            borderSelect[i].classList.add("border");
            cColor=borderSelect[i].classList[1];
        })
    }
    let textArea=document.querySelector(".modal_input");
    textArea.addEventListener("keypress",function(e){
        if(e.key=="Enter" && textArea.value!=""){
            modal_container.remove();
            createTask(cColor,textArea.value)
        }
    })

}
function createTask(cColor,task){
    let taskConatiner=document.createElement("div")
    taskConatiner.setAttribute("class","task_container");
    taskConatiner.innerHTML=`<div class="task_filter ${cColor}"></div>
    <div class="task_desc_container">
        <h3 class="uid">#example</h3>
        <div class="task_desc">${task}</div>
    </div>
</div>`;
mainContainer.appendChild(taskConatiner);


}


