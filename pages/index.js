import styled from "styled-components";
import React from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  AlurakutStyles,
  OrkutNostalgicIconSet,
} from "../lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

function ProfileSideBar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githuberUser}.png`}
        alt="Imagem Indisponível"
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${props.githuberUser}`}
        >
          @{props.githuberUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.items.length})</h2>
      {/* <ul>
        {props.seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.title}`}>
                <img src={`${itemAtual.image}`} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          );
        })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const usuarioAleatorio = "wellinton-dev";
  const pessoasFavoritas = ["wellinton-dev", "peas"];
  const [comunidades, setComunidades] = React.useState([
    {
      id: Math.random() * 10,
      title: "Eu odeio acordar cedo",
      image:
        "https://img10.orkut.br.com/community/52cc4290facd7fa700b897d8a1dc80aa.jpg",
    },
  ]);

  // const comunidade = comunidades[0]
  // const setComunidade = comunidades[1]
  // const comunidades =['Alurakut']
  const [seguidores, setSeguidores] = React.useState([])
  
  React.useEffect(function(){
    fetch("https://api.github.com/users/peas/followers")
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaFinalizada) {
         setSeguidores(respostaFinalizada);
      });


  }, [])
    console.log('Seguidores'+ seguidores)
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/*<div style="grid-area:profileArea"></div>*/}
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githuberUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem Vindo (a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle"> o que você está pensando ?</h2>
            <form
              onSubmit={function handleCriarComunidae(e) {
                e.preventDefault();

                const dadosForm = new FormData(e.target);
                const comunidade = {
                  id: Math.random() * 10,
                  title: dadosForm.get("title"),
                  image: dadosForm.get("image"),
                };

                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade ?"
                  type="text"
                  aria-label="Qual vai ser o nome da sua comunidade ?"
                  name="title"
                />
              </div>
              <div>
                <input
                  placeholder="Qual o nome da sua URL para usarmos de capa?"
                  name="image"
                  aria-label="Qual o nome da sua URL para usarmos de capa ?"
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidade ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={`${itemAtual.image}`} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
