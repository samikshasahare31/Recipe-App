let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let allDish = document.querySelectorAll(".dishes");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let dishValue = document.querySelectorAll(".dishVal");
let RecipeContent = document.querySelectorAll('#RecipeContent');

let count = 0;

const setHome = async (value) => {
  try {
    let datas = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let jsonData = await datas.json();

    console.log(jsonData.meals);
    document.querySelector(".showMeal").innerHTML = "";

    jsonData.meals.forEach(function (data) {
      console.log("Resp", data);
      let div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <img src=${data.strMealThumb} alt="">
        <p>${data.strMeal}</p>
        <button>View More</button>
       `;
      div.setAttribute("data-area", data.strArea);
      div.setAttribute("data-category", data.strCategory);
      for (let i = 1; i <= 20; i++) {
        div.setAttribute(`data-strIngredient${i}`, data[`strIngredient${i}`]);
      }
      div.setAttribute("data-area", data.strArea);
      div.setAttribute("data-category", data.strCategory);
      console.log(data[`strInstructions`],"data[`strInstructions`]");
      div.setAttribute(`data-strInstructions`, data[`strInstructions`]);
      console.log(data[`strYoutube`],"::::::::::data[`strYoutube`]");
      div.setAttribute(`data-strYoutube`, data[`strYoutube`]);


      for (let i = 1; i <= 20; i++) {
        div.setAttribute(`data-strInstructions`, data[`strInstructions`]);
      }
  
      
      for (let i = 1; i <= 20; i++) {
        div.setAttribute(`data-strYoutube`, data[`strYoutube`]);
      }

      document.querySelector(".showMeal").appendChild(div);
    });

    
    handleModal();
  } catch (error) {
    document.querySelector(".showMeal").innerHTML = "<h1>Meal Not found</h1>";
  }
}
setHome()
const getData = async (value) => {
  try {
    let datas = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    let jsonData = await datas.json();

    console.log(jsonData.meals);
    document.querySelector(".showMeal").innerHTML = "";

    jsonData.meals.forEach(function (data) {
      console.log("Resp", data);
      let div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <img src=${data.strMealThumb} alt="">
        <p>${data.strMeal}</p>
        <button>View More</button>
       `;
      div.setAttribute("data-area", data.strArea);
      div.setAttribute("data-category", data.strCategory);
      for (let i = 1; i <= 20; i++) {
        div.setAttribute(`data-strIngredient${i}`, data[`strIngredient${i}`]);
      }
      div.setAttribute("data-area", data.strArea);
      div.setAttribute("data-category", data.strCategory);
      console.log(data[`strInstructions`],"data[`strInstructions`]");
      div.setAttribute(`data-strInstructions`, data[`strInstructions`]);
      console.log(data[`strYoutube`],"::::::::::data[`strYoutube`]");
      div.setAttribute(`data-strYoutube`, data[`strYoutube`]);


      for (let i = 1; i <= 20; i++) {
        div.setAttribute(`data-strInstructions`, data[`strInstructions`]);
      }
  
      
      for (let i = 1; i <= 20; i++) {
        div.setAttribute(`data-strYoutube`, data[`strYoutube`]);
      }

      document.querySelector(".showMeal").appendChild(div);
    });

    handleModal();
  } catch (error) {
    document.querySelector(".showMeal").innerHTML = "<h1>Meal Not found</h1>";
  }
}

function handleModal() {
  var modal = document.getElementById("myModal");

  var viewMoreButtons = document.querySelectorAll(".showMeal .card button");

  var span = document.getElementsByClassName("close")[0];

  viewMoreButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      console.log("Button clicked:", button);
    console.log("🚀 ~ index:", index)

      var mealNameElement = document.querySelectorAll(".showMeal .card p")[index];
      console.log("Meal Name Element:", mealNameElement);
      var mealName = document.querySelectorAll(".showMeal .card p")[index].textContent;
      console.log("Meal Name:", mealName);
      var area = document.querySelectorAll(".showMeal .card")[index].getAttribute("data-area");
      var category = document.querySelectorAll(".showMeal .card")[index].getAttribute("data-category");

      var ingredients = "";
      var instruction=''
      var youtube=''
      for (var i = 1; i <= 20; i++) {
        var instruction = document.querySelectorAll(".showMeal .card")[index].getAttribute("data-strInstructions");
        if (instruction) {
          instruction += instruction;
        }
      }
   
      for (var i = 1; i <= 20; i++) {
        var youtube = document.querySelectorAll(".showMeal .card")[index].getAttribute("data-strYoutube");
        console.log("🚀 ~ youtube:", youtube)
        if (youtube) {
          youtube += youtube;
        }
      }
   
// https://www.themealdb.com/api/json/v1/1/search.php?s=

      for (var i = 1; i <= 20; i++) {
        var ingredient = document.querySelectorAll(".showMeal .card")[index].getAttribute("data-strIngredient" + i);
        if (ingredient) {
          ingredients += ingredient + ", ";
        }
      }
      ingredients = ingredients.slice(0, -2);
      console.log("YOUTUBE",youtube);
      document.getElementById("mealName").innerHTML = "<b>Meal Name: </b>" + mealName;
      document.getElementById("areaCategory").innerHTML = "<b>Area:</b> " + area + ", Category: " + category;
      document.getElementById("ingredients").innerHTML = "<b>Ingredients: </b>" + ingredients;
      document.getElementById("instruction").innerHTML = "<b>Instruction: </b>" + instruction;
      document.getElementById("youTube").innerHTML = "<b>Youtube: </b>" + youtube;

     
      modal.style.display = "block";
    });
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}



searchInput.addEventListener("input", async function(){
  let searchValue = searchInput.value.trim();
  if(searchValue === ""){
      clearDropdownOptions();
  } else {
      await updateDropdownOptions(searchValue);
  }
});

searchBtn.addEventListener("click", function () {
  let searchTerm = searchInput.value.trim();
  if (searchTerm.length >= 1) {
      getData(searchTerm);
  } else {
      alert("Please enter a search term");
  }
});




dishValue.forEach(function(dishData){
    dishData.addEventListener("click", function(){    
       getData(dishData.value)
    })
})


allDish.forEach(function(slide, index){
    slide.style.left =`${index * 100}%`
})

function myFun(){
    allDish.forEach(function(curVal){
        curVal.style.transform = `translateX(-${count * 100}%)`
    })
}

nextBtn.addEventListener("click", function(){
    count++;
    if(count == allDish.length){
        count=0;
    }
    myFun();
})

prevBtn.addEventListener("click", function(){
    count--;
    if(count == -1){
        count=allDish.length-1;
    }
    myFun();
})

async function updateDropdownOptions(searchValue) {
  console.log("🚀 ~ updateDropdownOptions ~ searchValue:", searchValue)
  try {
    let datas = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
    let jsonData = await datas.json();
    
    console.log("Fetched data:", jsonData); 
   
    let dishNames = jsonData.meals.map(meal => meal.strMeal);
    console.log("Dish names:", dishNames); 
    
  
    let dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = "";
    dishNames.forEach(dishName => {
      let option = document.createElement("option");
      option.value = dishName;
      dropdown.appendChild(option);
    });
    
   
    dropdown.style.display = "block";
  } catch (error) {
    console.error("Error fetching dropdown options:", error);
  }
}


function clearDropdownOptions() {
  let dropdown = document.getElementById("dropdown");
  dropdown.innerHTML = "";
  dropdown.style.display = "none";
}

searchInput.addEventListener("input", async function(){
  let searchValue = searchInput.value.trim();
  if(searchValue === ""){
    clearDropdownOptions();
  } else {
    await updateDropdownOptions(searchValue);
  }
});

document.getElementById("dropdown").addEventListener("change", function(event) {
  searchInput.value = event.target.value;
  clearDropdownOptions();
});
