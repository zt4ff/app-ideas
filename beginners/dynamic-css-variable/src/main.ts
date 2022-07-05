const idInput = document.getElementById("id") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const loginButton = document.getElementById("login");
const cancelButton = document.getElementById("cancel");

const testUser = {
  id: "123",
  password: "password",
};

loginButton?.addEventListener("click", (e) => {
  if (idInput.value.trim() === "") {
    idInput.style.background = "lightyellow";
  } else if (idInput.value !== testUser.id) {
    idInput.style.background = "#e6adad";
    console.log("here");
  }

  if (passwordInput.value.trim() === "") {
    passwordInput.style.background = "lightyellow";
  } else if (passwordInput.value !== testUser.password) {
    passwordInput.style.background = "#e6adad";
  }
});

cancelButton?.addEventListener("click", () => {
  passwordInput.style.background = "white";
  idInput.style.background = "white";
});
