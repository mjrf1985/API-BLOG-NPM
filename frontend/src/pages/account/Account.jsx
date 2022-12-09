import React, { useContext, useState } from "react"
import { Context } from "../../context/Context"
import "./account.css"
import { IoIosAddCircleOutline } from "react-icons/io"
import axios from "axios"

export const Account = () => {
  /**
   * HACEMOS USO DE NUESTRO CONTEXTO PARA OBTENER INFORMACION
   * DEL USUARIO AUTENTIFICADO
   * Y REALIZAR ALGUNOS CAMBIOS.
   */
  const { user, dispatch } = useContext(Context)

  /**
   * NUESTRAS VARIABLES QUE NOS SERVIRAN DE LA SIGUIENTE MANERA:
   * [FILE, SETFILE]: ESTA EN NULL PORQUE AQUI CARGAREMOS LA IMAGEN A SUBIR.
   * [USERNAME, SETUSERNAME]: GUARDAMOS EL USUARIO AUTENTIFICADO  PARA LUEGO USARLO 
   * [EMAIL, SETEMAIL]: GUARDAMOS EL EMAIL AUTENTIFICADO  PARA LUEGO USARLO 
   * [PASSWORD, SETPASSWORD]: GUARDAMOS LA CONTRASEÑA AUTENTIFICADO  PARA LUEGO USARLO 
   * [SUCC, SETSUCC]: NO SIRVE DE BANDERA PARA SABER SI VAMOS A GUARDAR O ACTUALIZAR
   */
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [succ, setSucc] = useState(false)
  const PublicFlo = "http://localhost:5000/images/"
  // METODO PARA REALIZAR EL EVENTO SUBMIT DE NUESTRO FORMULARIO
  const handleSubmit = async (e) => {
    // CUANDO HAGA SUBMIT SE CAPTURA EL EVENTO EN ESTE MENTODO
    e.preventDefault()
    // VIENE DE NUESTRO CONTEXTO PARA REALIZAR EL UPDATE
    dispatch({ type: "UPDATE_START" })
    // OBJETO A ENVIAR PARA ACTUALIZAR
    const updateUser = {
      userId: user._id,
      username,
      email,
      password,
    }
    // VALIDAMOS SI HAY ARCHIVOS PARA SUBILOS
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      updateUser.profilePic = filename

      try {
        await axios.post("/upload", data)
      } catch (error) {
        console.log(error)
      }
    }
    // REALIZAMOS PROCESO DE ACTUALIZAR EL CONTENIDO
    try {
      const res = await axios.put("/users/" + user._id, updateUser)
      setSucc(true)
      dispatch({ type: "UPDATE_SUCC", payload: res.data })
      window.location.reload()
    } catch (error) {
      dispatch({ type: "UPDATE_FAILED" })
    }
  }
  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Información de cuenta</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <img src={file ? URL.createObjectURL(file) : PublicFlo + user.profilePic} alt='' />
                <label htmlFor='inputfile'>
                  <IoIosAddCircleOutline className='icon' />
                </label>
                <input type='file' id='inputfile' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
              </div>
            </div>
            <form className='right' onSubmit={handleSubmit}>
              <label htmlFor=''>Nombre de usuario</label>
              <input type='text' placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor=''>Email</label>
              <input type='email' placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor=''>Contraseña</label>
              <input type='password' onChange={(e) => setPassword(e.target.value)} />
              <button className='button' type='submit'>
                Update
              </button>
              {succ && <span>Perfil actualizado</span>}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
