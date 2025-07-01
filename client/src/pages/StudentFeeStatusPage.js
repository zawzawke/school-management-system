import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function StudentFeeStatusPage() {
  const { studentId } = useParams();
  const [feeStatus, setFeeStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/students/${studentId}/fee-status`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch fee status');
        }
        return res.json();
      })
      .then(setFeeStatus)
      .catch((err) => setError(err.message));
  }, [studentId]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!feeStatus) return <p>Loading fee status...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Fee Status</h2>
      <p><strong>Expected Fee:</strong> KES {feeStatus.expected_fee}</p>
      <p><strong>Total Paid:</strong> KES {feeStatus.total_paid}</p>
      <p><strong>Balance:</strong> KES {feeStatus.balance}</p>
    </div>
  );
}

export default StudentFeeStatusPage;
