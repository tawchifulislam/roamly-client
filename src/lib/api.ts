export async function createTrip(data: Record<string, unknown>) {
  const res = await fetch(`/api/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ message: 'Failed to create trip' }));
    throw new Error(err.message || 'Failed to create trip');
  }

  return res.json();
}

export async function getMyTrips() {
  const res = await fetch(`/api/trips/mine`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch your trips');
  return res.json();
}

export async function deleteTrip(id: string) {
  const res = await fetch(`/api/trips/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ message: 'Failed to delete trip' }));
    throw new Error(err.message || 'Failed to delete trip');
  }

  return res.json();
}

export async function getAllTrips(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/trips?${query}`);

  if (!res.ok) throw new Error('Failed to fetch trips');
  return res.json();
}

export async function getTripById(id: string) {
  const res = await fetch(`/api/trips/${id}`);

  if (!res.ok) throw new Error('Failed to fetch trip');
  return res.json();
}

export async function getFeaturedTrips() {
  const res = await fetch(`/api/trips?sort=rating&limit=4`);

  if (!res.ok) throw new Error('Failed to fetch featured trips');
  return res.json();
}

export async function getRelatedTrips(location: string, excludeId: string) {
  const params = new URLSearchParams({ location, limit: '4' });
  const res = await fetch(`/api/trips?${params}`);

  if (!res.ok) throw new Error('Failed to fetch related trips');
  const data = await res.json();

  return data.trips.filter((t: { _id: string }) => t._id !== excludeId);
}

export async function sendChatMessage(
  message: string,
  conversationId?: string,
) {
  const res = await fetch(`/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ message, conversationId }),
  });

  if (!res.ok) throw new Error('Failed to get chat response');
  return res.json();
}

export async function submitRating(tripId: string, value: number) {
  const res = await fetch(`/api/ratings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ tripId, value }),
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ message: 'Failed to submit rating' }));
    throw new Error(err.message || 'Failed to submit rating');
  }

  return res.json();
}

export async function getMyRatings() {
  const res = await fetch(`/api/ratings/mine`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch your ratings');
  return res.json();
}
