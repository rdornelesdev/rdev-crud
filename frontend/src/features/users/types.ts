export type User = {
  id: number;
  nome: string;
  dt_nascimento: Date | null;
  email: string;
  telefone: string;
  cpf: string;
  cnpj: string;
  endereco: string
};

// armazenar em um array os valores do User acima
export interface UserListProps {
  users: User[];
}
