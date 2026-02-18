
import React from 'react';
import { MANAS360Payment } from '../payment/MANAS360Payment';
import { theme } from '../theme';

export default function SoundTherapy() {

    const handleUnlock = async () => {
        await MANAS360Payment.init({
            source: 'sound_library',
            // We can allow users to choose between Single Track or Subscription
            planId: null,
            onSuccess: (receipt) => alert("Tracks Unlocked!"),
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
            width: '100%',
            maxWidth: '500px',
            border: `1px solid ${theme.colors.cardBorder}`,
            boxShadow: theme.colors.cardShadow
        },
        cardTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: theme.colors.text },
        price: { fontSize: '28px', fontWeight: 'bold', color: theme.colors.secondary, marginBottom: '5px' }, // Violet for Sound
        list: { margin: '20px 0', paddingLeft: '20px', color: theme.colors.textSecondary, lineHeight: '1.6' },
        btn: {
            width: '100%',
            padding: '16px',
            borderRadius: theme.borderRadius.button,
            background: theme.colors.secondary, // Use theme secondary color
            border: 'none',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px',
            boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.4)'
        }
    };

    return (
        <div style={styles.container}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');`}</style>
            <header style={styles.header}>
                <h1 style={styles.title}>Sound Library</h1>
                <p style={styles.subtitle}>High-fidelity binaural beats, solfeggio frequencies, and nature sounds.</p>
            </header>

            <div style={styles.card}>
                <div style={styles.cardTitle}>Unlock Full Library</div>
                <div style={styles.price}>Premium Audio</div>
                <ul style={styles.list}>
                    <li>528Hz Healing Frequencies</li>
                    <li>Delta Wave Sleep Tracks</li>
                    <li>Rain & Thunder Ambience</li>
                    <li>White & Pink Noise</li>
                </ul>
                <button style={styles.btn} onClick={handleUnlock}>
                    🎧 Unlock All Sounds
                </button>
            </div>
        </div>
    );
}
