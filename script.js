const employeeID = document.querySelector("#employeeID");
const fname = document.querySelector("#fname");
const salary = document.querySelector("#salary");
const team = document.querySelector("#team");
const companyName = document.querySelector("#companyName");
const role = document.querySelector("#role");
const addButton = document.querySelector("#addEmployee");
const resetButton = document.querySelector("#reset");
const recordsColumn = document.querySelector("#records-column");
const updatebutton=document.querySelector('#updateEmployee');
const exemp_column=document.querySelector(".exemp_column");
const right=document.querySelector('.right');
const right_buttom=document.querySelector('.right_buttom');
let Index = null;

// Event Listeners
addButton.addEventListener("click", addEmployee);
resetButton.addEventListener("click", clearInputs);
updatebutton.addEventListener('click',update)

// Retrieve employees from localStorage
const getEmployees = () => JSON.parse(localStorage.getItem("employees")) || [];
const terminateemp=()=>JSON.parse(localStorage.getItem('IMPemp'))||[]


// Save employees,ex-employees to localStorage
const saveEmployees = (employees) => localStorage.setItem("employees", JSON.stringify(employees));
const ex_employees=(ex_employee)=>localStorage.setItem('IMPemp',JSON.stringify(ex_employee));

// Clear all input fields

function clearInputs() {
    employeeID.value = "";
    fname.value = "";
    salary.value = "";
    team.value = "";
    companyName.value = "";
    role.value = "SDE";
}

function addEmployee(){
    if(employeeID.value && fname.value && salary.value && team.value && companyName.value && role.value){
        {   const employees = getEmployees(); 
            
            // Creating new employee object 
            const newEmployee = { 
                employeeID: employeeID.value,
                fname: fname.value, 
                salary: salary.value,
                team: team.value, 
                companyName: companyName.value, 
                role: role.value 
                }; 
                employees.push(newEmployee);
                saveEmployees(employees); 
                clearInputs(); 
                displayEmployees(); 
                right.style.visibility='visible';
                }
    }
    
}
function displayEmployees() {
    const employees = getEmployees();

    recordsColumn.innerHTML = '';  

    if (employees.length) {
        for (let index = 0; index < employees.length; index++) {
            const emp = employees[index];
            
            

            recordsColumn.innerHTML += `
                <tr>
                    <td>${emp.employeeID}</td>
                    <td>${emp.fname}</td>
                    <td>${emp.salary}</td>
                    <td>${emp.team}</td>
                    <td>${emp.companyName}</td>
                    <td>${emp.role}</td>
                    <td>
                        <i class="fa-solid fa-pencil" onclick="editEmployee(${index})"></i>
                        <i class="fa-solid fa-trash" onclick="deleteEmployee(${index})"></i>
                        <button class="vip" onclick="revokemp(${index})">Revoke Emp</button>
                    </td>
                </tr>
            `;
        }
    } else {
        recordsColumn.innerHTML = `<tr><td colspan="7">No records found</td></tr>`;
    }
    
}

function editEmployee(index) {
    const employees = getEmployees();
    const emp = employees[index];

    employeeID.value = emp.employeeID;
    fname.value = emp.fname;
    salary.value = emp.salary;
    team.value = emp.team;
    companyName.value = emp.companyName;
    role.value = emp.role;

    updatebutton.style='display:block'
    addButton.style='display:none'
    // Set currentEditIndex to the current index when generating the HTML
    Index = index;
    
    
}
function update(){
    
    const employees = getEmployees();
    const emp = employees[Index];
    emp.employeeID=employeeID.value;
    emp.fname=fname.value;
    emp.salary=salary.value;
    emp.team=team.value;
    emp.companyName=companyName.value;
    emp.role=role.value

    updatebutton.style='display:none'
    addButton.style='display:block'
    saveEmployees(employees);
    displayEmployees();
    clearInputs()
}
//to delete the table row
function deleteEmployee(index) {
    if (confirm("Are you sure you want to delete this employee?")) {
        const employees = getEmployees();
        employees.splice(index, 1);
        saveEmployees(employees);
        displayEmployees();
    }
}
//to delete from emp table add in revoke list 
function revokemp(index){

    if(confirm("Are you sure you want to revoke him ?")) {
        const employees = getEmployees();
        const emp = employees[index];

        // Get the terminated employees list
        const terminated_list = terminateemp();

        // Create a new terminated employee object
        const terminated_emp = {
            employeeID: emp.employeeID,
            fname: emp.fname, 
            salary: emp.salary,
            team: emp.team, 
            companyName: emp.companyName, 
            role: emp.role 

        };
       

        // Add the terminated employee to the list
        terminated_list.push(terminated_emp);
        ex_employees(terminated_list);

        // Remove the employee from the main list
        employees.splice(index, 1);
        saveEmployees(employees);

        // Update the displays
        displayEmployees();
        displayTerminatedEmployees(); // Call to update Ex-Emp column
    }
}

// Function to display terminated employees in the Ex-Emp column
function displayTerminatedEmployees() {
    const terminated_list = terminateemp();

    exemp_column.innerHTML = ''; // Clear the column
    if (terminated_list.length) {
        for (let index=0;index<terminated_list.length;index++) {
            const emp = terminated_list[index];
            exemp_column.innerHTML += `
                <tr>
                    <td>${emp.employeeID}</td>
                    <td>${emp.fname}</td>
                    <td>${emp.salary}</td>
                    <td>${emp.team}</td>
                    <td>${emp.companyName}</td>
                    <td>${emp.role}</td>
                    <td> 
                    <i class="fa-solid fa-trash" onclick="deleterevokedemployee(${index})">
                    </i>
                </tr>
            `;
        }
    } else {
        exemp_column.innerHTML = `<tr><td colspan="7" style="text-decoration: none;">No terminated employees found</td></tr>`;
        
    }
}


function deleterevokedemployee(index){
    if (confirm("Are you sure you want to delete this employee?")) {
        const terminated_list = terminateemp();
        terminated_list.splice(index, 1);
        ex_employees(terminated_list);
        displayTerminatedEmployees();
    }
}
// Call the display function for terminated employees on page load
displayTerminatedEmployees();

// Load employees on page load
displayEmployees();
