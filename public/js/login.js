document.getElementById("formPhone").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const phoneNumber = document.getElementById("phoneNumber").value;

  // Armazenar temporariamente o número de telefone
  sessionStorage.setItem("phoneNumber", phoneNumber);
  
  // Gerar o código de verificação manualmente (6 dígitos aleatórios)
  const verificationCode = Math.floor(100000 + Math.random() * 900000); 
  
  // Armazenar o código gerado no sessionStorage
  sessionStorage.setItem("verificationCode", verificationCode);

  // Simulação do envio para o número (apenas no console por enquanto)
  console.log(`Código gerado para ${phoneNumber}: ${verificationCode}`);

  // Redirecionar para a página de verificação
  window.location.href = '/verificar'; // A página de verificação
});