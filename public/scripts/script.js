const btn = document.querySelector("#btn");
const input = document.querySelector("#input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");


console.log("Client side javascript loaded!");

btn.addEventListener("click",(e)=>{

    e.preventDefault();

    fetch(`http://localhost:3000/weather?address=${input.value}`).then((response) => {
        response.json().then((data) => {
          if (data.error) 
              msg1.innerHTML = data.error;
          else if(!data.error && !(data.forecast && data.location))
            msg1.innerHTML = 'ERROR';
          else 
              msg1.innerHTML = `Forecast: ${data.forecast}`;
              msg2.innerHTML = `Location: ${data.location}`;
        });
      });
      
})