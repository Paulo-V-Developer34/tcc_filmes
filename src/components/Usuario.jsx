'use client'

import { getCookies} from '@/utils/session'//O getCookies não está funcionando como deveria
import { useEffect, useState } from 'react'

//Por algum motivo isso não está funcionando como deveria
export default function UsuarioLogado() {
    //pegando os dados do usuário
  const [cookies, setCookies] = useState(null)

  useEffect(() => {
    async function fetchCookies() {
      const result = await getCookies()
      console.log(result?.nome || "desconectado")
      setCookies(result?.nome || null)//devemos resolver este problema rápido
    }
    fetchCookies()
  }, [])

  //O HTML
  return (
    // aqui podemos adicionar uma lógica no botão para fazer o logout
    <button type="button">
      <p className="text-gray-300 hover:text-white">
        Usuário: {cookies ? <>{cookies}</> : 'Carregando...'}
      </p>
    </button>
  )
}