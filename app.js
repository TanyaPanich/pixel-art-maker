//var cells = [];
//[
//  [{color:"white"}, ...],
//  [{color:"white"}, ...],
// ... ]
var rowCount = 4;
var columCount = 4;
var colors = [{
    bgColor: "white",
    borderColor: "gray"
  },
  {
    bgColor: "aliceblue",
    borderColor: "aliceblue"
  },
  {
    bgColor: "blue",
    borderColor: "blue"
  },
  {
    bgColor: "blueViolet",
    borderColor: "blueViolet"
  },
  {
    bgColor: "aqua",
    borderColor: "aqua"
  },
  {
    bgColor: "coral",
    borderColor: "coral"
  },
  {
    bgColor: "antiquewhite",
    borderColor: "antiquewhite"
  },
  {
    bgColor: "aquamarine",
    borderColor: "aquamarine"
  },
  {
    bgColor: "black",
    borderColor: "black"
  },
  {
    bgColor: "brown",
    borderColor: "brown"
  },
  {
    bgColor: "burlywood",
    borderColor: "burlywood"
  },
  {
    bgColor: "cadetblue",
    borderColor: "cadetblue"
  },
  {
    bgColor: "chartreuse",
    borderColor: "chartreuse"
  },
  {
    bgColor: "cornflowerblue",
    borderColor: "cornflowerblue"
  },
  {
    bgColor: "chocolate",
    borderColor: "chocolate"
  },
  {
    bgColor: "crimson",
    borderColor: "crimson"
  },
  {
    bgColor: "darkblue",
    borderColor: "darkblue"
  }
]
var pickedColor = {};
var colorIndicator = null;
var mouseIsDown = false;

document.addEventListener('DOMContentLoaded', function() {
  rowCount = Math.floor(window.innerHeight / 26);
  columCount = Math.floor(window.innerWidth / 30);
  initializeCanvas();
  initPallete();
  initColorPicker();
  listenDraw();
})

function initializeCanvas() {
  let body = document.querySelector('body');
  let divTable = insertElement("div", "divTable", body);
  let divTableBody = insertElement("div", "divTableBody", divTable)
  for (let i = 0; i < rowCount; i++) {
    let divTableRow = insertElement("div", "divTableRow", divTableBody);
    //cells.push([]);
    for (let j = 0; j < columCount; j++) {
      let divTableCell = insertElement("div", "divTableCell", divTableRow);
      divTableCell.id = i + "." + j
      divTableCell.innerHTML = "&nbsp;"
      divTableCell.style.cursor = "copy"
      if (i === 0 && j === columCount - 1) {
        colorIndicator = divTableCell;
      }
      /*cells[i].push({
        bgColor: "white",
        borderColor: "grey"
      });*/
    }
  }
}

function initPallete() {
  let divTableBody = document.getElementsByClassName("divTableBody")[0];
  let lastRow = divTableBody.lastChild;
  for (let i = 0; i < columCount - 3 && i < colors.length; i++) {
    let cell = lastRow.childNodes[i];
    cell.style.backgroundColor = colors[i].bgColor;
    cell.style.cursor = "cell"
    //cell.style.borderColor = colors[i].borderColor;
    cell.addEventListener("click", function() {
      pickedColor = colors[i];
      colorIndicator.style.backgroundColor = pickedColor.bgColor;
    });
  }
}

function initColorPicker(){
  let colorPicker = document.createElement('input');
  document.getElementsByTagName("body")[0].appendChild(colorPicker);

  let divTableBody = document.getElementsByClassName("divTableBody")[0];
  let cells = divTableBody.lastChild.childNodes;
  let rect = cells[cells.length-3].getBoundingClientRect();
  let width = 3 * (rect.right - rect.left - 1);

  colorPicker.type = "color";
  colorPicker.style.position = "absolute";
  colorPicker.style.top = (rect.top - 2).toString() + "px";
  colorPicker.style.left = (rect.left - 2).toString() + "px";
  colorPicker.style.width = width.toString() + "px";

  colorPicker.addEventListener("change", function(e) {
    pickedColor.bgColor = e.target.value;
    pickedColor.borderColor = e.target.value;
    colorIndicator.style.backgroundColor = pickedColor.bgColor;
  });
}

function listenDraw() {
  let divTableBody = document.getElementsByClassName("divTableBody")[0];
  for (let i = 0; i < rowCount - 1; i++) {
    let divTableRow = divTableBody.childNodes[i];
    for (let j = 0; j < columCount; j++) {
      if (i === 0 && j === columCount - 1) {
        continue;
      }
      let divTableCell = divTableRow.childNodes[j];
      divTableCell.addEventListener("click", function() {
        divTableCell.style.backgroundColor = pickedColor.bgColor;
        divTableCell.style.borderColor = pickedColor.borderColor;
      });
      divTableCell.addEventListener("mousedown", function() {
        mouseIsDown = true;
      });
      divTableCell.addEventListener("mouseup", function() {
        mouseIsDown = false;
      });
      divTableCell.addEventListener("mouseenter", function() {
        if (mouseIsDown) {
          divTableCell.style.backgroundColor = pickedColor.bgColor;
          divTableCell.style.borderColor = pickedColor.borderColor;
        }
      });
    }
  }
}

function insertElement(tag, className, parent) {
  var element = document.createElement(tag);
  element.className = className;
  element.classList.add('disable-select')
  parent.appendChild(element);
  return element;
}
