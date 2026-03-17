import { Table, TableHeader, TableHeadCell, TableRow, TableCell, useColumnWidths } from '@/components/ui/Table'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CopyButton } from '@/components/ui/CopyButton'
import { UrlTag } from '@/components/ui/UrlTag'

interface TrustDomainURLsProps {
  urls: Array<{ type: string; url: string }>
}

export function TrustDomainURLs({ urls }: TrustDomainURLsProps) {
  const { widths, setWidth } = useColumnWidths('trust-domain-urls-cols', { urlType: 170, copyBtn: 90 })

  return (
    <section className="flex flex-col gap-3 w-full pb-4">
      <SectionHeader title="Trust domain URLs" />

      <Table>
        <TableHeader>
          <TableHeadCell width={widths.urlType} className="pl-4" onResize={d => setWidth('urlType', Math.max(60, widths.urlType + d))}>URL TYPE</TableHeadCell>
          <TableHeadCell>URL</TableHeadCell>
          <TableHeadCell width={widths.copyBtn} onResize={d => setWidth('copyBtn', Math.max(60, widths.copyBtn + d))} />
        </TableHeader>

        {urls.map((row) => (
          <TableRow key={row.type}>
            <TableCell width={widths.urlType} className="pl-4">
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
            <TableCell width={widths.copyBtn}>
              <CopyButton value={row.url} />
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </section>
  )
}
