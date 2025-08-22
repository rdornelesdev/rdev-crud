import {Request} from 'express';
import argon2 from 'argon2';


// ponto de partida para nosso login
export function hashDadosDoClient(req: Request): Promise<string> {
    const ip = req.ip || 'desconhecido'; // pega o ip do usuário 
    const userAgent = req.headers['user-agent'] || 'desconhecido'; // pega de onde ta vindo a requisição
    const fingersprintString = `${ip}-${userAgent}`; // hashea o ip junto com o user-agent para caso o banco for invadido nao possa ver, entao no banco é salvo assim hasheado
    return argon2.hash(fingersprintString);
}
