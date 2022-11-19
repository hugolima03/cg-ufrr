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
      </S.Content>
    </S.Wrapper>
  );
};

export default HomeTemplate;
