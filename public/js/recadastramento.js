let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e)=>{
 let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
 arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
});

const formAPI = document.querySelector("#FormAPI");

formAPI.addEventListener("submit", async (event) => {
  event.preventDefault();

  const codigoInscricao = document.querySelector("#codigoInscricao").value;
  const idCategoriaInscricao = document.querySelector("#idCategoriaInscricao").value;

  const url = 'http://localhost:3000/proxy/Recadastramento';
  const data = {
    Token: "39265653db698e339e83d8f695d0a38161f03a2b",
    CodigoInscricao: codigoInscricao,
    IdCategoriaInscricao: idCategoriaInscricao,
    Pessoa: "F"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("resultado").innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  } catch (error) {
    document.getElementById("resultado").innerText = "Ocorreu um erro: " + error.message;
  }
});
