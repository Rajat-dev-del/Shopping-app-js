import { auth, db, createUserWithEmailAndPassword, addDoc, collection } from "../firebase.js";
const form = document.querySelector("#signup-form");

const validators = {
  name: (value) => {
    if (value.trim() === "") return "Name is required.";
    return true;
  },
  email: (value) => {
    if (value.trim() === "") return "Email is required.";
    return /\S+@\S+\.\S+/.test(value) || "Invalid email";
  },
  password: (value) => {
    if (value.trim() === "") return "Password is required.";
    return value.length >= 6 || "Password must be at least 6 characters";
  },
  confirmPassword: (value, formValues) => {
    if (value.trim() === "") return "Confirm Password is required.";
    return value === formValues.password || "Passwords do not match";
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

  if (checkFormValidity(form)) {
    const formData = getFormValues(form);
    try {
      // Register the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("user:", user);

      // Add user data to Firestore
      await addDoc(collection(db, "users"), {
        name: formData.name,
        email: formData.email,
        uid: user.uid,
      });
      console.log("User data added to Firestore");
      // Show success message and optionally redirect or clear form
      alert('Signup successful!');
      form.reset(); // Reset the form after successful signup
      window.location.href = "/pages/auth/login.html"; // Redirect to login page
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("Something went wrong. Please try again.");
    }
  } else {
    console.log("Form contains errors");
  }
}

form.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmitForm);
