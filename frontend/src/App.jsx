import { useState, useEffect } from "react"
import axios  from "axios"

export default function PageContent(){
    <div>Veiculos</div>
    const [marca, setmarca] = useState('')
    const [modelo, setmodelo] = useState('')
    const [ano, setano] = useState('')
    const [prop, setprop] = useState('')
    const [cor, setcor] = useState('')

    useEffect (()  => {
    console.log(marca, modelo, ano, prop, cor)
    }, [marca, modelo, ano, prop, cor])

    async function registerVeiculo(){
        await axios.post("http://localhost:3000/add",
        {marca, modelo, ano, prop, cor})
    }
    async function atualizarVeiculo(){
      if(!id){
        console.error("atualização mal sucedida")
        return
      }
        await axios.put(`http://localhost:3000/upt/${id}`,{
          marca, modelo, ano, cor, prop
        })
    }
    async function deletarVeiculo(){
      if(!id){
        console.error("falha ao deletar")
        return
      }
      await axios.delete(`http://localhost:3000/re/${id}`,{
        marca,modelo,ano,cor,prop
      })
    }
    async function selecionarVeiculo(){
      if(!id){
        console.error("Falha ao selecionar")
        return
      }
      await axios.get(`http://localhost:3000/visu/${id}`,{
        marca,modelo,ano,cor,prop
      })
    }
    function handleSubmit(e){
        e.preventDefault()
        registerVeiculo()
    }
    function handle_update_Submit(e){
      e.preventDefault()
     atualizarVeiculo()
  }
    function handle_delete_Submit(e){
      e.preventDefault()
       deletarVeiculo()
}
    function handle_select_Sumit(e){
      e.preventDefault()
      selecionarVeiculo()
    }
   
    return(
        <>
          <div className="card">
            <form>
                <label htmlFor="marca">Marca</label>
                <input type="text" id="marca" onChange={(e) => {setmarca(e.target.value)}}/>
                <br />
                <label htmlFor="modelo">Modelo</label>
                <input type="text" id="modelo" onChange={(e) => {setmodelo(e.target.value)}}/>
                <br />
                <label htmlFor="ano">Ano</label>
                <input type="text" id="ano" onChange={(e) => {setano(e.target.value)}}/>
                <br />
                <label htmlFor="prop">Proprietario</label>
                <input type="text" id="prop" onChange={(e) => {setprop(e.target.value)}}/>
                <br />
                <label htmlFor="cor">Cor</label>
                <input type="text" id="cor" onChange={(e) => {setcor(e.target.value)}}/>
                <br />
                <button type="submit" onClick={handleSubmit}>Enviar carro</button>
                <br />
                <button type="submit" onClick={handle_update_Submit}>atualizar os veiculos</button>
                <br />
                <button type="submit" onClick={handle_delete_Submit}>Deletar veiculos</button>
                <br />
                <button type="submit" onClick={handle_select_Sumit}>selecionar veiculos</button>
            </form>
          </div>
        </>
    )
}