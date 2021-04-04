import { useState } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { Button } from '~/components/common';
import { Terms } from './Terms';

const STEPS = [
  Terms,
  Terms,
  Terms,
  Terms,
  Terms,
];

const Container = styled.main`
  height: 100%;
  padding: 3.75rem 7.5rem;
  box-sizing: border-box;
  display: grid;
  grid-template-areas:
    'logo progress'
    'logo   step  '
    'logo actions ';
  grid-template-columns: max-content 1fr;
  grid-template-rows: max-content 1fr max-content;
  grid-gap: 4.375rem;
`;

const Logo = styled.div`
  padding-right: 6rem;
  grid-area: logo;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 0.062rem solid ${({ theme }) => theme.colors.separator};
`;

const Progress = styled.header`
  grid-area: progress;

  h1 {
    color: ${({ theme }) => theme.colors.cfpProgressTitle};
    font-size: 1.625rem;
    font-weight: 900;
  }
`;

const ProgressBar = styled.div`
  height: 1rem;
  margin-top: 1.625rem;
  display: flex;
  flex-direction: row;
`;

const completeStyle = css`
  background-color: ${({ theme }) => theme.colors.cfpProgressCompletedStepBackground};
  border-color: ${({ theme }) => theme.colors.cfpProgressCompletedStepBorder};
`;

const ProgressBit = styled.div`
  flex: 1;
  border: 0.062rem solid ${({ theme }) => theme.colors.cfpProgressIncompleteStepBorder};
  ${({ completed }) => (completed ? completeStyle : '')}

  & + & {
    border-left: none;
  }
`;

const ProgressArrow = styled.div`
  margin-top: 0.5rem;
  margin-left: calc(${({ currentStep }) => (100 / STEPS.length) * (currentStep + 1)}% - 0.75rem);
  width: 0;
  height: 0;
  border-left: 0.75rem solid transparent;
  border-right: 0.75rem solid transparent;
  border-bottom: 1.25rem solid ${({ theme }) => theme.colors.cfpProgressArrow};
`;

const Step = styled.section`
  grid-area: step;
`;

const Actions = styled.footer`
  grid-area: actions;
`;

export const CFP = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const CurrentStepComponent = STEPS[currentStep];

  return (
    <Container>
      <Logo>
        <Image
          src="/logo.svg"
          alt="Webconf Logo"
          width="288"
          height="332"
        />
      </Logo>
      <Progress>
        <h1>
          ¡Proponé tu charla para WebConf 2021!
        </h1>
        <ProgressBar>
          {STEPS.map((_, index) => (
            <ProgressBit
              key={index /* eslint-disable-line react/no-array-index-key */}
              completed={index <= currentStep}
            />
          ))}
        </ProgressBar>
        <ProgressArrow currentStep={currentStep} />
      </Progress>
      <Step>
        <CurrentStepComponent />
      </Step>
      <Actions>
        <Button type="secondary">
          Continuar
        </Button>
      </Actions>
    </Container>
  );
};