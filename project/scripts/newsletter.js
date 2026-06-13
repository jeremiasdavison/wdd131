// load saved preferences from localstorage if they exist
function getSavedPrefs() {
  const data = localStorage.getItem("aipulse-newsletter");
  if (data === null) {
    return null;
  }
  return JSON.parse(data);
}

// save the preferences object to localstorage
function savePrefs(prefs) {
  localStorage.setItem("aipulse-newsletter", JSON.stringify(prefs));
}

// remove saved preferences from localstorage
function clearPrefs() {
  localStorage.removeItem("aipulse-newsletter");
}

// simple email check using regex
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// show or hide an error message under a field
function showError(fieldId, show) {
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) {
    if (show) {
      errorEl.style.display = "block";
    } else {
      errorEl.style.display = "none";
    }
  }
}

// display the saved preferences in the "your preferences" section
function showSavedPrefs(prefs) {
  const section = document.getElementById("saved-section");
  const info = document.getElementById("saved-info");

  if (prefs === null) {
    section.style.display = "none";
    return;
  }

  // friendly names for each topic value
  const topicNames = {
    models: "Model releases & benchmarks",
    research: "Research papers",
    policy: "Policy & regulation",
    tools: "New AI tools",
    safety: "AI safety & alignment"
  };

  const freqNames = {
    weekly: "Weekly digest",
    daily: "Daily briefing",
    breaking: "Breaking news only"
  };

  // build the topic list string
  let topicList = "";
  if (prefs.topics.length === 0) {
    topicList = "None selected";
  } else {
    const topicLabels = prefs.topics.map(function(t) {
      return topicNames[t];
    });
    topicList = topicLabels.join(", ");
  }

  info.innerHTML = `
    <p><strong>Name:</strong> ${prefs.name}</p>
    <p><strong>Email:</strong> ${prefs.email}</p>
    <p><strong>Frequency:</strong> ${freqNames[prefs.frequency]}</p>
    <p><strong>Topics:</strong> ${topicList}</p>
  `;

  section.style.display = "block";
}

// fill in the form with previously saved data
function prefillForm(prefs) {
  if (prefs === null) return;

  document.getElementById("name").value = prefs.name;
  document.getElementById("email").value = prefs.email;
  document.getElementById("frequency").value = prefs.frequency;

  // check the right checkboxes
  const checkboxes = document.querySelectorAll("input[name='topics']");
  checkboxes.forEach(function(cb) {
    if (prefs.topics.includes(cb.value)) {
      cb.checked = true;
    } else {
      cb.checked = false;
    }
  });
}

function setupNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle !== null) {
    toggle.addEventListener("click", function() {
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      } else {
        menu.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("newsletter-form");
  const successMsg = document.getElementById("form-success");
  const clearBtn = document.getElementById("clear-btn");

  // if there are saved prefs, fill the form and show them
  const saved = getSavedPrefs();
  prefillForm(saved);
  showSavedPrefs(saved);

  // handle form submission
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const frequency = document.getElementById("frequency").value;

    // get all checked topic checkboxes
    const checkedBoxes = document.querySelectorAll("input[name='topics']:checked");
    const topics = [];
    checkedBoxes.forEach(function(cb) {
      topics.push(cb.value);
    });

    // validate fields
    let valid = true;

    if (name.length < 2) {
      showError("name", true);
      valid = false;
    } else {
      showError("name", false);
    }

    if (!isValidEmail(email)) {
      showError("email", true);
      valid = false;
    } else {
      showError("email", false);
    }

    if (!valid) return;

    // save to localstorage
    const prefs = { name: name, email: email, frequency: frequency, topics: topics };
    savePrefs(prefs);

    // show success and refresh the saved section
    successMsg.style.display = "block";
    form.reset();
    showSavedPrefs(prefs);
    successMsg.scrollIntoView({ behavior: "smooth" });
  });

  // clear button removes everything
  clearBtn.addEventListener("click", function() {
    clearPrefs();
    showSavedPrefs(null);
    successMsg.style.display = "none";
  });

  setupNavToggle();
});
