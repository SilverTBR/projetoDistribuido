let usuario = JSON.parse(sessionStorage.getItem("usuario"));
let mainElement = document.querySelector('main');
//Conecta ao servidor websocket do serviço
let ws = new WebSocket("ws://localhost:8080");

//se rolar erro
ws.addEventListener("error", (error) => {
    console.error("Erro na conexão WebSocket:", error);
});

//Quando conexão for realizada vai mandar o id para o serviço
ws.addEventListener("open", () => {
    console.log("Conectou!")
    ws.send(usuario.id.toString());
});

//Se receber mensagem do servidor vai chamar a função que cria notificação
ws.addEventListener('message', function (event) {
    let dado = JSON.parse(event.data);
    notifica(dado.jogos.nome + " foi vendido!");
});

//Função que pega a mensagem e gera a notificação em tela
function notifica(messagem) {
    let notificao = document.createElement('div');
    notificao.className = 'notificao';
    let titulo = document.createElement('strong');
    titulo.textContent = 'VENDA REALIZADA';
    titulo.className = 'notificao-titulo';
    notificao.appendChild(titulo);

    let linha = document.createElement('hr');
    notificao.appendChild(linha);

    let texto = document.createElement('p');
    texto.textContent = messagem;
    texto.className = 'notificao-message';
    notificao.appendChild(texto);
    let container = document.getElementById('notificao-container');
    container.insertBefore(notificao, container.firstChild);
    //Após 10 segundos some a notificação
    setTimeout(function() {
        container.removeChild(notificao);
    }, 10000);

    //Se clicar na notificação ela some
    notificao.addEventListener('click', function() {
        notificao.remove();
    });
}




