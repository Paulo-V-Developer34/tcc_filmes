# Ian Filmes

## Início rápido

Para clonar o repositório git execute

```bash
git clone https://github.com/Paulo-V-Developer34/tcc_filmes.git
```

Para instalar as dependências execute

```bash
npm i
```

Para gerar o banco de dados execute

```bash
#gerar o BD
npx prisma db push

#gerar os dados #caso dê erro não se preocupe, deve ser por causa que o npx prisma db push já deve ter criado
npx prisma db seed
```

Para gerar o servidor local execute:

```bash
#deve abrir o servidor em http://localhost:3000/
npm run dev
```

## Notas de desenvolvimento

1. É aconselhável não mexer em nada do código sem antes falar comigo para não dar erro
