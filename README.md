# NLW - Setup - Trilha ignite
Curso intensivo e de graça da [Rocketseat](https://www.rocketseat.com.br/) e ministrada pelo [Diego Fernandes](https://github.com/diego3g) e [Rodrigo Gonçalves](https://github.com/rodrigorgtic).

Nessa edição, será desenvolvido um tracker de hábitos para o usuário poder colocar em prática as suas resoluções de metas. Registrando diariamente a evolução de seus hábitos.

[Figma](https://www.figma.com/file/MxsxaQ1h4DJ2WzlfaVAmQL/Habits-(i)-(Community)?node-id=6%3A343&t=gp6c70IOkxDUjowq-1)

# Tecnologias e linguagens utilizadas
- NodeJs
- Fastify
- Prisma
- Vite
- React
- Expo
- React Native
- TypeScript
- TailwindCSS


# Branches

## [Aula 01](https://github.com/SheilaNS/nlw-setup/tree/class-1): Iniciando o projeto de ponta a ponta
## [Aula 02](https://github.com/SheilaNS/nlw-setup/tree/class-2): Agvançando o back-end e front-end
## [Aula 03](https://github.com/SheilaNS/nlw-setup/tree/class-3): Finalizando o layout web e mobile
## [Aula 04](https://github.com/SheilaNS/nlw-setup/tree/class-4): Conectando a API
## [Aula 05](https://github.com/SheilaNS/nlw-setup/tree/class-5-correta): O próximo nível
<br>

# Próximos passos
- criar rotas de edit e delete habits
- implementar essas novas rotas no web e mobile
- estilizar as novas funcionalidades
- criar uma tela de login
- implementar autenticação de usuários

# Estrutura do projeto
<details>
  <summary><strong>Arquivos</strong></summary><br>

  ```
  .
├── mobile
│   ├── assets
│   │   ├── adaptive-icon.png
│   │   ├── favicon.png
│   │   ├── icon.png
│   │   └── splash.png
│   ├── src
│   │   ├── @types
│   │   │   ├── app.d.ts
│   │   │   ├── navigation.d.ts
│   │   │   └── svg.d.ts
│   │   ├── assets
│   │   │   └── logo.svg
│   │   ├── components
│   │   │   ├── BackButton.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── HabitDay.tsx
│   │   │   ├── HabitsEmpty.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── lib
│   │   │   ├── axios.ts
│   │   │   └── dayjs.ts
│   │   ├── routes
│   │   │   ├── app.routes.tsx
│   │   │   └── index.tsx
│   │   ├── screens
│   │   │   ├── Habit.tsx
│   │   │   ├── Home.tsx
│   │   │   └── New.tsx
│   │   └── utils
│   │       ├── generate-progress-percentage.ts
│   │       └── generate-range-dates.ts
│   ├── .gitignore
│   ├── app.json
│   ├── App.tsx
│   ├── babel.config.js
│   ├── metro.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── server
│   ├── prisma
│   │   ├── migrations
│   │   │   ├── 20230117004318_create_habits_table
│   │   │   │   └── migration.sql
│   │   │   ├── 20230118135951_models_creation
│   │   │   │   └── migration.sql
│   │   │   ├── 20230118141115_create_relations
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   ├── dev.db
│   │   ├── ERD.svg
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src
│   │   ├── lib
│   │   │   └── prisma.ts
│   │   ├── routes.ts
│   │   └── server.ts
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── web
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── assets
│   │   │   └── logo.svg
│   │   ├── components
│   │   │   ├── Habit.tsx
│   │   │   ├── HabitDay.tsx
│   │   │   ├── HabitForm.tsx
│   │   │   ├── HabitList.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── SummaryTable.tsx
│   │   ├── lib
│   │   │   ├── axios.ts
│   │   │   └── dayjs.ts
│   │   ├── styles
│   │   │   └── global.css
│   │   ├── utils
│   │   │   └── generate-range-dates.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── tailwind.config.cjs
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── anotacoes.txt
├── comandos.txt
└── README.md
  ```
</details>
<br>

### Desenvolvedora Sheila Nakashima dos Santos
<a href="https://wa.me/+5511995985416?text=Sheila%20Dev" target="_blank" rel="external"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" height="25px" /></a>
<a href="https://www.linkedin.com/in/sheila-nakashima-dos-santos/" target="_blank" rel="external"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" height="25px" /></a>
<a href="mailto:shei.nsantos@gmail.com" target="_blank" rel="external"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" height="25px" /></a>
