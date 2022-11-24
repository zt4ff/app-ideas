import request from "request";

request("https://www.githubstatus.com/", { json: true }, (err, res, body) => {
  console.log(body);
});


function updateHomePage() {
  const statusContainers = document.querySelectorAll(".status-container");

  statusContainers.forEach(statusContainer => {
    (statusContainer.querySelector(".status") as HTMLParagraphElement).innerHTML = "weme"
  })
}