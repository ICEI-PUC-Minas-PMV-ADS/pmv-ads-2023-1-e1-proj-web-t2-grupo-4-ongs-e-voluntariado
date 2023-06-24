const formInfBasica = document.querySelector("#infBasica");
const btnSalvarInfBasica= formInfBasica.querySelector("#salvar");


const formContatos = document.querySelector("#contatos");
const btnSalvarContatos = formContatos.querySelector("#salvar");


const  formAcoes = document.querySelector("#formAcoes");
const btnSalvarAcao = formAcoes.querySelector("#btnSalvar");


const formVagas = document.querySelector("#formVagas");
const btnSalvarVaga = formVagas.querySelector("#btnSalvar");



function validarEmail(email) {
  // Expressão regular para verificar o formato do e-mail
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return formatoEmail.test(email);
}

function validarTelefone(telefone) {
  // Remove todos os caracteres não numéricos do número de telefone
  var numeroTelefone = telefone.replace(/\D/g, "");

  // Verifica se o número de telefone possui o formato correto
  var formatoTelefone = /^\d{10,11}$/; // Exemplo: 1234567890 ou 12345678901

  return formatoTelefone.test(numeroTelefone);
}


function verificarCamposVazios(formulario) {
  // Obtém todos os campos do formulário
  const campos = formulario.querySelectorAll('input, select, textarea');

  // Percorre todos os campos e verifica se estão vazios
  for (let i = 0; i < campos.length; i++) {
    const campo = campos[i];

    // Verifica se o campo está vazio
    if (campo.value.trim() === '') {
      // Campo vazio encontrado, retorna true
      return true;
    }
  }

  // Todos os campos estão preenchidos, retorna false
  return false;
}


function insereCardsNaLista(conjuntoCards) {

   let listaAcoes = document.querySelector("#listaAcoes");

   for (let i = conjuntoCards.length - 1; i>=0; i--) {
      listaAcoes.appendChild(conjuntoCards[i]);
   }

}

function salvarFormularioNoLocalStorage(formulario, id) {
  // Obtém todos os elementos do formulário
  var elementos = formulario.elements;

  // Cria um objeto para armazenar os dados do formulário
  var dadosFormulario = {};

  // Itera sobre os elementos do formulário
  for (var i = 0; i < elementos.length; i++) {
    var elemento = elementos[i];

    // Verifica se o elemento tem um nome e um valor
    if (elemento.name && elemento.value) {
      // Adiciona o valor do elemento ao objeto de dados do formulário
      dadosFormulario[elemento.name] = elemento.value;
    }
  }

  // Obtém os dados existentes no Local Storage para o ID fornecido
  var dadosSalvos = localStorage.getItem(id);

  // Se houver dados salvos no Local Storage
  if (dadosSalvos) {
    // Converte os dados salvos em um array JavaScript
    var arrayDadosSalvos = JSON.parse(dadosSalvos);

    // Adiciona os novos dados ao array existente
    arrayDadosSalvos.push(dadosFormulario);

    // Atualiza os dados salvos no Local Storage para o ID fornecido
    localStorage.setItem(id, JSON.stringify(arrayDadosSalvos));
  } else {
    // Se não houver dados salvos no Local Storage para o ID fornecido, cria um novo array com os dados do formulário
    var novoArrayDados = [dadosFormulario];

    // Salva os dados no Local Storage para o ID fornecido
    localStorage.setItem(id, JSON.stringify(novoArrayDados));
  }
}

function removeCardLocalStorage(card, chave) {
  var id = chave;
  var dadosSalvos = localStorage.getItem(id);

  if (dadosSalvos) {
    var arrayDadosSalvos = JSON.parse(dadosSalvos);


    var tituloDiv = card.querySelector("h3").innerText;
    var inicio = card.querySelector("#inicio").innerText;
    var fim = card.querySelector("#fim").innerText;
    var status = card.querySelector("#status").innerText;



    var indiceCard = arrayDadosSalvos.findIndex(function(dados) {
      return (
        dados.nomeAcao === tituloDiv &&
        dados.inicioPeriodoAtuacao === inicio &&
        dados.fimPeriodoAtuacao === fim &&
        dados.statusAcao === status
      );
    });

    if (indiceCard !== -1) {

      arrayDadosSalvos.splice(indiceCard, 1);


      localStorage.setItem(id, JSON.stringify(arrayDadosSalvos));
    }
  }
}

function criarEstruturaCardAcoes(){

   // Cria a div principal com o ID "cardAcao"
const divCardAcao = document.createElement('div');
divCardAcao.id = 'cardAcao';

// Cria o elemento h3 com o texto "Ação 1"
const heading = document.createElement('h3');

divCardAcao.appendChild(heading);

// Cria a lista não ordenada (ul)
const ul = document.createElement('ul');

// Cria os itens da lista (li)
const liDataInicio = document.createElement('li');
liDataInicio.textContent = 'de:';
liDataInicio.setAttribute("id","inicio");
ul.appendChild(liDataInicio);

const liDataFim = document.createElement('li');
liDataFim.textContent = 'até:';
liDataFim.setAttribute("id", "fim");
ul.appendChild(liDataFim);

const liLocal = document.createElement('li');
liLocal.textContent = 'local:';
liLocal.setAttribute("id","local");
ul.appendChild(liLocal);

const liStatus = document.createElement('li');
liStatus.textContent = 'status:';
liStatus.setAttribute("id","status")
ul.appendChild(liStatus);

divCardAcao.appendChild(ul);

// Cria a div com o ID "btnArea"
const divBtnArea = document.createElement('div');
divBtnArea.id = 'btnArea';

// Cria o botão "excluir"
const btnExcluir = document.createElement('button');
btnExcluir.textContent = 'excluir';
divBtnArea.appendChild(btnExcluir);

divCardAcao.appendChild(divBtnArea);


    //  console.log(divCardAcao); OKK

    btnExcluir.addEventListener("click", function(e){

         let divGroupBtn = btnExcluir.parentNode;
         let divCardAcao  = divGroupBtn.parentNode;
        //  console.log(divCardAcao);
        //  console.log(divCardAcao);
          removeCardLocalStorage(divCardAcao,"acoes");
          divCardAcao.remove();
      });



     //  console.log(divContainerCard);
       return(divCardAcao);
}

function reloadParaAlvo(divId) {
  var elementoAlvo = document.getElementById(divId);

  if (elementoAlvo) {
    elementoAlvo.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(function() {
      location.reload();
    }, 100); // Tempo de espera para a rolagem antes de recarregar a página (500ms neste exemplo)
  }
}

function addDadosEstruturaCardAcoes(chave) {

      let dados = JSON.parse(localStorage.getItem(chave));
      let cardsPreenchidos = [];
      // console.log(dados);

      for(i=0;i<dados.length;i++){

        let divContainerCard = criarEstruturaCardAcoes();
        let tituloDiv = divContainerCard.querySelector("h3");
        let inicio = divContainerCard.querySelector("#inicio");
        let fim = divContainerCard.querySelector("#fim");
        let local = divContainerCard.querySelector("#local");
        let status = divContainerCard.querySelector("#status");

           tituloDiv.innerText = dados[i].nomeAcao;
           inicio.innerText = dados[i].inicioPeriodoAtuacao;
           fim.innerText = dados[i].fimPeriodoAtuacao;
           local.innerText = dados[i].localAcao;
           status.innerText = dados[i].statusAcao;

          // console.log(divContainerCard);

          cardsPreenchidos[i] = divContainerCard;
        // //  console.log(cardsPreenchidos[i]);

      }

      return cardsPreenchidos;
}




function criarEstruturaCardVagas(){

// Cria a div principal com o ID "cardAcao"
const divCardVaga = document.createElement('div');
divCardVaga.id = 'cardVaga';

// Cria o elemento h3 com o texto "Ação 1"
const heading = document.createElement('h3');

divCardVaga.appendChild(heading);

// Cria a lista não ordenada (ul)
const ul = document.createElement('ul');

// Cria os itens da lista (li)
const liDataInicio = document.createElement('li');
liDataInicio.textContent = 'de:';
liDataInicio.setAttribute("id","inicio");

ul.appendChild(liDataInicio);

const liDataFim = document.createElement('li');
liDataFim.textContent = 'até:';
liDataFim.setAttribute("id", "fim");
ul.appendChild(liDataFim);

const liLocal = document.createElement('li');
liLocal.textContent = 'local:';
liLocal.setAttribute("id","local");
ul.appendChild(liLocal);

const liTurno = document.createElement('li');
liTurno.textContent = 'turno:';
liTurno.setAttribute("id","turno");
ul.appendChild(liTurno);

divCardVaga.appendChild(ul);

// Cria a div com o ID "btnArea"
const divBtnArea = document.createElement('div');
divBtnArea.id = 'btnArea';
divBtnArea.setAttribute("class","btnArea");

// Cria o botão "excluir"
const btnExcluir = document.createElement('button');
btnExcluir.textContent = 'excluir';
btnExcluir.setAttribute("class","formBtn");

divBtnArea.appendChild(btnExcluir);

divCardVaga.appendChild(divBtnArea);


    //  console.log(divCardAcao); OKK

    btnExcluir.addEventListener("click", function(e){

         let divGroupBtn = btnExcluir.parentNode;
         let divCardVaga  = divGroupBtn.parentNode;

          removeCardVagaLocalStorage(divCardVaga,"vagas");
          divCardVaga.remove();
      });



     //  console.log(divContainerCard);
       return(divCardVaga);
}




btnSalvarInfBasica.addEventListener("click", function(e){
  salvarFormularioNoLocalStorage(formInfBasica,"formInf");

  e.preventDefault();
});

btnSalvarContatos.addEventListener("click", function(e){

  let email = formContatos.querySelector("#emailUsuario");
  let telefone = formContatos.querySelector("#contatos");

  console.log(validarEmail(email.value));
  // salvarFormularioNoLocalStorage(formContatos, "contatos");

  e.preventDefault();
});


document.addEventListener('DOMContentLoaded', function(e){
  let cardsPreenchidos = addDadosEstruturaCardAcoes("acoes");
  insereCardsNaLista(cardsPreenchidos);

    e.preventDefault();
});


btnSalvarAcao.addEventListener("click", function(e){


    if(verificarCamposVazios(formAcoes)){
      alert("Você precisa preencher todos os campos!");
      reloadParaAlvo("containerAcoes");
    }else{
      alert("dados salvos");
      let listaAcoes = document.querySelector("#listaAcoes");

      salvarFormularioNoLocalStorage(formAcoes, "acoes");

      let divContainerCard = criarEstruturaCardAcoes();
      // console.log(divContainerCard); OK
      let tituloDiv = divContainerCard.querySelector("h3");
       let localAcao = divContainerCard.querySelector("#local");
       let statusAcao = divContainerCard.querySelector("#status");
       let inicioAcao = divContainerCard.querySelector("#inicio");
       let fimAcao = divContainerCard.querySelector("#fim");

      let inputNome = formAcoes.querySelector("#nomeAcao");
      let inputLocal = formAcoes.querySelector("#localAcao");
      let inputStatus = formAcoes.querySelector("#statusAcao");
      let inputInicio = formAcoes.querySelector("#inicioAcao");
      let inputFim = formAcoes.querySelector("#fimAcao");


       tituloDiv.innerText = inputNome.value;
       localAcao.innerText = inputLocal.value;
       statusAcao.innerText = inputStatus.value;
       inicioAcao.innerText = inputInicio.value;
       fimAcao.innerText = inputFim.value;

      //  console.log(divContainerCard);

      listaAcoes.appendChild(divContainerCard);
    }

      e.preventDefault();
});


btnSalvarAcao.addEventListener("click", function(e) {
     e.preventDefault(); // Evita o comportamento padrão de recarregar a página
    reloadParaAlvo("containerAcoes");
});








function removeCardVagaLocalStorage(card, chave) {
  var id = chave;
  var dadosSalvos = localStorage.getItem(id);

  if (dadosSalvos) {
    var arrayDadosSalvos = JSON.parse(dadosSalvos);


    var tituloDiv = card.querySelector("h3").innerText;
    var inicio = card.querySelector("#inicio").innerText;
    var fim = card.querySelector("#fim").innerText;
    var turno = card.querySelector("#turno").innerText;



    var indiceCard = arrayDadosSalvos.findIndex(function(dados) {
      return (
        dados.nomeVaga === tituloDiv &&
        dados.inicioPeriodoAtuacao === inicio &&
        dados.fimPeriodoAtuacao === fim &&
        dados.turnoVaga === turno
      );
    });

    if (indiceCard !== -1) {

      arrayDadosSalvos.splice(indiceCard, 1);


      localStorage.setItem(id, JSON.stringify(arrayDadosSalvos));
    }
  }
}









function addDadosEstruturaCardVagas(chave) {

      let dados = JSON.parse(localStorage.getItem(chave));
      let cardsPreenchidos = [];
      // console.log(dados);

      for(i=0;i<dados.length;i++){

        let divContainerCard = criarEstruturaCardVagas();
        let tituloDiv = divContainerCard.querySelector("h3");
        let inicio = divContainerCard.querySelector("#inicio");
        let fim = divContainerCard.querySelector("#fim");
        let local = divContainerCard.querySelector("#local");
        let turno = divContainerCard.querySelector("#turno");

           tituloDiv.innerText = dados[i].nomeVaga;
           inicio.innerText = dados[i].inicioPeriodoAtuacao;
           fim.innerText = dados[i].fimPeriodoAtuacao;
           local.innerText = dados[i].localVaga;
           turno.innerText = dados[i].turnoVaga;

          //  console.log(dados);

          cardsPreenchidos[i] = divContainerCard;



      }

      return cardsPreenchidos;
}


function insereCardsNaListaVagas(conjuntoCards) {

   let listaVagas = document.querySelector("#listaVagas");

   for (let i = conjuntoCards.length - 1; i>=0; i--) {
      listaVagas.appendChild(conjuntoCards[i]);
   }

}



document.addEventListener('DOMContentLoaded', function(e){
   let cardsPreenchidos = addDadosEstruturaCardVagas("vagas");
   insereCardsNaListaVagas(cardsPreenchidos);

    e.preventDefault();
});




btnSalvarVaga.addEventListener("click", function(e){

  if(verificarCamposVazios(formVagas)){
    alert("Você precisa preencher todos os campos!");
    reloadParaAlvo("containerVagas");
  }else{
    alert("Dados salvos");
    let listaVagas = document.querySelector("#listaVagas");

      salvarFormularioNoLocalStorage(formVagas, "vagas");

      let divContainerCard = criarEstruturaCardVagas();
       //  console.log(divContainerCard); ok
        let tituloDiv = divContainerCard.querySelector("h3");
        let localVaga = divContainerCard.querySelector("#local");
        let turnoVaga = divContainerCard.querySelector("#turno");
        let inicio = divContainerCard.querySelector("#inicio");
        let fim = divContainerCard.querySelector("#fim");

        let inputNome = formVagas.querySelector("#nomeVaga");
        let inputLocal = formVagas.querySelector("#localVaga");
        let inputTurno = formVagas.querySelector("#turnoVaga");
        let inputInicio = formVagas.querySelector("#inicio");
        let inputFim = formVagas.querySelector("#fim");


         tituloDiv.innerText = inputNome.value;
         localVaga.innerText = inputLocal.value;
         turnoVaga.innerText = inputTurno.value;
         inicio.innerText = inputInicio.value;
         fim.innerText = inputFim.value;


        // console.log(divContainerCard);

        listaVagas.appendChild(divContainerCard);
  }

        e.preventDefault();
});


btnSalvarVaga.addEventListener("click", function(e) {
     e.preventDefault(); // Evita o comportamento padrão de recarregar a página
    reloadParaAlvo("containerVagas");
});
