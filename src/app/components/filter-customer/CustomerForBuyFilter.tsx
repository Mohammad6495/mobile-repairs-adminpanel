import React, {useEffect} from 'react'

import * as customerInputs from './input'
import { locationSearchStringToObject } from '../../utils/queystringHelper'
import { useLocation } from 'react-router-dom'




type TProps = {
  searchCustomerHandle: (searchValue: string) => void
}

const CustomerForBuyFilter: React.FC<TProps> = ({searchCustomerHandle}) => {
  const location = useLocation()
  let qs = decodeURIComponent(location.search) ?? "";
    let qo = locationSearchStringToObject(qs) ?? {};

  const {
    Input: customerSearchInput,
    validate: customerSearchValidate,
    Value: customerSearchValue,
  } = customerInputs.useSearchCustomer({
    initialvalue: qo?.search || '',
    className: 'col-lg-4 mt-4 ',
  })

  useEffect(() => {
    searchCustomerHandle(String(customerSearchValue))
  }, [customerSearchValue])
  return <div className='customer-for-buy-filter'>{customerSearchInput()}</div>
}

export default CustomerForBuyFilter
