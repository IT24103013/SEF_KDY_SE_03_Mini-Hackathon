let bugs = JSON.parse(localStorage.getItem('bugs')) || [
    {id:1, title:"Login fail", assignee:"Alice", priority:"High", date:"2026-08-20", status:"Backlog"},
    {id:2, title:"CSS bug", assignee:"Bob", priority:"Low", date:"2026-08-21", status:"Done"},
    {id:3, title:"Database latency", assignee:"Alice", priority:"High", date:"2026-08-25", status:"Debugging"},
    {id:4, title:"Logo alignment", assignee:"Charlie", priority:"Medium", date:"2026-08-22", status:"Backlog"},
    {id:5, title:"Button color", assignee:"Bob", priority:"Low", date:"2026-08-23", status:"Backlog"}
];

function showView(v) {
    document.getElementById('list-view').style.display = v === 'list' ? 'block' : 'none';
    document.getElementById('add-view').style.display = v === 'add' ? 'block' : 'none';
    render();
}

function addBug() {
    const t = document.getElementById('in-title').value;
    const a = document.getElementById('in-assignee').value;
    const p = document.getElementById('in-priority').value;
    const d = document.getElementById('in-date').value;
    
    if (!t) return alert("Title is required!");
    if (!d || new Date(d) < new Date().setHours(0,0,0,0)) return alert("Invalid date!");
    
    bugs.push({id:Date.now(), title:t, assignee:a, priority:p, date:d, status:"Backlog"});
    localStorage.setItem('bugs', JSON.stringify(bugs));
    alert("Bug added!");
    showView('list');
}

function render() {
    const tbody = document.getElementById('task-body');
    const search = document.getElementById('search').value.toLowerCase();
    const assigneeFilter = document.getElementById('filter-assignee').value.toLowerCase();
    
    // Sort by Date
    const sortedBugs = [...bugs].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Apply Filters
    const filtered = sortedBugs.filter(b => 
        b.title.toLowerCase().includes(search) && 
        b.assignee.toLowerCase().includes(assigneeFilter)
    );

    tbody.innerHTML = filtered.map(b => `
        <tr>
            <td>${b.title}</td>
            <td>${b.assignee}</td>
            <td><span class="badge ${b.priority}">${b.priority}</span></td>
            <td>${b.date}</td>
            <td>
                <select onchange="updateStatus(${b.id}, this.value)">
                    <option ${b.status=="Backlog"?"selected":""}>Backlog</option>
                    <option ${b.status=="Debugging"?"selected":""}>Debugging</option>
                    <option ${b.status=="Fixed/Verified"?"selected":""}>Fixed/Verified</option>
                </select>
            </td>
            <td><button onclick="del(${b.id})">Delete</button></td>
        </tr>
    `).join('');
}

function updateStatus(id, s) { 
    bugs.find(b=>b.id==id).status = s; 
    localStorage.setItem('bugs', JSON.stringify(bugs)); 
}

function del(id) { 
    bugs = bugs.filter(b=>b.id!=id); 
    localStorage.setItem('bugs', JSON.stringify(bugs)); 
    render(); 
}

render();