import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

export function BrandHeader({ eyebrow, title, right }: { eyebrow?: string; title: string; right?: React.ReactNode }) {
  const colors = useColors();
  return <View style={styles.header}><View><Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow ?? 'SIP N BITE'}</Text><Text style={[styles.title, { color: colors.foreground }]}>{title}</Text></View>{right}</View>;
}

export function Pill({ label, tone = 'accent' }: { label: string; tone?: 'accent' | 'success' | 'muted' }) {
  const colors = useColors();
  const background = tone === 'success' ? '#DDEBDD' : tone === 'muted' ? colors.muted : '#FBE2B9';
  const foreground = tone === 'success' ? '#2F6A3B' : tone === 'muted' ? colors.mutedForeground : colors.accentForeground;
  return <View style={[styles.pill, { backgroundColor: background }]}><Text style={[styles.pillText, { color: foreground }]}>{label}</Text></View>;
}

export function QuantityStepper({ quantity, onMinus, onPlus }: { quantity: number; onMinus: () => void; onPlus: () => void }) {
  const colors = useColors();
  return <View style={[styles.stepper, { backgroundColor: colors.secondary }]}><Pressable testID="quantity-minus" onPress={onMinus} style={styles.stepButton}><Feather name="minus" size={16} color={colors.primary} /></Pressable><Text style={[styles.quantity, { color: colors.foreground }]}>{quantity}</Text><Pressable testID="quantity-plus" onPress={onPlus} style={[styles.stepButton, { backgroundColor: colors.primary }]}><Feather name="plus" size={16} color={colors.primaryForeground} /></Pressable></View>;
}

export function MenuCard({ item, onAdd }: { item: any; onAdd: () => void }) {
  const colors = useColors();
  return <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>{item.image ? <Image source={item.image} style={styles.foodImage} /> : <View style={[styles.foodImage, { backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center' }]}><Feather name="coffee" size={30} color={colors.primary} /></View>}<View style={styles.cardBody}><View style={styles.rowBetween}><Text style={[styles.cardTitle, { color: colors.foreground }]}>{item.name}</Text>{item.badge ? <Pill label={item.badge} /> : null}</View><Text style={[styles.description, { color: colors.mutedForeground }]}>{item.description}</Text><View style={[styles.rowBetween, { marginTop: 12 }]}><Text style={[styles.price, { color: colors.foreground }]}>₹{item.price}</Text><Pressable testID={`add-${item.id}`} onPress={onAdd} style={({ pressed }) => [styles.addButton, { backgroundColor: colors.primary, opacity: pressed ? 0.75 : 1 }]}><Feather name="plus" size={18} color={colors.primaryForeground} /></Pressable></View></View></View>;
}

export const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 116 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: { letterSpacing: 2, fontSize: 11, fontFamily: 'Inter_700Bold' },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', marginTop: 3 },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  pill: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 5 },
  pillText: { fontSize: 10, fontFamily: 'Inter_700Bold', textTransform: 'uppercase', letterSpacing: 0.4 },
  menuCard: { borderWidth: 1, borderRadius: 22, overflow: 'hidden', marginBottom: 14, flexDirection: 'row' },
  foodImage: { width: 112, height: 142 },
  cardBody: { flex: 1, padding: 14, justifyContent: 'center' },
  cardTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', flex: 1, paddingRight: 4 },
  description: { fontSize: 12, lineHeight: 18, marginTop: 7, fontFamily: 'Inter_400Regular' },
  price: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  addButton: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stepper: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 3 },
  stepButton: { width: 28, height: 28, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  quantity: { minWidth: 28, textAlign: 'center', fontFamily: 'Inter_700Bold' },
});