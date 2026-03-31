let url = "https://desafio-15-dias-19f89-default-rtdb.firebaseio.com"

let estaEditando = false

function getLista() {
    let html = "";
    let listaDeTarefasSalvas = document.getElementById("listaDeTarefasSalvas");
    fetch(url + "/tarefas.json").then( response => {
       if(response.status === 200) {
        response.json().then( dados => {
            let arrayListarefa = Object.entries(dados);
            arrayListarefa.forEach(element => {
                html += montarLista(element[1], element[0]);
               
               
            });
            listaDeTarefasSalvas.innerHTML = html;
        });
        
       }
    });   
};

function montarLista(tarefa, idBanco) {
    return  `<li id="'${tarefa.id}'">
        ${tarefa.titulo}<br>
        ${tarefa.descricao}
        <button onclick="editarTarefa('${tarefa.id}', '${idBanco}')">Editar</button>
        <button onclick="deletarTarefa('${idBanco}')">Deletar</button>
    </li>`;
            
};

function editarTarefa(id, idBanco) {
    if(!estaEditando){
    let liParaEditar = document.getElementById(`'${id}'`);
    const html = `<div>
        <div>
            <label>Editar titulo da tarefa</label><br>
            <input id="titulo" type="text" placeholder="Titulo da tarefa">
        </div>
        <div>
            <label>Editar descricao da tarefa</label><br>
            <textarea id="descricao" placeholder="Descricao da tarefa"></textarea>
        </div>
             <button onclick="salvarTarefa('${idBanco}')">Editar</button>
    </div>`;
    liParaEditar.innerHTML = html;
    estaEditando = true;
}
};

function salvarTarefa (idBanco){
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;

    const tarefa = {
        titulo: titulo,
        descricao: descricao,
    };
    fetch(url + `/tarefas/${idBanco}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    }).then( response => {
        if( response.status === 200) {
            getLista();
        }
    });

    console.log(salvarTarefa);
};

function deletarTarefa(idBanco){
    const confirme = confirm("tem certeza que quer deletar?");
    if(confirme){
         fetch(url + `/tarefas/${idBanco}.json`,{
        method: 'DELETE',
    }).then( response => {
        if( response.status === 200) {
            getLista();
        }
    });

    }
};

function criarTarefa() {
    let titulo = document.getElementById("titulo").value;
    let descricao = document.getElementById("descricao").value;
    let mensagemsucesso = document.getElementById("mensagemsucesso");
    let mensagemfracasso = document.getElementById("mensagemfracasso");

    if (titulo.trim() === "" || descricao.trim() === "") {
        mensagemfracasso.innerHTML = "Preencha todos os campos!";
        return; // ⛔ para aqui e não salva
    }
    

   const tarefa = {
     titulo: titulo,
     descricao: descricao,
     id: new Date().toISOString(),
   };

        fetch(url + "/tarefas.json", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    }).then( response => {
            if (response.status === 200) {
                mensagemsucesso.innerHTML = "Salvo com sucesso!";
                 mensagemfracasso.innerHTML = "";
                getLista();
            } else {
                mensagemfracasso.innerHTML = "erro ao salvar";
            }
        }).catch(error => {
        console.log(error);
   });
}