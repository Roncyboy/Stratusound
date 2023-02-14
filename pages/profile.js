import { Flex } from "@/components/Flex";

export default function Profile(){
       return (
              <Flex>
                    <Flex align = 'flex-start' maxWidth = '500px' className = 'white'>
                            <h2>Hello, ${name}</h2>
                            <h1> Profile </h1>
                            <p> Profile info </p>
                            <p> Profile info </p>
                            <p> Profile info </p>
                     </Flex> 
              </Flex>  
       )
}