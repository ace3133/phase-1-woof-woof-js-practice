const dogBar = document.getElementById("dog-bar");
const dogSummaryContainer = document.getElementById("dog-summary-container");
const dogInfo = document.getElementById("dog-info");
const filter = document.getElementById("good-dog-filter");
let allDogs =[];
document.addEventListener("DOMContentLoaded", ()=>{
    fetch("http://localhost:3000/pups")
    .then(res=>res.json())
    .then(data=>{
     allDogs = data;
     showDogs(allDogs)
     
    })
})
function showDogs(dogs){
    dogBar.innerHTML = ""
    dogs.forEach(dog=>{
        console.log(dog)
 const span = document.createElement("span")
 dogBar.appendChild(span)
 span.innerHTML=dog.name;
 span.addEventListener("click", ()=>{
    dogInfo.innerHTML=`<img src = ${dog.image}><h2>${dog.name}</h2><button></button>`
   const dogbutton = dogInfo.querySelector("button")
   if (dog.isGoodDog === false){
    dogbutton.innerHTML = "BAD DOG!";
   }
   else if(dog.isGoodDog === true){
    dogbutton.innerHTML = "GOOD DOG!"
   }
   dogbutton.addEventListener("click", ()=>{
    if (dogbutton.innerHTML === "BAD DOG!"){
        dogbutton.innerHTML = "GOOD DOG!" 
        fetch(`http://localhost:3000/pups/${dog.id}`,{
            method :"PATCH",
            headers: { "Content-type": "application/json" },
            body:JSON.stringify({isGoodDog:true})})
            .then(res=>res.json())
            .then(data=> data)
    }
    else if (dogbutton.innerHTML ==="GOOD DOG!") {
         dogbutton.innerHTML = "BAD DOG!"
        fetch(`http://localhost:3000/pups/${dog.id}`,{
            method :"PATCH",
            headers: { "Content-type": "application/json" },
            body:JSON.stringify({isGoodDog:false})})
            .then(res=>res.json())
            .then(data=> data)
    }

})

 })
    })
}



filter.addEventListener("click", () => {
    if (filter.innerHTML === "Filter good dogs: OFF") {
        filter.innerHTML = "Filter good dogs: ON";
        const goodDogs = allDogs.filter(dog => dog.isGoodDog);
        showDogs(goodDogs);
    } else {
        filter.innerHTML = "Filter good dogs: OFF";
        showDogs(allDogs);
    }
});