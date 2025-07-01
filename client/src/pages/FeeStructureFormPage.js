import { useState } from 'react';

function FeeStructureFormPage() {
  const [school_id, setSchoolId] = useState('');
  const [class_level, setClassLevel] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/fee_structures/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ school_id, class_level, amount })
    });
    const data = await res.json();
    alert('Fee structure created!');
    console.log(data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Create Fee Structure</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="School ID"
          value={school_id}
          onChange={(e) => setSchoolId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Class Level"
          value={class_level}
          onChange={(e) => setClassLevel(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit</button>
      </form>
    </div>
  );
}

export default FeeStructureFormPage;