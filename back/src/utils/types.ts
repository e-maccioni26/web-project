export type UserAttributesEncoded = {
  id: string;
  nom: string;
  email: string;
  mot_de_passe: string;
  date_creation: Date;
};

export type UserAttributesDecoded = {
  id: number;
  nom: string;
  email: string;
  mot_de_passe: string;
  date_creation: Date;
};
