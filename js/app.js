//Select the element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

//get item from local storage
let data = localStorage.getItem("ToDo");

//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one int the list 
    loadList(LIST); //load the list to the user interface
}
else {
    //if data isn't empty
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});


//Show today date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us", options);

// add function to-do

function addToDo(toDo, id, done, trash) {
    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="0"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="0"></i>
                    </li>
                 `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// ADD AN ITEM TO THE LIST USER THE ENTER KEY

// document.addEventListener("keyup", function (even) {
//     if (Event.key == 'Enter') {
//         const toDo = input.value;

//         //if the input isn't empty
//         if (toDo) {
//             addToDo(toDo);
//             LIST.push({
//                 name: toDo,
//                 id: id,
//                 done: false,
//                 trash: false
//             });

//             id++;
//         }
//     }
//     input.value = "";

//     //add item to local storage
//     localStorage.setItem("ToDo", JSON.stringify(LIST));
// });

// function to add item by button
function add_item() {
    const toDo = input.value;

    //if the input isn't empty
    if (toDo) {
        addToDo(toDo);
        LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false
        });
        //add item to local storage
        localStorage.setItem("ToDo", JSON.stringify(LIST));
        id++;
    }
    input.value = "";
}

//complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

///remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
}

//target the items created dynamically
list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeToDo(element);
    }
    else if (elementJob == "delete") {
        removeToDo(element);
    }

    //add item to local storage
    localStorage.setItem("ToDo", JSON.stringify(LIST));
});
