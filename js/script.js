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
        li.classList = `bg-gray-500 px-4 py-1 mx-5 rounded`
    });

  

}

loadCategory();