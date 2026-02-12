// Prepare the table to display the results
let tabTop = `<h2>Receipt</h2><table><thead>
                <th>Customer</th><th>Product</th>
                <th>Quantity</th><th>Subtotal</th><th>Discount</th><th>Total</th>
                </thead>`;
let tabBot = "</tbody></table>";
let content = "<tbody>";

// let tabTop = `<table><thead>
//                 <th>Name</th><th>Product</th>
//                 <th>Quantity</th><th>Promo Code</th><th>Postal Code</th><th>Phone Number</th>
//                 </thead>`;
// let tabBot = "</tbody></table>";
// let content = "<tbody>";

let totalOrders = 0, totalQuantity = 0, totalRevenue = 0;

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

    return discount;
}

// Calculates the final total after discount and tax
const calculateFinalTotal = (subTotal, discount) => {
    // Add the discount
    let total = subTotal - discount;
    // The minimum value for the total is 0
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

// Updates the summary section
const updateSummary = (totalOrders, totalQuantity, totalRevenue, invalidInput) => {
    let summary = document.getElementById("summary");
    let message = document.getElementById("message");

    // Check to see if there was invalid input
    if(invalidInput) {
        // If so, print an error message to the message section
        // But first, clear the previous message
        message.innerHTML = "";

        let messageTitle = document.createElement("h2");
        messageTitle.textContent = "Message";
        message.appendChild(messageTitle);

        let messageP = document.createElement("p");
        messageP.textContent = "Error: Invalid input";
        message.appendChild(messageP);
    }
    // Otherwise, print the summary to the page
    else {
        // Clear the summary and the message
        summary.innerHTML = "";
        message.innerHTML = "";

        // Print a success message to the message section
        let messageTitle = document.createElement("h2");
        messageTitle.textContent = "Message";
        message.appendChild(messageTitle);

        let messageP = document.createElement("p");
        messageP.textContent = "Success!";
        message.appendChild(messageP);
    
        // Create the heading
        let summaryTitle = document.createElement("h2");
        summaryTitle.textContent = "Summary";
        summary.appendChild(summaryTitle);

        // Add the total number of orders
        let totalOrdersP = document.createElement("p");
        totalOrdersP.textContent = `Total number of orders: ${totalOrders}`;
        summary.appendChild(totalOrdersP);

        // Add the total quantity ordered
        let totalQuantityP = document.createElement("p");
        totalQuantityP.textContent = `Total quantity ordered: ${totalQuantity}`;
        summary.appendChild(totalQuantityP);

        // Add the total revenue
        let totalRevenueP = document.createElement("p");
        totalRevenueP.textContent = `Total revenue: $${totalRevenue.toFixed(2)}`;
        summary.appendChild(totalRevenueP);
    }

}

// Add the order to the page
const addOrder = () => {
    let postalRegExp = /^[a-zA-Z]\d[a-zA-Z]\s\d[a-zA-Z]\d$/;
    let phoneRegExp = /^\(?\d{3}\)?(\s|-)\d{3}(\s|-)\d{4}$/;
    let invalidInput = false;

    // Extract the information from the form
    let thisForm = document.forms["orderForm"];
    let name = thisForm["name"].value;
    let productType = thisForm["productType"].value;
    let quantity = thisForm["quantity"].value;
    let promoCode = thisForm["promoCode"].value;
    let postalCode = thisForm["postalCode"].value;
    let phoneNumber = thisForm["phoneNumber"].value;

    // Perform validation of the inputs
    if(name.trim().length >= 2 && Number.isInteger(Number(quantity)) && Number(quantity) >= 1 &&
        validateWithRegExp(postalRegExp, postalCode) && validateWithRegExp(phoneRegExp, phoneNumber)) {
        
        quantity = parseInt(quantity);

        // Get the price of the product
        let productPrice = getPrice(productType);

        // Calculate the subtotal
        let subTotal = productPrice * quantity;

        // Add the discount and tax
        let discount = calculateDiscount(subTotal, quantity, promoCode);
        let total = calculateFinalTotal(subTotal, discount);

        // Update the summary variables
        totalOrders++;
        totalQuantity += quantity;
        totalRevenue += total;

        // Update the summary
        updateSummary(totalOrders, totalQuantity, totalRevenue, invalidInput);

        content += `<tr><td>${name}</td><td>${productType}</td><td>${quantity}</td><td>$${subTotal.toFixed(2)}</td>
                    <td>-$${discount.toFixed(2)}</td><td>$${total.toFixed(2)}</td></tr>`;
        document.getElementById("receipt").innerHTML = tabTop + content + tabBot;

    }
    // If there is invalid input, display an error message on the page
    else {
        invalidInput = true;
        updateSummary(0, 0, 0, invalidInput);
    }

    
    return false;
}