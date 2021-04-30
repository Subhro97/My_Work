let input=document.querySelector(".input_box");
let ul=document.querySelector(".task-list");
let arr=[];

if(localStorage.getItem("allTask")){
    let stringArr=localStorage.getItem("allTask");

    let arr=JSON.parse(stringArr);
    for(let i=0;i<arr.length;i++){
        let li=document.createElement("li");
        li.innerText=arr[i];
        li.addEventListener("dblclick",function(e){
            li.remove();
            let idx=arr.indexOf(li.innerText)
            localStorage.removeItem(i);
        });
        //sets any attribute to the element
        li.setAttribute("class","task");
        ul.appendChild(li);
    }
}
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
        arr.push(task);
        let stringArr=JSON.stringify(arr);
        localStorage.setItem("allTask",stringArr);
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