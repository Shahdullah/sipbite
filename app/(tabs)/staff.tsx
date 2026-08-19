import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandHeader, Pill, styles as shared } from '@/components/AppPrimitives';
import { useColors } from '@/hooks/useColors';
import { StaffMode, useStore } from '@/lib/store';

export default function StaffScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { mode, setMode, orders, menu, advanceOrder, toggleAvailability } = useStore();
  const staffOrders = orders.filter((order) => mode === 'Chef' ? !['Delivered'].includes(order.status) : true);
  return <View style={[shared.screen, { backgroundColor: colors.background, paddingTop: insets.top }]}><BrandHeader eyebrow="SIP N BITE • PILOT CONSOLE" title={mode === 'Chef' ? 'Kitchen queue' : mode === 'Manager' ? 'Manager desk' : 'Staff preview'} /><ScrollView contentContainerStyle={shared.content}><View style={[styles.modeCard, { backgroundColor: colors.foreground }]}><Text style={styles.modeLabel}>VIEWING AS</Text><View style={styles.modeRow}>{(['Customer', 'Manager', 'Chef'] as StaffMode[]).map((option) => <Pressable key={option} onPress={() => setMode(option)} style={[styles.modeButton, { backgroundColor: mode === option ? colors.accent : 'transparent' }]}><Text style={[styles.modeText, { color: mode === option ? colors.accentForeground : colors.background }]}>{option}</Text></Pressable>)}</View><Text style={styles.modeHint}>{mode === 'Chef' ? 'Touch-friendly kitchen controls for the next order.' : mode === 'Manager' ? 'Keep tables, orders and availability moving.' : 'Switch to Customer to see the QR ordering flow.'}</Text></View>{mode === 'Customer' ? <View style={styles.staffIntro}><Feather name="shield" size={22} color={colors.primary} /><Text style={{ color: colors.mutedForeground, flex: 1, lineHeight: 19 }}>Staff access is separated from the customer experience. Choose Manager or Chef above to preview the pilot roles.</Text></View> : <>{<View style={shared.rowBetween}><Text style={[shared.sectionTitle, { color: colors.foreground, marginTop: 22, marginBottom: 12 }]}>{mode === 'Chef' ? 'Kitchen orders' : 'Live order desk'}</Text><Pill label={`${staffOrders.length} active`} /></View>}{staffOrders.length === 0 ? <View style={styles.noOrders}><Feather name="check-circle" size={30} color={colors.primary} /><Text style={[styles.noOrdersTitle, { color: colors.foreground }]}>All caught up</Text><Text style={{ color: colors.mutedForeground }}>New orders will show here.</Text></View> : staffOrders.map((order) => <View key={order.id} style={[styles.staffOrder, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={shared.rowBetween}><View><Text style={[styles.orderId, { color: colors.foreground }]}>{order.id} • {order.table}</Text><Text style={{ color: colors.mutedForeground, fontSize: 11, marginTop: 4 }}>{order.items.map((item) => `${item.quantity} × ${item.name}`).join('  ·  ')}</Text></View><Pill label={order.status} /></View><Pressable onPress={() => advanceOrder(order.id)} style={[styles.advance, { backgroundColor: colors.secondary }]}><Text style={{ color: colors.secondaryForeground, fontFamily: 'Inter_700Bold', fontSize: 12 }}>{order.status === 'New' ? 'Accept order' : order.status === 'Accepted' ? 'Start cooking' : order.status === 'Cooking' ? 'Mark almost ready' : order.status === 'Almost ready' ? 'Mark ready' : order.status === 'Ready' ? 'Send to table' : 'Delivered'}</Text><Feather name="arrow-right" size={17} color={colors.primary} /></Pressable></View>)}{mode === 'Manager' ? <><Text style={[shared.sectionTitle, { color: colors.foreground, marginTop: 24, marginBottom: 12 }]}>Menu availability</Text>{menu.slice(0, 5).map((item) => <View key={item.id} style={[styles.menuRow, { borderBottomColor: colors.border }]}><View style={{ flex: 1 }}><Text style={{ color: colors.foreground, fontFamily: 'Inter_600SemiBold' }}>{item.name}</Text><Text style={{ color: colors.mutedForeground, fontSize: 11, marginTop: 3 }}>₹{item.price} • {item.category}</Text></View><Switch value={item.available} onValueChange={() => toggleAvailability(item.id)} trackColor={{ false: colors.muted, true: colors.secondary }} thumbColor={item.available ? colors.primary : colors.mutedForeground} /></View>)}</> : null}</>}</ScrollView></View>;
}

const styles = StyleSheet.create({
  modeCard: { borderRadius: 22, padding: 18 },
  modeLabel: { color: '#F9D6C9', fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.2 },
  modeRow: { flexDirection: 'row', gap: 7, marginTop: 14 },
  modeButton: { borderRadius: 12, paddingHorizontal: 13, paddingVertical: 10 },
  modeText: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  modeHint: { color: '#F9D6C9', fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17, marginTop: 15 },
  staffIntro: { flexDirection: 'row', gap: 12, marginTop: 22, padding: 16, borderRadius: 16, backgroundColor: '#F4E6D8' },
  staffOrder: { borderWidth: 1, borderRadius: 18, padding: 15, marginBottom: 11 },
  orderId: { fontFamily: 'Inter_700Bold', fontSize: 14 },
  advance: { marginTop: 15, borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  noOrders: { alignItems: 'center', gap: 8, paddingVertical: 55 },
  noOrdersTitle: { fontFamily: 'Inter_700Bold', fontSize: 17 },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1 },
});