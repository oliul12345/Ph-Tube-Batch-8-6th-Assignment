
let selectedCategory = 1000;  ///s-1 sort r jonnno dorlam
let sortByView = false; //  s-4
const loadCategory = async() => {

    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const category = data.data;
    // console.log(data.data)

    ////   get the category container 
    const getCategoryId = document.getElementById('category-container');

    category.forEach(element => {
        // console.log(element)
        const newBtn = document.createElement('Button');
        newBtn.className = 'category-btn btn btn-ghost bg-slate-700 text-white text-lg'
        newBtn.innerText = element.category;
        newBtn.addEventListener('click', () => {
            loadVideoData(element.category_id)
            const allBtn = document.querySelectorAll('.category-btn') //  . ta dawar karisma ase 
            for(const btn of allBtn){
                btn.classList.remove('bg-red-600')
            }
            newBtn.classList.add('bg-red-600')
        })
        getCategoryId.appendChild(newBtn)
    });
}

//  access sort btn  ****  S-7 ******
const sortBtn = document.getElementById('sort-btn').addEventListener('click', () => {
    console.log('sort btn clicked');
    loadVideoData(selectedCategory,sortByView)
    sortByView = true
})


/////     card videos data load form Api and show them in the browser

const loadVideoData = async(id,sortByView) => { ///  s-6
 
     selectedCategory = id; //s-2  sort r jonno variable tar value id dorlam
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const category = data.data;
    console.log(category)
///   sort related work ***  s-8
    if(sortByView){
        category.sort((a,b) => {
            const totalViews = a.others.views
            const totalViews2 = b.others.views
            
            const convertNumberTotalViews = parseFloat(totalViews.replace('k', '')) || 0
            const convertNumberTotalViews2 = parseFloat(totalViews2.replace('k','')) || 0
            console.log(convertNumberTotalViews,convertNumberTotalViews2)
            return convertNumberTotalViews - convertNumberTotalViews2
        })
    }
    ////   get the drawing container
    const drawingContainer = document.getElementById('card-container');
    drawingContainer.innerHTML = ''
    if(category.length === 0){
        drawingContainer.classList.remove('grid')
        drawingContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center text-5xl font-bold text-center">
        
        <div class="">
            <img class="w-[250px] h-[250px]" src="pic/Icon.png" alt="">
        </div>
        <div class=">
            <p class="">Oops !! Sorry there is <br> content here</p>
        </div>
       
       </div>
        `
    }

    
    category.forEach(element=> {
        const time = element.others.posted_date;
        const hour = parseInt(time / 3600);
        const minutes = parseInt(time % 3600 / 60 )
        // console.log(hour,minutes)

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
        <figure class="relative">
        <img class = "md:h-[300px] lg:h-[350px]" src="${element.thumbnail}" alt="Shoes" />
         
        </figure>
        <div class ='absolute bottom-28 left-6 bg-black p-4 text-white rounded-xl'>
        ${hour ? `${hour}hrs ` : ""} ${minutes ? `${minutes}min ago` : ""}
        </div>
      <div class=" flex mt-5 gap-5 h-[80px]">   
        <div>
          <img class="w-12 h-12 rounded-full" src="${element.authors[0].profile_picture }" alt="">
        </div>
       <div>
       <p class="font-bold text-2xl" >${element.title}</p>
       <div class="flex gap-4">
       <p>${element.authors[0].profile_name}</p>
       <p>${ element.authors[0].verified ? `<img src="./pic/fi_10629607.png" />` : ""}</p>
   </div>
   <p>${element.others.views} views</p>
  </div>
 </div>
</div>
        `
        drawingContainer.appendChild(div)
        drawingContainer.classList.add('grid')
    })


}

loadVideoData(selectedCategory,sortByView)//s-3 || s-5 sort r jonno ai function ar moddha variable ta raklam
loadCategory();