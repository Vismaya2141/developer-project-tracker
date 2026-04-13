const taskInput=document.getElementById('taskInput');
const addTaskbtn=document.getElementById('addTaskbtn');
const tasklist=document.getElementById('tasklist');

addTaskbtn.addEventListener('click',function(){
    const taskValue=taskInput.value;
    if(taskValue===""){
        alert("Please enter a task first");
        return;
    }
    const listItem=document.createElement('li');
    listItem.className='task-item';
    listItem.innerHTML="<span>"+taskValue+"</span><button class='delete-btn'>Delete</button>";
    const deleteBtn=listItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click',function(){
        listItem.remove();
    });
    tasklist.appendChild(listItem);
    taskInput.value="";
});