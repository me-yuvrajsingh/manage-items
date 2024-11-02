let items = JSON.parse(localStorage.getItem("items")) || [];

document.addEventListener("DOMContentLoaded", renderItems);

function toggleInput() {
    const inputContainer = document.getElementById("inputContainer");
    const overlay = document.getElementById("overlay");
    inputContainer.classList.toggle("show");
    overlay.classList.toggle("hidden");
}

function addItem() {
    const itemName = document.getElementById("itemInput").value.trim();
    if (itemName) {
        items.push({ name: itemName, status: "" });
        saveItems();
        renderItems();
        document.getElementById("itemInput").value = "";
        toggleInput();
    }
}

function renderItems() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";
    items.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("item");

        if (item.status === "took") {
            listItem.classList.add("completed");
        } else if (item.status === "bring") {
            listItem.classList.add("brought");
        }

        listItem.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button onclick="markItem(${index}, 'took')">Took</button>
                <button onclick="markItem(${index}, 'bring')">Bring</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </div>
        `;
        itemList.appendChild(listItem);
    });
}

function markItem(index, status) {
    items[index].status = status;
    saveItems();
    renderItems();
}

function deleteItem(index) {
    items.splice(index, 1);
    saveItems();
    renderItems();
}

function saveItems() {
    localStorage.setItem("items", JSON.stringify(items));
}
