document.addEventListener('DOMContentLoaded', function () {
  // Load saved data from web storage
  loadSavedData();

  // Add event listener for form submission
  document.getElementById('registrationForm').addEventListener('submit', function (event) {
      event.preventDefault();
      validateAndSubmitForm();
  });

  // Additional validations for the date input field
  var dobInput = document.getElementById('dob');
  dobInput.addEventListener('change', function () {
      validateDateOfBirth();
  });
});

function validateAndSubmitForm() {
  // Perform additional validations here
  if (validateDateOfBirth()) {
      // If all validations pass, submit the form
      submitForm();
  } else {
      alert('Invalid Date of Birth. Age must be between 18 and 55.');
  }
}

function validateDateOfBirth() {
  // Get the selected date from the input
  var dobValue = document.getElementById('dob').value;

  // Calculate age based on the selected date
  var today = new Date();
  var birthDate = new Date(dobValue);
  var age = today.getFullYear() - birthDate.getFullYear();

  // Check if the age is between 18 and 55
  return age >= 18 && age <= 55;
}

function submitForm() {
  // Get form data
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var dob = document.getElementById('dob').value;
  var acceptedTerms = document.getElementById('terms').checked;

  // Create a new row for the table
  var newRow = document.createElement('tr');
  newRow.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${password}</td>
      <td>${dob}</td>
      <td>${acceptedTerms ? 'Yes' : 'No'}</td>
  `;

  // Append the new row to the table
  document.getElementById('dataTable').getElementsByTagName('tbody')[0].appendChild(newRow);

  // Save data to web storage
  saveDataToStorage(name, email, password, dob, acceptedTerms);

  // Clear the form
  document.getElementById('registrationForm').reset();
}

function saveDataToStorage(name, email, password, dob, acceptedTerms) {
  // Load existing data from web storage
  var existingData = loadDataFromStorage();

  // Add the new entry to the existing data
  existingData.push({
      name: name,
      email: email,
      password: password,
      dob: dob,
      acceptedTerms: acceptedTerms
  });

  // Convert the object to a JSON string
  var jsonString = JSON.stringify(existingData);

  // Save the JSON string to web storage
  localStorage.setItem('userData', jsonString);
}

function loadDataFromStorage() {
  // Load existing data from web storage
  var jsonString = localStorage.getItem('userData');

  // Parse the JSON string to an object
  return jsonString ? JSON.parse(jsonString) : [];
}

function loadSavedData() {
  // Load data from web storage
  var existingData = loadDataFromStorage();

  // Display the existing data in the table
  var tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

  existingData.forEach(function (entry) {
      var newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          <td>${entry.password}</td>
          <td>${entry.dob}</td>
          <td>${entry.acceptedTerms ? 'Yes' : 'No'}</td>
      `;
      tableBody.appendChild(newRow);
  });
}