# Log de desenvolvimento

Manterei aqui algumas anotações de decisões e progresso do desenvolvimento para auxiliar na documentação do processo de criação do projeto

## 12 de Outubro

- Depois de analizar a documentação e as regras de negócio, decidi usar node para o backend e react para o front;
- De forma geral, decidi desenvolver primeiro as duas aplicações se comunicando, e seguir desenvolvendo na seguinte ordem: Autenticação, listagem de conversas, envio de mensagens;
- Depois de ter essas funcionalidades implemnentadas, com o tempo restante posso consultar a documentação novamente e decidir os próximos passos
- Conversei com o Claude Code sobre as minhas ideias iniciais, o que pretendia fazer e as tecnologias que decidi usar
- Acatei a sugestão de usar Express no projeto Node e Vite no projeto React;
- Usei o claude para criar a estrutura inicial dos projetos e de docker

## 13 de Outubro

- Adicionei o container do postgres e conectei com o backend
- Irei fazer a API validar o login apenas conferindo o documento, sem senha por enquanto
- ✅ ~TODO: Adicionar coluna de senha e validar a mesma no login~ Feito
- TODO: Adicionar limitação no tamanho do CPF ou CNPJ
- Adicionei validação com senha e criação de usuário na API