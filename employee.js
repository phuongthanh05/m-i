let maxId = 1;
let listUser = [
  {
    id: 1,
    name: "nguyen van A",
    avatar: "image/hacker.png"
  },
  {
    id: 2,
    name: "nguyen van B",
    avatar: "image/hacker.png"
  }
]

const saveData = () => {
  localStorage.setItem("maxId", maxId);
  localStorage.setItem("listUser", JSON.stringify(listUser));
}

const loadData = () => {
  maxId = Number(localStorage.getItem("maxId") || 1);
  const text = localStorage.getItem("listUser") || "[]";
  listUser = JSON.parse(text); 
  console.log("maxId=", maxId);
  console.log("listUser=", listUser);
}

const handleDelete = (id) => {
  listUser = listUser.filter(
    (item) => {
      return item.id !== id
    }
  )

  loadUser();
}

const showPopup = (index) => {
  $("#popup").show();
  const item = listUser[index];
  $("#url").val(item.avatar);
  $("#name").val(item.name);
  $(".btn.update").off("click")
  $(".btn.update").click(function (e) { 
    e.preventDefault();
    listUser[index].name = $("#name").val();
    listUser[index].avatar = $("#url").val();
    loadUser();
    $("#popup").hide();
    saveData();
  });
}

const loadUser = () => {
  $("#list").empty();
  for(let i=0; i<listUser.length;i++) {
    $("#list").append(`
    <div class="item">
      <img src="${listUser[i].avatar}" class="avatar"/>
      <div class="name">${listUser[i].name}</div>
      <div class="blank"></div>
      <button class="btn delete" 
        onclick="handleDelete(${listUser[i].id})">delete</button>
      <button class="btn edit"
        onclick="showPopup(${i})"
      >edit</button>
    </div>
    `);
  }
}

const addUser = () => {
  $("#popup").show();
  $("#url").val("image/hacker.png");
  $("#name").val("");
  $(".btn.update").off("click")
  $(".btn.update").click(function (e) { 
    e.preventDefault();
    listUser.push({
      id: maxId + 1,
      avatar: $("#url").val(),
      name: $("#name").val(),
    })
    maxId += 1;
    loadUser();
    $("#popup").hide();
    saveData();
  });
}

$(document).ready(function () {
  loadData();
  $("#popup").hide();
  loadUser();
  console.log("da load xong")
});

