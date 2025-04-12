import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#login-form");

  const validators = {
    email: (value) => {
      if (value.trim() === "") return "Email is required.";
      return /\S+@\S+\.\S+/.test(value) || "Invalid email";
    },
    password: (value) => {
      if (value.trim() === "") return "Password is required.";
      return value.length >= 6 || "Password must be at least 6 characters";
    },
    
  };

  // Get form values as an object
  function getFormValues(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  // Check the validity of the form based on validators
  function checkFormValidity(form) {
    const formValues = getFormValues(form);
    let isValid = true;

    // Loop through all validators to validate fields
    for (const field in validators) {
      const value = formValues[field] || "";
      const result = validators[field](value, formValues);
      const input = form.querySelector(`[name="${field}"]`);

      if (result !== true) {
        showError(input, result);
        isValid = false;
      } else {
        showError(input, "");
      }
    }

    return isValid;
  }

  // Show error message if a field is invalid
  function showError(element, message) {
    if (!element) return;

    let error = element.parentElement.querySelector(".error");
    if (!error) {
      error = document.createElement("div");
      error.className = "error text-danger small mt-1";
      element.parentElement.appendChild(error);
    }
    error.textContent = message;
  }

  // Handle input event for real-time validation
  function handleInput(e) {
    const field = e.target.name;
    const value = e.target.value;
    const formValues = getFormValues(form);

    if (validators[field]) {
      const result = validators[field](value, formValues);
      showError(e.target, result === true ? "" : result);
    }
  }

  // Handle form submit and perform form validation and API request

  async function handleSubmitForm(e) {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Login Successful", user);
      alert("Login successful!");
      window.location.href = "/pages/index.html";
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid credentials or something went wrong.");
    }
  }

  
  form.addEventListener("input", handleInput);
  form.addEventListener("submit", handleSubmitForm);
});
