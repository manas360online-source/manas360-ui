
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api';
import { getAuthToken } from '../auth/session';
import { theme } from '../theme';

export default function PaymentCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const txnId = searchParams.get('txn');
    const status = searchParams.get('status'); // Optional hint from redirect

    useEffect(() => {
        if (!txnId) {
            navigate('/payment/failure?error=Missing Transaction ID');
            return;
        }

        const verifyPayment = async () => {
            try {
                // We call the POST verify endpoint to enable DB updates
                // This is redundant if Webhook fired, but essential if it didn't (e.g. localhost)
                const res = await fetch(`${API_BASE}/api/v1/payment/verify`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ transaction_id: txnId })
                });

                const data = await res.json();

                if (data.status === 'SUCCESS') {
                    navigate(`/payment/success?txnId=${txnId}`);
                } else {
                    navigate(`/payment/failure?txnId=${txnId}&error=${data.error || 'Verification Failed'}`);
                }

            } catch (err) {
                console.error("Verification Error", err);
                // If network fails but we had a success hint, maybe risk a success screen? 
                // Better to fail safe.
                navigate(`/payment/failure?txnId=${txnId}&error=Network Error Verification`);
            }
        };

        verifyPayment();

    }, [txnId, navigate]);

    return (
        <div style={{
            height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: theme.colors.background, color: theme.colors.text,
            flexDirection: 'column', gap: '20px',
            fontFamily: theme.fonts.main
        }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: `3px solid ${theme.colors.cardBorder}`,
                borderTopColor: theme.colors.primary,
                animation: 'spin 1s linear infinite'
            }} />
            <div style={{ fontFamily: 'sans-serif', color: theme.colors.textSecondary }}>Verifying Payment...</div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
