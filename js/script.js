// Prepare the table to display the results
// let tabTop = `<table><thead>
//                 <th>Customer</th><th>Product</th>
//                 <th>Quantity</th><th>Subtotal</th><th>Discount</th><th>Total</th>
//                 </thead>`;
// let tabBot = "</tbody></table>";
// let content = "<tbody>";

let tabTop = `<table><thead>
                <th>Name</th><th>Product</th>
                <th>Quantity</th><th>Promo Code</th><th>Postal Code</th><th>Phone Number</th>
                </thead>`;
let tabBot = "</tbody></table>";
let content = "<tbody>";

let totalNumOrders = 0, totalQuantity = 0, totalRevenue = 0;

// Returns the price according to the the product type
const getPrice = (productType) => {
    // Check if it's a laptop
    if(productType.toLowerCase() === "laptop") {
        return 1000;
    }
    // If not, check if it's a tablet
    else if(productType.toLowerCase() === "tablet") {
        return 600;
    }
    // If not, it's a phone
    else {
        return 400;
    }
}

// Calculates the discount an order has
const calculateDiscount = (subTotal, quantity, promoCode) => {
    let discount = 0;
    // Add the bulk discount, if applicable
    if(quantity >= 3) {
        discount += subTotal * 0.1;
    }
    // Add the promo code discount, if applicable
    if(promoCode.toLowerCase() === "save20") {
        discount += 20;
    }
}

// Calculates the final total after discount and tax
const calculateFinalTotal = (subTotal, discount) => {
    // Add the discount
    let total = subTotal - discount;
    // The minimum value is 0
    if(total < 0) {
        total = 0;
    }
    // Add tax
    return total * 1.13;
}

// Evaluates a regular expression on an input
const validateWithRegExp = (regExp, inputString) => {
    return regExp.test(inputString);
}

const addOrder = () => {
    let postalRegEx = /^[a-zA-Z]\d[a-zA-Z]\s\d[a-zA-Z]\d$/;
    let phoneRegEx = /^\(?\d{3}\)?(\s|-)\d{3}(\s|-)\d{4}$/;

    // Extract the information from the form
    let thisForm = document.forms["orderForm"];
    let name = thisForm["name"].value;
    let productType = thisForm["productType"].value;
    let quantity = thisForm["quantity"].value;
    let promoCode = thisForm["promoCode"].value;
    let postalCode = thisForm["postalCode"].value;
    let phoneNumber = thisForm["phoneNumber"].value;


    // // Get the price of the product
    // let productPrice = getPrice(productType);

    // // Calculate the subtotal
    // let subTotal = productPrice * quantity;

    // // Add the discount and tax
    // let discount = calculateDiscount(subTotal, quantity, promoCode);
    // let total = calculateFinalTotal(subTotal, discount);
    

    content += `<tr><td>${name}</td><td>${productType}</td><td>${quantity}</td><td>${promoCode}</td>
                <td>${postalCode}</td><td>${phoneNumber}</td></tr>`;
    document.getElementById("right").innerHTML = tabTop + content + tabBot;

    return false;
}