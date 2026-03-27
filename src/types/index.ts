export interface User {
  id: number;
  full_name: string;
  username: string;
  description?: string;
  birthdate?: string;
  role: "ADMIN" | "CLIENT";
  profile_picture_url?: string;
}

export interface ProductImage {
  id: number;
  image_url: string;
  display_order: number;
}

export interface ProductSizeStock {
  id: number;
  stock_quantity: number;
  product_size_id: number;
  size_name?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku?: string;
  age_group?: string;
  material?: string;
  season?: string;
  country_of_origin?: string;
  brand_id: number;
  brand_name?: string;
  category_id: number;
  category_name?: string;
  gender_id: number;
  gender_name?: string;
  images: ProductImage[];
  size_stocks: ProductSizeStock[];
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name?: string;
  product_size_id: number;
  size_name?: string;
  quantity: number;
  unit_price: number;
}

export interface OrderEvent {
  id: number;
  old_state?: string;
  new_state: string;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: number;
  user_id: number;
  order_state: string;
  order_date: string;
  total: number;
  stripe_payment_intent_id?: string;
  order_items: OrderItem[];
  events: OrderEvent[];
}

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Gender {
  id: number;
  name: string;
}

export interface ProductSize {
  id: number;
  name: string;
}

export interface Address {
  id: number;
  full_name: string;
  street: string;
  city: string;
  state?: string;
  zip_code: string;
  country: string;
  phone?: string;
  is_default: boolean;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  notification_type?: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  size_id: number;
  size_name: string;
  quantity: number;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
