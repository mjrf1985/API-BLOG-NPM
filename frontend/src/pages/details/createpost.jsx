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
  // PARA SABER LA RUTA EN LA QUE NOS ENCONTRAMOS
  const location = useLocation()
  console.log(location)
  // OBTENEMOS EL NOMBRE DE LA RUTA DE TODO EL URL
  const path = location.pathname.split("/")[2]

  // SIRVE PARA ALOJAR EL OBJETO QUE VAMOS A ENVIAR EN EL POST DEL API
  const [post, setPost] = useState({})
  // NOS OBTENDRA LOS POST QUE EXISTAN DEL USUARIO CADA VES QUE ENTREN
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path)
      console.log(res)
      //SI EXISTEN SE CARGANRAN EN NUSTRO USE STATE POST
      setPost(res.data)
    }
    getPost()
  }, [path])


  // RUTA DE IMAGENES LOCAL DONDE ESTAN ALOJANDOSE
  const PublicFlo = "http://localhost:5000/images/"
  const { user } = useContext(Context)
  // EVENTO PARA CREAR EL NUEVO POST
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, { data: { username: user.username } })
      window.location.replace("/")
    } catch (error) { }
  }
  return (
    <>
      <section className='singlePage'>
        <div className='container'>
          {/*<div className='left'>{post.photo && <img src={post.photo} alt='' />}</div>*/}
          <div className='left'>{post.photo && <img src={PublicFlo + post.photo} alt='' />}</div>
          <div className='right'>
            {post.username === user?.username && (
              <div className='buttons'>
                <button className='button'>
                  <BsPencilSquare />
                </button>
                <button className='button' onClick={handleDelete}>
                  <AiOutlineDelete />
                </button>
              </div>
            )}
            <h1>{post.title}</h1>
            <p>{post.desc}</p>

            <p>
              Autor: <Link to={`/?user=${post.username}`}>{post.username}</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
