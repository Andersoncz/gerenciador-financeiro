import  { useState, useEffect, useRef } from "react";
import api from "../services/api"


const App = () => {
  const [servicos, setServicos] = useState([]);

  const inputServico = useRef()
  const inputValor = useRef()

  // Função para buscar serviços da API
  async function getServicos() {
    const servicoFromApi = await api.get("https://api-register-service-fwsm.vercel.app/servicos");
    setServicos(servicoFromApi.data)};



// Função para criar um novo serviço
  async function createServico() {
    await api.post ("/servicos",{
      nome: inputServico.current.value,
      valor: parseFloat(inputValor.current.value)

    })
  getServicos()

  }
  // Função para remover um serviço
  async function removeServico(id) {
    await api.delete(`/servicos/${id}`);
    getServicos();
   
  }
    
    useEffect(() => {
    getServicos();
  }, []);

// Formatar data
  const formatarDataHora = (data) => {
    return new Date(data).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  // Calcular valor total
  const calcularTotal = () => {
    return servicos.reduce((total, item) => total + item.valor, 0);
  };



  return (
    <div className="container">
      <form className="form">
        <h1> CRUZCELL ASSISTEC</h1>
        <input type="text" name="name" placeholder="Digite o serviço" ref={inputServico} />
        <input type="number" name="valor" placeholder="Valor" ref={inputValor}/>

        <button className="button1" type="button" onClick={createServico}>
          ADICIONAR
        </button>
      </form>

      {/* Mostrar valor total */}
      <h2 className="total">
        RECEITA TOTAL:{" "}
        {calcularTotal().toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </h2>

      {servicos.map((servico) => (
        <div key={servico._id}>
          <div className="servicos">
          <p> {servico.nome}</p>
          <p>{servico.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
          
          
          {/* Formatar e mostrar a data */}
          <p>Data: {formatarDataHora(servico.createdAt)}</p>
          
          
          <button onClick={() => removeServico(servico._id)} >
            REMOVER
          </button>
          
        </div>
        </div>
      ))}

      
    </div>
  );
};

export default App;




  
  

