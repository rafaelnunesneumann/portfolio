# 💼 Rafael Nunes Neumann — Portfólio

> Portfólio profissional desenvolvido com Next.js, apresentando minha trajetória, projetos e formas de contato.

---

## 🚧 Status do Projeto

[![Versão](https://img.shields.io/badge/Versão-v0.1.0-blue?style=for-the-badge)](https://github.com/rafaelneumann/portfolio)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-007ec6?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.3-007ec6?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-007ec6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-007ec6?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## 📚 Índice
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Autor](#-autor)

---

## 📝 Sobre o Projeto

Portfólio pessoal desenvolvido para apresentar minha trajetória profissional, projetos e formas de contato. O site conta com suporte a múltiplos idiomas (PT/EN), tema claro/escuro e um formulário de contato funcional via Nodemailer.

---

## ✨ Funcionalidades Principais

- 🌐 **Internacionalização (i18n):** Suporte completo a Português e Inglês via Context API.
- 🌙 **Tema Claro/Escuro:** Alternância de tema com `next-themes`.
- 🦾 **Seção Hero:** Apresentação com efeito de digitação animado e ícones de tecnologias.
- 🗂️ **Projetos:** Timeline interativa com cards animados, imagens e tecnologias utilizadas.
- 💼 **Experiências:** Timeline vertical com cards de cada empresa, período e responsabilidades.
- � **Currículo:** Modal com visualização inline do PDF e download — exibe `Résumé 2025 port.pdf` em PT e `Résumé 2025.pdf` em EN.
-  **Formulário de Contato:** Envio de mensagens via [EmailJS](https://www.emailjs.com/) diretamente do cliente, sem back-end próprio.
- 🎞️ **Animações:** Transições e microinterações com Framer Motion.

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end

| Tecnologia | Versão |
| :--- | :--- |
| Next.js | 16.1.6 |
| React | 19.2.3 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| Framer Motion | ^12 |
| Radix UI | (Dialog, Dropdown, Slot, Toast) |
| Lucide React | ^0.575.0 |
| React Hook Form + Zod | ^7 / ^4 |
| next-themes | ^0.4.6 |
| simple-icons | ^16 |

### � Envio de E-mails

| Tecnologia | Descrição |
| :--- | :--- |
| EmailJS (`@emailjs/browser`) | Envio de e-mails diretamente do cliente, sem back-end próprio |

---

## 🔑 Variáveis de Ambiente

Crie um arquivo **`.env.local`** na raiz do projeto com as seguintes variáveis:

```env
# EmailJS — https://www.emailjs.com/
# Encontre esses valores em: https://dashboard.emailjs.com

NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key
```

> Os valores são obtidos no painel do [EmailJS](https://dashboard.emailjs.com): **Service ID** em *Email Services*, **Template ID** em *Email Templates* e **Public Key** em *Account > General*.

---

## 🔧 Instalação e Execução

### Pré-requisitos

- **Node.js** v18 ou superior
- **npm** ou **yarn**

### Passos

1. **Clone o repositório:**

```bash
git clone https://github.com/rafaelneumann/portfolio.git
cd portfolio
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie o arquivo `.env.local` conforme descrito na seção acima.

4. **Execute em modo de desenvolvimento:**

```bash
npm run dev
```

🎨 O projeto estará disponível em **http://localhost:3000**.

---

## 🚀 Deploy

1. **Build de produção:**

```bash
npm run build
npm run start
```

2. **Deploy na Vercel (recomendado):**

A forma mais simples é conectar o repositório à [Vercel](https://vercel.com) e configurar as variáveis de ambiente no painel do projeto em **Settings > Environment Variables**.

---

## 📂 Estrutura de Pastas

```
.
├── app/
│   ├── globals.css           # Estilos globais e variáveis CSS
│   ├── layout.tsx            # Layout raiz (metadados, providers)
│   └── page.tsx              # Página principal
├── components/
│   ├── Navbar.tsx            # Barra de navegação
│   ├── HeroSection.tsx       # Seção inicial com animação de digitação
│   ├── ProjectsSection.tsx   # Timeline de projetos
│   ├── ExperienceSection.tsx # Timeline de experiências profissionais
│   ├── ContactSection.tsx    # Formulário de contato e links sociais
│   ├── Footer.tsx            # Rodapé
│   ├── ResumeModal.tsx       # Modal de visualização e download do currículo (PT/EN)
│   └── ui/                   # Componentes de UI (badge, button, card, input, textarea)
├── contexts/
│   └── LangContext.tsx       # Context de internacionalização (PT/EN)
├── lib/
│   └── utils.ts              # Utilitários (cn, etc.)
├── public/                   # Assets estáticos (imagens de projetos e logos)
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎥 Demonstração

### 🌐 Aplicação Web

![Preview do Portfólio](public/portfolio-1.png)

---

## 👤 Autor

| 👤 Nome | GitHub | 💼 LinkedIn |
|---------|-----------------|-------------|
| Rafael Nunes Neumann | [github.com/rafaelneumann](https://github.com/rafaelneumann) | [linkedin.com/in/rafaelneumann](https://www.linkedin.com/in/rafaelneumann) |

---

## 📄 Licença

Este projeto é distribuído sob a **Licença MIT**.
