
// ═══════════════════════════════════════════════════════════════
//  MANAS360 UNIVERSAL PAYMENT MODULE v1.0
//  Drop-in payment for ANY screen. One import. One call.
//
//  Usage:
//    import { MANAS360Payment } from './payment/MANAS360Payment';
//    const result = await MANAS360Payment.init({ source: 'sleep_therapy' });
// ═══════════════════════════════════════════════════════════════

import { API_BASE } from '../config/api';
import { getAuthToken, getUserId } from '../auth/session';
import { showPaymentModal, showSuccessScreen, showFailScreen } from './PaymentUI';
import { analytics } from '../utils/analytics';

// ─── PLAN CATALOG ───
const PLANS = {
  premium_monthly: {
    id: 'premium_monthly',
    name: 'Monthly Premium',
    price: 299,
    paise: 29900,
    duration: 30,        // days
    interval: 'MONTH',
    label: '₹299/mo',
    savings: null,
    popular: false,
  },
  premium_yearly: {
    id: 'premium_yearly',
    name: 'Annual Premium',
    price: 2999,
    paise: 299900,
    duration: 365,
    interval: 'YEAR',
    label: '₹2,999/yr',
    savings: 'Save ₹589 (16%)',
    popular: true,
  },
  anytimebuddy_lifetime: {
    id: 'anytimebuddy_lifetime',
    name: 'AnytimeBuddy — Lifetime',
    price: 9999,      // Defaulting to high tier, could be dynamic later if needed
    paise: 999900,
    duration: -1,
    interval: 'LIFETIME',
    label: '₹9,999 (one-time)',
    savings: 'Own it forever',
    popular: false,
  },
  track_single: {
    id: 'track_single',
    name: 'À La Carte Track',
    price: 30,
    paise: 3000,
    duration: -1,
    interval: 'ONETIME',
    label: '₹30/track',
    savings: null,
    popular: false,
  }
};

// ─── MAIN PAYMENT CLASS ───
class MANAS360Payment {

  /**
   *  THE ONE CALL — paste this wherever you need payment
   *
   *  @param {Object} config
   *  @param {string} config.source       — Screen ID: 'sleep_therapy', 'sound_library',
   *                                         'anytimebuddy', 'ventbuddy', 'premium_hub',
   *                                         'certification', etc.
   *  @param {string} [config.planId]     — Pre-select plan: 'premium_monthly' | 'premium_yearly'
   *                                         | 'anytimebuddy_lifetime'
   *  @param {string} [config.therapistId] — If payment is for a therapist session
   *  @param {string} [config.trackId]    — If buying single sound track (à la carte)
   *  @param {Object} [config.metadata]   — Extra data to store with payment
   *  @param {Function} [config.onSuccess] — Callback on success (receives receipt)
   *  @param {Function} [config.onFailure] — Callback on failure (receives error)
   *  @param {Function} [config.onCancel]  — Callback on user cancel
   *
   *  @returns {Promise<PaymentResult>}
   */
  static async init(config = {}) {
    const {
      source = 'unknown',
      planId = null,
      therapistId = null,
      trackId = null,
      metadata = {},
      onSuccess = () => { },
      onFailure = () => { },
      onCancel = () => { },
    } = config;

    // Track conversion funnel
    analytics.track('payment_initiated', { source, planId });

    try {
      // ① Show plan selector modal (unless plan pre-selected)
      let selectedPlan;
      if (planId && PLANS[planId]) {
        selectedPlan = PLANS[planId];
      } else {
        selectedPlan = await showPaymentModal({
          plans: PLANS,
          source: source,
          defaultPlan: 'premium_yearly',
        });
      }

      // User cancelled the modal
      if (!selectedPlan) {
        analytics.track('payment_cancelled', { source });
        onCancel();
        return { status: 'cancelled' };
      }

      // ② Create order on backend
      const order = await _createOrder({
        planId: selectedPlan.id,
        amount: selectedPlan.paise,
        source: source,
        therapistId: therapistId,
        trackId: trackId,
        metadata: metadata,
      });

      // ③ Launch PhonePe checkout (Web Redirect)
      // Note: In Web Redirect flow, execution stops here as the page reloads.
      const pgResult = await _launchPhonePe({
        merchantTransactionId: order.transaction_id,
        paymentUrl: order.payment_url,
        amount: selectedPlan.paise,
      });

      // For Redirect flow, this code is unreachable in the same session.
      // However, if we were using a popup or iframe (SDK mode), we would verify here.
      // If _launchPhonePe returns (e.g. error launching), handle it.
      if (pgResult && pgResult.error) {
        throw new Error(pgResult.error);
      }

      return { status: 'redirecting' };

    } catch (err) {
      console.error('[MANAS360Payment]', err);
      analytics.track('payment_error', { source, error: err.message });
      onFailure({ error: err.message });
      return { status: 'error', error: err.message };
    }
  }
}

// ─── PRIVATE: Create Order ───
async function _createOrder({ planId, amount, source, therapistId, trackId, metadata }) {
  const res = await fetch(`${API_BASE}/api/v1/payment/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      user_id: getUserId(),
      plan_id: planId,
      amount_paise: amount,
      source: source,
      therapist_id: therapistId,
      track_id: trackId,
      metadata: metadata,
    }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error || errBody.details || `Order failed: ${res.status}`);
  }
  return res.json();
}

// ─── PRIVATE: Launch PhonePe (Web Redirect Implementation) ───
async function _launchPhonePe({ merchantTransactionId, paymentUrl }) {
  if (paymentUrl) {
    window.location.href = paymentUrl;
    // Return a promise that never resolves to prevent further execution before redirect
    return new Promise(() => { });
  }
  return { error: 'No payment URL provided' };
}

// ─── PRIVATE: Verify Payment (Used in Callback/SPA flow) ───
// ─── PRIVATE: Verify Payment (Used in Callback/SPA flow) ───
async function _verifyPayment(transactionId) {
  // Poll status (PhonePe can take a few seconds)
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      // UPDATED to call POST /verify to trigger DB updates
      const res = await fetch(`${API_BASE}/api/v1/payment/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transaction_id: transactionId })
      });

      // Handle success
      if (res.ok) {
        const data = await res.json();
        // If Status is terminal, return it
        if (data.status === 'SUCCESS' || data.status === 'FAILED') {
          return data;
        }
      } else {
        // If 404, maybe transaction not created yet? Retry.
        // If 500, retry.
        console.warn('Verify fetch failed', res.status);
      }
    } catch (e) {
      console.warn('Verify network error', e);
    }

    // Wait 3 seconds before retry
    await new Promise(r => setTimeout(r, 3000));
    attempts++;
  }

  return { status: 'PENDING', error: 'Payment verification timed out' };
}

export { MANAS360Payment, PLANS };
