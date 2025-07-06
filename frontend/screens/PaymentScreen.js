import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function PaymentScreen() {
  const subscribe = async (priceId) => {
    try {
      const res = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const { sessionId } = await res.json();
      // TODO: open Stripe checkout using WebBrowser or WebView
      console.log('Checkout session', sessionId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Subscribe Monthly ($1.50)" onPress={() => subscribe('price_monthly_id')} />
      <Button title="Subscribe Yearly ($14.40)" onPress={() => subscribe('price_yearly_id')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
