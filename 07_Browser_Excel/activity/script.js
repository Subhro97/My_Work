let addBtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let leftBtn = document.querySelector(".left");
let centerBtn = document.querySelector(".center");
let rightBtn = document.querySelector(".right");
let fontBtn = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");
let allAlignBtns = document.querySelectorAll(".alignment-container>*");
let formulaInput = document.querySelector(".formula-box");
let sheetDB = workSheetDB[0];


firstSheet.addEventListener("click", handleActiveSheet)

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

    // creating new sheetDB and clearing the UI
    sheetArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    sheetArr = document.querySelectorAll(".sheet");
    sheetArr[sheetArr.length - 1].classList.add("active-sheet");
    initCurrentSheetDb();
    sheetDB = workSheetDB[idx]; //setting the sheetDB to the current sheet
    initUI();


    NewSheet.addEventListener("click", handleActiveSheet);
});


function handleActiveSheet(e) {
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active-sheet");
    }
    //current sheetDB
    let sheetIdx = MySheet.getAttribute("sheetIdx")
    sheetDB = workSheetDB[sheetIdx - 1];
    // setting the UI with values of the sheetDB
    setUI(sheetDB);

}


for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function () {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(65 + cid);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        let cellObj = sheetDB[rid][cid];

        if (cellObj.bold == true) {
            boldElem.classList.add("active-btn");
        } else {
            boldElem.classList.remove("active-btn");
        }

        if (cellObj.italic == true) {
            italicElem.classList.add("active-btn");
        } else {
            italicElem.classList.remove("active-btn");
        }


        if (cellObj.underline == true) {
            underlineElem.classList.add("active-btn");
        } else {
            underlineElem.classList.remove("active-btn");
        }

        for (let i = 0; i < allAlignBtns.length; i++) {
            allAlignBtns[i].classList.remove("active-btn");
        }

        if (cellObj.halign == "left") {
            leftBtn.classList.add("active-btn");
        } else if (cellObj.halign == "center") {
            centerBtn.classList.add("active-btn");
        } else if (cellObj.halign == "right") {
            rightBtn.classList.add("active-btn");
        }
    })

}

Allcells[0].click();

function getRIDCDfromCell(address) {
    let colVal = address.charCodeAt(0);
    let cid = colVal - 65;
    let rowVal = address.slice(1);
    let rid = Number(rowVal) - 1;
    return { cid, rid };

}
leftBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIDCDfromCell(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "left";
    let cellObj = sheetDB[rid][cid];
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
    cellObj.halign = "left";

})
centerBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIDCDfromCell(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";
    let cellObj = sheetDB[rid][cid];
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    cellObj.halign = "center";

})
rightBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIDCDfromCell(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";
    let cellObj = sheetDB[rid][cid];
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    cellObj.halign = "right";

})

fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRIDCDfromCell(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize = fontSize + "px";

})
fontFamily.addEventListener("change", function () {
    // alert(fontFamily.value);
    let address = addressBar.value;
    let { rid, cid } = getRIDCDfromCell(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    let cFont = fontFamily.value
    cell.style.fontFamily = cFont;
    cellObj.fontFamily = cFont;
})

boldElem.addEventListener("click", function () {
    let isActive = boldElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIDCDfromCell(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text bold
        cell.style.fontWeight = "bold";
        boldElem.classList.add("active-btn");
        cellObj.bold = true;
    } else {
        // cell text normal
        cell.style.fontWeight = "normal";
        boldElem.classList.remove("active-btn");
        cellObj.bold = false;
    }




})
italicElem.addEventListener("click", function () {
    let isActive = italicElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIDCDfromCell(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text bold
        cell.style.fontStyle = "italic";
        italicElem.classList.add("active-btn");
        cellObj.italic = true;
    } else {
        // cell text normal
        cell.style.fontStyle = "normal";
        italicElem.classList.remove("active-btn");
        cellObj.italic = false;
    }
})
underlineElem.addEventListener("click", function () {
    let isActive = underlineElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIDCDfromCell(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if (isActive == false) {
        // cell text bold
        cell.style.textDecoration = "underline";
        underlineElem.classList.add("active-btn");
        cellObj.underline = true;
    } else {
        // cell text normal
        cell.style.textDecoration = "none";
        underlineElem.classList.remove("active-btn");
        cellObj.underline = false;
    }
})
// ****************************************************************
//clearing the UI
function initUI() {
    for (let i = 0; i < Allcells.length; i++) {
        Allcells[i].style.fontWeight = "normal";
        Allcells[i].style.fontStyle = "normal";
        Allcells[i].style.textDecoration = "none";
        Allcells[i].style.fontFamily = "Arial";
        Allcells[i].style.fontSize = "16px";
        Allcells[i].style.textAlign = "left";
        Allcells[i].innerText = "";
    }
}

//adding another eventlistner to the cells for storing data in the sheetDB
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("blur", function handleCell() {
        let address = addressBar.value;
        let { rid, cid } = getRIDCDfromCell(address);
        let cellObject = sheetDB[rid][cid];
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        cellObject.value = cell.innerText;
    });
}
//setting the UI with the sheetDB 
function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, italic, underline, value, fontFamily, fontSize } = sheetDB[i][j];
            cell.innerText = value;
        }
    }
}

formulaInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaInput.value !== "") {
        let formula = formulaInput.value;
        let value = evaluateFormula(formula);
        let address = addressBar.value;
        let { rid, cid } = getRIDCDfromCell(address);
        setUIByFormula(value, rid, cid); // setiing the value obtained in the cell which we want

    }
})

function evaluateFormula(formula) {
    let formulaTokens = formula.split(" "); //Splitting the string on the basis of ""

    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharofToken = formulaTokens[i].charCodeAt(0); //If element in arr is cell then getting the ascii code of the first letter
        if (firstCharofToken >= 65 && firstCharofToken <= 90) {
            let { rid, cid } = getRIDCDfromCell(formulaTokens[i]);
            let cellObject = sheetDB[rid][cid];
            let {value}=cellObject;

            formula=formula.replace(formulaTokens[i], value); //exchanging the cell address for values in the string
        }
    }
    let ans=eval(formula); //using the node.js's eval() compiler to calculate the ans of the formula
    return ans;
}
function setUIByFormula(value,rid,cid){
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.innerText=value;

}