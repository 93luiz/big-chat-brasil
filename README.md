# Projeto BCB (Big Chat Brasil)

Projeto de demonstração\avaliação para o teste técnico da Irrah Tech.

Especificações e requisitos: <https://github.com/irrahgroup/irrah-tech-challenges>

Este aqui foi desenvolvido pensando especificamente no desafio Fullstack, focando no desenvolvimento de frontend e backend funcionais, com foco na integração entre eles.

## Detalhes técnicos e stack

Para este projeto, foi adotada a seguinte stack:

- Backend: Node.js + Express
- Frontend: React + Vite
- Banco de dados: Postgres SQL

Alguns detalhes e decisões:

- Utilizando Docker para levantar os serviços necessários
- A imagem do postgres permite passar uma pasta com SQL inicial para configurar o banco, foi utilizado disso para criar as tabelas e carregar o banco com dados de exemplo iniciais
- Login usando JWT emitido pelo backend
- Autenticação via cookie, utilizou-se do gerenciamento de API do Vite para redirecionar as chamadas de `/api` para o backend, evitando gerenciar cookies e CORS manualmente

## Como testar

Para executar o projeto, basta subir os containeres com o docker compose:

```bash
$ docker compose up
```

Os containeres serão criados e os dados iniciais serão populados no banco.

### Usuários de teste

Utilize as seguintes credenciais para logar:

1. **João da Silva**: CPF: 12345678909 | Senha: dev12345
2. **Maria Fernandes**: CPF: 98765432100 | Senha: dev12345
1. **Solusoft**: CNPJ: 11222333000181 | Senha: dev12345

### Usuários adicionais

Caso deseje adicionar mais usuários para testar, o sistem possui API para criação de usuários, porém não possui interface para tal, de qualquer forma, é possível fazer o cadastro pela seguinte URL:

```
POST /api/user
```

O corpo da requisição deve ser em formato JSON com os seguintes dados:

```json
{
    "name": "João da Silva",
    "document": "12345678909",
    "document_type": "cpf", // [cpf,cnpj]
    "password": "dev12345"
}
```