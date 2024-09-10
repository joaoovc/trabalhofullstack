document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const pessoasTable = document.getElementById('pessoasTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;

        const pessoa = { nome, cpf, telefone };

        try {
            const response = await fetch('/api/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pessoa)
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                carregarPessoas();
            } else {
                alert('Erro ao cadastrar pessoa.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    });

    async function carregarPessoas() {
        try {
            const response = await fetch('/api/cadastro');
            const pessoas = await response.json();

            pessoasTable.innerHTML = '';
            pessoas.forEach(pessoa => {
                const row = pessoasTable.insertRow();
                row.insertCell(0).textContent = pessoa.id_pessoa;
                row.insertCell(1).textContent = pessoa.nome;
                row.insertCell(2).textContent = pessoa.cpf;
                row.insertCell(3).textContent = pessoa.telefone;
                const excluirBtn = document.createElement('button');
                excluirBtn.textContent = 'Excluir';
                excluirBtn.addEventListener('click', () => excluirPessoa(pessoa.id_pessoa));
                row.insertCell(4).appendChild(excluirBtn);
            });
        } catch (error) {
            console.error('Erro ao carregar pessoas:', error);
        }
    }

    async function excluirPessoa(id) {
        try {
            const response = await fetch(`/api/cadastro/${id}`, { method: 'DELETE' });

            if (response.ok) {
                alert('Cadastro excluído com sucesso!');
                carregarPessoas();
            } else {
                alert('Erro ao excluir cadastro.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    carregarPessoas(); 
});