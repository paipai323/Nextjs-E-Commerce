import { Product } from "@/types/products";
import db from "@/lib/db";

export async function fetchProducts(): Promise<Product[]> {
  const result = await db.query('SELECT id, name, price FROM products');
  return result.rows;
}

export async function storeProduct(name: string, price: number): Promise<Product> {
  const result = await db.query(
    'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
    [name, price]
  );
  return result.rows[0]
}
