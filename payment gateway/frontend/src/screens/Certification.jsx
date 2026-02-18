
import React from 'react';
import { MANAS360Payment } from '../payment/MANAS360Payment';
import { theme } from '../theme';

export default function Certification() {

    const handleUnlock = async () => {
        // Maybe we'll add a 'certification_course' plan later, but for now generic
        await MANAS360Payment.init({
            source: 'certification',
            metadata: { course: 'L1_Healer' },
            onSuccess: (receipt) => alert("Enrollment Successful! Check your email."),
            onFailure: (err) => alert(`Enrollment Failed: ${err.message}`)
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
            border: `1px solid ${theme.colors.primary}`,
            boxShadow: theme.colors.cardShadow
        },
        cardTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: theme.colors.text },
        price: { fontSize: '28px', fontWeight: 'bold', color: theme.colors.primary, marginBottom: '5px' }, // Blue
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
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)'
        }
    };

    return (
        <div style={styles.container}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');`}</style>
            <header style={styles.header}>
                <h1 style={styles.title}>Academy</h1>
                <p style={styles.subtitle}>Professional training for mental health practitioners.</p>
            </header>

            <div style={styles.card}>
                <div style={styles.cardTitle}>Level 1 Healer Certification</div>
                <div style={styles.price}>Professional Course</div>
                <ul style={styles.list}>
                    <li>50 Hours of Video Content</li>
                    <li>Live Mentorship Sessions</li>
                    <li>Digital Verified Badge</li>
                    <li>Access to Therapist Dashboard</li>
                </ul>
                <button style={styles.btn} onClick={handleUnlock}>
                    🎓 Enroll Now
                </button>
            </div>
        </div>
    );
}
