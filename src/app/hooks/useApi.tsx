import {AxiosResponse} from 'axios'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'

interface IApiCaller {
  api: (arg: any) => Promise<any>
  apiArguments?: any
  onSuccess?: (arg: AxiosResponse) => void
  onError?: (arg: any) => void
  onEnd?: () => void
  onStart?: () => void
  toastMessage?: boolean
  onErrorMessage?: string | null | string
  onSuccessMessage?: string | null | string
}

export const apiCaller = async ({
  api,
  apiArguments = null,
  onSuccess,
  onError,
  onEnd,
  onStart,
  toastMessage = true,
  onErrorMessage,
  onSuccessMessage,
}: IApiCaller) => {
  if (onStart) {
    onStart()
  }
  return await api(apiArguments)
    .then((resp) => {
      if (resp.status === 200) {
        if (toastMessage && onSuccessMessage) {
          toast.dismiss()
          toast.success(onSuccessMessage)
        }
        if (onSuccess) {
          onSuccess(resp)
        }
        if (onEnd) onEnd()
        return {data: resp.data, status: resp.status}
      } else {
        if (toastMessage && onErrorMessage) {
          toast.dismiss()
          toast.error(onErrorMessage)
        }
        if (onError) {
          onError(resp)
        }
        if (onEnd) onEnd()
        return {data: null, status: resp.status}
      }
    })
    .catch((ex) => {
      if (toastMessage && onErrorMessage) {
        toast.dismiss()
        toast.error(onErrorMessage)
      }
      if (onError) {
        onError(ex)
      }
      if (onEnd) onEnd()
      return {data: null, status: ex?.response?.status}
    })
}

interface IUseApiArguments extends IApiCaller {
  waitForAuhorize?: boolean
  isAuthorized?: boolean
  waitForArguments?: boolean
}
interface IUseApiOutput {
  responseData: any
  isLoading: boolean
  responseStatus: number | null | undefined
}

export const useApi = ({
  api,
  waitForAuhorize = false,
  isAuthorized = false,
  waitForArguments = false,
  apiArguments = null,
  toastMessage = true,
  onSuccess,
  onError,
  onEnd,
  onErrorMessage = null,
  onSuccessMessage = null,
}: IUseApiArguments): IUseApiOutput => {
  const [responseData, setResponseData] = useState(null)
  const [responseStatus, setResponseStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const call = async () => {
      setIsLoading(true)
      const {data, status} = await apiCaller({
        api,
        apiArguments,
        toastMessage,
        onErrorMessage,
        onSuccessMessage,
        onError,
        onEnd,
        onSuccess,
      })
      setResponseData(data)
      setResponseStatus(status)
      setIsLoading(false)
    }

    if (!waitForAuhorize) {
      if (!waitForArguments) {
        call()
      }
      if (waitForArguments && apiArguments) {
        call()
      }
    } else {
      if (!waitForArguments && isAuthorized) {
        call()
      }
      if (waitForArguments && apiArguments && isAuthorized) {
        call()
      }
    }
  }, [waitForArguments, apiArguments, waitForAuhorize, isAuthorized])

  return {responseData, isLoading, responseStatus}
}
