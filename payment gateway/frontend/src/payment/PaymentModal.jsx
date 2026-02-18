
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../theme';

/**
 *  PaymentModal — High-Fidelity "Unlock Everything" Design (Light Theme) - Landscape View
 */
export const PaymentModal = ({ visible, plans, defaultPlan, source, onSelect, onClose }) => {
    const [selected, setSelected] = useState(defaultPlan || 'premium_yearly');
    const [payMethod, setPayMethod] = useState('UPI');
    const navigate = useNavigate();

    if (!visible) return null;

    const methods = [
        { id: 'UPI', icon: '📱', label: 'UPI' },
        { id: 'CARD', icon: '💳', label: 'Card' },
        { id: 'NETBANK', icon: '🏦', label: 'NetBanking' },
        { id: 'WALLET', icon: '👛', label: 'Wallet' },
    ];

    // Ensure valid selection
    const safeSelected = plans[selected] ? selected : Object.keys(plans)[0];
    const plan = plans[safeSelected];

    const goToOutcomeChoice = (methodId) => {
        setPayMethod(methodId);
        if (onClose) onClose();
        const planId = plan?.id || selected;
        navigate(`/payment/confirm?method=${encodeURIComponent(methodId)}&plan=${encodeURIComponent(planId)}`);
    };

    // STYLES
    const styles = {
        overlay: {
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)'
        },
        sheet: {
            width: '90%', maxWidth: '900px',
            background: theme.colors.cardBg,
            borderRadius: '24px',
            padding: '32px', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            fontFamily: theme.fonts.main,
            border: `1px solid ${theme.colors.cardBorder}`,
            maxHeight: '90vh',
            overflowY: 'auto'
        },
        headerBar: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'
        },
        closeBtn: {
            background: 'none', border: 'none', color: theme.colors.textSecondary, fontSize: '24px', cursor: 'pointer', padding: '0'
        },
        restoreBtn: {
            background: 'none', border: 'none', color: theme.colors.warning, fontSize: '14px', fontWeight: '600', cursor: 'pointer'
        },
        heroSection: {
            textAlign: 'center', marginBottom: '24px'
        },
        crownIcon: {
            fontSize: '32px', marginBottom: '8px', display: 'block'
        },
        heroTitle: {
            fontSize: '22px', fontWeight: 'bold', color: theme.colors.text, marginBottom: '6px', letterSpacing: '-0.5px',
            fontFamily: theme.fonts.heading
        },
        heroSubtitle: {
            fontSize: '13px', color: theme.colors.textSecondary, fontWeight: '400'
        },
        planCard: {
            position: 'relative',
            background: theme.colors.background,
            borderRadius: '16px', padding: '16px 20px', marginBottom: '12px',
            cursor: 'pointer', border: '1px solid transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            transition: theme.transitions.default
        },
        planCardSelected: {
            background: '#fff',
            borderColor: theme.colors.warning,
            boxShadow: `0 0 0 1px ${theme.colors.warning}, ${theme.colors.cardShadow}`
        },
        radioOuter: {
            width: '20px', height: '20px', borderRadius: '50%',
            border: `2px solid ${theme.colors.textSecondary}`, display: 'flex', alignItems: 'center', justifyContent: 'center'
        },
        radioSelected: {
            borderColor: theme.colors.warning, background: theme.colors.warning
        },
        popularBadge: {
            position: 'absolute', top: '-10px', right: '16px',
            background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
            color: '#fff', fontSize: '10px', fontWeight: '800',
            padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.5px',
            textTransform: 'uppercase', boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)'
        },
        planName: { fontSize: '15px', fontWeight: '600', color: theme.colors.text, marginBottom: '4px' },
        planPrice: { fontSize: '18px', fontWeight: '700', color: theme.colors.text },
        savings: { fontSize: '12px', color: theme.colors.success, fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' },

        sectionLabel: {
            fontSize: '11px', color: theme.colors.textSecondary, fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase',
            marginTop: '24px', marginBottom: '12px'
        },
        methodsGrid: {
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px'
        },
        methodBtn: {
            padding: '16px', borderRadius: '12px',
            background: theme.colors.background, border: '1px solid transparent',
            color: theme.colors.textSecondary, cursor: 'pointer', fontSize: '14px', fontWeight: '600',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: theme.transitions.default
        },
        methodActive: {
            borderColor: theme.colors.primary, color: theme.colors.primary, background: '#fff',
            boxShadow: theme.colors.cardShadow
        },
        ctaBtn: {
            width: '100%', padding: '18px',
            borderRadius: '14px', border: 'none',
            background: theme.colors.primaryGradient,
            color: '#fff', fontWeight: '800', fontSize: '16px',
            cursor: 'pointer', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
            transform: 'translateY(0)', transition: 'transform 0.1s'
        },
        footer: {
            textAlign: 'center', marginTop: '16px', color: theme.colors.textSecondary, fontSize: '11px', fontWeight: '500',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
        }
    };

    return (
        <div style={styles.overlay}>
            <style>{`
                @keyframes slideUp { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
            `}</style>

            <div style={styles.sheet}>
                {/* Header Actions */}
                <div style={styles.headerBar}>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                    <button style={styles.restoreBtn}>Restore</button>
                </div>

                {/* Hero Section */}
                <div style={styles.heroSection}>
                    <span style={styles.crownIcon}>👑</span>
                    <div style={styles.heroTitle}>Unlock Everything</div>
                    <div style={styles.heroSubtitle}>All therapies. Unlimited access. Cancel anytime.</div>
                </div>

                {/* Landscape Grid Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
                    {/* Left Column: Plans */}
                    <div>
                        <div style={{ ...styles.sectionLabel, marginTop: '0' }}>CHOOSE PLAN</div>
                        {Object.values(plans).filter(p => !p.id.includes('hidden')).map(p => {
                            const isSelected = selected === p.id;
                            return (
                                <div
                                    key={p.id}
                                    style={{ ...styles.planCard, ...(isSelected ? styles.planCardSelected : {}) }}
                                    onClick={() => setSelected(p.id)}
                                >
                                    {p.popular && <div style={styles.popularBadge}>★ MOST POPULAR</div>}

                                    <div>
                                        <div style={styles.planName}>{p.name}</div>
                                        <div style={{ ...styles.planPrice, color: isSelected ? theme.colors.warning : theme.colors.text }}>
                                            {p.label}
                                        </div>
                                        {p.savings && (
                                            <div style={styles.savings}>
                                                <span>✓</span> {p.savings}
                                            </div>
                                        )}
                                    </div>

                                    {/* Custom Radio Button */}
                                    <div style={{ ...styles.radioOuter, ...(isSelected ? styles.radioSelected : {}) }}>
                                        {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }}></div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Payment Methods + CTA */}
                    <div>
                        <div style={{ ...styles.sectionLabel, marginTop: '0' }}>PAY WITH</div>
                        <div style={styles.methodsGrid}>
                            {methods.map(m => (
                                <div
                                    key={m.id}
                                    style={{ ...styles.methodBtn, ...(payMethod === m.id ? styles.methodActive : {}) }}
                                    onClick={() => goToOutcomeChoice(m.id)}
                                >
                                    <span style={{ fontSize: '18px' }}>{m.icon}</span>
                                    {m.label}
                                </div>
                            ))}
                        </div>

                        {/* Main CTA */}
                        <button
                            style={styles.ctaBtn}
                            onClick={() => goToOutcomeChoice(payMethod)}
                            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Pay {plan.label.split('/')[0]} via {payMethod} →
                        </button>

                        {/* Footer */}
                        <div style={styles.footer}>
                            🔒 Secured by PhonePe • 256-bit encryption
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
