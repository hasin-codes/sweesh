import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink, FileText } from 'lucide-react'
import Link from 'next/link'

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Documentation</h2>
        <p className="text-muted-foreground mb-6">
          Access our comprehensive documentation and guides
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">GitHub Repository</h3>
                <p className="text-muted-foreground text-sm">
                  View the complete documentation and source code
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="select-none">
              <Link href="https://github.com/hasin-codes/sweesh.exe/readme.md" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Docs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
