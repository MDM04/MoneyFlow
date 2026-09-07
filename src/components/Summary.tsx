import styled from "styled-components";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react"



export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`;

interface SummaryCardProps {
    $variant?: "green" | "red"
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${props => props.theme["gray-600"]};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme["gray-300"]};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

 ${props => {
  if (props.$variant === "green") {
    return `
      background: ${props.theme["green-700"]};
    `;
  }

  if (props.$variant === "red") {
    return `
      background: ${props.theme["red-700"]};
    `;
  }
}}
`;


export function Summary() {
    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </header>

                <strong>R$ 17.400,00</strong>
            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68" />
                </header>

                <strong>R$ 17.400,00</strong>
            </SummaryCard>

            <SummaryCard $variant="green">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff" />
                </header>

                <strong>R$ 17.400,00</strong>
            </SummaryCard>
        </SummaryContainer>
    );
}