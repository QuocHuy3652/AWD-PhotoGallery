export interface Photo {
  id: string;
  urls: {
    small: string;
    thumb: string;
    full: string;
  };
  user: {
    id: string;
    name: string;
    profile_image: {
      small: string;
    };
  };
  description?: string;
  title?: string;
}

export interface PhotoDetails {
  id: string;
  urls: { full: string };
  user: { name: string };
  description: string | null;
  alt_description: string | null;
}