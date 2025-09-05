import { Request, Response } from "express";
import { UserModel } from "../../models/users/UserModel.js";

class UserController {

  // creating new user
  async create(req: Request, res: Response) {
    const { nome, dt_nascimento, email, telefone, cpf, cnpj, endereco, senha } = req.body;

    
    const userModel = new UserModel();
    
    const createUserModel = await userModel.create({
      nome,
      dt_nascimento,
      email,
      telefone,
      cpf,
      cnpj,
      endereco,
      senha,
    });

    return res.json(createUserModel);
  }


  // listing users
  async getUsers(req: Request, res: Response) {
      const userModel = new UserModel();
      const getUserModel = await userModel.getUsers();

      return res.json(getUserModel);
  }

  // list user by id
  async getUsersByID(req: Request, res: Response) {
    const {id} = req.params;

    const userModel = new UserModel();
    const getUserId = await userModel.getUsersByID({ id: Number(id) });

    return res.json(getUserId);
  }

  // atualizar usuario
  async updateUser(req: Request, res: Response){ 
    // pega o id da url
    const {id} = req.params;

    const {nome, dt_nascimento, email, telefone, cpf, cnpj, endereco, senha } = req.body;

    const updateUserModel = new UserModel();
    const updateUser = updateUserModel.updateUser(Number(id), {nome, dt_nascimento, email, telefone, cpf, cnpj, endereco, senha})

    return res.json(updateUser);
  }

  // deletar usuário
  async deleteUser(req: Request, res: Response){ 
    const {id} = req.params;

    const userModel = new UserModel();
    await userModel.deletarUsuario({id: Number(id)});

    return res.status(204).end();
  }
}

export { UserController };
