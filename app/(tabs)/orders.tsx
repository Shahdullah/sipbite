import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandHeader, Pill, styles as shared } from '@/components/AppPrimitives';
import { useColors } from '@/hooks/useColors';
import { useStore, OrderStatus } from '@/lib/store';

const progress: OrderStatus[] = ['New', 'Accepted', 'Cooking', 'Almost ready', 'Ready', 'Delivered'];

export default function OrdersScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { orders, table } = useStore();
  return <View style={[shared.screen, { backgroundColor: colors.background, paddingTop: insets.top }]}><BrandHeader eyebrow={`${table} • LIVE TRACKING`} title="Your orders" /><ScrollView contentContainerStyle={shared.content}>{orders.length === 0 ? <View style={styles.empty}><View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}><Feather name="clock" size={28} color={colors.primary} /></View><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Nothing on the table yet</Text><Text style={[styles.emptyCopy, { color: colors.mutedForeground }]}>Your live orders and their kitchen progress will appear here.</Text></View> : orders.map((order) => { const current = progress.indexOf(order.status); return <View key={order.id} style={[styles.order, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={shared.rowBetween}><View><Text style={[styles.orderId, { color: colors.foreground }]}>{order.id}</Text><Text style={[styles.orderMeta, { color: colors.mutedForeground }]}>{order.createdAt} • {order.payment}</Text></View><Pill label={order.status} tone={order.status === 'Ready' || order.status === 'Delivered' ? 'success' : 'accent'} /></View><View style={styles.items}>{order.items.map((item) => <View key={item.id} style={shared.rowBetween}><Text style={{ color: colors.mutedForeground, fontSize: 13 }}>{item.quantity} × {item.name}</Text><Text style={{ color: colors.foreground, fontFamily: 'Inter_600SemiBold', fontSize: 13 }}>₹{item.price * item.quantity}</Text></View>)}</View><View style={styles.progress}>{progress.map((step, index) => <View key={step} style={styles.step}><View style={[styles.dot, { backgroundColor: index <= current ? colors.primary : colors.muted }]} />{index < progress.length - 1 ? <View style={[styles.connector, { backgroundColor: index < current ? colors.primary : colors.muted }]} /> : null}<Text style={[styles.stepLabel, { color: index <= current ? colors.foreground : colors.mutedForeground }]}>{step}</Text></View>)}</View><View style={[shared.rowBetween, { marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.border }]}><Text style={{ color: colors.mutedForeground }}>Order total</Text><Text style={[styles.total, { color: colors.foreground }]}>₹{order.total}</Text></View></View>})}</ScrollView></View>;
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', paddingVertical: 100, paddingHorizontal: 28 },
  emptyIcon: { width: 64, height: 64, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyTitle: { fontFamily: 'Inter_700Bold', fontSize: 19 },
  emptyCopy: { textAlign: 'center', lineHeight: 20, marginTop: 7, fontFamily: 'Inter_400Regular' },
  order: { borderWidth: 1, borderRadius: 22, padding: 16, marginBottom: 14 },
  orderId: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  orderMeta: { fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 5 },
  items: { gap: 9, marginTop: 17, paddingBottom: 15 },
  progress: { flexDirection: 'row', marginTop: 4, justifyContent: 'space-between' },
  step: { alignItems: 'center', flex: 1, position: 'relative' },
  dot: { width: 10, height: 10, borderRadius: 5, zIndex: 2 },
  connector: { height: 2, position: 'absolute', left: '50%', right: '-50%', top: 4 },
  stepLabel: { fontSize: 9, marginTop: 7, textAlign: 'center', fontFamily: 'Inter_500Medium' },
  total: { fontFamily: 'Inter_700Bold', fontSize: 17 },
});