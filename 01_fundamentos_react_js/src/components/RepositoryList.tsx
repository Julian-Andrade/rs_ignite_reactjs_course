import React from "react";
import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";

import "../styles/repositories.scss";

interface Repositories {
  id: string;
  name: string;
  description: string;
  html_url: string;
}

// link api -> https://api.github.com/orgs/rocketseat/repos

export function RepositoryList() {
  // Armazenar API
  const [repositories, setRepositories] = useState<Repositories[]>([]);

  // useEffect, para chamar API
  // fetch -> insere o caminho da API
  // .then(response) -> recebe a resposta da API e transforma em json
  // .then(data) -> recebe os dados em json e encaminha para o useState
  useEffect(() => {
    fetch("https://api.github.com/orgs/rocketseat/repos")
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de Respositórios</h1>
      <ul>
        {/* repositories.map -> percorre a API e devolve um map com todas informações */}
        {repositories.map((repositories) => {
          return (
            <RepositoryItem key={repositories.id} repository={repositories} />
          );
        })}
      </ul>
    </section>
  );
}
