import prismaClient from "../../prismaExtension/prisma.js";
import argon2 from "argon2";

interface IUser {
  nome: string;
  email: string;
  senha: string;
}

interface IUserId {
  id: number;
}

type IUserProps = IUser & IUserId;

class UserModel {

  // create users
  async create({ nome, email, senha }: IUser) {
    // if(!email) {
    //     throw new Error('email incorreto!');
    // }

    const validateUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (validateUser) {
      throw new Error("Este usuário já existe.");
    }

    const senhaHash = await argon2.hash(senha);

    const createUser = await prismaClient.user.create({
      data: {
        nome: nome,
        email: email,
        senha: senhaHash,
      },
    });

    return createUser;
  }

  // list all users 
  async getUsers() {
    try {
      const listUsers = await prismaClient.user.findMany({
        select: {
          id: true,
          nome: true,
          email: true
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
    
    const dadosUsuario: Partial<IUser> = {...data};

    const hashSenha = await argon2.hash(dadosUsuario.senha ? dadosUsuario.senha : '');

    const updateUser = await prismaClient.user.update({
      where:{
        id: id
      }, 
      data: {
        nome: dadosUsuario.nome ?? '',
        email: dadosUsuario.email ?? '',
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
