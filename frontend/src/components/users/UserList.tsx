"use client";

import './users.css';
import { UserListProps } from '@/features/users/types';
import { maskCPF, maskCNPJ } from '@/lib/plugins/cpf_cnpj';

export default function UserList({ users }: UserListProps) {


  return (
    <>
      <table className="table-container">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Dt. Nascimento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>CNPJ</th>
            <th>Endereço</th>
            <th>
                <button>
                    Cadastrar
                </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.dt_nascimento?.toLocaleDateString('pt-BR')}</td>
              <td>{user.email}</td>
              <td>{user.telefone}</td>
              <td>{maskCPF(user.cpf)}</td>
              <td>{maskCNPJ(user.cnpj)}</td>
              <td>{user.endereco}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
