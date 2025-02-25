# Projeto Next.js - Gestão de Usuários (Desafio Cibra)

Este projeto foi desenvolvido como parte do desafio técnico de Front-end para a Cibra. A aplicação é uma solução de gestão de usuários que permite visualizar, adicionar, pesquisar e excluir usuários, além de exibir detalhes individuais de cada usuário. Os dados são obtidos de uma API fictícia (JSONPlaceholder) e armazenados no localStorage para melhorar a usabilidade e evitar perda de informações ao navegar entre páginas.

Este é um projeto [Next.js](https://nextjs.org) criado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Sumário

- [Introdução](#introdução)
- [Tech Stack](#tech-stack)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)

## Introdução

Este projeto é uma aplicação de gestão de usuários que permite visualizar, adicionar, pesquisar e deletar usuários. Os dados dos usuários são buscados de uma API externa e armazenados no `localStorage` do navegador.

## Tech Stack

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- `React`: Biblioteca principal para construção da interface do usuário.

- `Next.js`: Framework para renderização do lado do servidor (SSR) e roteamento.

- `TypeScript`: Adiciona tipagem estática ao JavaScript, melhorando a segurança e a manutenção do código.

- `Tailwind CSS`: Framework CSS utilitário para estilização rápida e responsiva.

- `React Hook Form`: Biblioteca para gerenciamento de formulários com validação eficiente.

- `Radix UI`: Biblioteca de componentes acessíveis e personalizáveis.

- `Yarn`: Gerenciador de pacotes utilizado para instalar e gerenciar dependências.

## Instalação e Execução

Primeiro, clone o repositório para sua máquina local:

```bash
git clone https://github.com/hallan-lima/cibra.git
cd cibra
```

Instale as dependências:

```bash
yarn install
```

Para iniciar o servidor de desenvolvimento, execute:

```bash
yarn dev -p 5173
```

Abra [http://localhost:5173](http://localhost:5173) no seu navegador para ver o resultado.

## Estrutura do Projeto

A estrutura principal do projeto:

```txt
/app
  /page.tsx                 # Página principal que lista e gerencia usuários
  /users/[id]/page.tsx      # Página de detalhes do usuário
/types
  /user.ts                  # Definição do tipo User
/README.md                  # Documentação do projeto
```

## Funcionalidades

### Página Principal (`app/page.tsx`)

- **Busca de Usuários**: Usa `useEffect` para buscar usuários da API jsonplaceholder e armazená-los no `localStorage`.
- **Adicionar Usuário**: Formulário para adicionar um novo usuário à lista.
- **Pesquisar Usuários**: Campo de busca para filtrar usuários por nome ou email.
- **Deletar Usuário**: Função para remover um usuário da lista.

### Página de Detalhes do Usuário (`app/users/[id]/page.tsx`)

- **Exibir Detalhes do Usuário**: Mostra os detalhes do usuário selecionado.
- **Voltar à Lista de Usuários**: Botão para retornar à página principal.

