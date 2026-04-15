# Agri Risk AI - Advanced System Quick Start

## 🚀 Get Started in 5 Minutes

### 1. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000/advanced](http://localhost:3000/advanced)

### 2. Fill in the Advanced Form

**Example: Rice Farm (10 hectares)**
```
Crop Type:      Rice
Land Size:      10 hectares
Rainfall:       75 mm
Temperature:    23°C
Soil Moisture:  60%
```

### 3. Click "Generate Risk Score"

**You'll see:**
- ✅ Risk Score: 45 (Medium Risk)
- ✅ Confidence: 85% (High)
- ✅ Predicted Yield: 4,500 units
- ✅ 3 Explanations of the risk factors
- ✅ Breakdown of each environmental factor

### 4. Try a Scenario (Optional)

Click **"🏜️ Severe Drought"** to see what happens if conditions worsen:
- Original risk: 45 → Simulated: 78 (+73%)
- Original yield: 4,500 → Simulated: 1,800 (-60%)
- Side-by-side comparison table

### 5. Store on Blockchain

Enter your wallet address and click **"Store on Blockchain"**:
- Transaction ID appears
- Click explorer link to verify on Algorand testnet
- All metrics permanently recorded

---

## 📊 What Each Metric Means

| Metric | Range | What It Means |
|--------|-------|---------------|
| **Risk Score** | 0-100 | Overall crop danger (0=safe, 100=dangerous) |
| **Confidence** | 0-100% | How reliable is the prediction? |
| **Yield** | Varies | Expected harvest (units) |
| **Rainfall Factor** | 0-100 | Drought risk from water levels |
| **Temperature Factor** | 0-100 | Heat/cold stress risk |
| **Soil Factor** | 0-100 | Water availability in soil |
| **Crop Factor** | 0-100 | Crop-specific stress (rice=sensitive) |

---

## 🎯 Three Sample Scenarios to Try

### Scenario A: Good Conditions ✅
```
Wheat, 15 ha, 80mm rain, 22°C, 65% soil
→ Expected: Low Risk, High Confidence, Approved Loan
```

### Scenario B: Challenging Conditions ⚠️
```
Rice, 8 ha, 40mm rain, 30°C, 35% soil
→ Expected: High Risk, Medium Confidence, Rejected Loan
```

### Scenario C: Mixed Conditions ⚔️
```
Corn, 12 ha, 70mm rain, 25°C, 50% soil
→ Expected: Medium Risk, High Confidence, Under Review
```

---

## 🌍 Climate Scenarios Explained

When you click a scenario button, the system:
1. **Modifies your conditions** (e.g., rainfall -60% for drought)
2. **Recalculates risk** with new conditions
3. **Shows impact** (how much risk increased/decreased)
4. **Compares before/after** in a detailed table

**Available Scenarios:**
- 🏜️ **Drought**: -60% rainfall, +3°C temp, -40% soil
- 🔥 **Heat Wave**: +5°C temp, -30% soil moisture
- 💧 **Heavy Rain**: +100% rainfall, +30% soil
- ✨ **Optimal**: Perfect growing conditions

---

## 🔗 Blockchain Verification

After clicking "Store on Blockchain":

1. Get a **Transaction ID** (e.g., `UXI3MZLM4QDQU7X...`)
2. Click the **Algorand Explorer** link
3. **Transaction details** show all your data:
   - Crop type
   - Risk score
   - Confidence
   - Environmental factors
   - Risk explanations

**Everything is permanent and transparent!**

---

## 💰 Understanding Bank Decisions

Your farm's data flows to `/bank`:

**Decision Logic:**
- **Low Risk + High Confidence** → ✅ APPROVED
- **Low Risk + Medium Confidence** → ✅ APPROVED (higher rate)
- **Medium Risk** → ⚠️ UNDER REVIEW
- **High Risk** → ❌ REJECTED

**Example:**
```
Your Farm:
- Risk Score: 45 (Medium)
- Confidence: 85% (High)
- Prediction: Reliable

Bank Says: UNDER REVIEW
- Loan Possible: Yes (with stricter terms)
- Interest Rate: 7.5%
- Max Amount: $25,000
```

---

## ⚡ Key Features

### 🔍 Explainable AI
Get **3 clear explanations** for every decision:
- "Low rainfall (30mm) increases drought risk"
- "High temperature (35°C) exacerbates water stress"
- "Rice is water-intensive and risk-sensitive"

### 📈 Multi-Factor Analysis
Unlike simple rainfall-only systems:
- ✅ Considers temperature stress
- ✅ Includes soil moisture status
- ✅ Accounts for crop type sensitivity
- ✅ Weights all factors scientifically

### 🎯 Confidence Scoring
Know when to trust the prediction:
- 80-100%: High confidence (use for decisions)
- 60-79%: Moderate confidence (verify data)
- <60%: Low confidence (collect more data)

### 🌍 Climate Simulation
Plan for future scenarios:
- Test resilience to drought
- Prepare for heat waves
- Budget for flooding
- Assess long-term viability

---

## 🧪 Testing Checklist

- [ ] Fill form and generate risk score
- [ ] Review all 4 environmental factors
- [ ] Read the 3 AI explanations
- [ ] Check confidence score interpretation
- [ ] Click one climate scenario
- [ ] Compare before/after impact
- [ ] Clear and generate again
- [ ] Store result to blockchain
- [ ] Click explorer link to verify
- [ ] Navigate to /bank to see decision

---

## 🐛 Common Questions

**Q: Why is confidence low when risk is high?**
A: High risk + Low confidence means conditions are bad AND unpredictable. More data needed.

**Q: Can I trust a high-risk, high-confidence prediction?**
A: Yes! The system is confident - but about bad conditions. Take precautions.

**Q: How are weights decided? (40% rainfall, etc.)**
A: Based on agricultural research. Rainfall is most critical (40%), others 20% each.

**Q: Can I change the weights?**
A: Yes! Edit `app/lib/advancedRiskCalculation.js` line ~50 to adjust weights.

**Q: Is blockchain data really permanent?**
A: Yes! Once on Algorand testnet, data cannot be changed. View with explorer link.

**Q: Can I use real Algorand addresses?**
A: Yes! Use any valid testnet address (get free testnet alogs from faucet).

---

## 📱 Navigation Map

```
Home (/)
├── Simple Form (/simple-form)
├── Advanced Form (/advanced) ← START HERE
│   ├── Generate Risk Score
│   ├── Simulate Climate
│   └── Store on Blockchain
├── Bank Decision (/bank)
└── Dashboard (/dashboard)
```

---

## 🎓 Learn More

**Read Full Documentation:**
- [ADVANCED_FEATURES.md](ADVANCED_FEATURES.md) - Complete feature guide
- [API_REFERENCE.md](API_REFERENCE.md) - All endpoints
- [FILE_REFERENCE.md](FILE_REFERENCE.md) - File structure

**Modify the System:**
- Edit risk weights: `app/lib/advancedRiskCalculation.js`
- Add climate scenarios: `app/lib/climateSimulation.js`
- Change bank logic: `app/bank/page.js`
- Customize UI: `app/components/Advanced*.js`

---

## 🚀 That's It!

You now have an enterprise-grade agricultural risk assessment system with:
- ✅ Multi-factor AI analysis
- ✅ Confidence scoring
- ✅ Explainable predictions
- ✅ Climate simulation
- ✅ Blockchain verification
- ✅ Bank integration

**Ready to transform agriculture with AI! 🌾🤖**

---

**Questions?** Check [FILE_REFERENCE.md](FILE_REFERENCE.md) for technical details.
