const { useState } = React;

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD", "AED"];

  const handleConvert = async () => {
    if (amount <= 0) return;
    setLoading(true);
    
    try {
      // Using ExchangeRate-API (Free Tier)
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      
      const rate = data.rates[toCurrency];
      setResult((amount * rate).toFixed(2));
    } catch (error) {
      alert("Failed to fetch real-time data. Please check your connection.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Live Currency Converter</h2>
      
      <div className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 bg-gray-50 border rounded-lg text-lg font-semibold outline-blue-500"
          placeholder="Enter amount"
        />

        <div className="flex items-center gap-2">
          <select 
            value={fromCurrency} 
            onChange={(e) => setFromCurrency(e.target.value)}
            className="flex-1 p-2 border rounded-md bg-white cursor-pointer"
          >
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          
          <span className="text-gray-400 font-bold">→</span>

          <select 
            value={toCurrency} 
            onChange={(e) => setToCurrency(e.target.value)}
            className="flex-1 p-2 border rounded-md bg-white cursor-pointer"
          >
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <button 
          onClick={handleConvert}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {loading ? "Fetching Rates..." : "Convert Now"}
        </button>

        {result && !loading && (
          <div className="mt-6 text-center animate-in fade-in duration-500">
            <p className="text-gray-500 text-sm font-medium">{amount} {fromCurrency} equals</p>
            <h1 className="text-3xl font-black text-gray-900">{result} {toCurrency}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);