import UsuarioLogado from "./Usuario";
import { urlpath } from "@/app/layout";

//Barra de navegação
export default function Nav(){
    return (
        <header>
            <nav className="bg-gray-800 p-4 fixed top-0 w-full shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo do site */}
                    <div className="text-white text-base font-bold">
                    <i>
                        <p>Logo</p>
                    </i>
                    </div>
                    <div className="flex space-x-4">
                        {/* links */}
                        <div className={`${urlpath !== '/home' && 'hidden'} flex gap-[8vw]`}>
                            <a href="#avisos">
                                <p className="text-gray-300 hover:text-white">Avisos</p>
                            </a>
                            <a href="#agenda">
                                <p className="text-gray-300 hover:text-white">Agenda</p>
                            </a>
                            <a href="#impressora">
                                <p className="text-gray-300 hover:text-white">Impressora 3D</p>
                            </a>
                            <a href="#faleconosco">
                                <p className="text-gray-300 hover:text-white">Fale conosco</p>
                            </a>
                        </div>
                        {/* Usuário Logado */}
                        <UsuarioLogado/>
                    </div>
                </div>
            </nav>
        </header>
    )
}