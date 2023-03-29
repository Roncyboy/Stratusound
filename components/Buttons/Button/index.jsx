
import styled from 'styled-components';

const StyledButton = styled.button`
border: none;
outline: none;
border-radius: 0.5em;
background-color: ${props => props.backgroundColor || '#7FBC95'};
color: ${props => props.color || '#151515'};
padding: ${props => props.padding || '0.75em 1.25em'};
width: ${props => props.size === 'short' ? '5rem' : props.size === 'long' ? '25em' : '10rem'};
min-width: fit-content;
font-family: 'Heebo', sans-serif;
font-weight: 600;
cursor: pointer;
margin : ${props => props.margin || '0 0 0 0'};
`;

export const Button = ({ length, bgColor, margin, padding, colour, label, ...props }) => {
    return (
        <StyledButton
            type = "submit"
            {...props}
        >
            {label}
        </StyledButton>
    );
};