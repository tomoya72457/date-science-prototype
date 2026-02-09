'use client';

import { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewSuccess from './ReviewSuccess';

export default function ReviewContent() {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (reviewSubmitted) {
    return <ReviewSuccess onBack={() => setReviewSubmitted(false)} />;
  }

  return <ReviewForm onSubmit={() => setReviewSubmitted(true)} />;
}
