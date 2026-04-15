# 🚀 Agri Risk AI - Quick Start Guide

Get started with Agri Risk AI in 5 minutes!

## Prerequisites
- Node.js 16+ installed
- npm package manager
- A modern web browser
- (Optional) Algorand wallet with testnet ALGO for real blockchain transactions

## Installation & Setup

### 1. Start the Development Server

```bash
cd c:\Users\varungiridar\Desktop\farmer
npm run dev
```

You'll see output like:
```
  ▲ Next.js 16.2.3 (Turbopack)
  - Local:        http://localhost:3000
```

### 2. Open in Browser

Navigate to: **http://localhost:3000**

## Using the Application

### Part 1: Generate Risk Score (Home Page)

1. **Fill in Crop Details**:
   - **Crop Type**: Select from dropdown (Wheat, Rice, Corn, Soybean, Cotton)
   - **Land Size**: Enter in hectares (e.g., 10)
   - **Annual Rainfall**: Enter in mm (e.g., 75)

2. **Click "Generate Risk Score"**
   - Wait for AI calculation (instant)
   - See results:
     - Risk Score (0-100)
     - Risk Level (Low/Medium/High)
     - Predicted Yield
     - Crop details

**Example Input for Testing**:
```
Crop Type: Rice
Land Size: 10 hectares
Rainfall: 80 mm
→ Result: Medium Risk (Score ~55)
```

### Part 2: Store on Blockchain

1. **Algorand Address** (Optional):
   - Leave empty for demo test account
   - Or enter valid Algorand address if you have one

2. **Click "Store on Blockchain"**
   - Watch status: "Submitting to blockchain..."
   - Success: Shows Transaction ID and Confirmed Round
   - View transaction: Click "View on Algorand Explorer" link

**Note**: In testnet, transactions are free but take 4-5 seconds to confirm.

### Part 3: View Bank Dashboard

1. **After successful blockchain submission**:
   - Click "Go to Bank Dashboard" button
   - Or navigate directly to: **http://localhost:3000/dashboard**

2. **Bank Dashboard Shows**:
   - Loan Decision (APPROVED/UNDER REVIEW/REJECTED)
   - Loan Terms (interest rate, max amount)
   - Any conditions or recommendations
   - Application details and blockchain verification

**Loan Decision Logic**:
- **Low Risk** (Score < 40): ✅ APPROVED
  - Interest: 5.5% per annum
  - Max Loan: $50,000
  - Terms: 3-5 years

- **Medium Risk** (Score 40-70): ⚠️ UNDER REVIEW
  - Interest: 7.5% per annum
  - Max Loan: $30,000
  - Requires additional documentation

- **High Risk** (Score > 70): ❌ REJECTED
  - Get recommendations to improve
  - Can reapply after improvements

## 🧪 Test Scenarios

### Test 1: Low Risk Application
```
Crop: Wheat | Land: 15 ha | Rainfall: 120 mm
→ Risk: Low → Loan: APPROVED
```

### Test 2: Medium Risk Application
```
Crop: Corn | Land: 5 ha | Rainfall: 75 mm
→ Risk: Medium → Loan: UNDER REVIEW
```

### Test 3: High Risk Application
```
Crop: Rice | Land: 3 ha | Rainfall: 30 mm
→ Risk: High → Loan: REJECTED
```

## 🔗 Blockchain Explorer

After storing on blockchain, you can verify your data:

1. Copy the Transaction ID from success message
2. Visit: https://testnet.algoexplorer.io
3. Paste Transaction ID in search
4. View full transaction details including your risk data

## 📱 Testing on Mobile

The app is fully responsive! Test on:
- iPhone/iPad: Use Safari
- Android: Use Chrome
- Tablet: Both landscape and portrait modes work

Simply open: `http://localhost:3000` on your phone/tablet

## 🔧 Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production build locally
npm start

# Run ESLint
npm run lint

# Clear dependencies and rebuild
rm -r node_modules
npm install
```

## 📝 Data Flow

```
Farmer Form 
    ↓
API: /api/risk-calculation 
    ↓
AI generates Risk Score & Yield
    ↓
Display Results
    ↓
User clicks "Store on Blockchain"
    ↓
API: /api/blockchain
    ↓
Algorand Testnet
    ↓
Transaction Confirmed
    ↓
Bank Dashboard
    ↓
Loan Decision
```

## ⚠️ Common Issues

### Issue: "Cannot find module" errors
**Solution**: 
```bash
npm install
npm run build
```

### Issue: Port 3000 already in use
**Solution**: Either stop the process using port 3000, or run on different port:
```bash
npm run dev -- -p 3001
```

### Issue: Blockchain transaction fails
**Solution**:
- Check internet connection
- Verify Algorand testnet is accessible: https://testnet-api.algonode.cloud
- Ensure Algorand account has minimum balance (0.1 ALGO for testnet)

### Issue: Dashboard shows "No data found"
**Solution**:
- Make sure you clicked "Store on Blockchain" on home page
- Check browser localStorage (DevTools → Application → Local Storage)
- Refresh the page

## 🎓 Understanding the Technology

### AI Risk Calculation
```
Risk = Function(Rainfall, Land Size)
Yield = Function(Rainfall, Crop Type, Land Size)
```

### Blockchain Storage
- **Network**: Algorand Testnet
- **Data**: Stored in transaction notes as JSON
- **Cost**: Free (testnet)
- **Speed**: ~4 seconds confirmation time

### Bank Decision
- **Automated**: Based on AI risk score
- **Transparent**: Verified on blockchain
- **Instant**: No manual review needed for low/high risk

## 📞 Next Steps

1. **Explore the code**: Check out `/app/components` and `/app/lib`
2. **Modify risk logic**: Edit `app/lib/riskCalculation.js`
3. **Add new features**: Create new API routes and components
4. **Deploy**: Use Vercel, Netlify, or your preferred hosting

## 🚀 Deploy to Production

### Using Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Using Other Platforms
- Netlify: `npm run build` → Deploy `out` folder
- AWS Amplify: Connect GitHub repo
- Heroku: `git push heroku main`

## 📚 Additional Resources

- [Full README.md](./README.md) - Complete documentation
- [Algorand Docs](https://developer.algorand.org)
- [Next.js Guide](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## ✅ You're Ready!

You now have a fully functional:
- ✅ AI-powered risk assessment system
- ✅ Blockchain integration
- ✅ Responsive web interface
- ✅ Bank loan decision system
- ✅ Production-ready code

Happy farming! 🌾🚀
