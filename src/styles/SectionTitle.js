import styled from "styled-components";


export const SectionTitle = styled.h2`
  display: block;
  position: relative;
  line-height: 1.3;
  font-family: Khand;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: 0.5px;
  margin: ${props=> props.mbZero ? "0 0 1.5rem 0" : "1.5rem 0"};
  
  &&::after {
    content: "";
    display: block;
    width: ${props=> props.w};
    height: 5px;
    margin-top: 0.5rem;
    background: var(--color-red)
  }
`;