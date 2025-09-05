import { HatGlasses } from "lucide-react";
import {User} from 'lucide-react';
import {Settings} from "lucide-react";
import {LogOut} from 'lucide-react';
import "./header.css";
import Link from "next/link";
import Image from 'next/image';

export default function Header() {
  return (
    <>
      <header className="headerConfig">
        <div className="logo-container">
          <HatGlasses className="icons" />
          <h1> RD<span>System</span></h1>
        </div>

        <ul>
          <li>
            <User />
            <Link href="/usuario">
                Ações do Usuário
            </Link>
          </li>
          <li>
            <Settings />
            <Link href="/configuracoes">
                Configurações
            </Link>
          </li>
        </ul>

        <div className="logout-container">
          <div className="logo-usuario">
            <Image src="/imgs/logo-ramon.jpeg" alt="Logo do Usuário" width={50} height={50} />
          </div>
          <div className="info-usuario">
            <p>Ramon Dorneles</p> 
            <span>Desenvolvedor</span>
          </div>
            <LogOut className="logout-icon"/>
        </div>
      </header>
    </>
  );
}
