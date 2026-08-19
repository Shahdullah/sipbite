import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandHeader, MenuCard, Pill, styles as shared } from '@/components/AppPrimitives';
import { useColors } from '@/hooks/useColors';
import { useStore } from '@/lib/store';
import { router } from 'expo-router';

export default function MenuScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { menu, cart, addToCart, table } = useStore();
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Cafe bites', 'Mains', 'Drinks'];
  const shown = useMemo(() => category === 'All' ? menu : menu.filter((item) => item.category === category), [category, menu]);
  return <View style={[shared.screen, { backgroundColor: colors.background, paddingTop: insets.top }]}><BrandHeader eyebrow="SIP N BITE • CAFE + RESTAURANT" title="Good food, right here." right={<View style={[styles.tableBadge, { backgroundColor: colors.secondary }]}><Feather name="hash" size={14} color={colors.primary} /><Text style={[styles.tableText, { color: colors.secondaryForeground }]}>{table.replace('Table ', 'Table ')}</Text></View>} /><ScrollView contentContainerStyle={shared.content} showsVerticalScrollIndicator={false}><View style={[styles.welcome, { backgroundColor: colors.primary }]}><View style={{ flex: 1 }}><Text style={styles.welcomeEyebrow}>YOUR TABLE IS READY</Text><Text style={styles.welcomeTitle}>What are you craving?</Text><Text style={styles.welcomeCopy}>Order from your table and we’ll bring it fresh.</Text></View><View style={styles.cup}><Feather name="coffee" size={32} color={colors.primary} /></View></View><View style={styles.categoryRow}>{categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.category, { backgroundColor: category === item ? colors.foreground : colors.card, borderColor: colors.border }]}><Text style={[styles.categoryText, { color: category === item ? colors.background : colors.mutedForeground }]}>{item}</Text></Pressable>)}</View><View style={[shared.rowBetween, { marginTop: 8, marginBottom: 14 }]}><Text style={[shared.sectionTitle, { color: colors.foreground }]}>{category === 'All' ? 'Our favourites' : category}</Text><Text style={{ color: colors.mutedForeground, fontFamily: 'Inter_500Medium', fontSize: 12 }}>{shown.length} items</Text></View>{shown.map((item) => <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} />)}</ScrollView>{cart.length > 0 ? <Pressable testID="open-cart" onPress={() => router.push('/cart')} style={[styles.cartBar, { backgroundColor: colors.foreground, bottom: insets.bottom + 78 }]}><View><Text style={styles.cartLabel}>{cart.reduce((sum, line) => sum + line.quantity, 0)} items in cart</Text><Text style={styles.cartAction}>Review your order</Text></View><View style={shared.row}><Text style={styles.cartTotal}>₹{cart.reduce((sum, line) => sum + line.price * line.quantity, 0)}</Text><Feather name="arrow-right" size={20} color={colors.background} /></View></Pressable> : null}</View>;
}

const styles = StyleSheet.create({
  welcome: { borderRadius: 24, padding: 20, minHeight: 150, flexDirection: 'row', overflow: 'hidden', marginBottom: 18 },
  welcomeEyebrow: { color: '#FBE2B9', fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.2 },
  welcomeTitle: { color: '#FFF8F2', fontFamily: 'Inter_700Bold', fontSize: 24, marginTop: 10, maxWidth: 220 },
  welcomeCopy: { color: '#F9D6C9', fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 8, maxWidth: 210, lineHeight: 17 },
  cup: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#F3B562', alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  tableBadge: { borderRadius: 14, paddingHorizontal: 10, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 4 },
  tableText: { fontFamily: 'Inter_700Bold', fontSize: 11 },
  categoryRow: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  category: { borderRadius: 15, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 9 },
  categoryText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  cartBar: { position: 'absolute', left: 16, right: 16, borderRadius: 20, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#261A14', shadowOpacity: 0.2, shadowRadius: 12, elevation: 6 },
  cartLabel: { color: '#F9D6C9', fontFamily: 'Inter_500Medium', fontSize: 11 },
  cartAction: { color: '#FFF8F2', fontFamily: 'Inter_700Bold', fontSize: 14, marginTop: 4 },
  cartTotal: { color: '#FFF8F2', fontFamily: 'Inter_700Bold', fontSize: 17, marginRight: 14 },
});