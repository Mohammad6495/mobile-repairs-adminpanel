import * as React from 'react'
import {useState, useEffect} from 'react'
import {Table} from 'react-bootstrap'
import {useWindowDimensions} from '../../hooks/getWindowDimensions'
//////////////////////////////////////////
type THideExpandSize = 'sm' | 'md' | 'lg' | 'xl'
interface ITableColumn {
  key: string
  label?: string
  width?: number
  hideExpandSize: boolean | THideExpandSize
  className?: string
}
interface ITableCell {
  key: string
  children?: string | React.ReactNode
  hideExpandSize: boolean | THideExpandSize
  className?: string
}
interface ITableRow {
  key: string
  className?: string
  cells: ITableCell[]
}
interface ITableProps {
  expandSize: THideExpandSize
  rows: ITableRow[]
  columns: ITableColumn[]
  className?: string
  isPending: boolean
}
//////////////////////////////////////////
const useExpandableTable = ({
  columns = [],
  rows = [],
  isPending,
  expandSize = 'lg',
}: ITableProps) => {
  ////////////
  const {width} = useWindowDimensions()
  const isReachedTo_XL = () => {
    if (width == 1200) return true
    return false
  }
  const isReachedTo_LG = () => {
    if (width == 992) return true
    return false
  }
  const isReachedTo_MD = () => {
    if (width == 768) return true
    return false
  }
  const isReachedTo_SM = () => {
    if (width == 576) return true
    return false
  }
  ////////////////////
  const shouldBeHidden = (th: ITableColumn | ITableCell) => {
    if (th.hideExpandSize == 'sm') {
      return isReachedTo_SM()
    }
    if (th.hideExpandSize == 'md') {
      return isReachedTo_MD()
    }
    if (th.hideExpandSize == 'lg') {
      return isReachedTo_LG()
    }
    if (th.hideExpandSize == 'xl') {
      return isReachedTo_XL()
    }
  }
  ////////////
  const renderer = () => {
    const getTHStyles = (th: ITableColumn) => {
      if (th.width) {
        return {width: th.width + 'px'}
      } else return {}
    }
    return (
      <Table hover striped responsive='xl' className='gs-7 gy-3'>
        <thead className=''>
          <tr>
            {columns?.length > 0 &&
              columns.map((th) =>
                shouldBeHidden(th) ? (
                  <></>
                ) : (
                  <th
                    key={th.key}
                    scope='col'
                    className={th.className ?? ''}
                    style={getTHStyles(th)}
                  >
                    {th.label ?? ''}
                  </th>
                )
              )}
          </tr>
        </thead>
        <tbody className=''>
          {isPending && (
            <tr>
              <td>در حال بارگذاری ...</td>
            </tr>
          )}
          {!isPending &&
            rows?.length == 0 &&
            rows &&
            rows?.length > 0 &&
            rows.map((row, index) => (
              <>
                <tr key={index} className={row.className ?? ''}>
                  {row.cells?.length > 0 &&
                    row.cells
                      .filter((c) => !shouldBeHidden(c))
                      .map((cell) => (
                        <td key={cell.key} className={cell.className ?? ''}>
                          {cell.children}
                        </td>
                      ))}
                </tr>
                {row.cells.filter((c) => shouldBeHidden(c)).length > 0 && (
                  <div>
                    {row.cells?.length > 0 &&
                      row.cells
                        .filter((c) => shouldBeHidden(c))
                        .map((cell) => (
                          <td key={cell.key} className={cell.className ?? ''}>
                            {cell.children}
                          </td>
                        ))}
                  </div>
                )}
              </>
            ))}
        </tbody>
      </Table>
    )
  }

  return {renderer}
}

export default useExpandableTable
