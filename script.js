// Sample Data for Initial UI
let todos = [
    { name: "John", rollNo: "101", description: "Complete Homework", age: 20 },
    { name: "Doe", rollNo: "102", description: "Prepare for Exam", age: 22 },
  ];
  
  // Initialize To-Do Table
  const todoTableBody = document.getElementById("todoTableBody");
  
  // Populate Table with Initial Data
  const populateTable = () => {
    todoTableBody.innerHTML = "";
    todos.forEach((todo, index) => {
      todoTableBody.innerHTML += `
        <tr>
          <td>${todo.name}</td>
          <td>${todo.rollNo}</td>
          <td>${todo.description}</td>
          <td>${todo.age}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editRow(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteRow(${index})">Delete</button>
          </td>
        </tr>`;
    });
  };
  
  // Delete Row
  const deleteRow = (index) => {
    todos.splice(index, 1);
    populateTable();
  };
  
  // Open Add/Edit Modal
  const todoModal = new bootstrap.Modal(document.getElementById("todoModal"));
  document.getElementById("addRow").addEventListener("click", () => {
    document.getElementById("todoForm").reset();
    editingIndex = -1; // New Row
    todoModal.show();
  });
  
  // Edit Row
  let editingIndex = -1;
  const editRow = (index) => {
    editingIndex = index;
    const todo = todos[index];
    document.getElementById("name").value = todo.name;
    document.getElementById("rollNo").value = todo.rollNo;
    document.getElementById("description").value = todo.description;
    document.getElementById("age").value = todo.age;
    todoModal.show();
  };
  
  // Save Row
  document.getElementById("todoForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const todo = {
      name: document.getElementById("name").value,
      rollNo: document.getElementById("rollNo").value,
      description: document.getElementById("description").value,
      age: document.getElementById("age").value,
    };
    if (editingIndex === -1) {
      todos.push(todo); // Add New Row
    } else {
      todos[editingIndex] = todo; // Update Existing Row
    }
    todoModal.hide();
    populateTable();
  });
  
  // Load Initial Table Data
  populateTable();
  