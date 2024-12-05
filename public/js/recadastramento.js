let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e)=>{
 let arrowParent = e.target.parentElement.parentElement;
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
  const token = document.querySelector("#Token").value;

  const url = 'http://localhost:3000/proxy/Recadastramento';
  const data = {
    Token: token,
    CodigoInscricao: codigoInscricao,
    IdCategoriaInscricao: 1,
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
  
    const atributosDesejados = ["Nome", "CPFCNPJ", "Pessoa", "CodigoInscricao", "Mensagem"];
    const resultadoFiltrado = Object.fromEntries(
      Object.entries(result).filter(([key]) => atributosDesejados.includes(key))
    );
  
    const resultadoContainer = document.getElementById("resultado");
    resultadoContainer.innerHTML = `
      <div class="resultado-estilizado">
        ${Object.entries(resultadoFiltrado).map(([key, value]) => `
          <div class="resultado-item">
            <span class="resultado-label">${key}:</span> 
            <span class="resultado-valor">${value || "N/A"}</span>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    document.getElementById("resultado").innerText = "Ocorreu um erro: " + error.message;
  }
  
});
