let input=document.querySelector(".input_box");
let ul=document.querySelector(".task-list");

input.addEventListener("keypress",function(e){
    //e-->event obeject containing propertirs of the respective evenet
    //console.log("pressed some key");
    //console.log("event object",e);
    if(e.key=="Enter"){
        //console.log("user wants to eneter a task");
        let task=input.value;
        console.log(task);

        //creates any html element
        let li=document.createElement("li");
        li.innerText=task;
        //adds eventlistner to li node only when created
        li.addEventListener("dblclick",function(e){
            li.remove();
        });
        //sets any attribute to the element
        li.setAttribute("class","task");
        ul.appendChild(li);
        input.value="";
    }
})