function showUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  users.forEach((user, index) => {
    const isSelected = user.selected ? "✅" : `<button onclick="selectUser(${index})">Select</button>`;
    const row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.phone}</td>
        <td>${user.age}</td>
        <td>${isSelected}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Select user
function selectUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users[index].selected = true;
  localStorage.setItem("users", JSON.stringify(users));

  // Send Email
  function sendSelectionEmail(user) {
  emailjs.send("service_3goc4qa", " audition_select_template", {
    name: user.name,
    to_email: user.email // This must match the variable in the template
  })
  .then(function(response) {
     alert("Email sent to " + user.name);
  }, function(error) {
     console.error("Email send failed", error);
  });
}


  // Refresh the table
  showUsers();
}
