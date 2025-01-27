// Mock data for users
let users = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", department: "Engineering", upiId: "john.doe@upi" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", department: "HR", upiId: "jane.smith@upi" }
  ];
  
  // Render user table
  function renderUserTable() {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = users.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.department}</td>
        <td>
          <button class="btn-warning" onclick="openUserForm(${user.id})">Edit</button>
          <button class="btn-danger" onclick="handleDelete(${user.id})">Delete</button>
          <a class="btn-success" href="upi://pay?pa=${user.upiId}&pn=${user.firstName}%20${user.lastName}&am=100&cu=INR" target="_blank">Pay Now</a>
        </td>
      </tr>
    `).join("");
  }
  
  // Open user form for adding or editing
  function openUserForm(userId = null) {
    const modal = document.getElementById("userFormModal");
    const formTitle = document.getElementById("formTitle");
    const userForm = document.getElementById("userForm");
  
    if (userId) {
      const user = users.find(u => u.id === userId);
      document.getElementById("userId").value = user.id;
      document.getElementById("firstName").value = user.firstName;
      document.getElementById("lastName").value = user.lastName;
      document.getElementById("email").value = user.email;
      document.getElementById("department").value = user.department;
      document.getElementById("upiId").value = user.upiId;
      formTitle.textContent = "Edit User";
    } else {
      userForm.reset();
      document.getElementById("userId").value = "";
      formTitle.textContent = "Add User";
    }
  
    modal.style.display = "flex";
  }
  
  // Close user form
  function closeUserForm() {
    document.getElementById("userFormModal").style.display = "none";
  }
  
  // Handle form submission
  function submitUserForm(event) {
    event.preventDefault();
  
    const userId = document.getElementById("userId").value;
    const user = {
      id: userId ? parseInt(userId) : users.length + 1,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      department: document.getElementById("department").value,
      upiId: document.getElementById("upiId").value
    };
  
    if (userId) {
      const index = users.findIndex(u => u.id === parseInt(userId));
      users[index] = user;
    } else {
      users.push(user);
    }
  
    renderUserTable();
    closeUserForm();
  }
  
  // Delete user
  function handleDelete(userId) {
    users = users.filter(user => user.id !== userId);
    renderUserTable();
  }
  
  // Initial render
  document.addEventListener("DOMContentLoaded", renderUserTable);
  