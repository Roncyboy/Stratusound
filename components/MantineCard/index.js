import { Card, Image, Text, Badge, Group } from '@mantine/core';

export default function MantineCard({ img, title, artist, handleClick, id, type, alt }) {
  return (
    <Card shadow="sm" p="sm" radius="md" withBorder onClick={() => {
      console.log(id)
      handleClick(id, type);
    }}>
      <Card.Section>
        <Image
          src={img}
          height={160}
          alt={alt}
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} truncate>{title}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        {artist}
      </Text>
    </Card>
  );
}