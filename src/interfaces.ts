interface Reference {
  id: string;
  sent_date: Date;
  name: string;
  area_id: number;
  other: string | null;
  who_sent: string;
  offer: string | null;
  phone: string | null;
  area: {
    zone_id: number;
    name: string;
  };
}
