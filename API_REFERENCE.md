# Agri Risk AI - API Reference

Complete API documentation for the Agri Risk AI platform.

## Base URL
- Development: `http://localhost:3000`
- Production: `https://yourdomain.com` (configure in `.env.local`)

## Endpoints

---

## 1. Generate Risk Score

Calculate crop risk and yield prediction using AI.

### Request

**Endpoint**: `POST /api/risk-calculation`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "cropType": "string",    // Required: "wheat", "rice", "corn", "soybean", "cotton"
  "landSize": "number",    // Required: Land size in hectares (positive number)
  "rainfall": "number"     // Required: Annual rainfall in mm (positive number)
}
```

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/risk-calculation \
  -H "Content-Type: application/json" \
  -d '{
    "cropType": "rice",
    "landSize": 10,
    "rainfall": 85
  }'
```

### Response

**Status**: `200 OK`

**Body**:
```json
{
  "success": true,
  "riskScore": 55,                    // 0-100 scale
  "riskLevel": "Medium",              // "Low", "Medium", "High"
  "predictedYield": 1240,             // In units (bushels/tons)
  "cropType": "rice",
  "landSize": 10,
  "rainfall": 85
}
```

### Error Responses

**Status**: `400 Bad Request` - Missing required fields
```json
{
  "error": "Missing required fields: cropType, landSize, rainfall"
}
```

**Status**: `400 Bad Request` - Invalid input values
```json
{
  "error": "Invalid input values"
}
```

**Status**: `500 Internal Server Error`
```json
{
  "error": "Internal server error: [error details]"
}
```

### Risk Score Range

| Risk Level | Score Range | Color |
|------------|------------|-------|
| Low       | 0-40      | 🟢 Green |
| Medium    | 40-70     | 🟡 Yellow |
| High      | 70-100    | 🔴 Red |

---

## 2. Submit to Blockchain

Store risk assessment data on the Algorand blockchain.

### Request

**Endpoint**: `POST /api/blockchain`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "riskScore": "number",         // Required: Risk score (0-100)
  "riskLevel": "string",         // Required: "Low", "Medium", "High"
  "predictedYield": "number",    // Required: Predicted yield in units
  "cropType": "string",          // Required: Crop type
  "senderAddress": "string"      // Required: Algorand address (58 chars)
}
```

**Example Request**:
```bash
curl -X POST http://localhost:3000/api/blockchain \
  -H "Content-Type: application/json" \
  -d '{
    "riskScore": 55,
    "riskLevel": "Medium",
    "predictedYield": 1240,
    "cropType": "rice",
    "senderAddress": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HVY"
  }'
```

### Response

**Status**: `200 OK` - Success

```json
{
  "success": true,
  "txId": "ABC123TXID...",          // Algorand transaction ID
  "round": 12345678,                // Confirmed round number
  "message": "Data successfully stored on blockchain"
}
```

### Error Responses

**Status**: `400 Bad Request` - Missing required field
```json
{
  "error": "Missing senderAddress"
}
```

**Status**: `500 Internal Server Error` - Blockchain submission failed
```json
{
  "success": false,
  "error": "Failed to submit transaction: [error details]",
  "message": "Failed to submit data to blockchain"
}
```

### Algorand Address Format

- **Length**: Always 58 characters
- **Format**: Base32 encoded
- **Example**: `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HVY`
- **Testnet faucet**: https://dispenser.testnet.aws.algodev.network/

### Blockchain Data Structure

Data stored in transaction note field (JSON format):

```json
{
  "type": "agri-risk-data",
  "timestamp": "2024-04-12T10:30:45.123Z",
  "data": {
    "riskScore": 55,
    "riskLevel": "Medium",
    "predictedYield": 1240,
    "cropType": "rice"
  }
}
```

---

## Integration Examples

### JavaScript/Node.js

```javascript
// Risk Calculation
const riskResponse = await fetch('/api/risk-calculation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cropType: 'wheat',
    landSize: 15,
    rainfall: 100
  })
});
const riskData = await riskResponse.json();
console.log(`Risk Level: ${riskData.riskLevel}`);

// Blockchain Submission
const txResponse = await fetch('/api/blockchain', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    riskScore: riskData.riskScore,
    riskLevel: riskData.riskLevel,
    predictedYield: riskData.predictedYield,
    cropType: riskData.cropType,
    senderAddress: 'YOUR_ALGORAND_ADDRESS'
  })
});
const txData = await txResponse.json();
console.log(`Transaction ID: ${txData.txId}`);
```

### Python

```python
import requests
import json

# Risk Calculation
risk_payload = {
    'cropType': 'wheat',
    'landSize': 15,
    'rainfall': 100
}
risk_response = requests.post(
    'http://localhost:3000/api/risk-calculation',
    headers={'Content-Type': 'application/json'},
    json=risk_payload
)
risk_data = risk_response.json()
print(f"Risk Level: {risk_data['riskLevel']}")

# Blockchain Submission
tx_payload = {
    'riskScore': risk_data['riskScore'],
    'riskLevel': risk_data['riskLevel'],
    'predictedYield': risk_data['predictedYield'],
    'cropType': risk_data['cropType'],
    'senderAddress': 'YOUR_ALGORAND_ADDRESS'
}
tx_response = requests.post(
    'http://localhost:3000/api/blockchain',
    headers={'Content-Type': 'application/json'},
    json=tx_payload
)
tx_data = tx_response.json()
print(f"Transaction ID: {tx_data['txId']}")
```

### React Component

```javascript
import { useState } from 'react';

export function RiskCalculator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/risk-calculation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropType: e.target.cropType.value,
          landSize: parseFloat(e.target.landSize.value),
          rainfall: parseFloat(e.target.rainfall.value)
        })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleCalculate}>
        {/* Form fields */}
      </form>
      {result && (
        <div>Risk: {result.riskLevel} ({result.riskScore})</div>
      )}
    </div>
  );
}
```

---

## Response Codes

### Success Codes
- `200 OK`: Request successful
- `201 Created`: Resource created

### Client Error Codes
- `400 Bad Request`: Invalid input parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Access denied
- `404 Not Found`: Endpoint not found
- `422 Unprocessable Entity`: Validation failed

### Server Error Codes
- `500 Internal Server Error`: Server error occurred
- `503 Service Unavailable`: Service temporarily unavailable

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider adding:

```javascript
// Example: 10 requests per minute per IP
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 10               // 10 requests
});

app.use('/api/', limiter);
```

---

## Authentication (Future)

Currently no authentication required. For production deployment, add:

```javascript
// Bearer token validation
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  // Verify token
  next();
};

app.post('/api/blockchain', verifyToken, blockchainHandler);
```

---

## CORS Configuration

Configured for local development. Update for production:

```javascript
// In middleware
const cors = require('cors');

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true
}));
```

---

## Versioning

Current API Version: **v1.0**

Future versions will be available at:
- `/api/v1/risk-calculation`
- `/api/v2/risk-calculation`

---

## Blockchain Details

### Algorand Testnet
- **Network ID**: testnet
- **API Endpoint**: https://testnet-api.algonode.cloud
- **Explorer**: https://testnet.algoexplorer.io
- **Faucet**: https://dispenser.testnet.aws.algodev.network/

### Transaction Verification

Check transaction status at explorer:
```
https://testnet.algoexplorer.io/tx/{txId}
```

### Cost
- **Testnet**: Free (no real ALGO required)
- **Mainnet**: ~0.001 ALGO per transaction

---

## Testing the API

### Using Postman

1. Create new request: `POST http://localhost:3000/api/risk-calculation`
2. Set Headers: `Content-Type: application/json`
3. Set Body (raw JSON):
   ```json
   {
     "cropType": "rice",
     "landSize": 10,
     "rainfall": 85
   }
   ```
4. Send request

### Using cURL

```bash
# Risk Calculation
curl -X POST http://localhost:3000/api/risk-calculation \
  -H "Content-Type: application/json" \
  -d '{"cropType":"rice","landSize":10,"rainfall":85}'

# Blockchain Submission
curl -X POST http://localhost:3000/api/blockchain \
  -H "Content-Type: application/json" \
  -d '{
    "riskScore":55,
    "riskLevel":"Medium",
    "predictedYield":1240,
    "cropType":"rice",
    "senderAddress":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HVY"
  }'
```

---

## Troubleshooting

### "Cannot POST /api/blockchain"
- Verify endpoint URL
- Check request method (must be POST)
- Verify headers include `Content-Type: application/json`

### "Blockchain submission failed"
- Verify Algorand testnet connection
- Check sender address format (must be 58 characters)
- Ensure account has minimum balance

### "Invalid input values"
- Verify all parameters are provided
- Check data types match (numbers for rainfall/landSize)
- Verify crop type is valid

---

## Support

For API issues:
1. Check error messages in response
2. Review browser DevTools Console
3. Check server logs on development terminal
4. Visit [Full README](./README.md) for more details
