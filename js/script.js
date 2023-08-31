//fetch categories data
const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    displayCategory(data.data);
}

const displayCategory = (items) => {
    // console.log(items);
    const categoryDiv = document.getElementById('category-div');
    const categoryUl = categoryDiv.childNodes[1];
   
       
    
    
    items.forEach(item => {
       const categoryName = item.category;
        const li = document.createElement('li');
        li.innerText = categoryName;
        categoryUl.appendChild(li);
        li.classList = `bg-gray-200 text-black px-4 py-1 mx-5 rounded`;
        li.setAttribute("id", categoryName);
        li.setAttribute("onclick", "handleCategoryClick(this)");
    });

    
}

//
const handleCategoryClick = (targetedCategory) => {
    //Change for only clicked category
    targetedCategory.classList.remove("bg-gray-200", "text-black");
    targetedCategory.classList.add("bg-red-500", "text-white");
    toggleCategoryClass(targetedCategory);
}



const toggleCategoryClass = (targetedCategory) => {
    let targetedCategoryID = targetedCategory.id;

    let fullCategory = targetedCategory.parentNode.childNodes;
    let arrayOfFullCategory = Array.from(fullCategory);
    let getOnlyLi = arrayOfFullCategory.slice(1);

    getOnlyLi.forEach(element => {
        if (element.id !== targetedCategoryID) {
            //Change class name for others
            element.classList.remove("bg-red-500", "text-white");
            element.classList.add("bg-gray-200", "text-black");
        }
     });
}