import { Description, Example, Required } from "@tsed/schema";

export class HotelCreation {
  @Description("Hotel name")
  @Required()
  @Example("Hotel Name")
  name: string;

  @Description("Hotel description")
  @Example("Hotel Description")
  description: string | null;

  @Description("Hotel address")
  @Required()
  @Example("Hotel Address")
  address: string;

  @Description("Hotel city")
  @Required()
  @Example("Toulouse")
  city: string;

  @Description("Hotel zip/postal code")
  @Required()
  @Example("31000")
  zip: string;

  @Description("Hotel state/region/province")
  @Required()
  @Example("Haute Garonne")
  state: string;

  @Description("Hotel country")
  @Required()
  @Example("France")
  country: string;

  @Description("Hotel phone number")
  @Example("0123456789")
  phone: string | null;

  @Description("Hotel email")
  @Required()
  @Example("contact@domain")
  email: string;

  @Description("Hotel website")
  @Example("https://domain")
  website: string | null;

  @Description("Hotel latitude")
  @Required()
  @Example(43.604652)
  latitude: number;

  @Description("Hotel longitude")
  @Required()
  @Example(1.444209)
  longitude: number;

  @Description("Hotel Manager Account ID")
  @Required()
  @Example("1")
  authId: number;

  @Description("Hotel features IDs")
  @Required()
  @Example([1, 2, 3])
  featuresIds: number[];

  @Description("Hotel images")
  @Required()
  @Example(["https://domain/image1.jpg", "https://domain/image2.jpg"])
  images: string[];

  constructor(obj: Partial<HotelCreation> = {}) {
    if (!this.description) this.description = "";
    if (!this.phone) this.phone = "";
    if (!this.website) this.website = "";

    Object.assign(this, obj);
  }
}
