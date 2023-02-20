import Image from 'next/image';
import styled from 'styled-components';

const LogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const defaultProps = {
    imageSrc: '/temp_logo.png',
    imageAlt: 'Temporary Logo',
    imageWidth: 250,
    imageHeight: 250,
    containerHeight: 10,
    containerWidth: 10,
};

export function Logo(props = defaultProps) {
    const {imageSrc, containerHeight, containerWidth, imageHeight, imageWidth, width='100', height='100'} = props;
    return (
       <LogoDiv height={containerHeight} width={containerWidth}>
            <Image src='/temp_logo.png' width={width} height={height} alt='logo'/>
            <p className='white'>Stratusound</p>
       </LogoDiv>
   )
}