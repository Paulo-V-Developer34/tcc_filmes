'use server'

import prisma from '@/lib/db'
import { type JWTPayload, jwtVerify, SignJWT } from 'jose'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

//CRIPTOGRAFIA
//encriptografar
//criar JWT
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(key)
}
//descriptografar
export async function decript(input) {
  const payload = await jwtVerify(input, key, {
    //não sei o por que da desestruturação do payload
    algorithms: ['HS256'],
  })
  return payload
}

//fazer login
export async function fazerLogin(conta) {
  try {
    ////////CÓDIGO DE DEBUG////////
    ////essa declaração não deve ficar assim na versão final, ela deve ser uma constante criada apenas pelo BD
    let contabd = { //acho que eu não deveria colocar "null" em tudo, mas fazer o que...
        name: "null",
        gmail: "null@gmail.com",
        image: null,
        id: "null",
    }

    if(conta.senha == "teste") {
      contabd = {
        name: conta.nome,
        gmail: "teste@gmail.com",
        image: null,
        id: "teste",
      }
    } else if(conta.senha == "teste2") {
      contabd = {
        name: conta.nome,
        gmail: "teste2@gmail.com",
        image: null,
        id: "teste2",
      }
    } else {
      ///////////////////////////////////
      // const contabd: user | null = await prisma.user.findUnique({
      contabd = await prisma.user.findUnique({
        where: {
          name: conta.nome,
          password: conta.senha,
        },
        select: {
          name: true,
          gmail: true,
          image: true,
          id: true
        },
      })
    }
    
    try {
      //////////DEBUG////////////
      if(contabd?.name == "null" || null) {
        const resposta = {
          error: "usuário inválido",
          resultado: false,
        }
        return resposta
      }
      ///////////////////////////

      //removerei este try catch de dentro de outro try catch o mais cedo possível
      //criar sessão

      const expires = new Date(Date.now() + 5 * 60 * 1000)
      const session = await encrypt({ contabd, expires })

      //criar cookie
      ;(await
        //criar cookie
        cookies()).set('session', session, { expires, httpOnly: true })

      //redirecionamento para a página principal
      const respota = {
        error: '',
        resultado: true,
      }
      console.log('login feito')
      return respota
    } catch (error) {
      let mensagemErro: string

      if (error instanceof Error) {
        mensagemErro = error.message
      } else {
        mensagemErro = String(error)
      }

      const resposta = {
        error: mensagemErro,
        resultado: false,
      }
      return resposta
    }
  } catch (error) {
    let mensagemErro: string

    if (error instanceof Error) {
      console.log('entrou no if do 1 try catch')
      mensagemErro = error.message
    } else {
      console.log('entrou no else do 1 try catch')
      mensagemErro = String(error)
    }

    const resposta = {
      error: mensagemErro,
      resultado: false,
    }
    return resposta
  }
}

//pegar o cookie
export async function getCookies() {
  const session = (await cookies()).get('session')?.value
  if (!session) return null
  const { payload } = await decript(session) //não gostei de estar trabalhando com um valor que pode ser possívelmente nulo em typescript que é uma linguagem fortemente tipada
  const { contabd } = payload //ainda tenho que declarar os tipos
  console.log(contabd)
  return contabd
}

//fazer a renovação da sessão
// export async function updateSession(request: NextRequest) {
//   const session = request.cookies.get('session')?.value

//   if (!session) return

//   //esse é possívelmente o código que está criando milhares de cookies
//   //renovar sessão //AVISO, nunca esqueça de realizar o "await"
//   const parsed = await decript(session) //seção descriptografada
//   parsed.expires = new Date(Date.now() + 5 * 60 * 1000) //acrescentando mais 10 segundos
//   const res = NextResponse.next() //não sei exatamente para que serve nem como utilizar!!!!! //mas sei que isso avisa ao Next que iremos preparar uma "resposta" da web para o cliente (ou simplismente uma resposta)
//   res.cookies.set('session', await encrypt(parsed), {
//     httpOnly: true,
//     expires: parsed.expires,
//   })

//   return res
// }

//variáveis
const chavesecreta = "ianpeixinho"
const key = new TextEncoder().encode(chavesecreta)

//criptografia
//criptografar