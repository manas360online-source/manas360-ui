
import React from 'react';
import { MANAS360Payment } from '../payment/MANAS360Payment';
import { theme } from '../theme';

export default function PremiumHub() {

    const handleUnlock = async () => {
        await MANAS360Payment.init({
            source: 'premium_hub',
            planId: 'premium_yearly', // Suggest yearly
            onSuccess: (receipt) => alert("Welcome to the Inner Circle!"),
            onFailure: (err) => alert(`Payment Failed: ${err.message}`)
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
            border: `1px solid ${theme.colors.warning}`, // Amber border hint
            boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.15), 0 8px 10px -6px rgba(245, 158, 11, 0.1)'
        },
        cardTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: theme.colors.warning },
        price: { fontSize: '28px', fontWeight: 'bold', color: theme.colors.text, marginBottom: '5px' },
        list: { margin: '20px 0', paddingLeft: '20px', color: theme.colors.textSecondary, lineHeight: '1.6' },
        btn: {
            width: '100%',
            padding: '16px',
            borderRadius: theme.borderRadius.button,
            background: 'linear-gradient(135deg, #fbbf24, #d97706)',
            border: 'none',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px',
            boxShadow: '0 4px 6px -1px rgba(217, 119, 6, 0.4)'
        }
    };

    return (
        <div style={styles.container}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');`}</style>
            <header style={styles.header}>
                <h1 style={styles.title}>MANAS360 Premium</h1>
                <p style={styles.subtitle}>Unlock the full potential of your mind.</p>
            </header>

            <div style={styles.card}>
                <div style={styles.cardTitle}>All-Access Pass</div>
                <div style={styles.price}>Best Value</div>
                <ul style={styles.list}>
                    <li>🔓 Access to Sleep, Vent, & Sound Apps</li>
                    <li>📊 Advanced Analytics Dashboard</li>
                    <li>👨‍⚕️ Priority Therapist Matching</li>
                    <li>🚫 Ad-Free Experience</li>
                </ul>
                <button style={styles.btn} onClick={handleUnlock}>
                    💎 Upgrade to Premium
                </button>
            </div>
        </div>
    );
}
