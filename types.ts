export interface Banner {
  id: string; // Unique identifier for the banner
  label: string; // Text label for the banner
  imageUrl: string; // URL of the banner image
}

export interface Category {
  id: string; // Unique identifier for the category
  name: string; // Name of the category
  banner: Banner; // URL of the category image
}

export interface Product {
  id: string; // Unique identifier for the product
  name: string; // Name of the product
  price: string; // Price of the product
  images: Image[]; // URL of the product image
  category: Category; // ID of the category to which the product belongs
  isFeatured: boolean; // Indicates if the product is featured
}

export interface Image {
  id: string; // Unique identifier for the image
  url: string; // URL of the image
}
