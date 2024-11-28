import prisma from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'

export default async function Avisos() {
  //Pegando todas os filmes
  const filmesdb = await prisma.filme.findMany()

  return (
    <div className="grid grid-cols-2 gap-5 items-center w-4/5">
      {filmesdb?.map((el, i) => {
        return (
          <Link href={`/home/${el.slug}`} key={el.slug}>
            <section className="bg-slate-400 rounded shadow-md w-2/5 p-1 m-2">
              <h1>{el.title}</h1>
              <Image
                src={'/enem.png'}
                width={160}
                height={90}
                alt="Imagem de representação"
                className="w-11/12 rounded-md"
              />
              <p>{el.content}</p>
              {/* <p>{el.content}</p> */}
              <div className="flex flex-row-reverse">
                {/* <p>{el.dtmodifica.toString()}</p> */}
                <p>{el.dtpost.toString()}</p>
              </div>
            </section>
          </Link>
        )
      })}
    </div>
  )
}