'use client'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'

import 'react-pdf/dist/Page/TextLayer.css'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'


pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`


interface PdfViewerProps {
    url: string
}



export default function PdfViewer({ url }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [scale, setScale] = useState<number>(1)

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages)
    }

    const handleZoomIn = () => {
        setScale((prevScale) => Math.min(prevScale + 0.2, 3))
    }

    const handleZoomOut = () => {
        setScale((prevScale) => Math.max(prevScale - 0.2, 0.5))
    }

    const handleDownload = () => {
        window.open(url, '_blank')
    }

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages || 1))
    }

    return (
        <div className={cn("flex flex-col h-[] w-full pdf-viwer ", numPages && 'bg-gray-100')}>
            <div className="flex items-center justify-between p-2 bg-white border-b">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={scale <= 0.5}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">{Math.round(scale * 100)}%</span>
                    <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={scale >= 3}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={handlePreviousPage} disabled={currentPage <= 1}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">{currentPage} / {numPages || 1}</span>
                    <Button variant="outline" size="icon" onClick={handleNextPage} disabled={!numPages || currentPage >= numPages}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <Button variant="outline" size="icon" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                </Button>
            </div>

            <ScrollArea className=" w-full">
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<Skeleton className="flex-1 w-full h-[calc(100vh-theme(spacing.24))]" />}
                >
                    {numPages && (
                        <Page
                            pageNumber={currentPage}
                            renderTextLayer={true}
                            renderAnnotationLayer={false}
                            className="flex justify-center"
                            scale={scale}
                        />
                    )}
                </Document>
            </ScrollArea>
        </div>
    )
}