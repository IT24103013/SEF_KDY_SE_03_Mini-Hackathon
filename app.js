let bugs = JSON.parse(localStorage.getItem("bugs")) || [
  {
    id: 1,
    title: "Login fail",
    assignee: "Dev A",
    priority: "High",
    date: "2026-08-20",
    status: "Backlog",
  },
  {
    id: 2,
    title: "CSS bug",
    assignee: "Dev B",
    priority: "Low",
    date: "2026-08-21",
    status: "Done",
  },
];

function showView(v) {
  document.getElementById("list-view").style.display =
    v === "list" ? "block" : "none";
  document.getElementById("add-view").style.display =
    v === "add" ? "block" : "none";
  render();
}

function addBug() {
  const t = document.getElementById("in-title").value;
  const d = document.getElementById("in-date").value;
  if (!t) return alert("Title required");
  if (new Date(d) < new Date().setHours(0, 0, 0, 0))
    return alert("Date cannot be past");

  bugs.push({
    id: Date.now(),
    title: t,
    assignee: document.getElementById("in-assignee").value,
    priority: document.getElementById("in-priority").value,
    date: d,
    status: "Backlog",
  });
  localStorage.setItem("bugs", JSON.stringify(bugs));
  showView("list");
}

function render() {
  const tbody = document.getElementById("task-body");
  const search = document.getElementById("search").value.toLowerCase();
  tbody.innerHTML = bugs
    .filter((b) => b.title.toLowerCase().includes(search))
    .map(
      (b) => `
        <tr><td>${b.title}</td><td>${b.assignee}</td><td><span class="badge ${b.priority}">${b.priority}</span></td><td>${b.date}</td>
        <td><select onchange="updateStatus(${b.id}, this.value)">
            <option ${b.status == "Backlog" ? "selected" : ""}>Backlog</option>
            <option ${b.status == "Debugging" ? "selected" : ""}>Debugging</option>
            <option ${b.status == "Fixed/Verified" ? "selected" : ""}>Fixed/Verified</option>
        </select></td>
        <td><button onclick="del(${b.id})">Delete</button></td></tr>
    `,
    )
    .join("");
}

function updateStatus(id, s) {
  bugs.find((b) => b.id == id).status = s;
  localStorage.setItem("bugs", JSON.stringify(bugs));
}
function del(id) {
  bugs = bugs.filter((b) => b.id != id);
  localStorage.setItem("bugs", JSON.stringify(bugs));
  render();
}

render();
