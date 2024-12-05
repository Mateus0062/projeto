document.getElementById("formPhone").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const phoneNumber = document.getElementById("phoneNumber").value;

  // Enviar o número de telefone para o servidor via POST
  try {
    const response = await fetch("http://localhost:3000/proxy/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phoneNumber })
    });

    const data = await response.json();
    
    if (data.success) {
      //alerta  informando que a mensagem foi enviada com sucesso
      alert("Código enviado com sucesso!");

      //Armazenar código no sessionStorage
      sessionStorage.setItem("verificationCode", data.verificationCode)

      //encaminhaar para a página verificar
      window.location.href = '/verificar';
    } else {
      alert("Erro ao enviar o código.");
    }
  } catch (error) {
    console.error("Erro ao enviar SMS:", error);
    alert("Erro ao tentar enviar o SMS.");
  }
});
