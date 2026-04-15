# Agri Risk AI - Blockchain-Based Agricultural Risk Assessment Platform

A full-stack web application that uses AI to calculate crop risk scores and stores them on the Algorand blockchain testnet. Banks can review risk assessments and make instant loan decisions.

## 🌾 Features

- **AI Risk Calculation**: Analyzes rainfall and land size to determine crop risk
- **Blockchain Integration**: Stores risk data on Algorand testnet using smart transactions
- **Farmer Dashboard**: Simple form-based interface for crop risk assessment
- **Bank Dashboard**: Loan decision system based on AI-calculated risk scores
- **Responsive UI**: Built with Tailwind CSS for mobile and desktop devices
- **Real-time Processing**: Instant risk calculations with blockchain verification

## 🏗️ Project Structure

```
farmer/
├── app/
│   ├── api/
│   │   ├── risk-calculation/route.js    # AI risk calculation API
│   │   └── blockchain/route.js          # Algorand blockchain submission API
│   ├── components/
│   │   ├── FarmerForm.js               # Main farmer input form
│   │   ├── RiskDisplay.js              # Risk score display component
│   │   └── TransactionStatus.js        # Blockchain transaction status
│   ├── dashboard/
│   │   └── page.js                     # Bank loan decision dashboard
│   ├── lib/
│   │   ├── riskCalculation.js          # AI risk calculation logic
│   │   └── algorand.js                 # Algorand SDK integration
│   ├── layout.js                       # Root layout
│   ├── page.js                         # Home page (farmer form)
│   └── globals.css                     # Global styles
├── public/                             # Static assets
├── .env.local                          # Environment variables
├── package.json                        # Dependencies
└── README.md                           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Basic understanding of Next.js and React
- Algorand testnet wallet (optional, demo account provided)

### Installation

1. **Navigate to project directory**:
   ```bash
   cd farmer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   The `.env.local` file is pre-configured with defaults. For production, update:
   - `ALGORAND_MNEMONIC`: Your Algorand account mnemonic (for transaction signing)
   - `NEXT_PUBLIC_ALGORAND_NETWORK`: Set to "testnet" or "mainnet"

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📖 How It Works

### 1. **Farmer Dashboard (Home Page)**
   - Enter crop type, land size, and rainfall
   - Click "Generate Risk Score"
   - AI calculates risk level (Low/Medium/High) and predicted yield

### 2. **Blockchain Storage**
   - Review the risk assessment
   - Enter Algorand address (optional for demo)
   - Click "Store on Blockchain"
   - Transaction is submitted to Algorand testnet
   - Receive transaction ID and confirmation

### 3. **Bank Dashboard**
   - Navigate to `/dashboard`
   - View AI-calculated risk assessment
   - See automatic loan decision based on risk level:
     - **Low Risk**: Loan APPROVED with favorable terms
     - **Medium Risk**: Loan UNDER REVIEW with conditions
     - **High Risk**: Loan REJECTED with recommendations

## 🧠 AI Risk Calculation Logic

### Risk Score Calculation
```javascript
if rainfall < 50mm → High Risk (80-100)
if rainfall 50-100mm → Medium Risk (40-70)
if rainfall > 100mm → Low Risk (0-40)
```

### Yield Prediction
```javascript
Base Yield = Land Size × 100 units/hectare
Adjusted by rainfall multipliers and crop type
```

### Loan Decision Rules
- **Low Risk**: Interest Rate 5.5%, Loan up to $50,000, 3-5 year terms
- **Medium Risk**: Interest Rate 7.5%, Loan up to $30,000, 2-4 year terms, requires review
- **High Risk**: Application rejected, recommendations provided

## 🔗 Blockchain Integration

### Algorand Testnet Details
- **Network**: Algorand Testnet
- **API Endpoint**: https://testnet-api.algonode.cloud
- **Explorer**: https://testnet.algoexplorer.io

### Transaction Structure
Risk data is stored in transaction notes as JSON:
```json
{
  "type": "agri-risk-data",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "riskScore": 65,
    "riskLevel": "Medium",
    "predictedYield": 1200,
    "cropType": "rice"
  }
}
```

## 🛠️ API Endpoints

### POST `/api/risk-calculation`
Calculates risk score and yield prediction.

**Request:**
```json
{
  "cropType": "wheat",
  "landSize": 5,
  "rainfall": 75
}
```

**Response:**
```json
{
  "success": true,
  "riskScore": 55,
  "riskLevel": "Medium",
  "predictedYield": 450,
  "cropType": "wheat",
  "landSize": 5,
  "rainfall": 75
}
```

### POST `/api/blockchain`
Submits risk data to Algorand blockchain.

**Request:**
```json
{
  "riskScore": 55,
  "riskLevel": "Medium",
  "predictedYield": 450,
  "cropType": "wheat",
  "senderAddress": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HVY"
}
```

**Response:**
```json
{
  "success": true,
  "txId": "TXID...",
  "round": 12345678,
  "message": "Data successfully stored on blockchain"
}
```

## 💻 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run ESLint
npm run lint
```

## 🔐 Security Notes

### Development Only
- Default mnemonic in `.env.local` is for testing only
- Do NOT use in production with real funds
- Transactions in testnet don't have real value

### Production Recommendations
- Use secure wallet integration (WalletConnect, Pera Wallet)
- Store mnemonics in secure key management systems
- Validate all user inputs on backend
- Implement rate limiting on API endpoints
- Add authentication for bank dashboard
- Use HTTPS only

## 📱 Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## 🐛 Troubleshooting

### "No space left on device" during npm install
```bash
npm cache clean --force
npm install
```

### Blockchain submission fails
- Verify Algorand testnet connection: https://testnet-api.algonode.cloud
- Check account has minimum balance (0.1 ALGO)
- View transaction on explorer: https://testnet.algoexplorer.io

### Risk score not calculating
- Ensure all form fields are filled
- Verify rainfall and land size are positive numbers
- Check browser console for error messages

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Algorand Developer Docs](https://developer.algorand.org)
- [Algorand JavaScript SDK](https://github.com/algorand/js-algorand-sdk)
- [Tailwind CSS](https://tailwindcss.com)

## 🚀 Deployment

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Heroku

Environment variables must be configured on the platform.

## 📝 Testing Flow

1. **Start Application**: `npm run dev`
2. **Access**: http://localhost:3000
3. **Fill Form**: 
   - Crop Type: Rice
   - Land Size: 10
   - Rainfall: 80
4. **Generate Risk Score**: Click button (shows Medium risk)
5. **Store on Blockchain**: Click button (shows transaction ID)
6. **View Dashboard**: Click dashboard link (shows loan decision)
7. **Verify**: Check Algorand Testnet Explorer

## 🤝 Contributing

To contribute improvements:
1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request with description

## 📄 License

MIT License - Feel free to use for educational and commercial purposes.

## 🙋 Support

For issues and questions:
1. Check the Troubleshooting section
2. Review API responses for error messages
3. Check browser console for JavaScript errors
4. Verify `.env.local` configuration

## 🎯 Future Enhancements

- [ ] Multi-language support
- [ ] Advanced ML models for yield prediction
- [ ] Real-time weather data integration
- [ ] IoT sensor data support
- [ ] Insurance product integration
- [ ] Mobile app (React Native)
- [ ] Smart contract for automated loan disbursement
- [ ] Real Algorand mainnet support

---

**Built with ❤️ for sustainable agriculture using blockchain technology**
