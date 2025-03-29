import { fetchProducts, storeProduct } from '@/lib/products/productService';
import { Product } from '@/types/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const products = await fetchProducts();
        return NextResponse.json({ items: products });
      } catch (err) {
        console.error('Failed to fetch products:', err); 
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
      }
}

export async function POST(request: NextRequest) {
    try {
      const { name, price } = await request.json();
  
      // Basic validation
      if (!name || typeof price !== 'number') {
        return NextResponse.json(
          { error: 'Missing or invalid name/price' },
          { status: 400 }
        );
      }
  
      const product: Product = await storeProduct(name, price);
  
      return NextResponse.json({ item: product }, { status: 201 });
    } catch (err) {
      console.error('Failed to store the product:', err);
      return NextResponse.json(
        { error: 'Failed to store the product' },
        { status: 500 }
      );
    }
  }
