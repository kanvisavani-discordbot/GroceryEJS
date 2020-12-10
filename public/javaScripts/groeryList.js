let groceryList = [];
let price=0;
window.onload = () => {
    totalPrice();
    fetchGroceryList();
    loadTableData();
}

const setTableData = (groceries) => {
    groceryList = groceries
}
const fetchGroceryList = () => {
    fetch('/api/groceries')
        .then((res) => res.json())
        .then((data) => {
            setTableData(data);
            loadTableData(data);
        })
}

async function totalPrice() {
    await fetch('/api/total')
        .then((res) => res.json())
        .then((data) => {
            price= data.totalCost;
        })
}

async function deleteData(groceryId){
    await fetch('/api/delete/'+groceryId)
        .then((res)=>res.json())
        .then((data)=>{
        })
            totalPrice();
            fetchGroceryList();
            loadTableData();
}

async function editData(qty){
    await fetch('/api/update/'+groceryId)
        .then((res)=>res.json())
        .then((data)=>{
            totalPrice();
            fetchGroceryList();
            loadTableData();
        })
}
async function loadTableData(groceryList){
    const tableBody = document.getElementById('tableData');
    let data_html = '';
    groceryList && groceryList.length && groceryList.forEach((item, idx) => {
        data_html += `<tr><td><img src=${item.imgUrl}></td>
                       <td>${item.name}</td>
                       <td>${item.quantity}</td>
                       <td>${item.cost}</td>
                       <td><button onclick="deleteData(${item.id})" type="button" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                           <button onclick="editData(${item.quantity})" type="button" class="btn btn-success"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                      </tr>`
    })

    if(groceryList.length==0){
        tableBody.classList.add('text-center');
        data_html="<tr><td colspan='4'>No data is available!</td></tr>";
    }

    tableBody.innerHTML = data_html;
    loadTotalPrice();
}

async function loadTotalPrice() {
    const totalPrice = document.getElementById('totalPrice');
    totalPrice.innerHTML = `Sum: ${price}`;
}
