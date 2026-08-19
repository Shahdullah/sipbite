import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { QuantityStepper, Pill, styles as shared } from '@/components/AppPrimitives';
import { useColors } from '@/hooks/useColors';
import { useStore } from '@/lib/store';

export default function CartScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { cart, updateQuantity, placeOrder, serviceFeeRate } = useStore();
  const [payment, setPayment] = useState<'Cash' | 'UPI'>('Cash');
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const fee = Math.round(subtotal * serviceFeeRate);
  const total = subtotal + fee;
  const submit = () => { if (!cart.length) return; placeOrder(payment); Alert.alert('Order sent', 'Your order is with the Sip N Bite team now.'); router.replace('/(tabs)/orders'); };
  return <View style={[shared.screen, { backgroundColor: colors.background, paddingTop: insets.top }]}><View style={styles.top}><Pressable onPress={() => router.back()}><Feather name="arrow-left" size={22} color={colors.foreground} /></Pressable><Text style={[styles.title, { color: colors.foreground }]}>Your order</Text><View style={{ width: 22 }} /></View><ScrollView contentContainerStyle={shared.content}>{cart.length ? cart.map((line) => <View key={line.id} style={[styles.line, { borderBottomColor: colors.border }]}><View style={{ flex: 1 }}><Text style={[styles.name, { color: colors.foreground }]}>{line.name}</Text><Text style={[styles.linePrice, { color: colors.mutedForeground }]}>₹{line.price} each</Text></View><QuantityStepper quantity={line.quantity} onMinus={() => updateQuantity(line.id, line.quantity - 1)} onPlus={() => updateQuantity(line.id, line.quantity + 1)} /></View>) : <View style={styles.empty}><Feather name="shopping-bag" size={36} color={colors.mutedForeground} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Your cart is empty</Text><Text style={{ color: colors.mutedForeground }}>Add something delicious from the menu.</Text></View>}<View style={[styles.bill, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[shared.sectionTitle, { color: colors.foreground }]}>Bill estimate</Text><View style={styles.billRow}><Text style={{ color: colors.mutedForeground }}>Food subtotal</Text><Text style={{ color: colors.foreground }}>₹{subtotal}</Text></View><View style={styles.billRow}><View><Text style={{ color: colors.mutedForeground }}>Platform service fee</Text><Text style={{ color: colors.mutedForeground, fontSize: 11, marginTop: 3 }}>2% of eligible order value</Text></View><Text style={{ color: colors.foreground }}>₹{fee}</Text></View><View style={[styles.billRow, { borderTopColor: colors.border, borderTopWidth: 1, paddingTop: 13, marginTop: 5 }]}><Text style={[styles.totalLabel, { color: colors.foreground }]}>Estimated total</Text><Text style={[styles.total, { color: colors.primary }]}>₹{total}</Text></View></View><Text style={[styles.payTitle, { color: colors.foreground }]}>Payment at table</Text><View style={styles.paymentRow}>{(['Cash', 'UPI'] as const).map((option) => <Pressable key={option} onPress={() => setPayment(option)} style={[styles.payment, { backgroundColor: payment === option ? colors.secondary : colors.card, borderColor: payment === option ? colors.primary : colors.border }]}><Feather name={option === 'Cash' ? 'credit-card' : 'smartphone'} size={18} color={payment === option ? colors.primary : colors.mutedForeground} /><Text style={{ color: colors.foreground, fontFamily: 'Inter_600SemiBold' }}>{option}</Text>{payment === option ? <Pill label="Selected" tone="success" /> : null}</Pressable>)}</View><Pressable testID="place-order" disabled={!cart.length} onPress={submit} style={({ pressed }) => [styles.submit, { backgroundColor: colors.primary, opacity: !cart.length ? 0.45 : pressed ? 0.75 : 1 }]}><Text style={{ color: colors.primaryForeground, fontFamily: 'Inter_700Bold', fontSize: 15 }}>Place order • ₹{total}</Text><Feather name="arrow-right" size={19} color={colors.primaryForeground} /></Pressable></ScrollView></View>;
}

const styles = StyleSheet.create({
  top: { paddingHorizontal: 20, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: 'Inter_700Bold', fontSize: 20 },
  line: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1 },
  name: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  linePrice: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 5 },
  bill: { borderWidth: 1, borderRadius: 20, padding: 17, marginTop: 22 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 14 },
  totalLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  total: { fontFamily: 'Inter_700Bold', fontSize: 20 },
  payTitle: { fontFamily: 'Inter_700Bold', fontSize: 17, marginTop: 26, marginBottom: 12 },
  paymentRow: { gap: 10 },
  payment: { borderWidth: 1, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  submit: { borderRadius: 17, padding: 17, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, marginTop: 26 },
  empty: { alignItems: 'center', paddingVertical: 80, gap: 10 },
  emptyTitle: { fontFamily: 'Inter_700Bold', fontSize: 18 },
});