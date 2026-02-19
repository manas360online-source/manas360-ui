# MANAS360 — PAYMENT INTEGRATION & CHEAT SHEET

## Copy-Paste Cheat Sheet
**How to add "Go Premium" to any existing or future screen in 3 lines of code.**

### 📋 Step 1 — Import (once per file)
```javascript
import { MANAS360Payment } from './payment/MANAS360Payment'; // Adjust path as needed
```

### ⚡ Step 2 — Call from any handler

**Minimal Call** (Force Modal selection)
```javascript
await MANAS360Payment.init({ source: 'your_screen_name' });
```

**Full Call** (With options)
```javascript
await MANAS360Payment.init({
  source:      'sleep_therapy',
  planId:      'premium_yearly',        // pre-select (skips modal)
  therapistId: 'ther_456',              // for revenue split (60/40)
  trackId:     'track_528hz_delta',     // for à la carte purchase
  metadata:    { campaign: 'dharwad_launch' },
  onSuccess:   (receipt) => console.log('Upgraded!', receipt),
  onFailure:   (err) => console.error('Failed', err),
  onCancel:    () => console.log('User dismissed'),
});
```

### 🏷️ Step 3 — Source Screen IDs (use consistently)

| Screen | Source ID | Notes |
| :--- | :--- | :--- |
| **Premium Therapy Hub** | `premium_hub` | Main discovery page |
| **Sleep Therapy** | `sleep_therapy` | Sleep programs gate |
| **Sound Library** | `sound_library` | À la carte tracks too |
| **AnytimeBuddy** | `anytimebuddy` | Lifetime purchase |
| **VentBuddy** | `ventbuddy` | Session paywall |
| **Digital Pets** | `digital_pets` | Pet shop gate |
| **Certification** | `certification` | Coach/therapist cert |
| **CBT Module** | `cbt_session` | Session paywall |
| **Therapist Profile** | `therapist_booking` | Session booking |
| **Settings > Upgrade** | `settings_upgrade` | Profile settings |
| **Trial Expiry Banner** | `trial_expiry` | 7-day trial end |
| **WhatsApp Bot** | `whatsapp_bot` | Chatbot upsell |

---

## 🔒 Security Notes
1.  **PhonePe Salt Key**: NEVER expose in frontend code. It stays in `.env`.
2.  **Auth**: All `/create` and `/verify` routes require an auth token.
3.  **Webhook Verification**: The backend verifies the `X-VERIFY` header signature.
4.  **Data Integrity**: DB transactions (`BEGIN`/`COMMIT`) ensure atomic updates.
5.  **Idempotency**: Checks prevent duplicate processing of the same transaction.

---

## 🧪 Testing Guidelines
-   **Environment**: Set `PHONEPE_ENV=SANDBOX` in `.env`.
-   **Test UPI ID (Success)**: `success@ybl` (Always succeeds).
-   **Test UPI ID (Failure)**: `failure@ybl` (Always fails).
-   **Webhooks**: functionality relies on `ngrok` for localhost visibility, or fallback to the frontend Polling mechanism (`GET /status`).
