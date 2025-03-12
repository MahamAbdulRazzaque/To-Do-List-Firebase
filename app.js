import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js"; 
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBj4PA_YqCNRfuKBBswry3Jd6l5ZvoDvY4",
    authDomain: "sign-up-login-form-6d6ef.firebaseapp.com",
    databaseURL: "https://sign-up-login-form-6d6ef-default-rtdb.firebaseio.com",
    projectId: "sign-up-login-form-6d6ef",
    storageBucket: "sign-up-login-form-6d6ef.firebasestorage.app",
    messagingSenderId: "900601216169",
    appId: "1:900601216169:web:5c78770c764240ba9d3db8",
    measurementId: "G-2YP86F1828"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);

  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  
  window.addTask= () => {
    let task = taskInput.value.trim(); // trim spaces ko khatam krta hai.
    if(task) push(ref(db , 'tasks') , task);
    taskInput.value = "";
  }

  
  onValue(ref(db , 'task') , (snap) => {
    taskList.innerHTML = '';
    let tasks = snap.val();
    if (!tasks) return;

    let keys = Object.keys(tasks);
    for(let i = 0; i < keys.length; i++){
        let key = keys[i];         
        let li = document.createElement("li"); 

        let btn = document.createElement("button"); 

        li.textContent = tasks[key]; 
        btn.textContent = "Delete"; 
        btn.onclick = () => remove(ref(db, "tasks/" + key)); 
        li.appendChild(btn); 
        taskList.appendChild(li); 
    } 
}); 
  


