import { PropsWithChildren } from 'react'
import { GridContainer } from './Grid.styles'
import { TGridParams } from './types'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  columns,
  rows,
  children,
}: PropsWithChildren & TGridParams) => (
  <GridContainer columns={columns} rows={rows}>
    {children}
  </GridContainer>
)
