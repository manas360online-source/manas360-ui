
# 💎 How to Add "Go Premium" to Any Screen

Follow this 3-step guide to monetize any module, screen, or feature in MANAS360.

## ⚡ Step 1: Import (Once per file)

Add this single line at the top of your React component:

```javascript
import { MANAS360Payment } from '@manas360/payment';
```

---

## 🚀 Step 2: Trigger Payment (On Button Click)

Call the `init()` method when the user clicks your "Upgrade" or "Unlock" button.

### Minimal Call (Most Common)
Use this if you want the user to choose their plan via the bottom sheet.

```javascript
const handleUpgrade = async () => {
  await MANAS360Payment.init({ 
    source: 'your_screen_name' 
  });
};
```

### Full Configuration (For Specific Use Cases)
Use this for advanced scenarios like:
- **Pre-selecting a plan** (e.g., Lifetime Access for Buddy)
- **Revenue Splitting** (e.g., Therapist Sessions)
- **À La Carte** (e.g., Single Track Purchase)

```javascript
await MANAS360Payment.init({
  source:      'sleep_therapy',         // Required: See Step 3
  planId:      'premium_yearly',        // Optional: Skips plan selection modal
  therapistId: 'ther_456',              // Optional: For 60/40 revenue split
  trackId:     'track_528hz_delta',     // Optional: For single item purchase
  metadata:    { campaign: 'launch' },  // Optional: Extra analytics tags
  onSuccess:   (receipt) => {
    console.log("Payment Success!", receipt);
    // tailored UI update
  },
  onFailure:   (err) => {
    console.error("Payment Failed", err);
  },
  onCancel:    () => console.log('User dismissed'),
});
```

---

## 🏷️ Step 3: Use Consistency Source IDs

Always use the correct `source` ID for analytics and tracking.

| Screen / Feature | Source ID (`source`) | Notes |
| :--- | :--- | :--- |
| **Premium Hub (Main)** | `premium_hub` | The central upgrade page |
| **Sleep Therapy** | `sleep_therapy` | Unlock sleep tracks |
| **Sound Library** | `sound_library` | Unlock audio frequencies |
| **AnytimeBuddy** | `anytimebuddy` | Lifetime AI companion |
| **VentBuddy** | `ventbuddy` | Unlock venting sessions |
| **Digital Pets** | `digital_pets` | *Future* Pet Shop |
| **Certification** | `certification` | Healer Academy courses |
| **CBT Module** | `cbt_session` | *Future* Therapy tool |
| **Therapist Profile** | `therapist_booking` | Booking a human therapist |
| **Settings Upgrade** | `settings_upgrade` | From user profile |
| **Trial Expiry** | `trial_expiry` | 7-day trial end banner |
| **WhatsApp Bot** | `whatsapp_bot` | External bot upsell |

---

## 🔒 Security & Compliance
- **All payments are processed securely via PhonePe.**
- **No card details are stored on MANAS360 servers.**
- **Transactions are verified server-side with SHA-256 checksums.**
