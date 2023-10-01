import { useState } from 'react'
import '../Home/home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function handleLogin(e){
    e.preventDefault();//para ele previnir o comportamento e não atualizar a pagina(por conta de ser um form)
    
    if(email !== '' && senha !== ''){
      alert('seguindo para a proxima pagina')
    }
    else{
      alert('preencha todos os campo para prosseguir!!')
    }
  }
  return (
    <div className='home-container'>
      <h1>Lista de tarefas</h1>
      <span>Gerencie sua agenda de forma facil.</span>

      <form className='form' onSubmit={handleLogin}>
        <input
          type='text'
          placeholder='digite seu email...'
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />

        <input
          autoComplete={false}
          type='text'
          placeholder='digite sua senha...'
          value={senha}
          onChange={(e) => { setSenha(e.target.value) }}
        />

        <button type='submit'>Acessar</button>
        <Link className='button-link' to='/register'>
          Não possui uma conta? Cadastre-se
        </Link>
      </form>
    </div>
  )
}