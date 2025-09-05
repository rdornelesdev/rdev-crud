import prismaClient from "../../prismaExtension/prisma.js";
import argon2 from "argon2";

interface IUser {
  nome: string;
  dt_nascimento: Date | null;
  email: string;
  telefone: string;
  cpf: string;
  cnpj: string;
  endereco: string;
  senha: string;
}

interface IUserId {
  id: number;
}

type IUserProps = IUser & IUserId;

class UserModel {

  // create users
  async create({ nome, dt_nascimento, email, telefone, cpf, cnpj, endereco, senha }: IUser) {
    // if(!email) {
    //     throw new Error('email incorreto!');
    // }

    // procura o primeiro registro com esse email na consulta do banco
    const validateUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (validateUser) {
      throw new Error("Este usuário já existe.");
    }

    // gera um hash da senha com argon2 (que vai ser salvo no banco)
    const senhaHash = await argon2.hash(senha);

    // cria o user no banco salvando nome, email e a senha ja hasheada
    const createUser = await prismaClient.user.create({
      data: {
        nome: nome,
        dt_nascimento: dt_nascimento ?? null,
        email: email ?? null,
        telefone: telefone ?? null,
        cpf: cpf ?? null,
        cnpj: cnpj ?? null,
        endereco: endereco ?? null,
        senha: senhaHash,
      },
    });
    // os trezentos null é pq ele é opcional no prisma e o prisma nao trata como undefined mas sim como null, então converto undefined do typescript para null igual no prisma

    return createUser;
  }

  // list all users 
  async getUsers() {
    try {
      const listUsers = await prismaClient.user.findMany({
        select: {
          id: true,
          nome: true,
          dt_nascimento: true,
          email: true,
          telefone: true,
          cpf: true,
          cnpj: true,
          endereco: true
        },
      });
      
      return listUsers;
    } catch (error) {
      console.error(error);
    }
  }

  // list by id
  async getUsersByID({id}: IUserId){ 
    try{
      
      // findUnique - procura por chave única (id)
      const getUserByID = await prismaClient.user.findUnique({
        select:{
          nome: true,
          email: true
        },
        where:{
          id: id
        }
      })

      return getUserByID;

    } catch(error){
      console.error(error);
    }
  }

  // update user
  async updateUser(id: number, data: Partial<IUser>){
    // partial significa que todas as props são opcionais (pode vir nome ou só o email, etc)
    
    const dadosUsuario: Partial<IUser> = {...data};

    const hashSenha = await argon2.hash(dadosUsuario.senha ? dadosUsuario.senha : '');

    const updateUser = await prismaClient.user.update({
      where:{
        id: id
      }, 
      data: {
        nome: dadosUsuario.nome ?? '',
        dt_nascimento: dadosUsuario.dt_nascimento ?? '',
        email: dadosUsuario.email ?? '',
        telefone: dadosUsuario.telefone ?? '',
        cpf: dadosUsuario.cpf ?? '',
        cnpj: dadosUsuario.cnpj ?? '',
        endereco: dadosUsuario.endereco ?? '',
        senha: hashSenha
      }
    })

    return updateUser;
  }

  // deletar usuário 
  async deletarUsuario({id}: IUserId) {
    const deleteUser = prismaClient.user.delete({
      where: {
        id: id
      }
    })

    return deleteUser;
  }

}

export { UserModel };
