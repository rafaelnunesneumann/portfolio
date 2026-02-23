"use client"

import React, { createContext, useContext, useState } from "react"

type Lang = "pt" | "en"

interface Project {
  name: string
  description: string
  techs: string[]
  github: string
  image: string
  year: string
}

interface Experience {
  company: string
  role: string
  period: string
  location: string
  logo: string
  bullets: string[]
}

interface Translations {
  nav: {
    about: string
    projects: string
    experience: string
    contact: string
  }
  hero: {
    greeting: string
    role: string
    tagline: string
    cta: string
    scroll: string
  }
  about: {
    title: string
    paragraphs: string[]
    skills: string[]
  }
  projects: {
    title: string
    subtitle: string
    repo: string
    items: Project[]
  }
  experience: {
    title: string
    subtitle: string
    current: string
    items: Experience[]
  }
  contact: {
    title: string
    subtitle: string
    form: {
      name: string
      email: string
      message: string
      send: string
      sending: string
      success: string
      error: string
    }
    socials: {
      email: string
      whatsapp: string
      linkedin: string
      github: string
    }
  }
  footer: {
    copy: string
  }
}

const pt: Translations = {
  nav: {
    about: "Sobre Mim",
    projects: "Projetos",
    experience: "Experiências",
    contact: "Contato",
  },
  hero: {
    greeting: "Olá, eu sou",
    role: "Desenvolvedor de Software",
    tagline:
      "Construo experiências digitais elegantes, escaláveis e de alto desempenho.",
    cta: "Ver projetos",
    scroll: "Role para explorar",
  },
  about: {
    title: "Sobre Mim",
    paragraphs: [
      "Me chamo Rafael Nunes Neumann, sou desenvolvedor de software apaixonado por criar soluções tecnológicas que fazem a diferença. Com sólida formação técnica e constante aprendizado, atuo no desenvolvimento de aplicações web e mobile modernas.",
      "Minha trajetória é marcada pela busca pela excelência técnica, boas práticas de código e trabalho colaborativo. Acredito que a tecnologia, quando bem aplicada, tem o poder de transformar negócios e melhorar vidas.",
      "Quando não estou codando, gosto de explorar novas tecnologias, contribuir para projetos open source e me aprofundar nos fundamentos da computação.",
    ],
    skills: [
      "TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL",
      "Docker", "Git", "REST APIs", "Tailwind CSS", "Java", "React Native", "NetSuite",
    ],
  },
  projects: {
    title: "Projetos",
    subtitle: "Uma linha do tempo dos projetos que construí ao longo da minha carreira.",
    repo: "Ver repositório",
    items: [
      {
        name: "Guilherme Leão Odontologia",
        year: "2026",
        description:
          "Sistema web para gestão de clínica odontológica, com foco nos serviços de mockup dentário. Permite o gerenciamento de pacientes, agendamentos e acompanhamento de procedimentos estéticos.",
        techs: ["Next.js", "Java Spring Boot", "PostgreSQL", "Tailwind CSS", "Material UI"],
        github: "",
        image: "/guilherme-leao.png",
      },
      {
        name: "Bibliotech",
        year: "2025",
        description:
          "Sistema de gestão bibliotecária desenvolvido para a disciplina de Trabalho Interdisciplinar II do curso de Engenharia de Software da PUC Minas. Contempla controle de acervo, empréstimos e devoluções.",
        techs: ["Next.js", "Java Spring Boot", "MySQL", "Tailwind CSS", "Material UI"],
        github: "",
        image: "/bibliotech.png",
      },
    ],
  },
  experience: {
    title: "Experiências",
    subtitle: "Minha trajetória profissional e as empresas pelas quais passei.",
    current: "Trabalhando aqui atualmente",
    items: [
      {
        company: "dti digital",
        role: "Desenvolvedor de Software",
        period: "Jul 2025 – Presente",
        location: "Belo Horizonte (Híbrido)",
        logo: "/dtidigital_logo.jpg",
        bullets: [],
      },
      {
        company: "Dev.Pro",
        role: "Desenvolvedor Full-Stack",
        period: "Ago 2024 – Mar 2025",
        location: "Estados Unidos (Remoto)",
        logo: "/dev_pro_logo.jpg",
        bullets: [
          "Arquitetei e implantei mais de 12 SuiteScripts personalizados no NetSuite, automatizando lógicas de preços complexas e reduzindo o tempo de processamento de pedidos em 6 horas por pedido; garanti integração perfeita com React/Material-UI.",
          "Projetei sistemas ponta a ponta para otimizar processos de negócios, aproveitando JavaScript para desenvolvimento backend (SuiteScripts) e frontend (React).",
          "Projetei e implementei uma solução para automatizar 80% da sincronização de dados entre NetSuite e Salesforce usando Azure Service Bus para integração de dados confiável e escalável.",
          "Projetei uma integração NetSuite-Salesforce usando Azure Service Bus, automatizando a sincronização de dados e reduzindo em 60% as horas de entrada manual de dados para a equipe de operações de vendas do cliente.",
        ],
      },
      {
        company: "dti digital",
        role: "Desenvolvedor Full-Stack",
        period: "Ago 2023 – Ago 2024",
        location: "Belo Horizonte (Híbrido)",
        logo: "/dtidigital_logo.jpg",
        bullets: [
          "Desenvolvi funcionalidades-chave para os projetos Lore e SafeFarm utilizando React Native, TypeScript e Tailwind CSS, contribuindo para melhorias de desempenho e experiência do usuário.",
          "Implementei testes unitários e de integração no projeto Lore, aumentando a confiabilidade do código e ajudando a prevenir problemas em produção.",
          "Colaborei com a equipe de dados na otimização de Cloud Functions e consultas SQL, melhorando a eficiência de execução e a responsividade do sistema.",
          "Participei ativamente do processo de code review e da adoção de padrões compartilhados entre múltiplas equipes, contribuindo para maior manutenibilidade do código.",
        ],
      },
    ],
  },
  contact: {
    title: "Contato",
    subtitle: "Vamos conversar! Estou disponível para novos projetos, oportunidades ou apenas um bate-papo sobre tecnologia.",
    form: {
      name: "Seu nome",
      email: "Seu e-mail",
      message: "Sua mensagem",
      send: "Enviar mensagem",
      sending: "Enviando...",
      success: "Mensagem enviada com sucesso! Em breve retorno o contato.",
      error: "Ocorreu um erro ao enviar. Por favor, tente novamente.",
    },
    socials: {
      email: "E-mail",
      whatsapp: "WhatsApp",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },
  footer: {
    copy: "Desenvolvido com ♥ por Rafael Nunes Neumann",
  },
}

const en: Translations = {
  nav: {
    about: "About Me",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
  },
  hero: {
    greeting: "Hello, I'm",
    role: "Software Developer",
    tagline: "I build elegant, scalable and high-performance digital experiences.",
    cta: "View projects",
    scroll: "Scroll to explore",
  },
  about: {
    title: "About Me",
    paragraphs: [
      "My name is Rafael Nunes Neumann, I'm a software developer passionate about creating technological solutions that make a difference. With a solid technical background and continuous learning, I work on developing modern web and mobile applications.",
      "My journey is marked by the pursuit of technical excellence, good coding practices and collaborative work. I believe that technology, when well applied, has the power to transform businesses and improve lives.",
      "When I'm not coding, I enjoy exploring new technologies, contributing to open source projects and diving deep into the fundamentals of computer science.",
    ],
    skills: [
      "TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL",
      "Docker", "Git", "REST APIs", "Tailwind CSS", "Java", "React Native", "NetSuite",
    ],
  },
  projects: {
    title: "Projects",
    subtitle: "A timeline of the projects I've built throughout my career.",
    repo: "View repository",
    items: [
      {
        name: "Guilherme Leão Odontologia",
        year: "2026",
        description:
          "Web system for dental clinic management, focused on dental mockup services. Enables patient management, scheduling and tracking of aesthetic procedures.",
        techs: ["Next.js", "Java Spring Boot", "PostgreSQL", "Tailwind CSS", "Material UI"],
        github: "",
        image: "/guilherme-leao.png",
      },
      {
        name: "Bibliotech",
        year: "2025",
        description:
          "Library management system developed for the Interdisciplinary Work II subject of the Software Engineering program at PUC Minas. Features collection control, loans and returns.",
        techs: ["Next.js", "Java Spring Boot", "MySQL", "Tailwind CSS", "Material UI"],
        github: "",
        image: "/bibliotech.png",
      },
    ],
  },
  experience: {
    title: "Experience",
    subtitle: "My professional journey and the companies I have worked with.",
    current: "Currently working here",
    items: [
      {
        company: "dti digital",
        role: "Software Developer",
        period: "Jul 2025 – Present",
        location: "Belo Horizonte (Hybrid)",
        logo: "/dtidigital_logo.jpg",
        bullets: [],
      },
      {
        company: "Dev.Pro",
        role: "Full-Stack Developer",
        period: "Aug 2024 – Mar 2025",
        location: "United States (Remote)",
        logo: "/dev_pro_logo.jpg",
        bullets: [
          "Architected and deployed 12+ custom SuiteScripts in NetSuite, automating complex pricing logic and reducing order processing time by 6 hours per order; ensured seamless integration with React/Material-UI.",
          "Designed end-to-end systems to optimize business processes, leveraging JavaScript for backend (SuiteScripts) and frontend (React) development.",
          "Designed and implemented a solution to automate 80% of data synchronization between NetSuite and Salesforce using Azure Service Bus for reliable and scalable data integration.",
          "Engineered a NetSuite-Salesforce integration using Azure Service Bus, automating data synchronization and reducing manual data entry hours by 60% for the client's sales operations team.",
        ],
      },
      {
        company: "dti digital",
        role: "Full-Stack Developer",
        period: "Aug 2023 – Aug 2024",
        location: "Belo Horizonte (Hybrid)",
        logo: "/dtidigital_logo.jpg",
        bullets: [
          "Developed key features for the Lore and SafeFarm projects using React Native, TypeScript and Tailwind CSS, contributing to performance improvements and enhanced user experience.",
          "Implemented unit and integration tests for the Lore project, increasing code reliability and helping to prevent production issues.",
          "Collaborated with the data team on optimizing Cloud Functions and SQL queries, improving execution efficiency and system responsiveness.",
          "Actively participated in the code review process and the adoption of shared standards across multiple teams, contributing to greater code maintainability.",
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    subtitle: "Let's talk! I'm available for new projects, opportunities or just a chat about technology.",
    form: {
      name: "Your name",
      email: "Your email",
      message: "Your message",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent successfully! I'll get back to you soon.",
      error: "An error occurred while sending. Please try again.",
    },
    socials: {
      email: "Email",
      whatsapp: "WhatsApp",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },
  footer: {
    copy: "Built with ♥ by Rafael Nunes Neumann",
  },
}

const translations = { pt, en }

interface LangContextType {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LangContext = createContext<LangContextType>({
  lang: "pt",
  t: pt,
  toggle: () => {},
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt")
  const toggle = () => setLang((l) => (l === "pt" ? "en" : "pt"))
  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
