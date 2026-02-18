
import React, { useState } from 'react';
import { MANAS360Payment } from '../payment/MANAS360Payment';
import { theme } from '../theme';

export default function SleepTherapy() {

  const handleGoPremium = async () => {
    // Universal call example with Modal
    await MANAS360Payment.init({
      source: 'sleep_therapy',
      planId: null, // Force modal
      onSuccess: (receipt) => {
        console.log("Success!", receipt);
        alert("Welcome to Premium!");
      },
      onFailure: (err) => {
        console.error("Failed", err);
        alert(`Payment Failed: ${err.error || err.message || JSON.stringify(err)}`);
      }
    });
  };

  const styles = {
    container: {
      background: theme.colors.background,
      minHeight: '100vh',
      color: theme.colors.text,
      padding: '40px',
      fontFamily: theme.fonts.main,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    header: { marginBottom: '40px', textAlign: 'center' },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: theme.colors.text,
      fontFamily: theme.fonts.heading
    },
    subtitle: { color: theme.colors.textSecondary },
    card: {
      background: theme.colors.cardBg,
      borderRadius: theme.borderRadius.card,
      padding: '30px',
      width: '100%',
      maxWidth: '500px',
      border: `1px solid ${theme.colors.cardBorder}`,
      boxShadow: theme.colors.cardShadow
    },
    cardTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: theme.colors.text },
    price: { fontSize: '28px', fontWeight: 'bold', color: theme.colors.primary, marginBottom: '5px' },
    per: { fontSize: '14px', color: theme.colors.textSecondary, fontWeight: 'normal' },
    list: { margin: '20px 0', paddingLeft: '20px', color: theme.colors.textSecondary, lineHeight: '1.6' },
    btn: {
      width: '100%',
      padding: '16px',
      borderRadius: theme.borderRadius.button,
      background: theme.colors.primaryGradient,
      border: 'none',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '20px',
      boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)'
    }
  };

  return (
    <div style={styles.container}>
      {/* Font Loader hack if not loaded globally */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');`}</style>
      <header style={styles.header}>
        <h1 style={styles.title}>Payment Gateway</h1>
        <p style={styles.subtitle}>Secure payment integration powered by PhonePe.</p>
      </header>

      <div style={styles.card}>
        <div style={{ ...styles.cardTitle, textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>MANAS360 Payment Gateway</div>

        <button style={styles.btn} onClick={handleGoPremium}>
          🔓 Choose Plan & Upgrade
        </button>
        <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: theme.colors.textSecondary }}>
          Secured by PhonePe
        </div>
      </div>

    </div>
  );
}
