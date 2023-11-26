let products = [   
{
    name: 'Portable Hang Board',
    tag: 'product-1',
    price: 20.00,
    inCart: 0
},
{
    name: 'Performance Enchancing Grip Strengthener',
    tag: 'product-2',
    price: 12.99,
    inCart: 0
},
{
    name: 'Cliffer Climbing Rope',
    tag: 'product-3',
    price: 15.99,
    inCart: 0
},
{
    name: 'Safety Climbing Harness',
    tag: 'product-4',
    price: 20.00,
    inCart: 0
},
{
    name: 'Sportiva Climbing Shoes',
    tag: 'product-5',
    price: 25.00,
    inCart: 0
},
{
    name: 'Black Air Force Shoes',
    tag: 'product-6',
    price: 20.00,
    inCart: 0
},
{
    name: 'Cliffer Althletics',
    tag: 'product-7',
    price: 15.99,
    inCart: 0
},
{
    name: 'Womens Climbing Shoes',
    tag: 'product-8',
    price: 20.00,
    inCart: 0
},
{
    name: 'Panda Chalk Bag',
    tag: 'product1',
    price: 19.99,
    inCart: 0
},
{
    name: 'Bee Chalk Bag',
    tag: 'product2',
    price: 19.99,
    inCart: 0
},
{
    name: 'Strawberry Chalk Bag',
    tag: 'product3',
    price: 19.99,
    inCart: 0
},
{
    name: 'Monster Chalk Bag',
    tag: 'product4',
    price: 19.99,
    inCart: 0
},
{
    name: 'Cute Chalk Bag',
    tag: 'product5',
    price: 19.99,
    inCart: 0
},
{
    name: 'Among-Us Chalk Bag',
    tag: 'product6',
    price: 19.99,
    inCart: 0
},
{
    name: 'BigFoot Chalk Bag',
    tag: 'product7',
    price: 19.99,
    inCart: 0
},
{
    name: 'Husky Chalk Bag',
    tag: 'product8',
    price: 19.99,
    inCart: 0
}
]


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else  {
    ready()
}


const bar = document.getElementById('bar')
const nav = document.getElementById('nav')
const close = document.getElementById('close')

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

const main = document.getElementById('main-img')
function changeImage(x) {
    main.src = x.src
}

function ready() {
    const removeCartItemButtons = document.getElementsByClassName('fa-times-circle')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    let quanityInput = document.getElementsByClassName('cart-input')
    for (let i = 0; i < quanityInput.length; i++) {
        let input = quanityInput[i]
        input.addEventListener('change', quantityChange)
    }
    removeCartItem();
    onLoadCartNumbers() 
}

function removeCartItem(event) {
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove()

        let productNumbers = localStorage.getItem('cartNumbers')
        productNumbers = parseInt(productNumbers)
        if ( productNumbers ) {
           localStorage.setItem('cartNumbers', productNumbers - 1) 
           document.querySelector('.cart span').textContent = productNumbers - 1
        } else {
            document.querySelector('.cart span').classList.add('x')
        }
        updateCartTotal()
}

function quantityChange(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}


function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row') 
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let row = cartRows[i]
        let priceElement = row.getElementsByClassName('item-price')[0]
        let quantityElement = row.getElementsByClassName('cart-input')[0]
        let price = parseFloat(priceElement.innerHTML.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementById('sub-total').innerHTML = '$' + total
    document.getElementById('cart-total').innerHTML = '$' + Math.round(total * 101.065) / 100
}


/**/

let carts = document.getElementsByClassName('fa-cart-shopping')
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
            cartNumbers(products[i])
    })
}


function onLoadCartNumbers () {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
    
    if ( productNumbers ) {
       localStorage.setItem('cartNumbers', productNumbers + 1) 
       document.querySelector('.cart span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1
        document.querySelector('.cart span').classList.add('x')
    }
    setItems(product)
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    if (cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1
    } else {
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function displayCart () {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)
    let productContainer = document.getElementsByClassName('cart-items')[0]

    if ( cartItems && productContainer) {
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr class="cart-row">
                <td><i class="far fa-times-circle"></i></td>
                <td><img src="img/${item.tag}.webp" alt=""></td>
                <td>${item.name}</td>
                <td class="item-price">$${item.price}</td>
                <td><input type="number" value="1" class="cart-input"></td>
            </tr>  `
        })
        updateCartTotal()
    } else {
        productContainer.innerHTML = ''
        productContainer.innerHTML += `
        <section class='cart-message'> Sorry You have no items in your cart at the moment :( </section>`
        document.getElementById('sub-total').innerHTML = '$0'
        document.getElementById('cart-total').innerHTML = '$0'
    }
}


onLoadCartNumbers()
displayCart()

let items = document.getElementsByClassName('fa-times-circle')
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', () => {
        localStorage.removeItem(products[i])
        cartProducts(products[i])
    })
}

function cartProducts(product) {

    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    if (cartItems[product.tag]) {
        delete cartItems[product[i]]
    }    
}

    