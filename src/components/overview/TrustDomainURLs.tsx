import { Table, TableHeader, TableHeadCell, TableRow, TableCell } from '@/components/ui/Table'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CopyButton } from '@/components/ui/CopyButton'
import { UrlTag } from '@/components/ui/UrlTag'

interface TrustDomainURLsProps {
  urls: Array<{ type: string; url: string }>
}

export function TrustDomainURLs({ urls }: TrustDomainURLsProps) {
  return (
    <section className="flex flex-col gap-3 w-full pb-4">
      <SectionHeader title="Trust domain URLs" />

      <Table>
        <TableHeader>
          <TableHeadCell width={170} className="pl-4">URL TYPE</TableHeadCell>
          <TableHeadCell>URL</TableHeadCell>
          <TableHeadCell width={90} />
        </TableHeader>

        {urls.map((row) => (
          <TableRow key={row.type}>
            <TableCell width={170} className="pl-4">
              <span
                className="font-semibold block truncate"
                style={{ fontSize: 11, color: '#101212', letterSpacing: '0.22px' }}
              >
                {row.type}
              </span>
            </TableCell>
            <TableCell>
              <UrlTag url={row.url} />
            </TableCell>
            <TableCell width={90}>
              <CopyButton value={row.url} />
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </section>
  )
}
