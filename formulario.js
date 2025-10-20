// Funções para o formulário de cadastro de aluno
function obterAlunos() {
    return JSON.parse(localStorage.getItem('alunos') || '[]');
}

function salvarAlunos(alunos) {
    localStorage.setItem('alunos', JSON.stringify(alunos));
}

function limparFormulario() {
    document.getElementById('alunoForm').reset();
}

function cadastrarAluno(event) {
    event.preventDefault();
    const aluno = {
        matricula: document.getElementById('matricula').value,
        nome: document.getElementById('nome').value,
        nascimento: document.getElementById('nascimento').value,
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        curso: document.getElementById('curso').value,
        periodo: document.getElementById('periodo').value
    };
    let alunos = obterAlunos();
    alunos.push(aluno);
    salvarAlunos(alunos);
    alert('Aluno cadastrado com sucesso!');
    limparFormulario();
}

document.getElementById('alunoForm').addEventListener('submit', cadastrarAluno);
