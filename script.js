/* =========================
   TOAST FUNCTION
========================= */

function showToast(message){

  const toast =
    document.getElementById(
      "toast"
    );

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(()=>{

    toast.classList.remove(
      "show"
    );

  },3000);

}
/* =========================
   ADVANCED TASK SYSTEM
========================= */

const addBtn = document.getElementById("add-task-btn");

const taskList = document.getElementById("task-list");

const taskCount = document.getElementById("task-count");

const completedCount =
  document.getElementById("completed-count");


/* ADD TASK */
function getCurrentUser(){

  return localStorage.getItem(
    "veloraCurrentUser"
  );

}

let tasks = JSON.parse(

  localStorage.getItem(
    `veloraTasks_${getCurrentUser()}`
  )

) || [];

let totalTasks = 0;

let completedTasks = 0;
/* =========================
   SAVE TASKS
========================= */

function saveTasks(){

  localStorage.setItem(

  `veloraTasks_${getCurrentUser()}`,

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
          ${taskData.progress}%
        "
      ></div>

    </div>

    <span class="progress-text">

     
      ${taskData.progress}% Completed
  

    </span>

  </div>
  <select class="progress-select">

  <option value="0">
    0%
  </option>

  <option value="25">
    25%
  </option>

  <option value="50">
    50%
  </option>

  <option value="75">
    75%
  </option>

  <option value="100">
    100%
  </option>

</select>

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
  const progressSelect =
  task.querySelector(
    ".progress-select"
  );

progressSelect.value =
  taskData.progress;

progressSelect.addEventListener(
  "change",
  ()=>{

    taskData.progress =
      progressSelect.value;

    task.querySelector(
      ".progress-fill"
    ).style.width =
      `${taskData.progress}%`;

    task.querySelector(
      ".progress-text"
    ).textContent =
      `${taskData.progress}% Completed`;

    if(taskData.progress == 100){

      task.classList.add(
        "completed"
      );

      showToast(
        "Mission Completed ✅"
      );

    }else{

      task.classList.remove(
        "completed"
      );

    }

    saveTasks();

  }
);
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

  showToast(
    "Mission Completed ✅"
  );

}else{

  showToast(
    "Mission Reopened 🔄"
  );

}

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
    showToast(
  "Mission Deleted 🗑️"
);

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

    showToast(
  "Enter Mission Title ⚠️"
);

    return;
  }
const taskData = {

  id: Date.now(),

  title,

  desc,

  priority,

  date,

  category,

  completed:false,
  progress:0

};

tasks.push(taskData);

saveTasks();
showToast(
  "Mission Added 🚀"
);
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

  const liveTime =
  document.getElementById("live-time");

if(liveTime){

  liveTime.textContent = time;

}
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
/* =========================
   SEARCH + FILTER
========================= */

const searchInput =
  document.getElementById("search-task");

const filterSelect =
  document.getElementById("filter-task");

function filterTasks(){

  const searchValue =
    searchInput.value.toLowerCase();

  const filterValue =
    filterSelect.value;

  const allTasks =
    document.querySelectorAll(".task-item");

  allTasks.forEach((task)=>{

    const title =
      task.querySelector(".task-title")
      .textContent
      .toLowerCase();

    const isCompleted =
      task.classList.contains("completed");

    let matchesSearch =
      title.includes(searchValue);

    let matchesFilter = true;

    if(filterValue==="completed"){

      matchesFilter = isCompleted;

    }

    if(filterValue==="pending"){

      matchesFilter = !isCompleted;

    }

    if(matchesSearch && matchesFilter){

      task.style.display = "block";

    }else{

      task.style.display = "none";

    }

  });

}

searchInput.addEventListener(
  "input",
  filterTasks
);

filterSelect.addEventListener(
  "change",
  filterTasks
);
/* =========================
   AUTHENTICATION SYSTEM
========================= */

const authScreen =
  document.getElementById("auth-screen");

const dashboard =
  document.getElementById("dashboard");

const signupBtn =
  document.getElementById("signup-btn");

const loginBtn =
  document.getElementById("login-btn");

const authMessage =
  document.getElementById("auth-message");

/* CHECK SESSION */

const currentUser =
  localStorage.getItem("veloraCurrentUser");

if(currentUser){
  const users = JSON.parse(
  localStorage.getItem("veloraUsers")
) || [];

const activeUser =
  users.find(
    user => user.email === currentUser
  );
if(activeUser){

  document.getElementById(
    "profile-name"
  ).textContent =
    activeUser.name;

  document.getElementById(
    "profile-avatar"
  ).textContent =
    activeUser.name
    .charAt(0)
    .toUpperCase();

  document.getElementById(
    "profile-role"
  ).textContent =
    activeUser.role;

  const tagsContainer =
    document.getElementById(
      "profile-tags"
    );

  tagsContainer.innerHTML = "";

  (activeUser.skills || "")
.split(",")

  .forEach((skill)=>{

    const span =
      document.createElement("span");

    span.textContent =
      skill.trim();

    tagsContainer
    .appendChild(span);

  });

}

  authScreen.style.display = "none";
  dashboard.style.display = "grid";

  

}

/* SIGNUP */

signupBtn.addEventListener("click",()=>{

  const name =
    document
    .getElementById("auth-name")
    .value;

  const email =
    document
    .getElementById("auth-email")
    .value;

  const password =
    document
    .getElementById("auth-password")
    .value;
    const role =
  document
  .getElementById("auth-role")
  .value;

const skills =
  document
  .getElementById("auth-skills")
  .value;

  if(
    name === "" ||
    email === "" ||
    password === ""
  ){

    authMessage.textContent =
      "Please fill all fields.";

    return;

  }

  
const users = JSON.parse(
  localStorage.getItem("veloraUsers")
) || [];

const existingUser =
  users.find(
    user => user.email === email
  );

if(existingUser){

  authMessage.textContent =
    "User already exists.";

  return;

}

const userData = {

  name,

  email,

  password,

  role,

  skills

};

users.push(userData);

localStorage.setItem(
  "veloraUsers",
  JSON.stringify(users)
);
  localStorage.setItem(
    "veloraCurrentUser",
    email
  );

  authMessage.textContent =
    "Signup successful!";

  authScreen.style.display = "none";
  

  dashboard.style.display = "grid";
  document.getElementById(
  "profile-name"
).textContent = name;

document.getElementById(
  "profile-avatar"
).textContent =
  name.charAt(0).toUpperCase();
document.getElementById(
  "profile-role"
).textContent = role;

const tagsContainer =
  document.getElementById(
    "profile-tags"
  );

tagsContainer.innerHTML = "";

(skills || "")
.split(",").forEach((skill)=>{

  const span =
    document.createElement("span");

  span.textContent =
    skill.trim();

  tagsContainer.appendChild(span);

});
});


/* LOGIN */

loginBtn.addEventListener("click",()=>{

  const email =
    document
    .getElementById("auth-email")
    .value;

  const password =
    document
    .getElementById("auth-password")
    .value;

  const users = JSON.parse(
  localStorage.getItem("veloraUsers")
) || [];

const savedUser =
  users.find(
    user =>
      user.email === email &&
      user.password === password
  );

  if(savedUser){

    localStorage.setItem(
      "veloraCurrentUser",
      email
    );

    authScreen.style.display = "none";

    dashboard.style.display = "grid";
    document.getElementById(
  "profile-name"
).textContent = savedUser.name;

document.getElementById(
  "profile-avatar"
).textContent =
  savedUser.name.charAt(0).toUpperCase();
  document.getElementById(
  "profile-role"
).textContent =
  savedUser.role || "User";

const tagsContainer =
  document.getElementById(
    "profile-tags"
  );

tagsContainer.innerHTML = "";

(savedUser.skills || "")
.split(",")

.forEach((skill)=>{

  if(skill.trim() !== ""){

    const span =
      document.createElement("span");

    span.textContent =
      skill.trim();

    tagsContainer.appendChild(span);

  }

});

  }else{

    authMessage.textContent =
      "Invalid login credentials.";

  }

});
/* =========================
   LOGOUT
========================= */

const logoutBtn =
  document.getElementById("logout-btn");

logoutBtn.addEventListener("click",()=>{

  localStorage.removeItem(
    "veloraCurrentUser"
  );

  location.reload();
  showToast(
  "Logged Out 👋"
);

});
/* =========================
   PROFILE SETTINGS
========================= */

const settingsBtn =
  document.getElementById(
    "settings-btn"
  );

const settingsModal =
  document.getElementById(
    "settings-modal"
  );

const closeSettingsBtn =
  document.getElementById(
    "close-settings-btn"
  );

const saveProfileBtn =
  document.getElementById(
    "save-profile-btn"
  );

settingsBtn.addEventListener(
  "click",
  ()=>{

    const currentUser =
      localStorage.getItem(
        "veloraCurrentUser"
      );

    const users = JSON.parse(
      localStorage.getItem(
        "veloraUsers"
      )
    ) || [];

    const activeUser =
      users.find(
        user =>
          user.email === currentUser
      );

    if(activeUser){

      document.getElementById(
        "edit-name"
      ).value =
        activeUser.name || "";

      document.getElementById(
        "edit-role"
      ).value =
        activeUser.role || "";

      document.getElementById(
        "edit-skills"
      ).value =
        activeUser.skills || "";

    }

    settingsModal.style.display =
      "flex";

});

closeSettingsBtn.addEventListener(
  "click",
  ()=>{

    settingsModal.style.display =
      "none";

});

saveProfileBtn.addEventListener(
  "click",
  ()=>{

    const currentUser =
      localStorage.getItem(
        "veloraCurrentUser"
      );

    const users = JSON.parse(
      localStorage.getItem(
        "veloraUsers"
      )
    ) || [];

    const userIndex =
      users.findIndex(
        user =>
          user.email === currentUser
      );

    if(userIndex !== -1){

      users[userIndex].name =
        document.getElementById(
          "edit-name"
        ).value;

      users[userIndex].role =
        document.getElementById(
          "edit-role"
        ).value;

      users[userIndex].skills =
        document.getElementById(
          "edit-skills"
        ).value;

      localStorage.setItem(
        "veloraUsers",
        JSON.stringify(users)
      );

      showToast(
  "Profile Updated ✨"
);

setTimeout(()=>{

  location.reload();

},1500);

    }

});