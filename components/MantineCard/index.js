import { Card, Image, Text, Badge, Group } from '@mantine/core';

export default function MantineCard({ img, title, artist, handleClick, id, type, alt }) {
  return (
    <Card
      shadow="sm"
      p="sm"
      radius="md"
      withBorder
      onClick={() => {
      console.log(id)
      handleClick(id, type);
      }}
      sx={{ cursor: 'pointer',
        '&:hover': {
          opacity: "0.95"
        },
        '&:active': {
          transform: "scale(0.97)"
        }
      }}
    >
      <Card.Section>
        <Image
          src={img}
          height={200}
          alt={alt}
        />
      </Card.Section>

      <Group position="apart" mt="lg" mb="xs">
        <Text weight={500} truncate>{title}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        {artist}
      </Text>
    </Card>
  );
}