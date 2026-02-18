
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Dashboard from './screens/Dashboard'
import SleepTherapy from './screens/SleepTherapy'
import PaymentSuccess from './screens/PaymentSuccess'
import PaymentFailure from './screens/PaymentFailure'
import PaymentOutcomeChoice from './screens/PaymentOutcomeChoice'
import SoundTherapy from './screens/SoundTherapy'
import AnytimeBuddy from './screens/AnytimeBuddy'
import VentBuddy from './screens/VentBuddy'
import PremiumHub from './screens/PremiumHub'
import Certification from './screens/Certification'
import { PaymentModalManager } from './payment/PaymentModalManager'
import PaymentCallback from './payment/PaymentCallback'

import { theme } from './theme'

function App() {
    return (
        <Router>
            <div className="App" style={{ background: theme.colors.background, minHeight: '100vh', fontFamily: theme.fonts.main, color: theme.colors.text }}>
                <PaymentModalManager />
                <Routes>
                    <Route path="/" element={<SleepTherapy />} />
                    {/* <Route path="/sleep" element={<SleepTherapy />} /> */}
                    {/* <Route path="/sound" element={<SoundTherapy />} />
                    <Route path="/anytime" element={<AnytimeBuddy />} />
                    <Route path="/vent" element={<VentBuddy />} />
                    <Route path="/premium" element={<PremiumHub />} />
                    <Route path="/cert" element={<Certification />} /> */}

                    <Route path="/payment/success" element={<PaymentSuccess />} />
                    <Route path="/payment/failure" element={<PaymentFailure />} />
                    <Route path="/payment/confirm" element={<PaymentOutcomeChoice />} />
                    <Route path="/payment/callback" element={<PaymentCallback />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
