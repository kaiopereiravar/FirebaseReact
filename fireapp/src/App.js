import './App.css';
import { useState } from 'react'
import { db } from './FirebaseConnection';
import { doc, setDoc,collection, addDoc , getDoc} from 'firebase/firestore'

export default function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')

  // async function cadastrar() {
  //   await setDoc(doc(db, "users", "123"), {
  //     titulo: titulo,
  //     autor: autor,
  //   })

  //   .then(()=>{
  //     console.log('dados registrados no banco com sucesso')
  //   })
  //   .catch((error)=>{
  //     console.log('gerou erro aqui ó!!!' + error)
  //   })
  // }

  async function cadastrar(){
    await addDoc(collection(db, 'posts'),{
      titulo: titulo,
      autor:autor,
    })
    .then(()=>{
      console.log('bouaaa, voce é demaisss!!!')
      setAutor('')
      setTitulo('')
    })
    .catch((error)=>{
      console.log('infelizmente não deu bom, MELHORE!!!' + error)
    })
  }

  async function buscarPosts(){
    const postRef = doc(db,'posts','12345')

    await getDoc(postRef)
    .then((snapshot)=>{
      console.log('consegui realizar a requisição')
      setAutor(snapshot.data().autor)
      setTitulo(snapshot.data().titulo)
    })
    .catch((error) => {
      console.log('vish irmão deu b.o ai ein!!' + error)
    })
  }

  return (
    <div className="App">
      <h1>ReactJs + Firebase</h1>

      <div className='container'>
        <label>Titulo:</label>
        <textarea
          type='text'
          placeholder='digite o titulo'
          value={titulo}
          onChange={(e) => { setTitulo(e.target.value) }}
        />

        <label>Autor:</label>
        <input
          type='text'
          placeholder='autor do post'
          value={autor}
          onChange={(e) => {
            setAutor(e.target.value)
          }}
        ></input>



        <button onClick={cadastrar}>Cadastrar</button>
        <button onClick={buscarPosts}>Buscar posts</button>
      </div>
    </div>
  );
}


