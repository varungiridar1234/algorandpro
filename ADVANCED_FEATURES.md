# Agri Risk AI - Advanced System Documentation

## 🚀 NEW: Advanced AI Engine with Multi-Factor Risk Assessment

Your Agri Risk AI system has been upgraded with powerful new features!

---

## 📋 What's New

### 1. ✨ Advanced Risk Calculation Engine

**Location**: `/advanced`

#### Multiple Input Factors:
- 🌧️ **Rainfall** (mm)
- 🌡️ **Temperature** (°C)
- 💧 **Soil Moisture** (%)
- 🌾 **Crop Type** (Wheat, Rice, Corn, Soybean, Cotton)

#### Weighted Risk Formula:
```
Risk Score = (Rainfall × 0.4) + (Soil Moisture × 0.2) + (Temperature × 0.2) + (Crop Factor × 0.2)
Result: 0-100 normalized score
```

#### Risk Categories:
- **Low Risk**: Score < 35 → Green
- **Medium Risk**: Score 35-65 → Yellow
- **High Risk**: Score > 65 → Red

---

### 2. 📊 Confidence Score (0-100%)

Measures reliability of prediction based on:
- **Input Completeness**: Are all 4 factors provided?
- **Factor Stability**: How consistent are the values?
- **Factor Alignment**: Are conditions coordinated or conflicting?

**Interpretation**:
- ✅ **80-100%**: High confidence - Use for critical decisions
- ⚠️ **60-79%**: Moderate confidence - Use with caution
- ❌ **<60%**: Low confidence - Consider collecting more data

---

### 3. 🔍 Explainable AI (X-AI)

The system generates **2-3 clear explanations** for every risk assessment:

Examples:
- "Low rainfall (30mm) increases drought risk significantly"
- "High temperature (35°C) increases heat stress risk"
- "Soil moisture (70%) is within optimal range"
- "Rice: High water requirements"

**Benefit**: Understand WHY the risk is what it is, not just the score.

---

### 4. 🌍 Climate Change Simulator

**Feature**: "Simulate Climate Change" button

#### Available Scenarios:
1. **🏜️ Severe Drought**
   - Rainfall -60%
   - Temperature +3°C
   - Soil Moisture -40%

2. **🔥 Extreme Heat Wave**
   - Temperature +5°C
   - Soil Moisture -30%
   - Rainfall -20%

3. **💧 Heavy Rainfall/Flood**
   - Rainfall x2
   - Soil Moisture +30%
   - Temperature -2°C

4. **✨ Optimal Conditions**
   - Perfect growing conditions (baseline)

#### What You Get:
- Side-by-side comparison of current vs. simulated scenario
- Impact assessment showing how risk and yield change
- All environmental factor changes displayed
- Confidence score comparison

---

### 5. 🔗 Enhanced Blockchain Storage

**Stored Data (on Algorand Testnet)**:
```json
{
  "type": "agri-risk-data-v2",
  "version": "2.0",
  "timestamp": "2026-04-12T10:30:45Z",
  "data": {
    "crop": "rice",
    "rainfall": 75,
    "temperature": 23,
    "soil": 60,
    "landSize": 10,
    "yield": 4500,
    "riskScore": 45,
    "riskLevel": "Medium",
    "confidenceScore": 85,
    "factors": {
      "rainfall": 30,
      "temperature": 35,
      "soilMoisture": 25,
      "cropFactor": 60
    },
    "explanations": [
      "explanation 1",
      "explanation 2",
      "explanation 3"
    ],
    "scenario": "current"
  }
}
```

**Verification**: View transaction on Algorand Testnet Explorer with full data breakdown.

---

### 6. 💰 Enhanced Bank Decision Logic

**Decision Algorithm**:

| Risk Score | Confidence | Decision | Interest Rate | Max Loan |
|------------|-----------|----------|---------------|----------|
| Low (< 35) | High (> 80%) | ✅ APPROVED | 4.5% | $75,000 |
| Low | Medium | ✅ APPROVED | 5.5% | $50,000 |
| Low | Low | ⚠️ REVIEW | 6.5% | $30,000 |
| Medium (35-65) | Any | ⚠️ UNDER REVIEW | 7.5% | $25,000 |
| High (> 65) | Any | ❌ REJECTED | N/A | N/A |

---

## 🎯 How to Use the Advanced System

### Step-by-Step Guide

#### 1. Access Advanced Form
```
http://localhost:3000/advanced
```

#### 2. Enter All Four Factors
```
Crop Type: Rice
Land Size: 10 hectares
Rainfall: 75 mm
Temperature: 23°C
Soil Moisture: 60%
```

#### 3. Click "Generate Risk Score"
- AI calculates multi-factor risk
- Displays confidence score
- Shows 3 risk explanations
- Breaks down individual factors

#### 4. Review Climate Scenarios (Optional)
- Click "🏜️ Severe Drought" to see drought impact
- Compare original vs. simulated risk
- See how yield changes
- Check confidence score stability

#### 5. Store on Blockchain
- Enter Algorand address
- Click "Store on Blockchain"
- Get transaction ID
- Verify on Algorand Explorer

#### 6. View Bank Decision
- Navigate to `/bank`
- See loan approval/rejection
- Review decision based on confidence + risk

---

## 📡 API Endpoints

### POST `/api/advanced-risk` (New)
**Calculate advanced risk with all factors**

Request:
```json
{
  "cropType": "rice",
  "landSize": 10,
  "rainfall": 75,
  "temperature": 23,
  "soilMoisture": 60
}
```

Response:
```json
{
  "success": true,
  "riskScore": 45,
  "riskLevel": "Medium",
  "predictedYield": 4500,
  "confidenceScore": 85,
  "explanations": ["...", "...", "..."],
  "factors": {
    "rainfall": 30,
    "temperature": 35,
    "soilMoisture": 25,
    "cropFactor": 60
  }
}
```

### POST `/api/climate-simulation` (New)
**Simulate climate change scenarios**

Request:
```json
{
  "cropType": "rice",
  "landSize": 10,
  "rainfall": 75,
  "temperature": 23,
  "soilMoisture": 60,
  "scenario": "drought"
}
```

Response:
```json
{
  "success": true,
  "scenario": "Severe Drought Scenario",
  "scenarioDescription": "Rainfall reduced 60%, temperature up 3°C...",
  "original": {
    "riskScore": 45,
    "predictedYield": 4500,
    "confidenceScore": 85
  },
  "simulated": {
    "riskScore": 78,
    "predictedYield": 1800,
    "confidenceScore": 81
  },
  "impact": {
    "riskChange": 33,
    "percentChange": "73.3%",
    "impact": "Risk increased by 33 points (73.3%)"
  }
}
```

---

## 🧪 Test Scenarios

### Scenario 1: Optimal Conditions
```
Input:
- Crop: Wheat
- Land: 15 ha
- Rainfall: 80 mm
- Temperature: 22°C
- Soil: 65%

Expected Output:
- Risk: LOW (Score ~25)
- Confidence: HIGH (85-90%)
- Explanations: Positive factors
- Yield: HIGH (~4000 units)
- Decision: APPROVED
```

### Scenario 2: Challenging Conditions
```
Input:
- Crop: Rice
- Land: 8 ha
- Rainfall: 40 mm
- Temperature: 30°C
- Soil: 35%

Expected Output:
- Risk: HIGH (Score ~72)
- Confidence: MEDIUM (70%)
- Explanations: Multiple stress factors
- Yield: LOW (~1200 units)
- Decision: REJECTED
```

### Scenario 3: Mixed Conditions
```
Input:
- Crop: Corn
- Land: 12 ha
- Rainfall: 70 mm
- Temperature: 25°C
- Soil: 50%

Expected Output:
- Risk: MEDIUM (Score ~48)
- Confidence: HIGH (82%)
- Explanations: Some optimality
- Yield: MEDIUM (~3000 units)
- Decision: UNDER REVIEW
```

---

## 📊 Understanding the Metrics

### Risk Score (0-100)
- **What it measures**: Overall crop risk based on all environmental factors
- **Normalized**: All factors weighted and combined
- **Lower = Better**: 0 = No risk, 100 = Maximum risk

### Confidence Score (0-100%)
- **What it measures**: How reliable is the prediction?
- **Based on**: Factor completeness, stability, and alignment
- **Use case**: High confidence scores support critical loan decisions

### Predicted Yield (Units)
- **What it measures**: Expected crop output
- **Based on**: Environmental conditions × crop type × land size
- **Unit**: Varies by crop (bushels, tons, etc.)

### Factor Breakdown (Individual 0-100)
Each factor has its own score:
- **Rainfall Risk**: 0 = Optimal rainfall, 100 = Drought
- **Temperature Risk**: 0 = Optimal temp, 100 = Extreme heat/cold
- **Soil Moisture Risk**: 0 = Optimal moisture, 100 = Water stressed
- **Crop Risk**: 0 = Low stress crop, 100 = High stress crop

---

## 🔒 Data Security

All advanced data stored on Algorand blockchain:
- ✅ Immutable: Cannot be changed once stored
- ✅ Transparent: Publicly verifiable
- ✅ Timestamped: When decision was made
- ✅ Version controlled: v2.0 format with upgrade path

---

## 🚀 Available Routes

| Route | Purpose | Type |
|-------|---------|------|
| `/` | Original form | Simple |
| `/advanced` | **NEW Advanced form** | Multi-factor |
| `/simple-form` | Minimal form | Basic |
| `/bank` | Loan decision | Dashboard |
| `/dashboard` | Full analytics | Detailed |

---

## 📈 Advanced ML Features (Future)

Currently the system uses:
- ✅ Deterministic algorithms
- ✅ Weighted scoring
- ✅ Explainable factors

Potential future upgrades:
- [ ] Real ML models (TensorFlow.js)
- [ ] Historical data training
- [ ] Seasonal adjustments
- [ ] Regional climate patterns
- [ ] Soil type specific models

---

## 🎓 Examples

### Example 1: Climate Resilience Planning
```
Step 1: Enter current conditions
Step 2: Simulate drought scenario
Step 3: See impact on risk (+40 points)
Step 4: Plan irrigation investment
Step 5: Re-simulate with improved soil moisture
Step 6: See reduced risk (-25 points)
```

### Example 2: Loan Approval Workflow
```
Step 1: Farmer enters crop data
Step 2: AI calculates: Risk 45, Confidence 85%
Step 3: Bank reviews multi-factor analysis
Step 4: Sees detailed explanations
Step 5: Checks blockchain verification
Step 6: Approves loan with confidence
```

### Example 3: Risk Assessment
```
Original: Risk 65 (High, Confidence 75%)
↓ [Simulate Drought]
Simulated: Risk 85 (Very High, Confidence 72%)
Impact: +20 points (30% increase in risk)
Recommendation: High vulnerability to drought
```

---

## 💡 Tips for Best Results

1. **Use Accurate Data**: All four factors should be measured or estimated carefully
2. **Check Confidence Score**: High confidence = more reliable decisions
3. **Read Explanations**: Understand what's driving the risk
4. **Simulate Scenarios**: Test how robust your farm is to climate changes
5. **Store on Blockchain**: Creates verifiable audit trail for lenders

---

## 📝 API Usage Examples

### JavaScript
```javascript
const response = await fetch('/api/advanced-risk', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cropType: 'rice',
    landSize: 10,
    rainfall: 75,
    temperature: 23,
    soilMoisture: 60
  })
});
const result = await response.json();
console.log(`Risk: ${result.riskScore}, Confidence: ${result.confidenceScore}%`);
```

### Python
```python
import requests

response = requests.post('http://localhost:3000/api/advanced-risk', json={
    'cropType': 'rice',
    'landSize': 10,
    'rainfall': 75,
    'temperature': 23,
    'soilMoisture': 60
})
result = response.json()
print(f"Risk: {result['riskScore']}, Confidence: {result['confidenceScore']}%")
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Missing required fields" | Ensure all 4 factors are filled |
| High confidence but high risk? | Normal - conditions are just bad |
| Low confidence? | Some factors have high variability |
| Climate sim doesn't show? | Click scenario button after generating risk |
| Blockchain submission fails? | Check internet, verify testnet connection |

---

## 📞 Next Steps

1. **Try the Advanced Form**: http://localhost:3000/advanced
2. **Test Climate Scenarios**: Simulate drought/heat/flood
3. **Review Explanations**: Understand each risk factor
4. **Store on Blockchain**: Create verification trail
5. **Check Loan Decisions**: See how confidence affects approval

---

## ✨ Key Advantages

✅ **Multi-factor Analysis**: Realistic risk assessment  
✅ **Explainability**: Understand the "why"  
✅ **Confidence Scoring**: Know when to trust the prediction  
✅ **Climate Simulation**: Future-proof your farm  
✅ **Blockchain Verified**: Immutable audit trail  
✅ **Bank Integration**: Enhanced loan decisions  
✅ **Production Ready**: Clean, modular code  

---

**Congratulations! You now have an enterprise-grade agricultural risk assessment system! 🌾🚀**
