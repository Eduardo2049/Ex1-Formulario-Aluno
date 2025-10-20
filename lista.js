// Funções para a lista de alunos
function obterAlunos() {
    return JSON.parse(localStorage.getItem('alunos') || '[]');
}

function removerAluno(index) {
    let alunos = obterAlunos();
    alunos.splice(index, 1);
    localStorage.setItem('alunos', JSON.stringify(alunos));
    listarAlunos();
}

function listarAlunos() {
    const tbody = document.querySelector('#tabelaAlunos tbody');
    tbody.innerHTML = '';
    const alunos = obterAlunos();
    alunos.forEach((aluno, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${aluno.matricula}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.periodo}</td>
            <td><button onclick="removerAluno(${index})">Excluir</button></td>
        `;
        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', listarAlunos);
