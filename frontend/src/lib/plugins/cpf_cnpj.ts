
// plugin cpf (mascara cpf)
export function maskCPF(value: string): string {
    if(!value){return "";}
    return value 
        .replace(/\D/g, '') // remove tudo q nao é numero
        .replace(/(\d{3})(\d)/, '$1.$2') // coloca um ponto dps dos primeiros 3 numeros
        .replace(/(\d{3})(\d)/, '$1.$2') // outro ponto dps do 6 digito
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // traço dps dos ultimos 3 numeros, antes dos 2 numeros finais
}

// plugin cnpj (mascara cnpj)
export function maskCNPJ(value: string): string {
    if(!value){return "";}
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
}

