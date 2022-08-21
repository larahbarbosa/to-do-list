const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li'); //criando o elemento dado no input em lista
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {  //adicionando um evento pra saber quando uma tecla foi pressionada
    if (e.keyCode === 13) { //evento que cria a tarefa presisonando enter (keyCode===13 é enter)
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput() { //função pra limpar o input
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) { //função que adc botão de apagar na tarefa
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');//setando um atributo no botão de apagar
    botaoApagar.setAttribute('title', 'Apagar essa tarefa');
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
    const li = criaLi(); //pegando o li e recebendo o li da função criaLi
    li.innerText = textoInput;
    tarefas.appendChild(li); //quando adicionarmos uma tarefa ela irá adc na página
    limpaInput() //chamando função que limpa o input depois de dar enter
    criaBotaoApagar(li) //chamando botão de apagar ao criar tarefa
    salvarTarefas();
}

btnTarefa.addEventListener('click', function(e) {
    if (!inputTarefa.value) return; //impedindo que envie o input vazio
    criaTarefa(inputTarefa.value); //função que chama o input com texto
    
});

document.addEventListener('click', function(e) { //checando se o botão de apagar está sendo clicado
    const el = e.target; //el de elemento
    
    if (el.classList.contains('apagar')) { 
       /*  console.log(el.parentElement);//checando que é o pai desse elemento */
       el.parentElement.remove(); //removendo o elemento pai desse botão
       salvarTarefas();
    }
})

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); //trim remove o espaço sobrando
        listaDeTarefas.push(tarefaTexto);
        
        }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //transformando o array em string
    localStorage.setItem('tarefas', tarefasJSON); //salvando localmente os dados  
}

function adicionaTarefasSalvas() { //função para obter as tarefas do localstorage
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas); //convertendo as tarefas de volta para um array
    
    for (let tarefas of listaDeTarefas) { //deixando as tarefas mesmo depois de fechar a aplicação
        criaTarefa(tarefas);
    }
}
adicionaTarefasSalvas()