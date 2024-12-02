const record_column = document.querySelector("#records-column");
const input = document.getElementsByTagName("input")
const reset= document.getElementById("reset")



const onSubmitForm = (event) => {
    event.preventDefault();

    const employee = {
        name: event.target.name.value,
        employeeId: event.target.employeeID.value,
        salary: event.target.Salary.value,
        team: event.target.team.value,
        companyName: event.target.companyName.value,
        role: event.target.role.value

    }
    addemployeeData(employee);
    reset.enabled="true";
}

function addemployeeData(employee) {
    let record = document.createElement("tr");
    for (let key in employee) {
        const cell = document.createElement("td");
        cell.innerText = employee[key];
        record.append(cell);
    }
    let edit = document.createElement("span");
    edit.className = "fa-regular fa-pen-to-square";
    edit.style.padding = "5px";
    edit.addEventListener("click", editemployeeData)


    let dele = document.createElement("span");
    dele.className = "fa-solid fa-trash";
    record.append(edit, dele);
    dele.style.padding = "5px";
    dele.addEventListener("click", deleeteemployeedata);

    record_column.append(record);
    reset.disabled=false
    


}

const deleeteemployeedata = (event) => {
    //console.log(event.target.parentNode.parentnode);
    // console.log(event.target.parentNode);
    event.target.parentNode.remove();


}

const editemployeeData = (event) => {
    const arr=event.target.parentNode.innerText.split('\t')
    // console.log(arr)
    for (let i = 0; i <arr .length - 2; i++) {
        input[i].value=arr[i]
        // console.log(input[i])
    }

   deleeteemployeedata(event);
   alert("the data is deleted please update the existing form")
   reset.disabled=true

    
}

