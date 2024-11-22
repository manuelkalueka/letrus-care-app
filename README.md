# 📚 Lectrus Care  

**Lectrus Care** é uma aplicação focada na gestão e regularização de pagamentos escolares. O sistema permite aos centros de ensino monitorar matrículas, gerir pagamentos e facilitar a comunicação com estudantes e responsáveis, oferecendo uma interface moderna e optimizada.

---

## 🚀 **Funcionalidades Principais**  

- **Gestão de Estudantes:** Pesquisa de estudantes pelo nome ou código.  
- **Gestão de Pagamentos:** Cadastro e acompanhamento de pagamentos com cálculo automático de taxas de multa.  
- **Histórico de Matrículas:** Consulta ao histórico de matrículas e taxas associadas.  
- **Interface Responsiva:** Design acessível para diversos dispositivos.  

---

## 🛠️ **Tecnologias Utilizadas**  

| Tecnologia          | Aplicação                                     |
|---------------------|-----------------------------------------------|
| **React.js**        | Construção da interface do utilizador (frontend). |
| **React Hook Form** | Gestão de formulários com validação simplificada. |
| **Yup**             | Validação de dados.                          |
| **Context API**     | Gestão de estado global (centros e autenticação). |
| **TypeScript**      | Adição de tipagem estática para maior robustez. |
| **TailwindCSS**     | Estilização moderna e responsiva.             |
| **Lucide Icons**    | Ícones para melhorar a usabilidade visual.    |
| **Node.js e APIs REST** | Backend e integração com serviços externos. |

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
└── public/             # Recursos estáticos (imagens, ícones, etc.)
