import { Metadata } from 'next'

import ProductForm from '@/components/shared/admin/product-form'

export const metadata: Metadata = {
  title: 'Create Product',
}

export default function CreateProductPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="h2-bold">
        Create Product
      </h1>

      <ProductForm type="Create" />
    </div>
  )
}