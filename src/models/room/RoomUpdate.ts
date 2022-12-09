export class RoomUpdate {
  name?: string;
  description?: string | null;
  price?: number;
  isAvailable?: boolean;
  featuresIds: number[];
  images?: string[];
  nbBed?: number;
  capacity?: number;

  constructor(obj: Partial<RoomUpdate> = {}) {
    Object.assign(this, obj);
  }
}
