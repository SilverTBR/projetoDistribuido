import graficoService from "../service/graficoService.js"

window.onload = () => {
  if (!sessionStorage.getItem("token")) {
    window.location.href = "/?error=SemPermissao";
  }
  let usuario = JSON.parse(sessionStorage.getItem("usuario"));
  document.getElementById("perfil").innerHTML += usuario.nome
  let data = [];
  let labels = [];
  let resultado = null;
  const ctx = document.getElementById('myChart')


  const carregarDados = async () => {
    resultado = await graficoService.qntAnalisePorJogos(usuario.id, sessionStorage.getItem("token"));
    if (!resultado.status) {
      window.location.href = "/?error=SemPermissao";
    }

    labels = resultado.dados.map(dado => dado['Jogo.nome'])
    data = resultado.dados.map(dado => dado['quantidadeTextos'])

    gerarGrafico();
  }


  const gerarGrafico = () => {

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quantidade de analises',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });
  }

  // const gerarPDF = () => {
  //   const imgData = ctx.toDataURL("image/jpeg", 1.0);
  //   const pdf = new jsPDF();

  //   pdf.addImage(imgData, "JPEG", 0, 0);
  //   pdf.save("download.pdf");
  // };
  // gerarPDF()
    
  carregarDados();
}

