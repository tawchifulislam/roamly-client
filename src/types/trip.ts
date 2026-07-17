export interface Trip {
  _id: string;
  type: 'package' | 'destination';
  title: string;
  images: string[];
  location: string;
  shortDescription: string;
  fullDescription: string;
  price?: number;
  duration?: string;
  rating: number;
  tags: string[];
  bestTimeToVisit?: string;
  createdBy: string;
  createdAt: string;
}
