'use client';

import { useState, useEffect } from 'react';
import LandingForm from '@/components/admin/LandingForm';

export default function LandingAdmin() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/admin/landing').then(r => r.json()).then(setData);
  }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal mb-6">Landing Page</h1>
      {data ? (
        <LandingForm initialData={data} />
      ) : (
        <div className="text-center py-12 text-charcoal-light">Loading...</div>
      )}
    </div>
  );
}
