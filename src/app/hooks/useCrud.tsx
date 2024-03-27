import * as React from 'react'
import {useState, useEffect} from 'react'
import {useLoadingContext} from '../contexts/loading/loading'
import {apiCaller} from './useApi'

interface IGetListArgs<T> {
  api: (arg: any) => Promise<any>
  arg?: any
  onSuccess: (data: T[]) => void
}
interface IManipulateArgs {
  api: (arg: any) => Promise<any>
  arg: any
  onSuccess: () => void
}
interface IGetDetailsArgs<T> {
  api: (arg: any) => Promise<any>
  arg: any
  onSuccess: (data: T) => void
}

const useCrud = <T extends any>() => {
  const {handleCloseLoadingOverlay, handleOpenLoadingOverlay} = useLoadingContext()

  const getList = ({api, arg, onSuccess}: IGetListArgs<T>) => {
    apiCaller({
      api: api,
      apiArguments: arg,
      toastMessage: true,
      onErrorMessage: 'دریافت لیست با خطا مواجه شد .',
      onStart: handleOpenLoadingOverlay,
      onEnd: handleCloseLoadingOverlay,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.status == 200) {
          onSuccess(resp.data?.data?.data as T[])
        }
      },
    })
  }
  const handleDelete = ({api, arg, onSuccess}: IManipulateArgs) => {
    apiCaller({
      api: api,
      apiArguments: arg,
      toastMessage: true,
      onErrorMessage: 'حذف با خطا مواجه شد .',
      onStart: handleOpenLoadingOverlay,
      onEnd: handleCloseLoadingOverlay,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.status == 200) {
          onSuccess()
        }
      },
    })
  }
  const handleEdit = ({api, arg, onSuccess}: IManipulateArgs) => {
    apiCaller({
      api: api,
      apiArguments: arg,
      toastMessage: true,
      onErrorMessage: 'ویرایش با خطا مواجه شد .',
      onStart: handleOpenLoadingOverlay,
      onEnd: handleCloseLoadingOverlay,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.status == 200) {
          onSuccess()
        }
      },
    })
  }
  const handleGetDetails = ({api, arg, onSuccess}: IGetDetailsArgs<T>) => {
    apiCaller({
      api: api,
      apiArguments: arg,
      toastMessage: true,
      onErrorMessage: 'حذف با خطا مواجه شد .',
      onStart: handleOpenLoadingOverlay,
      onEnd: handleCloseLoadingOverlay,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.status == 200) {
          onSuccess(resp.data?.data?.data)
        }
      },
    })
  }

  return {getList, handleDelete, handleEdit, handleGetDetails}
}

export default useCrud
