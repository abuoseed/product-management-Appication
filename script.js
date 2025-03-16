let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

let mood = "create"
let tmp;
//get totel

function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.innerText = result
        total.style.background = "#040"
    } else {
        total.innerHTML = ""
        total.style.background = "#a00d02"
    }
}

//create product
//save localstorage
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []
}
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value != ""&& price.value !=""&& category.value !="" && count.value<=100) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro)
                }
            } else {
                dataPro.push(newPro)
            }
        } else {
            dataPro[tmp] = newPro
            mood = "create"
            submit.innerHTML = "Create"
            count.style.display = "block"

        }
        claerdata()
    }
    localStorage.setItem("product", JSON.stringify(dataPro))
    
    showdata()
}

//claer input
function claerdata() {
    title.value = ""
    price.value = ''
    total.innerHTML = ""
    ads.value = ''
    taxes.value = ''
    count.value = ''
    category.value = ''
    discount.value = ''

}

//read

function showdata() {
    let tabel = ''
    for (let i = 0; i < dataPro.length; i++) {
        tabel += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>          
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update </button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.querySelector(".tbody").innerHTML = tabel
    let btndelete = document.getElementById("deleteAll")
    if (dataPro.length > 0) {
        btndelete.innerHTML = `<button onclick="deleteAll()">delete All (${dataPro.length})</button>`
    } else {
        btndelete.innerHTML = ""
    }

    getTotal()
}
showdata()
//count
//delete

function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showdata()
}
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showdata()
}
//update
function updateData(i) {
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    discount.value = dataPro[i].discount
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    category.value = dataPro[i].category
    getTotal()
    count.style.display = "none"
    submit.innerHTML = "Update"
    mood = "update"
    tmp = i
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
//search

let searchMood = "title"
function getSearchMood(id) {
    let search = document.getElementById("search")

    if (id === "searchTitel") {
        searchMood = "title"
    } else {
        searchMood = "category"
    }
    search.placeholder = "Search By " + searchMood
    search.focus()
    search.value = ""
    showdata()

}
function searchData(value) {
    let tabel = ""
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                tabel += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>          
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update </button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `}
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                tabel += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>          
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update </button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `}
        }
    }
    document.querySelector(".tbody").innerHTML = tabel
}


//clean data





