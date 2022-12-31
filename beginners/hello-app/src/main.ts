//elements
const messageBox = document.querySelector(".extra-message") as HTMLDivElement;
const loginButton = document.querySelector("#login") as HTMLButtonElement;
const logoutButton = document.querySelector("#logout") as HTMLButtonElement;
const usernameInput = document.querySelector("#username") as HTMLInputElement;
const passwordInput = document.querySelector("#password") as HTMLInputElement;

let isUserLoggedIn = false;

// prevent form default behaviour
document
  .querySelector("form")
  ?.addEventListener("submit", (e) => e.preventDefault());

function login() {
  const usernameInputValue = usernameInput.value.trim();
  const passwordInputValue = passwordInput.value.trim();

  if (usernameInputValue == "" && passwordInputValue == "") {
    usernameInput.classList.add("error");
    passwordInput.classList.add("error");
    return;
  }

  if (usernameInputValue == "") {
    usernameInput.classList.add("error");
    passwordInput.classList.remove("error");
    return;
  }

  if (passwordInputValue == "") {
    passwordInput.classList.add("error");
    usernameInput.classList.remove("error");
    return;
  }

  fetch(" https://stefanbohacek.com/hellosalut/?mode=auto")
    .then((response) => response.json())
    .then((data) => {
      usernameInput.classList.remove("error");
      passwordInput.classList.remove("error");
      messageBox.innerHTML = `${data.hello} ${usernameInputValue} you have successfully logged in!`;
      isUserLoggedIn = true;
    });
}

function logout() {
  if (isUserLoggedIn) {
    messageBox.innerHTML = `Have a great day ${usernameInput.value}!`;

    usernameInput.classList.remove("error");
    passwordInput.classList.remove("error");
    usernameInput.value = "";
    passwordInput.value = "";

    isUserLoggedIn = false;
  }
}

loginButton.addEventListener("click", login);
logoutButton.addEventListener("click", logout);
