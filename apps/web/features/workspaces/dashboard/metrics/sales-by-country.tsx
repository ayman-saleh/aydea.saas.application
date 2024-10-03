import { HStack, Progress, Text } from '@chakra-ui/react'
import { ColumnDef, DataTable } from '@saas-ui/react'
import { useIntl } from 'react-intl'

import { MetricsCard } from './metrics-card'

interface Data {
  id: string
  country: string
  sales: number
  total: number
}

const total = 43400

const getPercentage = (value: number) => {
  return Math.round((100 / total) * value)
}

const columns: ColumnDef<Data>[] = [
  {
    id: 'country',
    header: 'Country',
  },
  {
    id: 'sales',
    header: 'Sales',
    cell: (cell) => {
      return (
        <HStack justifyContent="space-between" flex="1">
          <Progress
            value={getPercentage(cell.row.getValue('total'))}
            size="xs"
            colorScheme="primary"
            width="60px"
          />
          <Text>{cell.getValue<string>()}</Text>
        </HStack>
      )
    },
    meta: {
      isNumeric: true,
    },
    size: 100,
  },
  {
    id: 'total',
    header: 'Total',
    cell: ({ getValue }) => {
      const intl = useIntl()

      return (
        <>
          {intl.formatNumber(getValue<number>(), {
            currency: 'EUR',
            style: 'currency',
            maximumFractionDigits: 0,
          })}
        </>
      )
    },
    meta: {
      isNumeric: true,
    },
    size: 100,
  },
]

export const SalesByCountry = ({ data = [] }: { data: Data[] }) => {
  return (
    <MetricsCard title="Top countries" noPadding>
      <DataTable
        columns={columns}
        data={data}
        size="md"
        isSortable
        sx={{
          td: {
            py: 2.5,
          },
        }}
      />
    </MetricsCard>
  )
}
