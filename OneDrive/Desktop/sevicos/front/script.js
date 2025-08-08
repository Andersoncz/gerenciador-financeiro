 let servicos = [];
    let editandoIndex = null;

    function formatarData(data) {
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const horas = String(data.getHours()).padStart(2, '0');
      const minutos = String(data.getMinutes()).padStart(2, '0');
      return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
    }

    function adicionarServico() {
      const nome = document.getElementById("nome").value.trim();
      const valor = parseFloat(document.getElementById("valor").value);
      const descricao = document.getElementById("descricao").value.trim();

      if (!nome || isNaN(valor)) {
        alert("Preencha corretamente o nome e valor do serviço.");
        return;
      }

      const dataRegistro = formatarData(new Date());

      const novoServico = { nome, valor, descricao, data: dataRegistro };

      if (editandoIndex !== null) {
        novoServico.data = servicos[editandoIndex].data; // manter a data original ao editar
        servicos[editandoIndex] = novoServico;
        editandoIndex = null;
      } else {
        servicos.push(novoServico);
      }

      document.getElementById("nome").value = "";
      document.getElementById("valor").value = "";
      document.getElementById("descricao").value = "";

      renderizarServicos();
    }

    function renderizarServicos() {
      const lista = document.getElementById("listaServicos");
      lista.innerHTML = "";

      let total = 0;

      servicos.forEach((servico, index) => {
        total += servico.valor;

        const item = document.createElement("div");
        item.className = "service-item";
        item.innerHTML = `
          <strong>${servico.nome}</strong> - R$ ${servico.valor.toFixed(2)}<br/>
          <small>${servico.descricao}</small><br/>
          <div class="data">Registrado em: ${servico.data}</div>
          <button onclick="editarServico(${index})">Editar</button>
          <button onclick="removerServico(${index})">Remover</button>
        `;
        lista.appendChild(item);
      });

      document.getElementById("totalValor").innerText = `Total: R$ ${total.toFixed(2)}`;
    }

    function editarServico(index) {
      const servico = servicos[index];
      document.getElementById("nome").value = servico.nome;
      document.getElementById("valor").value = servico.valor;
      document.getElementById("descricao").value = servico.descricao;
      editandoIndex = index;
    }

    function removerServico(index) {
      if (confirm("Deseja realmente remover este serviço?")) {
        servicos.splice(index, 1);
        renderizarServicos();
      }
    }