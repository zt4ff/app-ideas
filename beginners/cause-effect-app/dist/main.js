import { persons } from "./persons.js";
const summaryList = document.getElementById("summary-lists");
const mainScreen = document.getElementById("main");
// show lists of person in summary
persons.forEach(({ name, id }) => {
    const newElement = document.createElement("div");
    newElement.innerHTML = name;
    newElement.classList.add("list");
    newElement.ID = id;
    summaryList.appendChild(newElement);
});
const displayInformation = (id) => {
    let person = persons.find((x) => x.id === id);
    if (person) {
        const innerHTML = `<div class="container">
        <div class="person-name">${person.name}</div>
        <div class="person-username">${person.username}</div>
        <div class="person-email">${person.email}</div>
        </div>`;
        const newElement = document.createElement("div");
        newElement.innerHTML = innerHTML;
        mainScreen.innerHTML = "";
        mainScreen.appendChild(newElement);
    }
};
document.querySelectorAll(".list").forEach((list) => {
    list.addEventListener("click", (e) => {
        displayInformation(e.target.ID);
    });
});
