
import React from 'react';
import { MANAS360Payment } from '../payment/MANAS360Payment';
import { theme } from '../theme';

export default function AnytimeBuddy() {

    const handleUnlock = async () => {
        await MANAS360Payment.init({
            source: 'anytimebuddy',
            planId: 'anytimebuddy_lifetime', // Pre-select lifetime for this product
            onSuccess: (receipt) => alert("AnytimeBuddy Activated Forever!"),
            onFailure: (err) => alert(`Failed: ${err.message}`)
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
            maxWidth: '400px',
            border: `1px solid ${theme.colors.cardBorder}`,
            boxShadow: theme.colors.cardShadow
        },
        cardTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: theme.colors.text },
        price: { fontSize: '28px', fontWeight: 'bold', color: theme.colors.success, marginBottom: '5px' },
        list: { margin: '20px 0', paddingLeft: '20px', color: theme.colors.textSecondary, lineHeight: '1.6' },
        btn: {
            width: '100%',
            padding: '16px',
            borderRadius: theme.borderRadius.button,
            background: theme.colors.success, // Use theme success color
            border: 'none',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px',
            boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)'
        }
    };

    return (
        <div style={styles.container}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');`}</style>
            <header style={styles.header}>
                <h1 style={styles.title}>Anytime Buddy</h1>
                <p style={styles.subtitle}>Your empathetic AI companion available 24/7.</p>
            </header>

            <div style={styles.card}>
                <div style={styles.cardTitle}>Lifetime Access</div>
                <div style={styles.price}>₹9,999 <span style={{ fontSize: '14px', color: theme.colors.textSecondary, fontWeight: 'normal' }}>/ once</span></div>
                <ul style={styles.list}>
                    <li>Unlimited Chat Sessions</li>
                    <li>Mood Analysis & Tracking</li>
                    <li>Crisis Intervention Support</li>
                    <li>Personalized CBT Exercises</li>
                </ul>
                <button style={styles.btn} onClick={handleUnlock}>
                    🤖 Get Lifetime Access
                </button>
            </div>
        </div>
    );
}
