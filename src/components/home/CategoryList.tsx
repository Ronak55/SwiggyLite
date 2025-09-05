import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { colors, typography, spacing } from "../../theme";
import { mockData } from "../../data/mockData";

export default function CategoryList() {
  const renderItem = ({ item }: { item: (typeof mockData.categories)[0] }) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.8}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{ uri: item.icon }}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.label} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData.categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  listContent: {
    paddingHorizontal: spacing.sm,
  },
  item: {
    width: 80,
    alignItems: "center",
    marginRight: spacing.sm,
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  label: {
    ...typography.small,
    fontWeight: "500",
    color: colors.gray900,
    textAlign: "center",
    marginTop: spacing.xs,
    lineHeight: 16,
  },
});
