

function openMenubar() {
    var menubar_icon = document.getElementById("menubar-icon")
    var menubar_list = document.getElementById("menubar-list");
        
    if(menubar_list.style.display == none) {
        menubar_list.styele.display = block
        console.log("success")
    }

    if(menubar_list.style.display == block) {
        menubar_list.style.display = none;
        console.log("success")
    }

    console.log("failed")
}