const form = document.getElementById("form");

form.addEventListener("submit", async(e)=>{

e.preventDefault();

const data = new FormData(form);

const res = await fetch("/submit",{
method:"POST",
body:data
});

const json = await res.json();

document.getElementById("mensaje")
.innerText = json.message;

});
