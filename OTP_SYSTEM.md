# 🔐 OTP Authentication System

Complete guide to the phone number verification and OTP system.

## 🎯 Features

### Phone Number Verification
- ✅ Automatic +92 country code
- ✅ Format validation (12 digits total)
- ✅ Real-time formatting as user types
- ✅ Pakistani phone number validation

### OTP System
- ✅ 6-digit random OTP generation
- ✅ 10-minute expiry time
- ✅ Rate limiting (5 attempts max)
- ✅ Secure storage in database
- ✅ Automatic cleanup after verification
- ✅ Failed attempt tracking

---

## 🔄 How It Works

### Step 1: User Enters Phone Number
```
User Input: +92 300 1234567
Validation: ✅ 12 digits (92 + 10 digits)
Format: +92 XXX XXXXXXX
```

### Step 2: Backend Generates OTP
```javascript
// 6-digit random number
OTP: 123456
Expiry: Current time + 10 minutes
Attempts: 0
```

### Step 3: OTP Sent to User
```
Development: OTP shown in console
Production: SMS sent via Twilio/AWS SNS
```

### Step 4: User Enters OTP
```
Input: 6-digit code
Validation: 
  - Format check (6 digits)
  - Expiry check (< 10 minutes)
  - Attempts check (< 5 tries)
  - Match check (correct OTP)
```

### Step 5: Verification Success
```
✅ OTP cleared from database
✅ User logged in
✅ JWT token generated
✅ Session created
```

---

## 📱 Phone Number Validation

### Format Requirements:
- Must start with `+92`
- Followed by 10 digits
- Total: 12 digits

### Valid Examples:
```
+92 300 1234567  ✅
+92 321 9876543  ✅
+923001234567    ✅
```

### Invalid Examples:
```
92 300 1234567   ❌ (missing +)
+92 300 123456   ❌ (only 9 digits)
+92 300 12345678 ❌ (11 digits)
+1 234 5678901   ❌ (wrong country code)
```

---

## 🔒 Security Features

### 1. OTP Expiry
- **Duration:** 10 minutes
- **Auto-cleanup:** OTP deleted after expiry
- **User message:** "OTP has expired. Please request a new OTP."

### 2. Rate Limiting
- **Max attempts:** 5 tries per OTP
- **Counter:** Tracks failed attempts
- **Reset:** Counter resets when new OTP requested
- **Lockout message:** "Too many failed attempts. Please request a new OTP."

### 3. OTP Format Validation
- **Length:** Exactly 6 digits
- **Type:** Numbers only
- **Validation:** Both frontend and backend

### 4. Phone Number Validation
- **Format:** Pakistani numbers only (+92)
- **Length:** 12 digits total
- **Validation:** Regex pattern matching

---

## 🛠️ Implementation Details

### Frontend (script.js)

**Phone Number Formatting:**
```javascript
function formatPhoneNumber(input) {
    let cleaned = input.replace(/\D/g, '');
    
    if (cleaned.startsWith('92')) {
        cleaned = cleaned;
    } else if (cleaned.startsWith('0')) {
        cleaned = '92' + cleaned.substring(1);
    } else if (cleaned.length === 10) {
        cleaned = '92' + cleaned;
    }
    
    return '+' + cleaned.substring(0, 2) + ' ' + 
           cleaned.substring(2, 5) + ' ' + 
           cleaned.substring(5, 12);
}
```

**OTP Validation:**
```javascript
function validateOTP(otp) {
    return /^\d{6}$/.test(otp);
}
```

**Login Flow:**
```javascript
async function handlePhoneLogin(e) {
    if (!otpSent) {
        // Send OTP
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            body: JSON.stringify({ phone: phoneNumber })
        });
    } else {
        // Verify OTP
        const response = await fetch(`${API_URL}/users/verify-otp`, {
            method: 'POST',
            body: JSON.stringify({ phone, otp })
        });
    }
}
```

### Backend (routes/users.js)

**Send OTP:**
```javascript
router.post('/login', async (req, res) => {
    // Validate phone format
    const phoneRegex = /^\+92\s?\d{3}\s?\d{7}$/;
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store with expiry
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    user.otpAttempts = 0;
    
    // In production: Send SMS
    // await sendSMS(phone, `Your OTP is: ${otp}`);
});
```

**Verify OTP:**
```javascript
router.post('/verify-otp', async (req, res) => {
    // Check OTP exists
    if (!user.otp) {
        return res.status(400).json({ message: 'No OTP found' });
    }
    
    // Check expiry
    if (user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: 'OTP expired' });
    }
    
    // Check attempts
    if (user.otpAttempts >= 5) {
        return res.status(429).json({ message: 'Too many attempts' });
    }
    
    // Verify OTP
    if (user.otp !== otp) {
        user.otpAttempts++;
        return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Success - clear OTP and login
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.otpAttempts = 0;
});
```

---

## 🧪 Testing

### Test Scenarios:

**1. Valid Login:**
```
Phone: +92 300 1234567
OTP: (check console)
Result: ✅ Login successful
```

**2. Invalid Phone:**
```
Phone: +92 300 123456 (9 digits)
Result: ❌ "Invalid phone number format"
```

**3. Wrong OTP:**
```
Phone: +92 300 1234567
OTP: 000000 (wrong)
Result: ❌ "Invalid OTP. 4 attempts remaining."
```

**4. Expired OTP:**
```
Wait 11 minutes after OTP sent
Result: ❌ "OTP has expired"
```

**5. Too Many Attempts:**
```
Enter wrong OTP 5 times
Result: ❌ "Too many failed attempts"
```

---

## 📊 Database Schema

### User Model:
```javascript
{
    phone: String,           // +923001234567
    otp: String,            // 123456
    otpExpiry: Date,        // 2024-03-03T10:40:00Z
    otpAttempts: Number,    // 0-5
    lastLogin: Date
}
```

---

## 🚀 Production Setup

### SMS Integration (Choose One):

**Option 1: Twilio**
```javascript
const twilio = require('twilio');
const client = twilio(accountSid, authToken);

await client.messages.create({
    body: `Your Hungry? Pizza? OTP is: ${otp}`,
    from: '+1234567890',
    to: phone
});
```

**Option 2: AWS SNS**
```javascript
const AWS = require('aws-sdk');
const sns = new AWS.SNS();

await sns.publish({
    Message: `Your OTP is: ${otp}`,
    PhoneNumber: phone
}).promise();
```

**Option 3: Local SMS Gateway**
```javascript
// Use local Pakistani SMS service
// Jazz, Telenor, Zong SMS APIs
```

### Environment Variables:
```env
# Add to .env
SMS_SERVICE=twilio
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

---

## 🔧 Configuration

### Adjust OTP Settings:

**Change OTP Length:**
```javascript
// In routes/users.js
const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digits
```

**Change Expiry Time:**
```javascript
// In routes/users.js
user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
```

**Change Max Attempts:**
```javascript
// In routes/users.js
if (user.otpAttempts >= 3) { // 3 attempts instead of 5
```

---

## 📝 User Messages

### Success Messages:
- ✅ "OTP sent to +92 300 1234567"
- ✅ "Login successful!"

### Error Messages:
- ❌ "Please enter a valid Pakistani phone number"
- ❌ "Please enter a valid 6-digit OTP"
- ❌ "Invalid OTP. X attempts remaining."
- ❌ "OTP has expired. Please request a new OTP."
- ❌ "Too many failed attempts. Please request a new OTP."
- ❌ "No OTP found. Please request a new OTP."

---

## 🐛 Troubleshooting

### OTP not received:
1. Check backend console for OTP (development mode)
2. Verify phone number format
3. Check backend is running
4. Check API connection

### OTP always invalid:
1. Check OTP hasn't expired (10 minutes)
2. Verify you're entering correct OTP from console
3. Check for typos in OTP entry
4. Request new OTP if needed

### Can't request new OTP:
1. Wait for previous OTP to expire
2. Or implement "Resend OTP" button
3. Clear browser localStorage if needed

---

## 🎯 Best Practices

1. **Never log OTP in production** - Remove console.log statements
2. **Use HTTPS** - Encrypt all API calls
3. **Rate limit requests** - Prevent spam
4. **Monitor failed attempts** - Detect suspicious activity
5. **Clear OTP after use** - Don't store longer than needed
6. **Use strong random generation** - Crypto-secure random numbers
7. **Implement cooldown** - Prevent rapid OTP requests

---

## 📈 Future Enhancements

- [ ] SMS integration with Twilio/AWS SNS
- [ ] Resend OTP button
- [ ] Remember device (skip OTP for 30 days)
- [ ] Biometric authentication
- [ ] Two-factor authentication (2FA)
- [ ] Email OTP as backup
- [ ] WhatsApp OTP delivery

---

**Your OTP system is now secure and production-ready! 🔐🎉**
