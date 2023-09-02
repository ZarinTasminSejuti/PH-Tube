//fetch categories data
const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    displayCategory(data.data);
}

const convertTime = (postedDate) => {
    const postedNumber = Number(postedDate);
    const hour = Math.floor(postedNumber / 3600);
    const minute = Math.floor(postedNumber % 3600 / 60);

    const hourDisplay = hour > 0 ? hour + (hour === 1 ? "hrs " : "hrs ") : "";
    const minuteDisplay = minute > 0 ? minute + (minute === 1 ? "min" : "min") : "";

    return (hourDisplay + minuteDisplay + " ago");
}
 


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

        li.setAttribute("value", item.category_id);
    });    
}



//click category button
const handleCategoryClick = (targetedCategory) => {
    //Change for only clicked category
    targetedCategory.classList.remove("bg-gray-200", "text-black");
    targetedCategory.classList.add("bg-red-500", "text-white");
    toggleCategoryClass(targetedCategory);
    toggleDisplayContent(targetedCategory);

}
 
//category color changing by click
const toggleCategoryClass = (targetedCategory) => {
    const targetedCategoryID = targetedCategory.id;
    const fullCategory = targetedCategory.parentNode.childNodes;
    const arrayOfFullCategory = Array.from(fullCategory);
    const getOnlyLi = arrayOfFullCategory.slice(1);

    getOnlyLi.forEach(element => {
        if (element.id !== targetedCategoryID) {
            //Change class name for others
            element.classList.remove("bg-red-500", "text-white");
            element.classList.add("bg-gray-200", "text-black");
        }
    });

}

//toggle display contents
const toggleDisplayContent = (targetedCategoryForDisplay) => {
    const category_id = targetedCategoryForDisplay.value;
    loadAllContent(category_id);
}


//   //fetching all content data
let content = "";
const loadAllContent = async (category_id) => {

    let link = 'https://openapi.programming-hero.com/api/videos/category/1000';
    const dynamicApi = "https://openapi.programming-hero.com/api/videos/category/" + category_id;

    if (category_id) {
        link = dynamicApi;
    } 

    const res = await fetch(link);
    const data = await res.json();
    content = data.data;

    displayAllContent(content); 
}



  //Handle sort by views
const sortByView = () => {
    const sortedArray = content.sort((a, b) => parseFloat(b.others.views.replace("K", "") - parseFloat(a.others.views.replace("K", ""))));
    displayAllContent(sortedArray); 
}



const displayAllContent = (finalContentArray) => {

    const allContentContainer = document.getElementById('all-container');
    allContentContainer.innerHTML = "";
    
    if (finalContentArray.length !== 0){
        finalContentArray.forEach(contentElement => {
          


            const div = document.createElement('div');
            allContentContainer.classList.remove('py-28');
            allContentContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-3','lg:grid-cols-4');
            div.classList = `p-3 w-full relative`;
            div.innerHTML = `<img class="my-4 h-56 w-full rounded-lg" src="${contentElement.thumbnail}" alt="" />

            <p ${contentElement.others.posted_date ? 'class= "text-white absolute top-52 p-2 right-6 w-max rounded-md bg-black text-xs font-normal"' : 'class="text-white absolute top-52 right-6 w-max rounded-md bg-black text-xs font-normal"'
        }>${contentElement.others.posted_date ? convertTime(contentElement.others.posted_date) : ""}</p>

            
          

           
            <div class="flex gap-5 ml-1">
            
                <img class="w-11 h-11 rounded-full" src="${contentElement?.authors[0]?.profile_picture}" alt=""/>
    
                <div>
                    <p class="font-bold text-base">${contentElement?.title}</p>
                    <div class="flex gap-3 items-center">
                        <p class="text-sm text-gray-500 my-2 font-normal">${contentElement?.authors[0]?.profile_name}</p>

                        <p class="text-sm text-gray-500 my-2 font-normal">${contentElement.authors[0].verified ? '<img class ="w-4" src="./images/verified.png" />' : ""}</p>
                    </div>
                    <p class="text-gray-500 text-sm font-normal">${contentElement?.others?.views} views</p>
                </div>
                
            </div>`
        
            allContentContainer.appendChild(div); 
         });
     
    } else {
        const div = document.createElement('div');
        allContentContainer.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-3','lg:grid-cols-4');
        allContentContainer.classList.add('py-28');

        div.innerHTML = `<div class="text-center py-2/4">
            <img class="mx-auto my-0" src="./images/Icon.png" alt=""/>
            <p class="font-bold mt-7 text-5xl">Oops!! Sorry, There is no <br> content here</p>
        </div>`
        allContentContainer.appendChild(div);   
    }
    
}





