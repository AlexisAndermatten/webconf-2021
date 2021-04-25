import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Background from '../../common/Background';

const Glass = styled.div`
  position: absolute;
  top: 50%;
  width: 100vw;
  height: 40vh;
  margin-top: -20vh;
  background: #1d1028;
  opacity: 0.65;
  overflow: hidden;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: 900;
  color: #ff0b87;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
  z-index: 99;
  grid-area: title;
  padding-bottom: 5rem;
  font-size: 54px;
  text-align: center;
  line-height: 42px;
  letter-spacing: -0.05em;
  align-self: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-self: flex-end;
    justify-self: flex-start;
    text-align: left;
    font-size: 110px;
    line-height: 80%;
  }
`;

/* const SponsorButton = styled.a`
  display: inline-block;
  background: #3c467e;
  border-radius: 20px;
  padding: 14px 30px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid #3c467e;
  margin-right: 45px;
  z-index: 99;
  filter:drop-shadow(0 0 3px rgba(255, 255, 255, 0.4));
`; */

const ProposalButton = styled.a`
  display: inline-block;
  background: #a70050;
  border-radius: 20px;
  padding: 14px 30px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid #a70050;
  z-index: 99;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.4));
  cursor: pointer;
`;

const Grid = styled.section`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  grid-template-areas:
    'logo'
    'title'
    'buttons';
  grid-template-rows: auto auto auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-areas:
      'logo title'
      'logo buttons';
    grid-template-rows: 8fr 4fr;
    grid-template-columns: auto auto;
  }
`;

const Buttons = styled.div`
  grid-area: buttons;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-self: flex-start;
    justify-self: flex-start;
  }
`;

const Container = styled.header`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const ImageContainer = styled.div`
  grid-area: logo;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-row: 1 / span 2;
  }
`;

const White = styled.span`
  color: #fff;
`;

export default function Header() {
  const [logoSize, setLogoSize] = useState(375);

  useEffect(() => {
    if (global.innerWidth >= 1024) {
      setLogoSize(717);
    } else if (global.innerWidth >= 768) {
      setLogoSize(544);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Glass />
      <Grid>
        <ImageContainer>
          <Image src="/images/weblogo.png" width={logoSize} height={logoSize} alt="Webconf Logo" />
        </ImageContainer>
        <Title>
          23 AL 27 <br /> <White>DE AGOSTO</White>
        </Title>
        <Buttons>
          {/* <SponsorButton>SUMATE COMO SPONSOR</SponsorButton> */}
          <ProposalButton href="/cfp">PROPONÉ TU CHARLA</ProposalButton>
        </Buttons>
      </Grid>
    </Container>
  );
}