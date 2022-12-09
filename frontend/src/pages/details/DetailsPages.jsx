import React, { useContext, useEffect, useState } from "react"
import "./details.css"
import "../../components/header/header.css"
import img from "../../assets/images/product1.jpg"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { Context } from "../../context/Context"

export const DetailsPages = () => {
  // PARA SABER LA RUTA DONDE NOS ENCONTRAMOS
  const location = useLocation()
  console.log(location)
  // PARA OBTENER EL NOMBRE DE LA RUTA DEL URL ACTUAL
  const path = location.pathname.split("/")[2]

  // sNOS SERVIRAN PARA ACTUIALIZAR LOS CAMPOS DEL POST
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [update, setUpdate] = useState(false)

  // SI EXISTEN ALGUN DATO REGISTRADO POR EL USUARIO
  const [post, setPost] = useState({})
  // CUANDO CARGUE LA PAGINA SE VA A CARGAR EL POR A EDITAR O MOSTRARLO
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path)
      console.log(res)
      // CARGAMOS NUESTRO POSTS
      setPost(res.data)
      // ALOJAMOS ESTO PARA MOSTRARLOS EN LOS INPUTS CORRESPONDIENTES
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    // CARGAMOS EL METODO CREADO EN ESTE USEFFECT
    getPost()
  }, [path])


  //  RUTA DE LAS IMAGENES LOCALES FGUARDAR
  const PublicFlo = "http://localhost:5000/images/"
  const { user } = useContext(Context)
  // METODO QUE ENVIA LOS DATOS PARA ELIMINAR UN POST A NUESTRA API DEL BACKEND
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, { data: { username: user.username } })
      window.location.replace("/")
    } catch (error) { }
  }

  // METODO NOS SERVIRA PARA EDITAR NUESTRO POST POR MEDIO DE LA API PARA ACTUALIZAR EN NUESTRO BACKEND
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, { username: user.username, title, desc })
      window.location.reload()
    } catch (error) { }
  }

  return (
    <>
      <section className='singlePage'>
        <div className='container'>
          <div className='left'>{post.photo && <img src={PublicFlo + post.photo} alt='' />}</div>
          <div className='right'>
            {post.username === user?.username && (
              <div className='buttons'>
                <button className='button' onClick={() => setUpdate(true)}>
                  <BsPencilSquare />
                </button>
                <button className='button' onClick={handleDelete}>
                  <AiOutlineDelete />
                </button>
                {update && (
                  <button className='button' onClick={handleUpdate}>
                    Actualizar
                  </button>
                )}
              </div>
            )}

            {update ? <input type='text' value={title} className='updateInput' onChange={(e) => setTitle(e.target.value)} /> : <h1>{post.title}</h1>}
            {update ? <textarea value={desc} cols='30' rows='10' className='updateInput' onChange={(e) => setDesc(e.target.value)}></textarea> : <p>{post.desc}</p>}

            <p>
              Autor: <Link to={`/?user=${post.username}`}>{post.username}</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
