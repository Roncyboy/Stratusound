import { Carousel } from '@mantine/carousel';
import { Flex } from '@/components/Flex';
import { Logo } from '@/components/Logo';
import { Button } from '@mantine/core';

export default function Landing() {
return(
       <Flex align = 'stretch'>
              <Flex 
              dir = 'row' 
              justify = 'flex-start'>
                     <Logo 
                     styles = {{ alignSelf: 'flex-start'}}
                     />
              </Flex>
              <Flex 
              backgroundColor = '#fafafa' 
              maxWidth = '500px'
              alignSelf = 'center'>
                     <Carousel
                     sx={{ maxWidth: 500, padding: 20}}
                     mx="auto"
                     withIndicators
                     height={250}
                     dragFree
                     slideGap="md"
                     align="start"
                     loop
                     >
                            <Carousel.Slide> 
                                   <Flex>
                                          <Logo />
                                          Enter your location and favourite genres, and get songs and playlists from spotify that match the weather.
                                   </Flex>
                            </Carousel.Slide>
                            <Carousel.Slide>Immerse yourself in your window player. Customize your windowsill and watch the weather change.</Carousel.Slide>
                            <Carousel.Slide>Our colour matching interface shows you the weather at a quick glance. </Carousel.Slide>
                     </Carousel>
              </Flex>
              <Button></Button>
       </Flex>
)
}