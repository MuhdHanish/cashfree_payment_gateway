# **Cashfree Payment Gateway Integration** 🚀  

This is a **React + Express** project that integrates the **Cashfree Payment Gateway** for handling payments.  

## **🛠 Tech Stack**  
- **Frontend:** React, TypeScript  
- **Backend:** Express, Node.js, TypeScript  
- **Payment Gateway:** [Cashfree](https://www.cashfree.com/)  

## **📌 Features**  
- Create payment orders using Cashfree API  
- Handle payment responses  
- Simple API setup with Express  

## **📂 Project Structure**  
```
cashfree-payment-gateway/
│── client/      # React frontend
│── server/      # Express backend
│── README.md
│── .gitignore
```

## **⚙️ Setup & Installation**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/MuhdHanish/cashfree_payment_gateway.git
cd cashfree-payment-gateway
```

### **2️⃣ Install Dependencies**  

**For Backend (Express Server)**  
```sh
cd server
npm install
```

**For Frontend (React Client)**  
```sh
cd ../client
npm install
```

### **3️⃣ Set Up Environment Variables**  
Create a **`.env` file** inside the **server/** folder and add:  
```ini
CLIENT_ID=your_cashfree_client_id
CLIENT_SECRET=your_cashfree_client_secret
```

### **4️⃣ Run the Project**  

**Start Backend**  
```sh
cd server
npm run dev
```

**Start Frontend**  
```sh
cd ../client
npm run dev
```

## **🔗 API Endpoints**  

| Method | Endpoint    | Description |
|--------|-------------|-------------|
| `GET`  | `/payment`  | Create a payment order |
| `POST` | `/verify`   | Verify a payment |

---

## **📌 Notes**  
- Ensure you have a **Cashfree Sandbox Account** for testing.  
- Use a valid `CLIENT_ID` and `CLIENT_SECRET`.  
- Update `package.json` scripts if needed.  

---

### **💡 Need Help?**  
Check out the [Cashfree API Docs](https://docs.cashfree.com/) for detailed information.  