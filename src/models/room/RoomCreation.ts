import { Description, Example, Required } from "@tsed/schema";

export class RoomCreation {
  @Description("Room name")
  @Required()
  @Example("Room 1")
  name: string;

  @Description("Room description")
  @Required()
  @Example("Room 1 description")
  description: string;

  @Description("Room capacity")
  @Required()
  @Example(2)
  capacity: number;

  @Description("Room number of beds")
  @Required()
  @Example(2)
  nbBed: number;

  @Description("Room price (in €uros)")
  @Required()
  @Example(100.0)
  price: number;

  @Description("Room Hotel ID")
  @Required()
  @Example(1)
  hotelId: number;

  @Description("Room features IDs")
  @Required()
  @Example([1, 2, 3])
  featuresIds: number[];

  @Description("Room images URLs")
  @Required()
  @Example(["https://www.example.com/image1.jpg", "https://www.example.com/image2.jpg"])
  images: string[];

  constructor(obj: Partial<RoomCreation> = {}) {
    Object.assign(this, obj);
  }
}
