/* =========================
   ADVANCED TASK SYSTEM
========================= */

const addBtn = document.getElementById("add-task-btn");

const taskList = document.getElementById("task-list");

const taskCount = document.getElementById("task-count");

const completedCount =
  document.getElementById("completed-count");

let totalTasks = 0;

let completedTasks = 0;

/* ADD TASK */

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

  totalTasks++;

  updateStats();

  const task = document.createElement("div");

  task.classList.add("task-item");

  let priorityClass = "priority-low";

  if(priority==="High"){
    priorityClass = "priority-high";
  }

  if(priority==="Medium"){
    priorityClass = "priority-medium";
  }

  task.innerHTML = `

  <div class="task-header">

    <div>

      <h3 class="task-title">
        ${title}
      </h3>

      <p class="task-desc">
        ${desc || "No description added."}
      </p>

    </div>

    <div class="priority-badge ${priorityClass}">
      ${priority}
    </div>

  </div>

  <div class="progress-section">

    <div class="progress-bar">

      <div class="progress-fill"></div>

    </div>

    <span class="progress-text">
      In Progress
    </span>

  </div>

  <div class="task-footer">

    <div class="task-meta">

      <span>
        📅 ${date || "No deadline"}
      </span>

      <span>
        🗂 ${category}
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

  if(task.classList.contains("completed")){

    completedTasks++;

    progressFill.style.width = "100%";

    progressText.textContent = "Completed";

  }else{

    completedTasks--;

    progressFill.style.width = "55%";

    progressText.textContent = "In Progress";
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

      task.remove();

  });

  /* CLEAR */

  document.getElementById("task-title").value="";

  document.getElementById("task-desc").value="";

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
========================= */

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