export class HotelUpdate {
  name?: string;
  description?: string | null;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string | null;
  email?: string;
  website?: string | null;
  authId?: number;
  state?: string;
  latitude?: number;
  longitude?: number;
  featuresIds?: number[];
  images?: string[];

  constructor(obj: Partial<HotelUpdate> = {}) {
    Object.assign(this, obj);
  }
}
