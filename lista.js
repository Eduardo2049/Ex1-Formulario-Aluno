class Aluno {
    constructor(matricula, nome, curso, idade, nota, periodo, cpf, email, telefone) {
        this.matricula = matricula;
        this.nome = nome;
        this.curso = curso;
        this.nota = nota;
        this.periodo = periodo;
        this.email = email;
    }

    isAprovado() {
        return this.nota >= 7;
    }

    toString() {
        return `Matrícula: ${this.matricula} — ${this.nome} (${this.curso}) — Nota: ${this.nota}`;
    }
}

function obterAlunos() {
    const raw = localStorage.getItem('alunos') || '[]';
    const arr = JSON.parse(raw);
    return arr.map(a => new Aluno(a.matricula, a.nome, a.curso, a.nota, a.periodo, a.email));
}

const salvarAlunos = (alunos) => {
    localStorage.setItem('alunos', JSON.stringify(alunos));
};

const mostrarRelatorio = (html) => {
    const alvo = document.getElementById('relatorioResultado');
    if (!alvo) return;
    alvo.innerHTML = html;
};


const listarAprovados = () => {
    const aprovados = obterAlunos().filter(a => Number(a.nota) >= 7);
    if (aprovados.length === 0) {
        mostrarRelatorio('Nenhum aluno aprovado encontrado.');
        return;
    }
    const linhas = aprovados.map(a => `• ${a.nome} (Matrícula: ${a.matricula}) — Nota: ${a.nota}`).join('\n');
    mostrarRelatorio(`Alunos aprovados (${aprovados.length}):\n${linhas}`);
};

const mostrarMediaNotas = () => {
    const alunos = obterAlunos().filter(a => a.nota !== undefined && !isNaN(Number(a.nota)));
    if (alunos.length === 0) {
        mostrarRelatorio('Nenhum registro de nota para calcular média.');
        return;
    }
    const soma = alunos.reduce((s, a) => s + Number(a.nota), 0);
    const media = soma / alunos.length;
    mostrarRelatorio(`Média das notas finais: ${media.toFixed(2)} (com ${alunos.length} alunos considerados)`);
};

const listarNomesOrdem = () => {
    const nomes = obterAlunos()
        .map(a => a.nome)
        .filter(Boolean)
        .sort((x, y) => x.localeCompare(y, 'pt-BR'));
    if (nomes.length === 0) {
        mostrarRelatorio('Nenhum nome disponível para listar.');
        return;
    }
    mostrarRelatorio(`Nomes em ordem alfabética:\n• ${nomes.join('\n• ')}`);
};

const contarPorCurso = () => {
    const mapa = obterAlunos().reduce((acc, a) => {
        const curso = a.curso || 'Sem curso';
        acc[curso] = (acc[curso] || 0) + 1;
        return acc;
    }, {});
    const linhas = Object.keys(mapa).map(c => `${c}: ${mapa[c]}`).join('\n');
    mostrarRelatorio(`Quantidade de alunos por curso:\n${linhas}`);
};

const limparRelatorio = () => mostrarRelatorio('');

const removerAluno = (index) => {
    let alunos = obterAlunos();
    const removido = alunos.splice(index, 1)[0];
    salvarAlunos(alunos);
    alert('Aluno excluído com sucesso!');
    console.log('Aluno excluído:', removido);
    listarAlunos();
};

const editarAluno = (index) => {
    const alunos = obterAlunos();
    const a = alunos[index];
    if (!a) return;
    const novoNome = prompt('Editar nome:', a.nome);
    if (novoNome === null) return; // cancelar
    a.nome = novoNome;
    const novaNotaRaw = prompt('Editar nota:', a.nota);
    if (novaNotaRaw !== null) a.nota = Number(novaNotaRaw);
    salvarAlunos(alunos);
    alert('Aluno atualizado com sucesso!');
    console.log('Aluno editado:', a);
    listarAlunos();
};

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
            <td>${aluno.periodo ?? ''}</td>
            <td>${aluno.nota ?? ''}</td>
            <td>${aluno.isAprovado() ? 'Aprovado' : 'Reprovado'}</td>
            <td>
                <button data-action="ver" data-index="${index}">Ver</button>
                <button data-action="editar" data-index="${index}" style="margin-left:6px">Editar</button>
                <button data-action="remover" data-index="${index}" style="margin-left:6px">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    listarAlunos();

    const tbody = document.querySelector('#tabelaAlunos tbody');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            const action = btn.dataset.action;
            const idx = Number(btn.dataset.index);
            if (action === 'remover') {
                removerAluno(idx);
            } else if (action === 'editar') {
                editarAluno(idx);
            } else if (action === 'ver') {
                const alunos = obterAlunos();
                alert(alunos[idx].toString());
            }
        });
    }

    const byId = id => document.getElementById(id);
    if (byId('btnAprovados')) byId('btnAprovados').addEventListener('click', () => listarAprovados());
    if (byId('btnMediaNotas')) byId('btnMediaNotas').addEventListener('click', () => mostrarMediaNotas());
    if (byId('btnMediaIdades')) byId('btnMediaIdades').addEventListener('click', () => mostrarMediaIdades());
    if (byId('btnNomesOrdem')) byId('btnNomesOrdem').addEventListener('click', () => listarNomesOrdem());
    if (byId('btnPorCurso')) byId('btnPorCurso').addEventListener('click', () => contarPorCurso());
    if (byId('btnLimparRel')) byId('btnLimparRel').addEventListener('click', () => limparRelatorio());
});

