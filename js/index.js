document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();
  //use for stop even
  var email = document.getElementById("username").value;
  var pass = document.getElementById("password").value;
  // Correct logic: check if email matches ANY allowed email 
  // AND password matches ANY allowed password
  if (
    (email === "rms@gmail.com" || email === "RMS@GMAIL.COM") &&
    (pass === "rms123" || pass === "RMS123")
  ) {
    location.href = "dashboard.html";
  }
  else {
    const email = document.querySelector("input")
    const pass = document.querySelector("input[type='password']")
    const erorr = document.getElementById("erorr")
    erorr.innerText = "Invalid email or password. Please try again."
    pass.classList.add("shake");
    email.classList.add("shake");
    email.onclick = function () {
      email.classList.remove("shake");
      pass.classList.remove("shake");
      erorr.innerText = ""
    }

  }
}
show_And_hide = document.querySelector("#toggle");
const password = document.querySelector("#password");
show_And_hide.onclick = function () {
  if (password.type === "password") {
    password.type = "text";
  }
  else {
    password.type = "password";
  }
}




