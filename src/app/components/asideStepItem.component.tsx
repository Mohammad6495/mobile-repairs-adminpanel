import * as React from 'react'
import { useState, useEffect } from 'react'
import { getItem } from '../utils/localstorage'
import { themeModeLSKey } from '../../_metronic/partials'
///////////// PROPS INTERFACE
interface IProps {
  currentStep: number
  stepNumber: number
  title: string
  tip?: string
  onClick?: (stepNumber: number) => void
  className?: string
}
//////////// COMPONENT
const AsideStepItem = ({ currentStep, stepNumber, title, tip, onClick, className = '' }: IProps) => {
  const colorTextLocal = getItem(themeModeLSKey)
  const isCurrentStep = currentStep == stepNumber
  const isPassed = currentStep > stepNumber
  //////////// RENDER
  return (
    <div className={className + ' d-flex flex-row justify-content-start align-items-center'}>
      <span
        style={{ width: '40px', minWidth: '40px', height: '40px', transition: '0.3s' }}
        className={
          (isCurrentStep ? 'bg-primary' : 'bg-light-primary') +
          ' rounded rounded-lg d-flex flex-row justify-content-center align-items-center'
        }
      >
        {isPassed ? (
          <i className='stepper-check fas fa-check'></i>
        ) : (
          <span
            style={{
              fontSize: '1.5rem',
            }}
            className={isCurrentStep ? 'text-white' : 'text-primary'}
          >
            {stepNumber + 1}
          </span>
        )}
      </span>
      <div
        // style={{height: '40px'}}
        className='ms-3 d-flex flex-column justify-content-center align-items-start'
      >
        <h4
          style={{
            color: isCurrentStep ? colorTextLocal == 'light' ? '#000' : '#fff' : isPassed ? '#a1a5b7' : '#3f4254',
            transition: '0.3s',
          }}
          className='h4 m-0 p-0'
        >
          {title}
        </h4>
        {tip && (
          <div
            style={{
              color: isCurrentStep ? colorTextLocal == 'light' ? '#000' : '#fff' : isPassed ? '#b5b5c3' : '#a1a5b7',
              transition: '0.3s',
            }}
            className='fs-7 mt-1'
          >
            {tip}
          </div>
        )}
      </div>
    </div>
  )
}

export default AsideStepItem
