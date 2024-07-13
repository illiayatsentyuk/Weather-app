const btn = document.querySelector("#btn");
const input = document.querySelector("#input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

showContent();
hideLoader();


function hideLoader() {
    const loader = document.getElementById("loader");
    loader.style.display = "none";
}

function showLoader() {
    const loader = document.getElementById("loader");
    loader.style.display = "block"
}

function showContent() {
    const content = document.getElementById("content");
    content.style.display = "block"
}

function hideContent() {
    const content = document.getElementById("content");
    content.style.display = "none";
}


console.log("Client side javascript loaded!");

btn.addEventListener("click",async (e)=>{
    setTimeout(() => {
        showContent();
        hideLoader();
    }, 1000);
    e.preventDefault();
    hideContent();
    showLoader();
    fetch(`http://localhost:3000/weather?address=${input.value}`).then(res=>res.json()).then(data=>{
        if (data.error)
            msg1.innerHTML = data.error;
        else if(!data.error && !(data.forecast && data.location))
            msg1.innerHTML = 'ERROR';
        else
            msg1.innerHTML = `Forecast: ${data.forecast}`;
            msg2.innerHTML = `Location: ${data.location}`;
    }).catch((err)=>{
        console.log(err);
    })

})
