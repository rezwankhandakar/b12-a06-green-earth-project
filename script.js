const CategorieContainer = document.getElementById('Categorie-container')

const treesContainer = document.getElementById('trees-container')

const cartContainer = document.getElementById ('cart-container')

const cartItemsContainer = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

let carts = []

const loadCategory = () =>{
    fetch('https://openapi.programming-hero.com/api/categories')
.then(res => res.json())
.then(data =>{
    const categories = data.categories
    showCategory(categories)
})
.catch(err => {
    console.log(err)

}) 
};

 const showCategory = (categories)=>{
    categories.forEach(cat => {
        CategorieContainer.innerHTML +=`
        <li id="${cat.id}" class="hover:bg-[#15803D] hover:text-white p-1 rounded-sm cursor-pointer">${cat.category_name}</li>
        `
    });
  CategorieContainer.addEventListener('click',(e) =>{
    const allLi = document.querySelectorAll('li')
      
    allLi.forEach(li => {
        li.classList.remove('bg-[#15803D]')
    })

    if(e.target.localName === 'li'){
        e.target.classList.add('bg-[#15803D]')
        loadtreesByCategory(e.target.id)
    }
  })
 }
  
    const loadtreesByCategory = (categoryId) =>{
        const spinner = document.getElementById("loadingSpinner");
    spinner.classList.remove("hidden");
        fetch(`
            https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            showTreesByCategory(data.plants)
        })
        .catch(err => {
            console.log(err)
        })
         .finally(() => {
            spinner.classList.add("hidden"); // লোড শেষ হলে স্পিনার লুকাও
        })
    }


    const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
        showTreesByCategory(data.plants)
    })
    .catch(err => {
        console.log(err)
    })
}


    const showTreesByCategory = (plants) =>{
        treesContainer.innerHTML = ""
        plants.forEach(plant =>{ 
            treesContainer.innerHTML +=`
            <div id="${plant.id}" class="bg-white border-1 border-gray-200 rounded-lg h-auto w-40 flex flex-col justify-between">
                    <img class="h-32 w-40 rounded-xl  p-2 " src="${plant.image}" alt="">
                    <h5 class="text-sm font-semibold pl-1">${plant.name}</h5>
                    <p class="text-[10px] pl-1">${plant.description}</p>
                    <div class="flex justify-between p-1">
                        <h6 class="bg-[#DCFCE7] rounded-xl text-xs text-[#15803D] px-2 flex justify-center items-center">${plant.category}</h6> 
                        <p class="text-xs font-semibold">${plant.price}</p>
                    </div>
                    <button class="bg-[#15803D] rounded-xl text-xs text-white px-10 py-1 flex justify-center items-center ml-2 mb-2 mr-1">Add to Cart</button>
                 </div>
            `
        })
    }

    treesContainer.addEventListener('click',(e)=>{
        if(e.target.innerText === 'Add to Cart'){
             handleCarts(e)
        }
        //    modal start
          if (e.target.tagName === "H5") {
        const treeCard = e.target.closest("div[id]");
        const name = treeCard.querySelector("h5").innerText;
        const description = treeCard.querySelectorAll("p")[0].innerText;
        const price = treeCard.querySelectorAll("p")[1].innerText;
        const image = treeCard.querySelector("img").src;

        document.getElementById("modalName").innerText = name;
        document.getElementById("modalDescription").innerText = description;
        document.getElementById("modalPrice").innerText = price;
        document.getElementById("modalImage").src = image;

    
        document.getElementById("treeModal").classList.remove("hidden");
    } 
    // modal ends
       
    })
// modal close heldel
    document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("treeModal").classList.add("hidden");
});

document.getElementById("treeModal").addEventListener("click", (e) => {
    if (e.target.id === "treeModal") {
        document.getElementById("treeModal").classList.add("hidden");
    }
});


const handleCarts = (e) => {
     
    const treeCard = e.target.parentNode;

    const treesName = treeCard.querySelector("h5").innerText;
    alert(`${treesName} has been added to cart!`);
    const treesPriceText = treeCard.querySelector("p.text-xs.font-semibold").innerText;
    const priceNumber = Number(treesPriceText.replace("৳", "").trim());
    const id = treeCard.id;

    const existing = carts.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        carts.push({
            name: treesName,
            price: priceNumber,
            id: id,
            quantity: 1
        })
    }

    showCarts(carts);
    showCartTotal(carts);
}

const showCarts = (carts) => {
    cartItemsContainer.innerHTML = ""
    carts.forEach(cart => {
        cartItemsContainer.innerHTML += `
        <div class="bg-[#F0FDF4] h-auto w-40 rounded-lg p-2 my-2 ml-2 flex justify-between items-center ">
            <div>
                <h5 class="text-sm">${cart.name}</h5>
                <p class="text-[10px] text-gray-500">৳${cart.price} x ${cart.quantity}</p>
            </div>
            <button class="remove-btn text-red-500" data-id="${cart.id}">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        `
    });

    // remove button handle
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.currentTarget.dataset.id;
            removeFromCart(id);
        });
    });
}

const removeFromCart = (id) => {
    const item = carts.find(cart => cart.id === id);

    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            carts = carts.filter(cart => cart.id !== id);
        }
    }

    showCarts(carts);
    showCartTotal(carts);
}

const showCartTotal = (carts) => {
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
        total += carts[i].price * carts[i].quantity;
    }
    cartTotal.innerText = "৳" + total;
}

loadCategory()
loadAllPlants()