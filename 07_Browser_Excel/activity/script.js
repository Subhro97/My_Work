let addBtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");

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

let topRow = document.querySelector(".top-row");
let str = "";
for (let i = 0; i < 26; i++) {
    str += `<div class='col'>${String.fromCharCode(65 + i)}</div>`;
}
topRow.innerHTML = str;
let leftCol = document.querySelector(".left-col");
str = "";
for (let i = 0; i < 100; i++) {
    str += `<div class='left-col_box'>${i + 1}</div>`
}
leftCol.innerHTML = str;

// 2d array
let grid = document.querySelector(".grid");
str = "";
for (let i = 0; i < 100; i++) {
    str += `<div class="row">`
    for (let j = 0; j < 26; j++) {
        str += `<div class='col'>${String.fromCharCode(65 + j)}${i + 1}</div>`
    }
    str += "</div>";
}
grid.innerHTML = str;