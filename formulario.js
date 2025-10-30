const obterAlunos = () => JSON.parse(localStorage.getItem('alunos') || '[]');

const salvarAlunos = (alunos) => {
    localStorage.setItem('alunos', JSON.stringify(alunos));
};

const limparFormulario = () => document.getElementById('alunoForm').reset();

const existMatricula = (matricula) => {
    const alunos = obterAlunos();
    return alunos.some(a => a.matricula === matricula);
}

const cadastrarAluno = (event) => {
    event.preventDefault();
    const aluno = {
        matricula: document.getElementById('matricula').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        curso: document.getElementById('curso').value,
        periodo: Number(document.getElementById('periodo').value) || null,
        nota: Number(document.getElementById('nota').value)
    };
    if (existMatricula(aluno.matricula)) {
        alert('Matrícula já existe! Use outra.');
        return;
    }

    let alunos = obterAlunos();
    alunos.push(aluno);
    salvarAlunos(alunos);
    alert('Aluno cadastrado com sucesso!');
    console.log('Aluno salvo:', aluno);
    limparFormulario();
};

document.getElementById('alunoForm').addEventListener('submit', (e) => cadastrarAluno(e));
