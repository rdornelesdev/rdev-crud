import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prismaClient from "../../prismaExtension/prisma.js";
import argon2 from "argon2";
import { hashDadosDoClient } from "../../utils/auth.js"; // Importa a função de um lugar só


export async function login(req: Request, res: Response) {
    // login do usuário
    const { email, senha } = req.body; // o back espera receber um objeto com as prop email e senha
    const usuario = await prismaClient.user.findUnique({
        where: { email }
    });

    // verifica se o email / senha estão corretos
    if (!usuario || !(await argon2.verify(usuario.senha, senha))) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // se o usuario for logado gera já o jwt, que expire em 15 minutos
    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '15m' }
    );

    // pegando o método que vem do auth.ts - onde configuramos o fingerprint
    const fingerprint = await hashDadosDoClient(req);

    // cria a sessão do usuário
    // aqui registra no banco que o usuário fez login.
    // essa sessão pode durar 7 dias (mesmo que o JWT expire em 15 minutos).
    const sessao = await prismaClient.sessao.create({
        data: {
            usuarioId: usuario.id,
            fingerprint: fingerprint,
            expiracao: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        }
    });

    // manda o JWT pro cliente via Cookie
    res.cookie('token', token, {
        httpOnly: true, // o cookie não pode ser acessado via JS do navegador (mais seguro contra XSS).
        secure: process.env.NODE_ENV === 'production', // só envia em HTTPS em produção.
        maxAge: 1000 * 60 * 60 * 24 * 7 // quanto tempo o cookie fica salvo no navegador.
    });

    console.log(res.cookie('token', token))

    return res.status(200).json({ message: 'Login bem-sucedido.' });
}