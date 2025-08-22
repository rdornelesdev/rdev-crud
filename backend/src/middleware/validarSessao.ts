import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prismaClient from "../prismaExtension/prisma.js";
import { hashDadosDoClient } from "../utils/auth.js"; // Importa a função compartilhada

// -------------
// aqui é o que vem do login.ts (seguindo o fluxo)
// -------------

// DICA: Para evitar `(req as any)`, crie um arquivo de declaração de tipos
// declare global { namespace Express { interface Request { usuario: { id: number }; }}}
export async function validarSessao(req: Request, res: Response, next: NextFunction) {

    // pega o token do cookie 
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        // valida o JWT
        // Usa a chave secreta (JWT_SECRET) pra verificar se o token é válido e não expirou.
        // O payload aqui contém { id: number }, ou seja, o ID do usuário.
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

        // procura a sessao no banco
        const sessao = await prismaClient.sessao.findFirst({
            where: {
                usuarioId: payload.id
            }
        });

        // checa a expiração da sessão
        if (!sessao || new Date() > sessao.expiracao) { // Verifica se a sessão existe E se não expirou
            return res.status(401).json({ message: 'Sessão revogada ou expirada.' });
        }

        // confere o fingerprint do dispositivo
        const fingerprintAtual = await hashDadosDoClient(req);

        // Se for diferente do que estava salvo, significa que o token foi usado em outro dispositivo.
        if (sessao.fingerprint !== fingerprintAtual) {
            // Ação de segurança! Deleta a sessão e retorna erro.
            await prismaClient.sessao.delete({ where: { id: sessao.id } });
            return res.status(401).json({ message: 'Sessão utilizada em um dispositivo diferente.' });
        }

        // atualiza o ultimo acessso
        // atualiza o campo ultimoAcesso no banco.
        // isso é útil para implementar expiração por inatividade (ex: expira se ficar 30min sem usar). Mas pra isso precisariamos fazer mais uma validação, colocando em uma variavel o tempo limite, e uma variavel chamada tipo "agora", verificar se agora é > que limite e se for expirar a sessao. Ai então se nao expirou iria para o await prismaClient.sessao.update como ta abaixo
        await prismaClient.sessao.update({
            where: { id: sessao.id },
            data: { ultimoAcesso: new Date() }
        });

        // autenticação bem-sucedida, salva o usuário na requisição
        // adiciona o payload (dados do usuário) dentro de req.
        // assim, em qualquer rota pode acessar: req.usuario.id
        (req as any).usuario = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
}