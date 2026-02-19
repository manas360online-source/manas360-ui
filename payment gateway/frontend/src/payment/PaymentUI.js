
import { paymentEvents } from './PaymentEvents';

export const showPaymentModal = ({ plans, source, defaultPlan }) => {
    return new Promise((resolve) => {
        paymentEvents.emit('OPEN_MODAL', {
            source,
            onSelect: (plan) => resolve(plan),
            onClose: () => resolve(null)
        });
    });
};

export const showSuccessScreen = (receipt) => {
    // For web redirect flow, this might be called on the callback page.
    // If called here, we could redirect or show a modal.
    console.log("Showing Success Screen", receipt);
    window.location.href = `/payment/success?txnId=${receipt.transactionId}`;
    return Promise.resolve();
};

export const showFailScreen = (error) => {
    console.log("Showing Fail Screen", error);
    window.location.href = `/payment/failure?error=${encodeURIComponent(error)}`;
    return Promise.resolve();
};
