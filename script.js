/* =========================
   ADVANCED TASK SYSTEM
========================= */

const addBtn = document.getElementById("add-task-btn");

const taskList = document.getElementById("task-list");

const taskCount = document.getElementById("task-count");

const completedCount =
  document.getElementById("completed-count");


/* ADD TASK */
let tasks = JSON.parse(
  localStorage.getItem("veloraTasks")
) || [];

let totalTasks = 0;

let completedTasks = 0;
/* =========================
   SAVE TASKS
========================= */

function saveTasks(){

  localStorage.setItem(
    "veloraTasks",
    JSON.stringify(tasks)
  );

}
/* =========================
   RENDER TASK
========================= */

function renderTask(taskData){

  totalTasks++;

  if(taskData.completed){
    completedTasks++;
  }

  updateStats();

  const task =
    document.createElement("div");

  task.classList.add("task-item");

  if(taskData.completed){
    task.classList.add("completed");
  }

  let priorityClass = "priority-low";

  if(taskData.priority==="High"){
    priorityClass = "priority-high";
  }

  if(taskData.priority==="Medium"){
    priorityClass = "priority-medium";
  }

  task.innerHTML = `

  <div class="task-header">

    <div>

      <h3 class="task-title">
        ${taskData.title}
      </h3>

      <p class="task-desc">
        ${taskData.desc || "No description added."}
      </p>

    </div>

    <div class="priority-badge ${priorityClass}">
      ${taskData.priority}
    </div>

  </div>

  <div class="progress-section">

    <div class="progress-bar">

      <div
        class="progress-fill"
        style="
          width:
          ${taskData.completed ? "100%" : "55%"}
        "
      ></div>

    </div>

    <span class="progress-text">

      ${
        taskData.completed
        ? "Completed"
        : "In Progress"
      }

    </span>

  </div>

  <div class="task-footer">

    <div class="task-meta">

      <span>
        📅 ${taskData.date || "No deadline"}
      </span>

      <span>
        🗂 ${taskData.category}
      </span>

    </div>

    <div class="task-actions">

      <button class="complete-btn">
        ✓ Complete
      </button>

      <button class="delete-btn">
        🗑 Delete
      </button>

    </div>

  </div>

`;

  taskList.prepend(task);

  /* COMPLETE */

  task
  .querySelector(".complete-btn")
  .addEventListener("click",()=>{

    task.classList.toggle("completed");

    const progressFill =
      task.querySelector(".progress-fill");

    const progressText =
      task.querySelector(".progress-text");

    taskData.completed =
      !taskData.completed;

    saveTasks();

    if(task.classList.contains("completed")){

      completedTasks++;

      progressFill.style.width = "100%";

      progressText.textContent =
        "Completed";

    }else{

      completedTasks--;

      progressFill.style.width = "55%";

      progressText.textContent =
        "In Progress";

    }

    updateStats();

  });

  /* DELETE */

  task
  .querySelector(".delete-btn")
  .addEventListener("click",()=>{

    totalTasks--;

    if(task.classList.contains("completed")){
      completedTasks--;
    }

    updateStats();

    tasks = tasks.filter(
      t => t.id !== taskData.id
    );

    saveTasks();

    task.remove();

  });

}

addBtn.addEventListener("click",()=>{

  const title =
    document.getElementById("task-title").value;

  const desc =
    document.getElementById("task-desc").value;

  const priority =
    document.getElementById("task-priority").value;

  const date =
    document.getElementById("task-date").value;

  const category =
    document.getElementById("task-category").value;

  if(title.trim()===""){

    alert("Please enter mission title!");

    return;
  }
const taskData = {

  id: Date.now(),

  title,

  desc,

  priority,

  date,

  category,

  completed:false

};

tasks.push(taskData);

saveTasks();
  renderTask(taskData);

/* CLEAR */

document.getElementById("task-title").value="";

document.getElementById("task-desc").value="";
document.getElementById("task-date").value="";
});

/* UPDATE STATS */

function updateStats(){

  taskCount.textContent = totalTasks;

  completedCount.textContent = completedTasks;
}

/* =========================
   FORM VALIDATION
========================= */

const form = document.getElementById("contact-form");

const formMessage =
  document.getElementById("form-message");

form.addEventListener("submit",(e)=>{

  e.preventDefault();

  const name =
    document.getElementById("name").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const message =
    document.getElementById("message").value.trim();

  if(name === "" || email === "" || message === ""){

    formMessage.style.color = "#ef4444";

    formMessage.textContent =
      "Please fill all fields!";

    return;
  }

  if(!email.includes("@")){

    formMessage.style.color = "#ef4444";

    formMessage.textContent =
      "Enter valid email!";

    return;
  }

  formMessage.style.color = "#10b981";

  formMessage.textContent =
    "Feedback submitted successfully!";

  form.reset();

});

/* =========================
   LIVE CLOCK
========================= */

function updateTime(){

  const now = new Date();

  const time = now.toLocaleTimeString([],{

    hour:'2-digit',

    minute:'2-digit'

  });

  document.getElementById("live-time")
    .textContent = time;
}

setInterval(updateTime,1000);

updateTime();

/* =========================
   QUOTES
========================= 

const quotes = [

  "Small progress is still progress.",

  "Discipline creates freedom.",

  "Focus on consistency, not perfection.",

  "Success starts with daily habits.",

  "Your future is built today.",

  "Dream big. Execute bigger."

];

const quoteText =
  document.getElementById("quote-text");

document
.getElementById("new-quote-btn")
.addEventListener("click",()=>{

  const random =
    quotes[Math.floor(Math.random()*quotes.length)];

  quoteText.textContent = random;

});
*/
/* =========================
   REAL API QUOTES
========================= */

const quoteText =
  document.getElementById("quote-text");

const quoteBtn =
  document.getElementById("new-quote-btn");

async function fetchQuote(){

  quoteText.textContent =
    "Generating inspiration...";

  try{

    const response =
      await fetch(
        "https://dummyjson.com/quotes/random"
      );

    const data =
      await response.json();

    quoteText.textContent =
  `"${data.quote}" — ${data.author}`;
  }catch(error){

    quoteText.textContent =
      "Failed to load quote.";

  }

}

quoteBtn.addEventListener(
  "click",
  fetchQuote
);

fetchQuote();


/* =========================
   PRODUCTIVITY QUIZ
========================= */

const quizButtons =
  document.querySelectorAll(".quiz-btn");

const quizResult =
  document.getElementById("quiz-result");

quizButtons.forEach((button)=>{

  button.addEventListener("click",()=>{

    const type =
      button.dataset.type;

    if(type==="planner"){

      quizResult.textContent =
        "You are a Deep Focus Strategist ✨";

    }else{

      quizResult.textContent =
        "You are a Creative Flow Thinker ⚡";

    }

  });

});
/* =========================
   LOAD SAVED TASKS
========================= */

tasks.forEach((taskData)=>{

  renderTask(taskData);

});