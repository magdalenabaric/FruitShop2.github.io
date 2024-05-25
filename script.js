// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const sortButton = document.querySelector("#select1");
const inputBar = document.querySelector("#myInput");

let items = [
    {
        id: 1,
        name: 'Ananas',
        price: 2,
        amount: 10,
        image: 'images/ananas.jpg',
        image2: 'images/ananas.jpg',
    },
    {
        id: 2,
        name: 'Orange',
        price: 5,
        amount: 12,
        image: 'images/naranca.jpg',
        image2: 'images/naranca.jpg',

    },
    {
        id: 3,
        name: 'Kiwi',
        price: 6,
        amount: 8,
        image: 'images/kivi.jpg',
        image2: 'images/kivi.jpg',

    },
    {
        id: 4,
        name: 'Strawberries',
        price: 6.99,
        amount: 40,
        image: 'images/jagode.jpg',
        image2: 'images/jagode.jpg',

    },
    {
        id: 5,
        name: 'Apple',
        price: 1.99,
        amount: 20,
        image: 'images/jabuka.jpg',
        image2: 'images/jabuka.jpg',

    },
    {
        id: 6,
        name: 'Pear',
        price: 3.99,
        amount: 15,
        image: 'images/kruska.jpg',
        image2: 'images/kruska.jpg',

    },
    {
        id: 7,
        name: 'Peach',
        price: 5,
        amount: 12,
        image: 'images/breskve.jpg',
        image2: 'images/breskve.jpg',

    },
    {
        id: 8,
        name: 'Lemon',
        price: 1.50,
        amount: 25,
        image: 'images/limun.jpg',
        image2: 'images/limun.jpg',

    },
];

let cart = [];

updateCart();

function updateCartTotal() {
    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    cartTotal.textContent = `${total.toFixed(2)}`;
}

function buyItems() {
    let cartItems = [];
    cartItems.push(...cart);

    if (cartItems.length > 0) {
        cart = [];
        updateCart();

        const buyMess = document.querySelector('.buy-mess');
        buyMess.style.display = 'block';
        const buyMessNot = document.querySelector('.buy-mess-not');
        buyMessNot.style.display = 'none';

    }

    modalClose.addEventListener('click', function () {
        const buyMess = document.querySelector('.buy-mess');
        buyMess.style.display = 'none';
    });
}

function updateCart() {
    cartItemsList.innerHTML = '';

    const groupedItems = {};
    if (cart.length === 0) {
        const emptyCart = document.createElement('li');
        emptyCart.textContent = 'Your cart is empty.';
        emptyCart.classList.add('emptyCart');
        cartItemsList.appendChild(emptyCart);

    }
    cart.forEach(item => {
        if (groupedItems[item.id]) {
            groupedItems[item.id].amount++;
        } else {
            groupedItems[item.id] = { ...item, amount: 1 };
        }
    });


    Object.values(groupedItems).forEach(groupedItem => {
        const cartItemElement = document.createElement('li');
        const imageElement = document.createElement('img');


        const itemText = document.createTextNode(`${groupedItem.name}: $${groupedItem.price.toFixed(2)} x ${groupedItem.amount}`);
        cartItemElement.appendChild(itemText);

        cartItemsList.appendChild(cartItemElement);
        imageElement.src = groupedItem.image2;
        imageElement.alt = groupedItem.name;
        cartItemElement.appendChild(imageElement);

        const removeIcon = document.createElement('i');
        removeIcon.className = 'fas fa-times';
        removeIcon.style.color = '#ff6c18';
        removeIcon.addEventListener('click', function () {
            removeItemFromCart(groupedItem.id);
        });
        cartItemElement.appendChild(removeIcon);
    });

    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    cartTotal.textContent = `${total.toFixed(2)}`;

    cartBadge.textContent = cart.length;

}

function removeItemFromCart(itemId) {
    const indexToRemove = cart.findIndex(item => item.id === itemId);

    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);

        const itemToUpdate = items.find(item => item.id === itemId);
        if (itemToUpdate) {
            itemToUpdate.amount += 1;
        }

        updateCart();
        fillItemsGrid();
    }
}


// An example function that creates HTML elements using the DOM.
function fillItemsGrid() {
    itemsGrid.innerHTML = '';

    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2 class="poetsen-one-regular">${item.name}</h2>
            <p>$${item.price}</p>
            <p class="amount">Amount:${item.amount}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);

        const addToCartButton = itemElement.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', function () {
            const itemId = parseInt(addToCartButton.dataset.id);
            const itemToAdd = items.find(item => item.id === itemId);

            if (itemToAdd && itemToAdd.amount > 0) {
                itemToAdd.amount -= 1;

                const amountElement = itemElement.querySelector('.amount');
                amountElement.textContent = `Amount: ${itemToAdd.amount}`;

                cart.push(itemToAdd);
                updateCart();
            }
        });

        buyButton.addEventListener('click', function () {
            buyItems();
        });

        sortButton.addEventListener('change', function () {
            sortGrid(parseInt(select1.value));
        });

        inputBar.addEventListener('click', function () {
            document.getElementById('myUL').style.display = 'block';

        })

        document.addEventListener('click', function (event) {
            const clickedElement = event.target;

            if (clickedElement !== inputBar && !clickedElement.closest('#myUL')) {
                document.getElementById('myUL').style.display = 'none';
            }
        })
    }
}

function sortGrid(condition) {
    if (condition === 1) {
        items.sort((a, b) => a.id - b.id);
    }
    else if (condition === 2) {
        items.sort((a, b) => a.price - b.price);
    }
    else if (condition === 3) {
        items.sort((a, b) => b.price - a.price);
    }
    fillItemsGrid();
}


function myFunction() {
    var input = document.getElementById('myInput');
    var filter = input.value.toUpperCase();
    var li = document.getElementById("myUL").getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        var a = li[i].getElementsByTagName("a")[0];
        var txtValue = a.textContent || a.innerText;
        li[i].style.display = (txtValue.toUpperCase().indexOf(filter) > -1) ? "" : "none";
    }
}

var listItems = document.querySelectorAll("#myUL li");
listItems.forEach(function (item) {
    item.addEventListener('click', function () {
        var itemName = this.textContent.trim();

        if (itemName === "All") {
            fillItemsGrid();
        }
        else {
            var filteredItems = items.filter(item => item.name === itemName);
            displayFilteredItems(filteredItems);
        }

        document.getElementById('myUL').style.display = 'none';

    });
});

inputBar.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        var filter = inputBar.value.toUpperCase();
        var filteredItems = items.filter(item => item.name.toUpperCase().includes(filter));
        displayFilteredItems(filteredItems);
    }
});


function displayFilteredItems(filteredItems) {
    itemsGrid.innerHTML = '';

    filteredItems.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <p class="amount">Amount:${item.amount}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);

        const addToCartButton = itemElement.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', function () {
            const itemId = parseInt(addToCartButton.dataset.id);
            const itemToAdd = items.find(item => item.id === itemId);

            if (itemToAdd && itemToAdd.amount > 0) {
                itemToAdd.amount -= 1;
                const amountElement = itemElement.querySelector('.amount');
                amountElement.textContent = `Amount: ${itemToAdd.amount}`;
                cart.push(itemToAdd);
                updateCart();
            }
        });
    });
}

var input = document.getElementById('myInput');
input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        myFunction();
    }
});

// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
    modal.classList.toggle('show-modal');
}

// Call fillItemsGrid function when page loads
fillItemsGrid();

// Example of DOM methods for adding event handling
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);