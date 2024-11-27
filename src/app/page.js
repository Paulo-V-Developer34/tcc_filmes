import Form from "@/components/Form";

export default function Home() {
  return (
    <div
      className="flex items-center justify-center h-screen w-screen"
      style={{
        backgroundImage: `url('/estudantes.png')`,
        backgroundSize: 'cover', // Faz a imagem cobrir toda a área
        backgroundRepeat: 'no-repeat', // Evita a repetição da imagem
        backgroundPosition: 'center',
      }}
    >
      <Form/>
    </div>
  );
}
