document.getElementById("formVerify").addEventListener("submit", function(event) {
    event.preventDefault();

    const inputCode = document.getElementById("verificationCode").value;
    const storedCode = sessionStorage.getItem("verificationCode");

    if (inputCode === storedCode) {
        alert('Código correto! Redirecionando para o recadastramento.');
        
        // Redirecionar para a página recadastramento.html após a verificação
        window.location.href = '/recadastramento';
    } else {
        alert('Código incorreto! Tente novamente.');
    }
});