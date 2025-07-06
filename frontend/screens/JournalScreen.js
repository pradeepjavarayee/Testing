import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

export default function JournalScreen() {
  const [quote, setQuote] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [aims, setAims] = useState('');

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data) => setQuote(data.content))
      .catch(() => setQuote('Stay positive and keep journaling.'));
  }, []);

  const today = new Date().toDateString();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.date}>{today}</Text>
      <Text style={styles.quote}>{quote}</Text>
      <Text style={styles.label}>Gratitude</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Things I'm grateful for..."
        onChangeText={setGratitude}
        value={gratitude}
      />
      <Text style={styles.label}>Aims</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Goals for today..."
        onChangeText={setAims}
        value={aims}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quote: {
    fontStyle: 'italic',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    minHeight: 80,
    padding: 10,
    marginBottom: 20,
  },
});
