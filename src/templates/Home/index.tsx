import React from "react";
import Image from "next/image";

import * as S from "./styles";
import Link from "next/link";

const HomeTemplate = () => {
  return (
    <S.Wrapper>
      <S.Content>
        <S.ImageWrapper>
          <Image
            src="https://vestibulares2022.com.br/wp-content/uploads/2021/06/ufrr_brasao.png"
            alt="ufrr logo"
            fill
          />
        </S.ImageWrapper>

        <h1>DCC703 - COMPUTAÇÃO GRÁFICA</h1>

        <Link href="/lineRasterization">Rasterização de Linhas</Link>
        <Link href="/circumferenceRasterization">
          Rasterização de Circunferências
        </Link>
        <Link href="/fillAlgorithms">Algoritmos de Preenchimento</Link>
        <Link href="/bezierCurves">Curvas de Bezier</Link>
        <Link href="/finalProject">Projeto Final</Link>

        <p>
          Projeto feito por{" "}
          <S.Author href="https://github.com/hugolima03" target="_blank">
            Hugo Lima Romão
          </S.Author>
        </p>
      </S.Content>
    </S.Wrapper>
  );
};

export default HomeTemplate;
