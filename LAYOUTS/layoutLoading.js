// current path
const pathPrefix = window.location.pathname.includes("/TEMPLATE/") ? "../" : "./";

fetch(pathPrefix + "LAYOUTS/footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer_block").innerHTML = data;
    });

fetch(pathPrefix + "LAYOUTS/header.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("header_block").innerHTML = data;

        // Apply path fixing AFTER header is inserted
        const pathPrefix = window.location.pathname.includes("/TEMPLATE/") ? "../" : "./";

        document.getElementById("logoImg").src = pathPrefix + "ASSETS/imgs/logo.jpg";
        document.getElementById("logoLink").href = pathPrefix + "index.html";
        document.getElementById("brandLink").href = pathPrefix + "index.html";
        document.getElementById("homeLink").href = pathPrefix + "index.html";
        document.getElementById("historyLink").href = pathPrefix + "TEMPLATE/history_page.html";
        document.getElementById("aboutLink").href = pathPrefix + "TEMPLATE/Aboutus.html";
    });

fetch(pathPrefix + "LAYOUTS/loader.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("loader-container").innerHTML = data;
    });
