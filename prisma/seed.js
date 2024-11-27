const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const initialUsers = [
  {
    id: "asdfqr2134",
    name: "Paulo Victor",
    gmail: "paulo@gmail.com"
  },
  {
    id: "asdfq4rqwefr4",
    name: "Ian Peixinho",
    gmail: "ian@gmail.com"
  },
  {
    id: "asdaere",
    name: "Beatris Simi",
    gmail: "beatris@gmail.com"
  },
]

const initialFilmes = [
  {
    id: "awheerf",
    title: "Peppa Pig",
    content: "Esse é um filme de ação e aventura, que envolve culinária e muita diversão",
    autorname: "Ian Peixinho", //estava dando erro pois eu esqueci de colocar esse dado, por isso o TS é melhor ;-;
    Autor: {
      connectOrCreate: {
        where: {
          name: 'Ian Peixinho',
        },
        create: {
          name: 'Ian Peixinho',
          gmail: 'ian@gmail.com'
        },
      }
    },
    slug: "peppa-pig"
  },
  {
    id: "awheyfiuqwhf",
    title: "Os Carecas",
    content: "Esse é um filme de ação e aventura, que envolve culinária e muita diversão",
    autorname: "Ian Peixinho", //estava dando erro pois eu esqueci de colocar esse dado, por isso o TS é melhor ;-;
    Autor: {
      connectOrCreate: {
        where: {
          name: 'Ian Peixinho',
        },
        create: {
          name: 'Ian Peixinho',
          gmail: 'ian@gmail.com'
        },
      }
    },
    slug: "os-carecas"
  },
  {
    id: "asdjhfkjefj",
    title: "IAM",
    content: "Esse é um filme que conta a história de um jovem chamado Ian Peixinho, que passa por muitas aventuras no ensino médio",
    autorname: "Ian Peixinho", //estava dando erro pois eu esqueci de colocar esse dado, por isso o TS é melhor ;-;
    Autor: {
      connectOrCreate: {
        where: {
          name: 'Ian Peixinho',
        },
        create: {
          name: 'Ian Peixinho',
          gmail: 'ian@gmail.com'
        },
      }
    },
    slug: "iam"
  },
  
]

async function main() {
  console.log('Começando a semear dados...')
  for (const user of initialUsers) {
    const newuser = await prisma.user.create({
      data: user,
    })
    console.log(`user com o Nome ${newuser.name} foi inserido`)//estava ocorrendo um erro pois eu estava colocando "nome" ao invés de "name", é por isso que TypeScript é melhor
  }
  for (const filme of initialFilmes) {
    const newfilme = await prisma.filme.create({
      data: filme,
    })
    console.log(`filme com o título ${newfilme.title} foi inserido`)
  }
  console.log('Semeação concluída')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
