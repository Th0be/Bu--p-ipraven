//POSLOUCHÁNÍ STRÁNKY PRO JEDNOTLIVÉ EVENTY
document.querySelector("#menuMobile").addEventListener("click", mobileMenu);
window.addEventListener("resize", windowResize);

//ZOBRAZOVÁNÍ SPRÁVNÉHO MENU PŘI ZMĚNĚ VELIKOSTI OKNA
function windowResize(){
    if(document.body.scrollWidth>=850){
        document.getElementById("menu").style.transition = "opacity 0s";
        document.getElementById("menu").style.opacity = "1";
        document.getElementById("menu").style.display = "block";
        document.getElementById("menuMobileImage").style.transform = "rotate(0deg)";
    }
    else if(document.body.scrollWidth<850){
        document.getElementById("menu").style.transition = "opacity 0s";
        document.getElementById("menu").style.opacity = "0";
    }
}
//MOBILNÍ MENU
function mobileMenu(){
    document.getElementById("menuMobileImage").style.transition = "transform 0.5s";
    if(document.getElementById("menuMobileImage").style.transform == "rotate(270deg)"){
        document.getElementById("menuMobileImage").style.transform = "rotate(0deg)";
        document.getElementById("menu").style.display = "none";
    }else{
        document.getElementById("menuMobileImage").style.transform = "rotate(270deg)";
        document.getElementById("menu").style.display = "block";
    }
}
