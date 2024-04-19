// get total
// create product
// save to local storage
// clear inputs
// read
// delete
// count
// update
// search
// clean data

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

//! get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#23cd0d";
  }
  else {
    total.innerHTML = "";
    total.style.background = "#e12e2ef4";
  }
}

//! create product
//! and save t local storage

let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
}
else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  //! clean data
  if(title.value != "" && price.value != "" && category.value != "" && newProduct.count <= 100){
    if (mood === "create") {
      //! count
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      }
      else {
        dataProduct.push(newProduct);
      }
    } 
    else {
      dataProduct[tmp] = newProduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
  }
  else{
    clearData();
    window.alert(" You should enter title & price & category & count less than 100");
  }

  //todo: save to local storage
  localStorage.setItem("product", JSON.stringify(dataProduct));

  showData();
};

//! clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//! read

function showData() {
  let table = "";

  getTotal();

  for (let i = 0; i < dataProduct.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td>
          <button id="update" onclick="updateData(${i})">Update</button></td>
        <td>
          <button id="delete" onclick="deleteData(${i})">Delete</button></td>
      </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;

  let delete_btn = document.getElementById("deleteAll");

  if (dataProduct.length > 0) {
    delete_btn.innerHTML = `<button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
  }
  else {
    delete_btn.innerHTML = "";
  }
}
showData();

//! delete

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

//! update

function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProduct[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//! search

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById('search');

  if (id == "search-title"){
    searchMood = 'title';
    search.placeholder = "Search By Title";
  }
  else{
    searchMood = 'category';
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";

  if (searchMood == "title") {

    for(let i = 0; i < dataProduct.length; i++){

      if(dataProduct[i].title.includes(value.toLowerCase())){
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td>
              <button id="update" onclick="updateData(${i})">Update</button></td>
            <td>
              <button id="delete" onclick="deleteData(${i})">Delete</button></td>
          </tr>`;
      }
    }
  }
  else {
    for(let i = 0; i < dataProduct.length; i++){

      if(dataProduct[i].category.includes(value.toLowerCase())){
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td>
              <button id="update" onclick="updateData(${i})">Update</button></td>
            <td>
              <button id="delete" onclick="deleteData(${i})">Delete</button></td>
          </tr>`;
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
}