const createDivBox = (taskName) => {
    var divContainer = document.createElement("div");
    divContainer.setAttribute("class", "taskItem");
    divContainer.setAttribute("id", taskName);
    return divContainer;
}
const createLiTag = (newTask) => {
    var liTag = document.createElement("li");
    liTag.setAttribute("class", "task-name");
    liTag.setAttribute("id", `task-${newTask}`);
    liTag.textContent = newTask;
    return liTag;
}
const createDeleteButton = (taskName) => {
    var deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "deleteTask");
    deleteBtn.setAttribute("id", taskName);
    deleteBtn.setAttribute("onclick", `deleteTask()`);
    deleteBtn.textContent = "Delete";
    return deleteBtn;
}
var allTasks = [];
var ulTag = document.getElementById("items");
var timeBox = document.getElementById("timeBox");
var dateItem = document.createElement("h3");
dateItem.textContent = new Date().toLocaleDateString();
dateItem.setAttribute("id", "date");
timeBox.appendChild(dateItem);
var timeItem = document.createElement("h3");
timeItem.setAttribute("id", "time");
timeItem.textContent = new Date().toLocaleTimeString();
timeBox.appendChild(timeItem);
var prevTasks = localStorage.getItem("allTasks");
if (prevTasks !== null && prevTasks.length > 0) {
    var prevTasksArr = prevTasks.split(",");
    allTasks = prevTasksArr;
    prevTasksArr.forEach(newTask => {
        var divContainer = createDivBox(newTask);
        var liTag = createLiTag(newTask);
        var deleteBtn = createDeleteButton(newTask);
        divContainer.appendChild(liTag);
        divContainer.appendChild(deleteBtn);
        ulTag.appendChild(divContainer);
    });
}
const addTask = () => {
    let newTask = document.getElementById("newTask").value;
    newTask = newTask.trim();
    if ((newTask !== "" || newTask !== null || newTask !== undefined) && newTask.length >= 1 && newTask.length <= 40) {
        var lowerValueTask = newTask.toLowerCase();
        if (allTasks.indexOf(lowerValueTask) === -1) {
            allTasks.push(lowerValueTask);
            var divContainer = createDivBox(lowerValueTask);
            var liTag = createLiTag(lowerValueTask);
            var deleteBtn = createDeleteButton(lowerValueTask);
            divContainer.appendChild(liTag);
            divContainer.appendChild(deleteBtn);
            ulTag.appendChild(divContainer);
            localStorage.setItem("allTasks", allTasks);
            document.getElementById("newTask").value = "";
        } else {
            window.alert("Task is already existed");
        }
    } else if (newTask.length >= 41) {
        window.alert("Task length shouldn't be more than 40");
    }
    else {
        window.alert("Task shouldn't be empty");
    }
}
const deleteTask = (e) => {
    e = window.event;
    e = e.target;
    if (e.nodeName === 'BUTTON') {
        var taskContainer = document.getElementById(`${e.id}`);
        var taskName = document.getElementById(`task-${e.id}`).textContent;
        allTasks = allTasks.filter(task => {
            return task !== taskName;
        });
        localStorage.setItem("allTasks", allTasks);
        taskContainer.classList.add("taskItemDelete");
        setTimeout(()=>{taskContainer.remove()},500);
    }
}