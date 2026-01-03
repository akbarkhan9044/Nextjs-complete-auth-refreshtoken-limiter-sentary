import React, { Suspense } from 'react'
import { getDataProductFromId } from '../../lib/data';
import ProductDetail from '../../component/DetailComponent';

export default async function DetailPage({params}) {
    // const{ id}=await params;
    // const response=await getDataProductFromId(id);

  return (
    <div>
        <Suspense fallback="Loading">
        <ProductDetail  params={params} />
        </Suspense>

    </div>
  )
}
