document.getElementById("formVerify").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Pega o código inserido pelo usuário
    const inputCode = document.getElementById("verificationCode").value;
    
    // Recupera o código de verificação armazenado no sessionStorage
    const storedCode = sessionStorage.getItem("verificationCode");
  
    // Verifica se o código inserido corresponde ao armazenado
    if (inputCode === storedCode) {
      alert('Código correto! Redirecionando para o recadastramento.');
      
      // Redireciona para a página de recadastramento
      window.location.href = '/recadastramento';
    } else {
      alert('Código incorreto! Tente novamente.');
    }
  });
  