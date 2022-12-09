import React, { useEffect, useState } from "react"
import { Card } from "../../components/blog/Card"
import { Category } from "../../components/category/Category"
import axios from "axios"
import { useLocation } from "react-router-dom"

export const Home = () => {
  /** EN ESTE USE STATE
   * LO DEJAMOS EN UN ARRAY VACIO YA QUE ES 
   * DONDE ALOJAREMOS LA COLECION DE NUESTRA BASE DATOS 
   * PARA LUEGO HACER UN RENDER DE ESTO EN LA VISTA
   */
  const [posts, setPosts] = useState([])
  /**  
   * UTILIZAMOS EL HOOK'S REUTILIZABLE DEL ROUTER DOM
   * PARA SABER EN LA RUTA QUE NOS ENCOTNRAMOS 
  */
  const { search } = useLocation()

  /** 
   * SE ENCARGAR DE PINTAR NUESTROS POST 
   * CADA VES QUE SE HAGA UN CAMBIO EN LA RUTA DE BUSQUEDA
   * SI EL USE EFFECT NO TENDRIA NADA EN LOS [ ] FINAL
   * SOLO CARGARIA UNA VES PERO EN ESTE CASO SE CARGARA CADA VES QUE EXISTA UN
   * CAMBIO EN SEARCH
   */
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts" + search)
      setPosts(res.data)
    }
    fetchPost()
  }, [search])
  /** 
   * MOSTRAMOS NUESTRO DATOS DE LA API EN EL COMPONENTE CARD
   * Y QUE LOS VEA EL USUARIO
   */
  return (
    <>
      <Category />
      <Card posts={posts} />
    </>
  )
}
