# 📋 Agri Risk AI - File Reference Guide

Complete guide to all files in the project and their purposes.

## 📂 Project Structure & File Descriptions

### Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies, scripts, and project metadata |
| `jsconfig.json` | JavaScript path aliases (@ imports) |
| `next.config.mjs` | Next.js configuration |
| `tailwind.config.js` | Tailwind CSS customization |
| `postcss.config.mjs` | PostCSS plugins configuration |
| `eslint.config.mjs` | ESLint rules for code quality |
| `.env.local` | Environment variables (LOCAL ONLY) |
| `.gitignore` | Files to exclude from git |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation |
| `QUICKSTART.md` | 5-minute quick start guide |
| `API_REFERENCE.md` | Complete API documentation |
| `PROJECT_COMPLETE.md` | Project summary and next steps |
| `FILE_REFERENCE.md` | This file - descriptions of all files |

### Frontend Application (`app/`)

#### Pages

| File | Purpose | Route |
|------|---------|-------|
| `app/page.js` | Home page - Farmer form | `/` |
| `app/dashboard/page.js` | Bank dashboard - Loan decision | `/dashboard` |
| `app/layout.js` | Root layout - App wrapper | Global |

#### Components (`app/components/`)

| File | Purpose |
|------|---------|
| `FarmerForm.js` | Main form component for farmer input |
| `RiskDisplay.js` | Display risk score and results |
| `TransactionStatus.js` | Show blockchain transaction status |

#### Utilities & Logic (`app/lib/`)

| File | Purpose |
|------|---------|
| `riskCalculation.js` | AI risk scoring and yield prediction algorithms |
| `algorand.js` | Algorand blockchain SDK integration |

#### API Routes (`app/api/`)

| File | Purpose | Endpoint |
|------|---------|----------|
| `app/api/risk-calculation/route.js` | Calculate risk score | `POST /api/risk-calculation` |
| `app/api/blockchain/route.js` | Submit to blockchain | `POST /api/blockchain` |

#### Styles

| File | Purpose |
|------|---------|
| `app/globals.css` | Global CSS styles and Tailwind imports |

### Static Assets (`public/`)

| File | Purpose |
|------|---------|
| `favicon.ico` | Browser tab icon |
| `next.svg` | Next.js logo (can be removed) |
| `vercel.svg` | Vercel logo (can be removed) |

---

## 🔍 Detailed File Descriptions

### Core Application Files

#### `app/page.js`
**Purpose**: Home page - Farmer form interface  
**Imports**: `FarmerForm` component  
**Exports**: React functional component  
**Size**: ~10 lines (minimal wrapper)  
**Key Functions**: Default export for `/` route

#### `app/components/FarmerForm.js`
**Purpose**: Main user interface for farmers  
**Imports**: React hooks, RiskDisplay, TransactionStatus  
**Exports**: React functional component  
**Size**: ~250 lines  
**Key Functions**:
- Form state management
- API calls to risk calculation
- Blockchain submission handling
- localStorage data storage
- Navigation to dashboard

#### `app/components/RiskDisplay.js`
**Purpose**: Display risk score and analysis results  
**Imports**: React  
**Exports**: React functional component  
**Size**: ~150 lines  
**Features**:
- Risk score visualization (circular progress)
- Risk level badge (color-coded)
- Predicted yield display
- Risk interpretation text

#### `app/components/TransactionStatus.js`
**Purpose**: Show blockchain transaction status  
**Imports**: React  
**Exports**: React functional component  
**Size**: ~100 lines  
**Features**:
- Status badge (success/pending/error)
- Transaction ID display
- Confirmed round number
- Explorer link
- Animations for pending state

#### `app/dashboard/page.js`
**Purpose**: Bank loan decision dashboard  
**Imports**: React hooks, Link  
**Exports**: React functional component  
**Size**: ~350 lines  
**Features**:
- Reads data from localStorage
- Displays loan decision
- Shows loan terms and conditions
- Provides recommendations
- Blockchain verification link

### Backend Logic Files

#### `app/lib/riskCalculation.js`
**Purpose**: AI risk calculation algorithms  
**Imports**: None (pure utility)  
**Exports**: `calculateRiskScore()`, `calculateYield()`  
**Key Algorithms**:
```
Risk Score:
- Rainfall < 50mm → High (80-100)
- Rainfall 50-100mm → Medium (40-70)
- Rainfall > 100mm → Low (0-40)
```

**Yield Prediction**:
```
Base = Land Size × 100 units/ha
Adjusted by rainfall and crop type
```

#### `app/lib/algorand.js`
**Purpose**: Algorand blockchain integration  
**Imports**: `algosdk`  
**Exports**: 
- `getAlgorandClient()` - Initialize Algorand connection
- `submitRiskDataToBlockchain()` - Submit transaction
- `getRiskDataFromBlockchain()` - Retrieve transaction data

**Features**:
- Testnet configuration
- Transaction signing
- Transaction confirmation waiting
- Error handling

### API Route Files

#### `app/api/risk-calculation/route.js`
**Purpose**: Backend risk calculation API  
**Imports**: `riskCalculation` functions, `NextResponse`  
**Exports**: `POST` handler  
**Request**: JSON with cropType, landSize, rainfall  
**Response**: Risk score, risk level, predicted yield  
**Validation**: Input type and presence checking

#### `app/api/blockchain/route.js`
**Purpose**: Backend blockchain submission API  
**Imports**: `submitRiskDataToBlockchain()`, `NextResponse`  
**Exports**: `POST` handler  
**Request**: Risk data and sender address  
**Response**: Transaction ID and confirmation round  
**Security**: Uses environment variable mnemonic

### Configuration Files

#### `package.json`
**Key Dependencies**:
- `next`: React framework
- `react`: React library
- `react-dom`: React DOM
- `algosdk`: Algorand SDK
- `axios`: HTTP client
- `tailwindcss`: CSS framework

**Scripts**:
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

#### `jsconfig.json`
**Purpose**: Path aliases for cleaner imports  
**Configuration**:
```json
"@/*": ["./app/*"]
```
**Result**: Import from `@/components` instead of `../../../components`

#### `.env.local`
**Contents**:
```
ALGORAND_MNEMONIC=...
NEXT_PUBLIC_API_URL=...
NEXT_PUBLIC_ALGORAND_NETWORK=...
```

### Style Files

#### `app/globals.css`
**Contains**:
- Tailwind CSS imports
- Global font configuration
- CSS variables
- Base styles

---

## 📊 Code Flow & Dependencies

### Request Flow: Risk Calculation
```
FarmerForm (page.js)
    ↓
[User fills form & clicks button]
    ↓
POST /api/risk-calculation
    ↓
riskCalculation.js (calculateRiskScore, calculateYield)
    ↓
Response back to FarmerForm
    ↓
RiskDisplay shows results
```

### Request Flow: Blockchain
```
FarmerForm (component)
    ↓
[User clicks "Store on Blockchain"]
    ↓
POST /api/blockchain
    ↓
algorand.js (submitRiskDataToBlockchain)
    ↓
Algorand Testnet
    ↓
Response with txId
    ↓
Store in localStorage
    ↓
Navigate to Dashboard
    ↓
LocalStorage → Dashboard displays decision
```

---

## 🔐 Security Considerations

### Files with Sensitive Information
- `.env.local` - Contains mnemonic (NEVER commit to git)
- `app/api/blockchain/route.js` - Loads mnemonic from env

### Validation Points
- `app/components/FarmerForm.js` - Frontend validation
- `app/api/risk-calculation/route.js` - Backend validation
- `app/api/blockchain/route.js` - Backend validation

---

## 📈 File Sizes & Performance

| Category | Typical Size |
|----------|-------------|
| Component files | 50-300 lines |
| Utility files | 50-150 lines |
| API routes | 30-80 lines |
| Config files | 10-50 lines |

**Total production bundle**: ~50KB (gzipped)

---

## 🔄 Component Dependencies

```
Root Layout
├── Home Page (/)
│   └── FarmerForm
│       ├── RiskDisplay
│       └── TransactionStatus
└── Dashboard (/dashboard)
    └── StatusBadge (utility)
```

---

## 🚀 How to Add New Features

### Example: Add New Crop Type

1. **Update `app/lib/riskCalculation.js`**:
   Add to `cropMultipliers` object

2. **Update `app/components/FarmerForm.js`**:
   Add option to select dropdown

3. **No other changes needed** - Modular design!

### Example: Add New API Endpoint

1. **Create `app/api/[feature]/route.js`**
2. **Export `GET`, `POST`, etc. handlers**
3. **Use in components via `fetch()`**

---

## 📚 File Statistics

```
Total Files: 20+
Total Lines of Code: ~2,500
Configuration Files: 8
Component Files: 3
Utility Files: 2
API Routes: 2
Pages: 2
Documentation: 4
```

---

## 🔗 Cross-File Data Flow

### Data passed between components:
```javascript
// FarmerForm → RiskDisplay
const [riskData, setRiskData] = useState(null);
// Passed via props
<RiskDisplay riskData={riskData} />

// FarmerForm → TransactionStatus
const [txStatus, setTxStatus] = useState(null);
// Passed via props
<TransactionStatus txStatus={txStatus} />

// FarmerForm → Dashboard (via localStorage)
localStorage.setItem('riskData', JSON.stringify(data));

// Dashboard reads from localStorage
const storedData = localStorage.getItem('riskData');
```

---

## 🧪 Testing Files

No dedicated test files included yet. To add Jest tests:

```bash
npm install --save-dev jest @testing-library/react
```

Create files like:
- `__tests__/riskCalculation.test.js`
- `__tests__/components.test.js`

---

## 📄 Custom vs. Auto-Generated

### Custom Files (Created for this project)
- ❌ `app/page.js` - Replaced (was template)
- ✅ `app/components/FarmerForm.js`
- ✅ `app/components/RiskDisplay.js`
- ✅ `app/components/TransactionStatus.js`
- ✅ `app/dashboard/page.js`
- ✅ `app/lib/riskCalculation.js`
- ✅ `app/lib/algorand.js`
- ✅ `app/api/risk-calculation/route.js`
- ✅ `app/api/blockchain/route.js`

### Auto-Generated (From create-next-app)
- `app/layout.js` - Modified
- `jsconfig.json` - Modified
- `next.config.mjs` - Default
- `tailwind.config.js` - Default
- `postcss.config.mjs` - Default
- `eslint.config.mjs` - Default

### Documentation Added
- ✅ `README.md` - Replaced
- ✅ `QUICKSTART.md` - New
- ✅ `API_REFERENCE.md` - New
- ✅ `PROJECT_COMPLETE.md` - New
- ✅ `.env.local` - New
- ✅ `FILE_REFERENCE.md` - This file

---

## 🎯 Files to Modify When Extending

### To change risk logic:
→ Edit: `app/lib/riskCalculation.js`

### To add UI features:
→ Edit: `app/components/`, `app/page.js`, `app/dashboard/page.js`

### To add API functionality:
→ Create: `app/api/[new-endpoint]/route.js`

### To update styling:
→ Edit: `app/globals.css` or add Tailwind classes

### To change blockchain logic:
→ Edit: `app/lib/algorand.js`

---

## 📖 Quick File Navigation

| Need | File |
|------|------|
| Change home page | `app/page.js` |
| Add form field | `app/components/FarmerForm.js` |
| Modify risk algorithm | `app/lib/riskCalculation.js` |
| Add new route | `app/api/[feature]/route.js` |
| Update styling | `app/globals.css` |
| Change environment vars | `.env.local` |

---

## ✨ Pro Tips

1. **Use path aliases**: `@/components/FarmerForm` not `../../../components/FarmerForm`
2. **Environment variables**: Prefix with `NEXT_PUBLIC_` to access in browser
3. **Tailwind classes**: Check `tailwind.config.js` for customizations
4. **Component props**: Keep components modular and reusable
5. **Error handling**: Both frontend and backend validation is important

---

**Happy coding! 🚀**
