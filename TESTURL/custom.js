document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const baseUrl = "https://seannurman.github.io/fundraiser/TESTURL/?form=FUNKUZGBBCU";

    const products = [
        {
            name: 'Umbrella',
            image: 'https://via.placeholder.com/100',
            variations: [
                { size: 'Small', price: 10 },
                { size: 'Medium', price: 15 },
                { size: 'Large', price: 20 }
            ]
        },
        {
            name: 'Pen',
            image: 'https://via.placeholder.com/100',
            variations: [
                { size: 'Small', price: 2 },
                { size: 'Medium', price: 3 },
                { size: 'Large', price: 4 }
            ]
        }
    ];

    function addToCart(productName, size, price, quantity) {
        const itemIndex = cart.findIndex(item => item.name === productName && item.size === size);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += quantity;
        } else {
            cart.push({ name: productName, size, price, quantity });
        }
        updateCartUI();
        updateCheckoutLink();
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartUI();
        updateCheckoutLink();
    }

    function updateCartUI() {
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = '';

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <img src="https://via.placeholder.com/50" alt="${item.name}" style="width: 50px; height: 50px;">
                <p>${item.name} - Size: ${item.size} - Quantity: ${item.quantity}</p>
                <button onclick="removeFromCart(${index})" class="btn btn-secondary"><i class="bi bi-trash"></i></button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    function updateCheckoutLink() {
    const itemsParam = cart.map(item => `${item.quantity} ${item.name}/${item.size}`).join('; ');
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const checkoutLink = `${baseUrl}&amount=${totalAmount}&modifyAmount=no&currency=USD`;
    document.getElementById('checkoutLink').href = checkoutLink;
    
    // Update the total amount in the HTML
    document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
}

// Ensure this function is called whenever you add or remove items from the cart.


    function loadProducts() {
        const productListElement = document.querySelector('.product-list');
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <select class="size-select">
                    ${product.variations.map(variation => `<option value="${variation.size}" data-price="${variation.price}">${variation.size} - $${variation.price}</option>`).join('')}
                </select>
                <input type="number" class="quantity-input" min="1" value="1">
                <button class="btn btn-primary add-to-cart">Add to Cart</button>
            `;
            productListElement.appendChild(productElement);

            const addButton = productElement.querySelector('.add-to-cart');
            addButton.addEventListener('click', () => {
                const sizeSelect = productElement.querySelector('.size-select');
                const size = sizeSelect.value;
                const price = parseFloat(sizeSelect.options[sizeSelect.selectedIndex].getAttribute('data-price'));
                const quantity = parseInt(productElement.querySelector('.quantity-input').value);
                addToCart(product.name, size, price, quantity);
            });
        });
    }

    loadProducts();
    updateCartUI();
});
