// src/components/WhatsOnYourMind.tsx
import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { mockData } from "../../data/mockData";
import { colors, typography, spacing } from "../../theme";
import { device } from "../../utils";

const IMAGE_SIZE = device.width * 0.23;

export default function WhatsOnYourMind() {
  const renderItem = ({ item }: { item: (typeof mockData.whatsOnYourMind)[0] }) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.8}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.label} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's on your mind?</Text>
      <FlatList
        data={mockData.whatsOnYourMind}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.black,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: spacing.md,
  },
  item: {
    width: IMAGE_SIZE,
    alignItems: "center",
    marginRight: spacing.md,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginBottom: spacing.xs,
    backgroundColor: colors.gray100,
  },
  label: {
    ...typography.small,
    color: colors.gray900,
    fontWeight: "500",
    textAlign: "center",
  },
});
