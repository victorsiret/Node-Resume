// Default state of sidebar (1=open)
let sideBarOut = 0

// Detect Screen Size
let device
if (window.screen.width < 1000) {device = 1;}
else {device = 0;}

if (device === 0) {
  document.getElementById("mySidebar").style.left = "0px";
  document.getElementById("mySidebar").style.opacity = "1"; 
  document.getElementById("main").style.marginLeft = "300px";
  sideBarOut = 1;
}

// Set the width of the sidebar to 250px and the left margin of the page content to 250px
function openNav() {
      // Open/Close for Desktop/Laptop/Tablet
      if (device === 0) {
        if (sideBarOut === 1) {
        document.getElementById("mySidebar").style.left = "-300px";
        document.getElementById("mySidebar").style.opacity = "0.5"; 
        document.getElementById("main").style.marginLeft = "0";
        sideBarOut = 0;
        }
        else {
        document.getElementById("mySidebar").style.left = "0px";
        document.getElementById("mySidebar").style.opacity = "1"; 
        document.getElementById("main").style.marginLeft = "300px";
        sideBarOut = 1;
        }
      }
      // Open/Close for Phone
      else {
        if (sideBarOut === 1) {
        document.getElementById("mySidebar").style.left = "-100vw";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("mySidebar").style.opacity = "0.5"; 
        sideBarOut = 0;
        }
        else {
        document.getElementById("mySidebar").style.left = "0px";
        document.getElementById("mySidebar").style.width = "100vw";
        document.getElementById("mySidebar").style.opacity = "1"; 
        sideBarOut = 1;
        }
      }
    }
  
  // Set the width of the sidebar to 0 and the left margin of the page content to 0
  function closeNav() {
    // If Desktop/Laptop/Tablet
    if (device === 0) {
      document.getElementById("mySidebar").style.left = "-300px";
      document.getElementById("mySidebar").style.opacity = "0.5"; 
      document.getElementById("main").style.marginLeft = "0";
      sideBarOut = 0;
    }
    // If Phone
    else {
    document.getElementById("mySidebar").style.left = "-100vw";
    document.getElementById("mySidebar").style.opacity = "0.5"; 
    document.getElementById("main").style.marginLeft = "0";
    sideBarOut = 0;
    }
  }