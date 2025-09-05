import type { ProductCategory, AddProductResponse } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

class ApiService {
  private categoriesCache: ProductCategory[] | null = null;

  async getProductCategories(): Promise<ProductCategory[]> {
    if (this.categoriesCache) {
      return this.categoriesCache;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/category-list`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const categories: string[] = await response.json();
      
      this.categoriesCache = categories.map(category => {
        const simpleNames: { [key: string]: string } = {
          'beauty': 'Beauty Salon',
          'fragrances': 'Perfume Store',
          'furniture': 'Furniture Store',
          'groceries': 'Grocery Store',
          'home-decoration': 'Home Decor Shop',
          'kitchen-accessories': 'Kitchen Store',
          'laptops': 'Computer Store',
          'mens-shirts': 'Clothing Store',
          'mens-shoes': 'Shoe Store',
          'mens-watches': 'Watch Shop',
          'mobile-accessories': 'Phone Accessories',
          'motorcycle': 'Motorcycle Dealership',
          'skin-care': 'Pharmacy',
          'smartphones': 'Electronics Store',
          'sports-accessories': 'Sports Store',
          'sunglasses': 'Optical Store',
          'tablets': 'Electronics Store',
          'tops': 'Clothing Store',
          'vehicle': 'Car Dealership',
          'womens-bags': 'Accessories Store',
          'womens-dresses': 'Fashion Boutique',
          'womens-jewellery': 'Jewelry Store',
          'womens-shoes': 'Shoe Store',
          'womens-watches': 'Watch Shop',
        };
        
        return {
          slug: category,
          name: simpleNames[category] || category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ') + ' Store',
          url: `${API_BASE_URL}/products/category/${category}`
        };
      });

      return this.categoriesCache;
    } catch (error) {
      console.error('Error fetching product categories:', error);
      // Return simple, well-known fallback categories in case of API failure
      return [
        { slug: 'office', name: 'Office Work', url: '' },
        { slug: 'retail', name: 'Retail Store', url: '' },
        { slug: 'restaurant', name: 'Restaurant', url: '' },
        { slug: 'hospital', name: 'Hospital', url: '' },
        { slug: 'school', name: 'School', url: '' },
        { slug: 'bank', name: 'Bank', url: '' },
        { slug: 'factory', name: 'Factory', url: '' },
        { slug: 'hotel', name: 'Hotel', url: '' }
      ];
    }
  }

  async submitLoanApplication(title: string): Promise<AddProductResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: AddProductResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error submitting loan application:', error);
      throw new Error('Failed to submit loan application. Please try again.');
    }
  }

  clearCache(): void {
    this.categoriesCache = null;
  }
}

export const apiService = new ApiService();