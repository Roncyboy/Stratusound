import { Card, Image, Text, Badge, Group } from '@mantine/core';

export default function MantineCard({ src, title, artist }) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={src}
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