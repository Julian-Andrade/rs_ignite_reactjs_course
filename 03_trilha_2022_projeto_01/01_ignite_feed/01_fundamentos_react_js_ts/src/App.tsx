import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post, PostProps } from "./components/Post";

import styles from "./App.module.css";
import "./global.css";

// Inserindo Interação com o Usuário
// Autor -> {avatar_url ; name ; role}
// Data de criação -> createdAt
// Conteúdo -> string

// Banco de dados

interface Posts extends PostProps {
  id: number;
}

const posts: Posts[] = [
  {
    id: 1,
    author: {
      avatarUrl: "http://github.com/julian-andrade.png",
      name: "Julian Andrade",
      role: "CEO @ Andradelima Engenharia, Web Developer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "👉 julian-andrade.design/doctorcare" },
    ],
    createdAt: new Date("2022-11-18 09:43:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/LucasbarcellosF.png",
      name: "Lucas Barcellos",
      role: "Web Developer Full Stack",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "👉 lucasbarcellos.design/doctorcare" },
    ],
    createdAt: new Date("2022-11-18 10:43:00"),
  },
];

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts &&
            posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  createdAt={post.createdAt}
                />
              );
            })}
        </main>
      </div>
    </div>
  );
}
