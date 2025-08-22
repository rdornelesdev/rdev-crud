import { Request, Response } from 'express';
import prismaClient from "../../prismaExtension/prisma.js";
import jwt from 'jsonwebtoken';

export async function logout(req: Request, res: Response) { // CORRIGIDO: adicionado 'export'

    // pegando o cookie chamado 'token'
    const { token } = req.cookies;
    
    // verifica se o cookie existe
    if (!token) {
        return res.status(200).json({ message: 'Logout bem-sucedido.' });
    }

    try {
        // validação se o token existe e no as id: number garantindo pro payload que vai ter um id do tipo nmumero (está tipando a variável payload)
        // jwt.verify(...) → devolve um payload genérico (pode ser qualquer coisa).
        // as { id: number } → diz pro TS: “pode confiar, eu sei que esse payload vai ter um campo id do tipo number”
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

        // remove a sessão no banco
        await prismaClient.sessao.deleteMany({
            where: {
                usuarioId: payload.id
            }
        });

        // limpa o cookie (apaga o token do navegador)
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout bem-sucedido.' });

    } catch (error) {
        // Se o token for inválido, apenas limpa o cookie
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout bem-sucedido.' });
    }
}