var BM_shoppingCart = (function(){  // If anyone wants to use this they have to access this module name which is BM_ShoppingCart. In this case they
// say BM_shoppingCart.addItemToCart to acces my info. All info in the private sections cannot be seen bu other user. All info
// in public API is accessible to another user. 
    // Private Methods and properties
    var cart = []; 

    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    };

    function saveCart() {  // saves cart to local storage
        localStorage.setItem("shoppingCart", JSON.stringify(cart)); // converts arrays/obj's into a json string
    };
    
    function loadCart() {  // loads saved cart in local storage
        this.cart = JSON.parse(localStorage.getItem("shoppingCart")); // Coverting it back to a JSON object. 
    }; 

    loadCart(); 


    // Public Methods and properties
    var obj = {}; // Public API as long as you return it at the end. Could also do this.addItemToCart but not
    // recommended. 

    obj.addItemToCart = function(name, price, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count += count;
                saveCart(); // Fixed mistake 
                return; 
            }
        }
        
        var item  = new Item(name, price, count);
        cart.push(item);
        saveCart();  
    };

    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count; 
                break;
            }
        }
        saveCart(); 
    }; 

    obj.removeItemFromCart = function(name) { // Removes one particular item from a cart
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count--; //cart[i].count = cart[i].count = cart[i].count -1 (same thing)
                if (cart[i].count === 0) {
                    cart.splice(i, 1); //can also call removeItemFromCartAll(); here so that you don't duplicate code
                }
                break; 
            }
        }
        saveCart();
    };

    obj.removeItemFromCartAll = function(name) {  // Removes all item name (a particular item)
        for (var i in cart) {
            if (cart[i].name === name) {
                cart.splice(i, 1); 
                break;
            }
        }
        saveCart(); 
    };

    obj.clearCart = function() {  // clears cart
        cart = [];
        saveCart();  
    }; 

    // clearCart(); 
    // console.log(cart);       
    
    obj.countCart = function() { // return total count
        var totalCount = 0; 
        for (var i in cart) {
            totalCount += cart[i].count
        }
        return totalCount; 
    }

    // console.log(countCart());  

    obj.totalCart = function() {  // return total cost
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    }; 

    // console.log(totalCart());

    obj.listCart = function() {  // returns array of all Items
        var cartCopy = [];
        for (var i in cart) {
            var item = cart[i]; 
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2); 
            cartCopy.push(itemCopy); 
        } 
        return cartCopy;
        // Can't do return cart; or return cart.slice(); Remember arrays and objects are always a reference. 
    };  

    return obj;  // also can see this returned with an anymnmous obj(). 
})(); 

// Browserfy takes your code from back-end and coverts it to closures. 




















    





    
    




