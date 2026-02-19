import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { theme } from '../theme';

const methodLabels = {
    UPI: 'UPI',
    CARD: 'Card',
    NETBANK: 'NetBanking',
    WALLET: 'Wallet'
};

export default function PaymentOutcomeChoice() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const method = params.get('method') || 'UPI';
    const plan = params.get('plan') || 'premium_yearly';
    const methodLabel = methodLabels[method] || 'UPI';

    const styles = {
        page: {
            minHeight: '100vh',
            background: theme.colors.background,
            color: theme.colors.text,
            fontFamily: theme.fonts.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
        },
        card: {
            width: '100%',
            maxWidth: '520px',
            background: theme.colors.cardBg,
            border: `1px solid ${theme.colors.cardBorder}`,
            borderRadius: theme.borderRadius.card,
            boxShadow: theme.colors.cardShadow,
            padding: '28px'
        },
        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: theme.colors.iconBg,
            color: theme.colors.primary,
            padding: '6px 12px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '0.4px'
        },
        title: {
            marginTop: '16px',
            fontSize: '22px',
            fontWeight: '700',
            fontFamily: theme.fonts.heading
        },
        subtitle: {
            marginTop: '8px',
            fontSize: '13px',
            color: theme.colors.textSecondary,
            lineHeight: '1.6'
        },
        details: {
            marginTop: '18px',
            padding: '14px 16px',
            borderRadius: '12px',
            background: theme.colors.background,
            border: `1px dashed ${theme.colors.cardBorder}`,
            fontSize: '12px',
            display: 'grid',
            gap: '6px'
        },
        row: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        label: {
            color: theme.colors.textSecondary
        },
        value: {
            fontWeight: '600'
        },
        actions: {
            marginTop: '22px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
        },
        successBtn: {
            border: 'none',
            borderRadius: theme.borderRadius.button,
            padding: '12px 14px',
            background: theme.colors.success,
            color: '#fff',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 6px 14px rgba(16, 185, 129, 0.25)'
        },
        failBtn: {
            border: `1px solid ${theme.colors.error}`,
            borderRadius: theme.borderRadius.button,
            padding: '12px 14px',
            background: '#fff',
            color: theme.colors.error,
            fontWeight: '700',
            cursor: 'pointer'
        },
        helper: {
            marginTop: '12px',
            fontSize: '11px',
            color: theme.colors.textSecondary
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.badge}>PAYMENT CONFIRMATION</div>
                <div style={styles.title}>Simulate payment outcome</div>
                <div style={styles.subtitle}>
                    Choose the result you want to demo. This does not charge any money.
                </div>

                <div style={styles.details}>
                    <div style={styles.row}>
                        <span style={styles.label}>Method</span>
                        <span style={styles.value}>{methodLabel}</span>
                    </div>
                    <div style={styles.row}>
                        <span style={styles.label}>Plan</span>
                        <span style={styles.value}>{plan}</span>
                    </div>
                </div>

                <div style={styles.actions}>
                    <button
                        style={styles.successBtn}
                        onClick={() => navigate('/payment/success?demo=1')}
                    >
                        Successful
                    </button>
                    <button
                        style={styles.failBtn}
                        onClick={() => navigate('/payment/failure?error=Demo%20failure')}
                    >
                        Failure
                    </button>
                </div>

                <div style={styles.helper}>
                    You can go back and pick another method anytime.
                </div>
            </div>
        </div>
    );
}
