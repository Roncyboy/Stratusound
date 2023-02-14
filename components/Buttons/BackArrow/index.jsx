import {AiOutlineClose} from 'react-icons/ai'
import {useRouter} from 'next/router';
import styled from 'styled-components';
import { Spacer } from '../../Spacer';

const ArrowCont = styled.div`
  margin: ${props => props.margin || '0'};
  position: relative;
    top: ${props => props.top || '25px'};
    padding-left: 0.5em;
`;

export function BackArrow(props) {
    const r = useRouter();
    return (
        <>
            <ArrowCont>
                <AiOutlineClose margin={props.margin} onClick={() => r.back()}/>
            </ArrowCont>
            <Spacer size = {45}/>
        </>
        
    );
}