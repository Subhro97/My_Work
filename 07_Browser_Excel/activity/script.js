let addBtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let leftBtn=document.querySelector(".left");
let centerBtn=document.querySelector(".center");
let rightBtn=document.querySelector(".right");
let fontBtn=document.querySelector(".font-size");

firstSheet.addEventListener("click", function () {
    let sheetArr = document.querySelectorAll(".sheet");
    sheetArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!firstSheet.classList[1]) {
        firstSheet.classList.add("active-sheet");
    }
})

addBtnContainer.addEventListener("click", function () {
    let sheetArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetArr[sheetArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx + 1);
    NewSheet.innerText = `Sheet ${idx + 1}`;
    sheetList.appendChild(NewSheet);
    NewSheet.addEventListener("click", function () {
        let sheetArr = document.querySelectorAll(".sheet");
        sheetArr.forEach(function (sheet) {
            sheet.classList.remove("active-sheet");
        })
        if (!NewSheet.classList[1]) {
            NewSheet.classList.add("active-sheet");
        }
    })

})

for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function () {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(65 + cid);
        let address = colAdd + rowAdd;
        addressBar.value = address;
    })

}

Allcells[0].click();

function getRIDCDfromCell(address){
    let colVal=address.charCodeAt(0);
    let cid=colVal-65;
    let rowVal=address.slice(1);
    let rid=Number(rowVal)-1;
    return {cid,rid};

}
leftBtn.addEventListener("click",function(){
    let address=addressBar.value;
    let {rid,cid}=getRIDCDfromCell(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="left";

})
centerBtn.addEventListener("click",function(){
    let address=addressBar.value;
    let {rid,cid}=getRIDCDfromCell(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="center";

})
rightBtn.addEventListener("click",function(){
    let address=addressBar.value;
    let {rid,cid}=getRIDCDfromCell(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="right";

})

fontBtn.addEventListener("change",function(){
    let fontSize=fontBtn.value;
    let address=addressBar.value;
    let {rid,cid}=getRIDCDfromCell(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize=fontSize+"px";
})
