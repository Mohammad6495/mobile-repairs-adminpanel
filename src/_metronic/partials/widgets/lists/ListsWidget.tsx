/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {ReactNode} from 'react'
import {KTSVG} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className?: string
  title?: string
  subtitle?: string | null
  list?: any[]
  item?: any
}

const ListWidget: React.FC<Props> = ({className = '', title, subtitle, list, item: Item}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      {title ? (
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold text-dark'>{title}</span>
            {subtitle && <span className='text-muted mt-1 fw-semibold fs-7'>{subtitle}</span>}
          </h3>
        </div>
      ) : (
        <></>
      )}
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body pt-5'>
        {list && list?.length > 0 && list?.map((it) => <Item {...it} />)}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ListWidget}

/*
 <div className='d-flex align-items-center mb-7'>
 <div className='symbol symbol-50px me-5'>
   <span className='symbol-label bg-light-success'>
     <KTSVG
       path='/media/icons/duotune/abstract/abs027.svg'
       className='svg-icon-2x svg-icon-success'
     />
   </span>
 </div>
 <div className='d-flex flex-column'>
   <a href='#' className='text-dark text-hover-primary fs-6 fw-bold'>
     Project Briefing
   </a>
   <span className='text-muted fw-semibold'>Project Manager</span>
 </div>
</div>
*/
