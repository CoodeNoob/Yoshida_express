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
  });

fetch(pathPrefix + "LAYOUTS/loader.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("loader-container").innerHTML = data;
  });
