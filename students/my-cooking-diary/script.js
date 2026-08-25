const filterButtons=document.querySelectorAll(".filter");
const recipeCards=document.querySelectorAll(".recipe-card");
const randomButton=document.getElementById("randomButton");
const randomResult=document.getElementById("randomResult");

filterButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    const selected=button.dataset.filter;
    filterButtons.forEach(item=>item.classList.remove("active"));
    button.classList.add("active");
    recipeCards.forEach(card=>{
      const matches=selected==="all"||card.dataset.category===selected;
      card.classList.toggle("hidden",!matches);
    });
    randomResult.textContent="";
  });
});

randomButton.addEventListener("click",()=>{
  const visibleCards=[...recipeCards].filter(card=>!card.classList.contains("hidden"));
  const chosen=visibleCards[Math.floor(Math.random()*visibleCards.length)];
  const title=chosen.querySelector("h3").textContent;
  randomResult.textContent=`Tonight's questionable life choice: ${title} 🍴`;
  chosen.scrollIntoView({behavior:"smooth",block:"center"});
});