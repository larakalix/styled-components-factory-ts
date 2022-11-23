import { styled } from "../styled-factory/styled-factory";

const red = "#1f2632";
const size = "1.2rem";
const rad = "0.25rem";
const green = "#52fdae";

export const Body = styled.div`
    background-color: ${red};
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: ${size};
`;

export const Card = styled.div`
    position: relative;
    background-color: #313a4a;
    border-radius: ${rad};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 40vw;
    padding: 1rem 2rem;
`;

export const CardTitle = styled.h1`
    color: ${green};
    text-transform: uppercase;
    font-size: 0.8rem;
    margin: 0;
    margin-top: 2rem;
`;

export const CardSummary = styled.p`
    color: white;
    font-size: 1.4rem;
    padding-inline: 1rem;
    padding-top: 0;
    padding-bottom: 2rem;
    border-bottom: 1px solid #565f71;
    margin-bottom: 3rem;
`;

export const CardFooter = styled.a`
    position: absolute;
    bottom: -2rem;
    background-color: ${green};
    border-radius: 50%;
    color: ${red};
    width: 4rem;
    height: 4rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;
