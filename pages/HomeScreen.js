import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [numbers, setNumbers] = useState(['', '', '', '']);
  const [result, setResult] = useState(null);

  const handleNumberChange = (text, index) => {
    const newNumbers = [...numbers];
    // Hanya menerima angka
    if (text === '' || /^\d+$/.test(text)) {
      newNumbers[index] = text;
      setNumbers(newNumbers);
    }
  };

  const findSmallestNumber = () => {
    // Filter hanya angka yang tidak kosong
    const validNumbers = numbers.filter(num => num !== '').map(Number);
    
    if (validNumbers.length === 0) {
      Alert.alert('Peringatan', 'Masukkan setidaknya satu angka!');
      return;
    }

    if (validNumbers.length < 2) {
      Alert.alert('Peringatan', 'Masukkan minimal 2 angka untuk dibandingkan!');
      return;
    }

    const smallest = Math.min(...validNumbers);
    setResult(smallest);
  };

  const resetFields = () => {
    setNumbers(['', '', '', '']);
    setResult(null);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Pencari Nilai Terkecil</Text>
            <Text style={styles.subtitle}>Masukkan 4 angka dan temukan nilai terkecil</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>Masukkan Angka</Text>
            
            <View style={styles.inputGrid}>
              {numbers.map((number, index) => (
                <View key={index} style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Angka {index + 1}</Text>
                  <TextInput
                    style={styles.numberInput}
                    placeholder={`Masukkan angka ${index + 1}`}
                    placeholderTextColor="#999"
                    value={number}
                    onChangeText={(text) => handleNumberChange(text, index)}
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.findButton]}
              onPress={findSmallestNumber}
            >
              <Text style={styles.buttonText}>CARI NILAI TERKECIL</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.resetButton]}
              onPress={resetFields}
            >
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableOpacity>
          </View>

          {/* Result Section */}
          {result !== null && (
            <View style={styles.resultSection}>
              <Text style={styles.resultTitle}>Hasil Pencarian</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultLabel}>Nilai Terkecil:</Text>
                <Text style={styles.resultValue}>{result}</Text>
              </View>
              
              {/* Show all numbers for comparison */}
              <View style={styles.comparisonBox}>
                <Text style={styles.comparisonTitle}>Angka yang dibandingkan:</Text>
                <View style={styles.numbersList}>
                  {numbers.filter(num => num !== '').map((num, index) => (
                    <View key={index} style={[
                      styles.numberItem,
                      Number(num) === result && styles.smallestNumber
                    ]}>
                      <Text style={[
                        styles.numberText,
                        Number(num) === result && styles.smallestNumberText
                      ]}>
                        {num}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Logout Button */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.logoutButtonText}>KELUAR</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '48%',
    marginBottom: 20,
  },
  inputLabel: {
    color: '#2c3e50',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  numberInput: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 16,
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  findButton: {
    backgroundColor: '#27ae60',
  },
  resetButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultSection: {
    marginBottom: 30,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#27ae60',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  resultLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  comparisonBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  numbersList: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  numberItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    margin: 5,
    minWidth: 60,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  smallestNumber: {
    backgroundColor: '#d5f4e6',
    borderColor: '#27ae60',
  },
  numberText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  smallestNumberText: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#95a5a6',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;