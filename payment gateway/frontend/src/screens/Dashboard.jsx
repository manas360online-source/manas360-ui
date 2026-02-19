
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../theme';

export default function Dashboard() {
    const navigate = useNavigate();

    const modules = [
        {
            id: 'sleep', title: 'Sleep Therapy',
            desc: 'Scientific audio tracks for deep sleep.',
            icon: '🌙', color: '#fbbf24', route: '/sleep'
        },
        {
            id: 'sound', title: 'Sound Library',
            desc: 'Binaural beats & healing frequencies.',
            icon: '🎧', color: '#8b5cf6', route: '/sound'
        },
        {
            id: 'buddy', title: 'Anytime Buddy',
            desc: 'Your 24/7 AI emotional companion.',
            icon: '🤖', color: '#34d399', route: '/anytime'
        },
        {
            id: 'vent', title: 'Vent Free',
            desc: 'Safe space to release your thoughts.',
            icon: '🗣️', color: '#f43f5e', route: '/vent'
        },
        {
            id: 'premium', title: 'Premium Hub',
            desc: 'Unlock the full MANAS360 experience.',
            icon: '💎', color: '#d4a853', route: '/premium'
        },
        {
            id: 'cert', title: 'Academy',
            desc: 'Professional certification for healers.',
            icon: '🎓', color: '#60a5fa', route: '/cert'
        },
    ];

    const styles = {
        container: {
            minHeight: '100vh',
            background: theme.colors.background,
            color: theme.colors.text,
            fontFamily: theme.fonts.main,
            padding: '40px 20px',
        },
        header: {
            maxWidth: '1200px',
            margin: '0 auto 40px',
            textAlign: 'center',
        },
        title: {
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '10px',
            background: theme.colors.primaryGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: theme.fonts.heading,
        },
        subtitle: {
            fontSize: '16px',
            color: theme.colors.textSecondary,
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        card: {
            background: theme.colors.cardBg,
            border: `1px solid ${theme.colors.cardBorder}`,
            borderRadius: theme.borderRadius.card,
            padding: '32px',
            cursor: 'pointer',
            transition: theme.transitions.default,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '200px',
            boxShadow: theme.colors.cardShadow,
        },
        cardHeader: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
        },
        iconBox: {
            width: '48px',
            height: '48px',
            borderRadius: theme.borderRadius.icon,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            marginRight: '16px',
            background: theme.colors.iconBg,
        },
        cardTitle: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: theme.colors.text,
        },
        cardDesc: {
            fontSize: '14px',
            color: theme.colors.textSecondary,
            lineHeight: '1.5',
            marginBottom: '20px',
        },
        action: {
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
        }
    };

    return (
        <div style={styles.container}>
            {/* Font Loader - Playfair also requested for headings */}
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');`}</style>

            <header style={styles.header}>
                <h1 style={styles.title}>MANAS360 Ecosystem</h1>
                <p style={styles.subtitle}>Select a module to begin your wellness journey</p>
            </header>

            <div style={styles.grid}>
                {modules.map((mod) => (
                    <div
                        key={mod.id}
                        style={styles.card}
                        onClick={() => navigate(mod.route)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = theme.colors.cardHoverShadow;
                            e.currentTarget.style.borderColor = mod.color;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = theme.colors.cardShadow;
                            e.currentTarget.style.borderColor = theme.colors.cardBorder;
                        }}
                    >
                        <div>
                            <div style={styles.cardHeader}>
                                <div style={{ ...styles.iconBox, color: mod.color }}>
                                    {mod.icon}
                                </div>
                                <div style={styles.cardTitle}>{mod.title}</div>
                            </div>
                            <div style={styles.cardDesc}>{mod.desc}</div>
                        </div>

                        <div style={{ ...styles.action, color: mod.color }}>
                            Open App →
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
