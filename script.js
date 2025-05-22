let data = {};
const LOCAL_KEY = "lab5Data";

document.addEventListener("DOMContentLoaded", async () => {
  const localData = localStorage.getItem(LOCAL_KEY);
  if (localData) {
    data = JSON.parse(localData);
  } else {
    const res = await fetch("data.json");
    data = await res.json();
    saveToLocalStorage();
  }
  renderAll();
});

function renderAll() {
  document.getElementById("profile-text").textContent = data.profile;

  const eduList = document.getElementById("education-list");
  eduList.innerHTML = "";
  data.education.forEach((edu, i) => {
    const div = document.createElement("div");
    div.innerHTML = `${edu} <button onclick="editField('education', ${i})">Düzəliş et</button>`;
    eduList.appendChild(div);
  });

  const skillsList = document.getElementById("skills-list");
  skillsList.innerHTML = "";
  data.skills.forEach((skill, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${skill} <button onclick="editField('skills', ${i})">Düzəliş et</button>`;
    skillsList.appendChild(li);
  });

  const expList = document.getElementById("experience-list");
  expList.innerHTML = "";
  data.experience.forEach((exp, i) => {
    const div = document.createElement("div");
    div.className = "major";
    div.innerHTML = `
      <h4>${exp.title}</h4>
      <span>${exp.date}</span>
      <p>${exp.description}</p>
      <button onclick="editExperience(${i})">Düzəliş et</button>
    `;
    expList.appendChild(div);
  });
}

function editSection(section) {
  const container = document.getElementById(`${section}-text`);
  const current = data[section];
  const input = prompt("Dəyişmək istədiyiniz mətni daxil edin:", current);
  if (input !== null) {
    data[section] = input;
    saveToLocalStorage();
    renderAll();
  }
}

function editField(section, index) {
  const input = prompt("Yeni dəyəri daxil edin:", data[section][index]);
  if (input !== null) {
    data[section][index] = input;
    saveToLocalStorage();
    renderAll();
  }
}

function editExperience(index) {
  const title = prompt("Başlıq:", data.experience[index].title);
  const date = prompt("Tarix:", data.experience[index].date);
  const desc = prompt("Təsvir:", data.experience[index].description);
  if (title && date && desc) {
    data.experience[index] = { title, date, description: desc };
    saveToLocalStorage();
    renderAll();
  }
}

function addField(section) {
  if (section === "experience") {
    const title = prompt("Yeni Təcrübə Başlığı:");
    const date = prompt("Tarix:");
    const description = prompt("Təsvir:");
    if (title && date && description) {
      data.experience.push({ title, date, description });
    }
  } else {
    const input = prompt("Yeni dəyəri daxil edin:");
    if (input) {
      data[section].push(input);
    }
  }
  saveToLocalStorage();
  renderAll();
}

function saveToLocalStorage() {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

function resetFromStorage() {
  const saved = localStorage.getItem(LOCAL_KEY);
  if (saved) {
    data = JSON.parse(saved);
    renderAll();
  }
}