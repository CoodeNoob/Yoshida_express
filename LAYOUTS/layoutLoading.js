// LOADING THE FOOTER AND HEADER 
fetch('../LAYOUTS/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer_block').innerHTML = data;
    });

fetch('../LAYOUTS/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header_block').innerHTML = data;
    });

fetch('../LAYOUTS/loader.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('loader-container').innerHTML = data;
    });