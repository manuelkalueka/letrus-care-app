# 📚 Lectrus Care  

**Lectrus Care** é uma aplicação desktop multiplataforma focada na gestão e regularização de pagamentos escolares. Desenvolvida com **Electron** e **Vite**, a aplicação combina desempenho optimizado e uma interface moderna, permitindo aos centros de ensino gerir matrículas, pagamentos e comunicação de forma eficiente.

---

## 🚀 **Funcionalidades Principais**  

- **Gestão de Estudantes:** Pesquisa e gestão de estudantes pelo nome ou código.  
- **Gestão de Pagamentos:** Registro e acompanhamento de pagamentos com cálculo automático de taxas de multa.  
- **Histórico de Matrículas:** Acesso ao histórico de matrículas e propinas associadas.  
- **Interface Multiplataforma:** Compatível com Windows, macOS e Linux.  

---

## 🛠️ **Tecnologias Utilizadas**  

| Tecnologia          | Aplicação                                         |
|---------------------|---------------------------------------------------|
| **Electron**        | Construção de aplicações desktop multiplataforma. |
| **Vite**            | Ferramenta de desenvolvimento rápida e leve.     |
| **React.js**        | Criação da interface do utilizador (frontend).    |
| **React Hook Form** | Gestão e validação de formulários.                |
| **Yup**             | Validação de dados de formulários.               |
| **Context API**     | Gestão de estado global.                         |
| **TypeScript**      | Tipagem estática para maior segurança e robustez. |
| **TailwindCSS**     | Estilização moderna e responsiva.                 |
| **Lucide Icons**    | Ícones para melhorar a experiência do utilizador. |

---

## 📂 **Estrutura do Projeto**  

```plaintext
Lectrus-Care/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── contexts/       # Contextos para gestão de estado global
│   ├── pages/          # Páginas principais da aplicação
│   ├── services/       # Serviços de integração com APIs
│   ├── utils/          # Funções auxiliares (e.g., formatação)
│   └── styles/         # Configurações de estilos globais
├── public/             # Recursos estáticos (imagens, ícones, etc.)
└── main/               # Arquivos principais para Electron
