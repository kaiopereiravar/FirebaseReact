import './App.css';
import { useState, useEffect } from 'react'
import { db, auth } from './FirebaseConnection';
import {
  createUserWithEmailAndPassword,  //para criar email
  signInWithEmailAndPassword, //para fazer login 
  signOut //para deslogar
} from 'firebase/auth'
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'

export default function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [posts, setPosts] = useState([])
  const [idPost, setIdPost] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [user, setUser] = useState(false)
  const [userDetail, setUserDetail] = useState({})

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

  async function cadastrar() {
    await addDoc(collection(db, 'posts'), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log('bouaaa, voce é demaisss!!!')
        setAutor('')
        setTitulo('')
      })
      .catch((error) => {
        console.log('infelizmente não deu bom, MELHORE!!!' + error)
      })
  }

  async function buscarPosts() {
    // const postRef = doc(db,'posts','12345')

    // await getDoc(postRef)
    // .then((snapshot)=>{
    //   console.log('consegui realizar a requisição')
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // })
    // .catch((error) => {
    //   console.log('vish irmão deu b.o ai ein!!' + error)
    // })

    const postsRef = collection(db, "posts")
    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = []

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })

        setPosts(lista)

      })
      .catch((error) => {
        console.log('deu algum erro ao buscar')
      })
  }

  async function editarPost() {
    const docRef = doc(db, "posts", idPost) // aonde eu quero atualizar
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })

      .then(() => {
        console.log('post atualizado com sucesso!!')
        setIdPost('')
        setTitulo('')
        setAutor('')
      })
      .catch((error) => {
        console.log('ocorreu um erro ao atualizar o post' + error)
      })
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id)

    await deleteDoc(docRef)
      .then(() => {
        alert(`post deletado com sucesso`)
      })
      .catch(() => {
        alert(`não foi possivel deletar o post`)
      })
  }

  async function novoUsuario() {//se for la na autenticacao do firebase(na parte de email) estará la cadastrado a parte de email
    await createUserWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        alert('cadastrado com sucesso!!!')
        console.log(value)
        setEmail('')
        setSenha('')
      })
      .catch((error) => {
        if (error === 'auth/weak-password') {
          alert('Senha muito fraca!!!')
        }
        else if (error === 'auth/email-already-in-use') {
          alert('Email já existente!!!')
        }
      })
  }

  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)// para conseguir logar
      .then((value) => {
        alert('usuario logado com sucesso!!!')
        console.log(value.user)
        setEmail('')
        setSenha('')

        setUserDetail({
          uid: value.user.id,
          email: value.user.email,
        })
        setUser(true)
      })
      .catch((error) => {
        alert(`erro ao fazer login!!!`)
      })
  }

  async function fazerLogout() {
    await signOut(auth)
    setUser(false)
    setUserDetail({})
  }

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => { //onSnapshot fica monitorando meu banco de dados em caso de atualizacões em tempo real
        let listaPost = []

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })

          setPosts(listaPost)
        })
      })
    }

    loadPosts()
  }, [])

  return (
    <div className="App">
      <h1>ReactJs + Firebase</h1>

      {user && ( //se o user for "true"
        <div>
          <strong>Seja bem vindo(a) (Voce esta logado!)</strong> <br />
          <span>ID: {userDetail.uid} - Email: {userDetail.email}</span> <br />
          <button onClick={fazerLogout}>Sair da conta</button>
          <br /> <br />
        </div>
      )}

      <div className='container'>
        <h2>AUTENTICACAO</h2>

        <label>Email</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Digite aqui seu email'></input> <br />

        <label>Senha</label>
        <input value={senha} onChange={(e) => { setSenha(e.target.value) }} placeholder='Digite aqui sua senha'></input> <br />

        <button onClick={novoUsuario}>Cadastrar</button> <br />
        <button onClick={logarUsuario}>Fazer login</button>
      </div>

      <br />
      <hr />
      <br />

      <div className='container'>
        <h2>POSTS</h2>

        <label>Id do Post:</label>
        <input
          placeholder='digite o id do post'
          value={idPost}
          onChange={(e) => {
            setIdPost(e.target.value)
          }}>
        </input> <br />

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
        ></input> <br /> <br />

        <button onClick={cadastrar}>Cadastrar</button> <br />
        <button onClick={buscarPosts}>Buscar posts</button> <br />
        <button onClick={editarPost}>Atualizar post</button> <br />

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>ID: {post.id}</span> <br />
                <span>TItulo: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span> <br />
                <button onClick={() => excluirPost(post.id)}>Excluir</button><br /> <br />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}


