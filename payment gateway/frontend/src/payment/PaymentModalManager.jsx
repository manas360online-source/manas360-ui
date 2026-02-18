
import React, { useState, useEffect } from 'react';
import { PaymentModal } from './PaymentModal';
import { PLANS } from './MANAS360Payment';
import { paymentEvents } from './PaymentEvents';

export const PaymentModalManager = () => {
    const [visible, setVisible] = useState(false);
    const [resolver, setResolver] = useState(null); // Function to resolve the Promise

    useEffect(() => {
        const unsubscribe = paymentEvents.subscribe((event, data) => {
            if (event === 'OPEN_MODAL') {
                setVisible(true);
                // The data.onSelect and data.onClose are the callbacks we need to call
                setResolver(data);
            }
        });
        return unsubscribe;
    }, []);

    const handleSelect = (plan) => {
        setVisible(false);
        if (resolver && resolver.onSelect) resolver.onSelect(plan);
    };

    const handleClose = () => {
        setVisible(false);
        if (resolver && resolver.onClose) resolver.onClose();
    };

    if (!visible) return null;

    return (
        <PaymentModal
            visible={visible}
            plans={PLANS}
            defaultPlan="premium_yearly"
            source={resolver ? resolver.source : 'unknown'}
            onSelect={handleSelect}
            onClose={handleClose}
        />
    );
};
