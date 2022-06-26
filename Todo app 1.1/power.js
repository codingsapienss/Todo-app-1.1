let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg")
let tasks = document.getElementById("tasks")
let add = document.getElementById("add")

let dateInput = document.getElementById("dateInput")
let textarea = document.getElementById("textarea")


form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation()
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure")
        msg.innerHTML = "Tasks can't be blank."
    }
    else {
        console.log("Success")
        msg.innerHTML = ""
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal")
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "")
        })()

      

    }
}

let data = [];


let acceptData = () => {
    data.push({
           text: textInput.value,
            date: dateInput.value,
           textarea: textarea.value,
        });
        
    localStorage.setItem("data", JSON.stringify(data))
    

   console.log (data)
    createTask()

};

let createTask = () => {

        tasks.innerHTML="";
        data.map((x,y)=>{
        return tasks.innerHTML += `
        <div id = ${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary"> ${x.date}</span>
            <p> ${x.textarea}</p>
    
            <span class="options">
                    <i onclick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
    
                    <i onclick = "deleteTask(this)" class="fa-solid fa-trash"></i>
            </span>
            </div>
        ` 
    })

    
    recetForm()
}



let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice (e.parentElement.parentElement.id, 1 )
    localStorage.setItem("data", JSON.stringify(data))
}

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};


let recetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

(()=> {

    data  =JSON.parse(localStorage.getItem ( "data" ))
    createTask()
})()