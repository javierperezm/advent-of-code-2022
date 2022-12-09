import styled from 'styled-components'
import type { TGridParams } from './types'

export const GridContainer = styled.div<TGridParams>`
  margin: 0 auto;
  padding: 1px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 10px);
  grid-template-rows: repeat(${(props) => props.rows}, 10px);
  gap: 1px;
  font-size: 8px;
`
