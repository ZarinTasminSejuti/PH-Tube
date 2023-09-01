//fetch categories data
const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    displayCategory(data.data);
}

//fetching all content data
const loadAllContent = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data = await res.json();
    console.log(data.data);
    displayAllContent(data.data);
}



//display content
const displayAllContent = (content) => {
    const allContentContainer = document.getElementById('all-container');

    content.forEach(content => {
        // const categoryTitle = content.title;
        // console.log(categoryTitle);
        const div = document.createElement('div');
        div.classList = `p-3 w-full`
        div.innerHTML = `<img class="my-4 h-56 w-full rounded-lg" src="${content.thumbnail}" alt="" />
        
        <div class="flex gap-5 ml-1">
        
            <img class="w-11 h-11 rounded-full" src="${content?.authors[0]?.profile_picture}" alt=""/>

            <div>
                <p class="font-bold text-base">${content?.title}</p>
                <p class="text-sm text-gray-500 my-2 font-normal">${content?.authors[0]?.profile_name}</p>
                <p class="text-gray-500 text-sm font-normal">${content?.others?.views} views</p>
            </div>
        </div>`
        
        allContentContainer.appendChild(div);
     });
     

}
loadAllContent();

//display category
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