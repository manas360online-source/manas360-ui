
import React from 'react';
import { MANAS360Payment } from '../payment/MANAS360Payment';
import { theme } from '../theme';

export default function VentBuddy() {

    const handleUnlock = async () => {
        await MANAS360Payment.init({
            source: 'ventbuddy',
            planId: null,
            onSuccess: (receipt) => alert("Venting Session Started!"),
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
            border: '1px solid #f43f5e', // Rose border
            boxShadow: theme.colors.cardShadow
        },
        cardTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: theme.colors.text },
        price: { fontSize: '28px', fontWeight: 'bold', color: '#f43f5e', marginBottom: '5px' }, // Rose
        list: { margin: '20px 0', paddingLeft: '20px', color: theme.colors.textSecondary, lineHeight: '1.6' },
        btn: {
            width: '100%',
            padding: '16px',
            borderRadius: theme.borderRadius.button,
            background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
            border: 'none',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px',
            boxShadow: '0 4px 6px -1px rgba(244, 63, 94, 0.4)'
        }
    };

    return (
        <div style={styles.container}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');`}</style>
            <header style={styles.header}>
                <h1 style={styles.title}>Vent Buddy</h1>
                <p style={styles.subtitle}>A safe, judgement-free space to let it all out.</p>
            </header>

            <div style={styles.card}>
                <div style={styles.cardTitle}>Anonymous Venting</div>
                <div style={styles.price}>Premium Access</div>
                <ul style={styles.list}>
                    <li>100% Anonymous & Secure</li>
                    <li>AI Emotional Analysis</li>
                    <li>Audio & Text Venting</li>
                    <li>Post-Vent Calm Down Exercises</li>
                </ul>
                <button style={styles.btn} onClick={handleUnlock}>
                    🗣️ Start Venting
                </button>
            </div>
        </div>
    );
}
