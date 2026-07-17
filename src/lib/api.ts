const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function createTrip(data: Record<string, unknown>) {
  const res = await fetch(`${SERVER_URL}/api/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create trip');
  }

  return res.json();
}

export async function getMyTrips() {
  const res = await fetch(`${SERVER_URL}/api/trips/mine`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch your trips');
  return res.json();
}

export async function deleteTrip(id: string) {
  const res = await fetch(`${SERVER_URL}/api/trips/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to delete trip');
  }

  return res.json();
}

export async function getAllTrips(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${SERVER_URL}/api/trips?${query}`);

  if (!res.ok) throw new Error('Failed to fetch trips');
  return res.json();
}

export async function getTripById(id: string) {
  const res = await fetch(`${SERVER_URL}/api/trips/${id}`);

  if (!res.ok) throw new Error('Failed to fetch trip');
  return res.json();
}

export async function getFeaturedTrips() {
  const res = await fetch(`${SERVER_URL}/api/trips?sort=rating&limit=4`);

  if (!res.ok) throw new Error('Failed to fetch featured trips');
  return res.json();
}
