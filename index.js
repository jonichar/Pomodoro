let tasks = []
let time = 0
let timer = 0
let timerBreak = 0
let current = null

let countdownInterval = null

let clock = document.querySelector("#clock")
let currentTask = document.querySelector("#taskname")
let taskInput = document.querySelector("#taskInput")
let submit = document.querySelector("#submitButton")
let tasksList = document.querySelector("#tasksList")

let deleteCurrentTask = false
let currentTaskName = null


//clock
let timeMinutes = 25
let timeSeconds = 0
let duration = timeMinutes * 60 + timeSeconds
clock.textContent = `${clockValue(timeMinutes)}:${clockValue(timeSeconds)} `

submit.addEventListener("click", (item) => {
    if (taskInput.value !== " ") {

        let taskObject = {
            "taskId": tasks.length,
            "taskName": taskInput.value,
            "status": "pending"
        }

        tasks.push(taskObject)

        rewriteTask(taskObject.taskName)



        taskInput.value = " "
    }
})

function rewriteTask(task) {

    tasksList.innerHTML = ""

    for (let i = 0; i < tasks.length; i++) {

        //listOfTasks
        let taskItem = document.createElement('div')
        taskItem.classList.add('taskItem')
        taskItem.id = 'task' + i

        //task name
        let divTask = document.createElement('div')
        divTask.classList.add("task")
        let text = document.createTextNode(tasks[i].taskName)

        //buttons
        let divButtonsContainer = document.createElement('div')
        divButtonsContainer.classList.add("buttons")

        //startButton
        divStart = document.createElement('div')
        divStart.classList.add("buttonDiv")
        let startButton = document.createElement('button')
        startButton.classList.add("startButton")

        startButton.addEventListener("click", () => {
            startTask(taskItem.id)
        })

        //deleteButton
        divDelete = document.createElement('div')
        divDelete.classList.add("buttonDiv")
        let deleteButton = document.createElement('button')
        deleteButton.classList.add("deleteButton")

        deleteButton.addEventListener("click", () => {
            deleteTask(i, taskItem.id)
        })
        
        divTask.appendChild(text)
        divButtonsContainer.appendChild(startButton)
        divButtonsContainer.appendChild(deleteButton)
        taskItem.appendChild(divTask)
        taskItem.appendChild(divButtonsContainer)

        tasksList.appendChild(taskItem)
        
    }

}

function clockValue(num) {
    return num < 10 ? "0" + num : num;
}

function currentTaskId(id) {
    let currentTaskId = document.querySelector("#" + id)
    return currentTaskId.querySelector(".task").innerHTML
}

function startTask(taskid) {
    currentTaskName = currentTaskId(taskid)

    currentTask.classList.remove('hideContainer')
    currentTask.innerHTML = currentTaskName

    duration = timeMinutes * 60 + timeSeconds
    deleteCurrentTask = false

    startCountdown(taskid)
}

function deleteTask(taskPosition, taskid) {
    currentTaskName = currentTaskId(taskid)
    
    if (currentTask.innerHTML  == currentTaskName) {
        duration = 0
        currentTask.innerHTML == ""
        deleteCurrentTask = true
        currentTask.classList.add('hideContainer')
    }

    tasks.splice(taskPosition, 1)
    rewriteTask()
}

function startCountdown(id) {

    duration--
    let minutes = 0
    let seconds = 0

    clearInterval(countdownInterval)
    clock.textContent = `${clockValue(timeMinutes)}:${clockValue(timeSeconds)} `

    countdownInterval = setInterval(() => {
    minutes = parseInt(duration / 60)
    seconds = parseInt(duration % 60)

    clock.textContent = `${clockValue(minutes)}:${clockValue(seconds)} `

    duration--

    if (duration < 0) {
        clearInterval(countdownInterval)
        if (deleteCurrentTask) {
            clock.textContent = `${clockValue(timeMinutes)}:${clockValue(timeSeconds)} `
        }else{
            breakCountdown(id)
        }
    }
    }, 1000);

}

function breakCountdown(id) {
    currentTaskName = currentTaskId(id)

    let breakTimeMinutes = 5
    let breakTimeSeconds = 0

    let minutes = 0
    let seconds = 0

    let breakDuration = breakTimeMinutes * 60 + breakTimeSeconds

    let breakCountdownInterval = setInterval(() => {

        currentTask.innerHTML = currentTaskName + " (break) "

        minutes = parseInt(breakDuration / 60)
        seconds = parseInt(breakDuration % 60)

        clock.textContent = `${clockValue(minutes)}:${clockValue(seconds)} `

        breakDuration--

        if (breakDuration < 0) {
            clearInterval(breakCountdownInterval)
            clock.textContent = `${clockValue(timeMinutes)}:${clockValue(timeSeconds)} `
            currentTask.textContent = ""
        }
    }, 1000);
}

