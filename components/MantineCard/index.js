import { Card, Image, Text, Badge, Group } from '@mantine/core';

export default function MantineCard({ img, title, artist, handleClick, id }) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder onClick={() => {
      console.log(id)
      handleClick(id);
    }}>
      <Card.Section>
        <Image
          src={img}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        {artist}
      </Text>
    </Card>
  );
}