import { Card, CardContent } from '@/components/ui/card'
import { Settings } from 'lucide-react'

export default function BillingPage() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Billing & Invoices</h3>
          <p className="text-muted-foreground">This feature is coming soon!</p>
        </CardContent>
      </Card>
    </div>
  )
}
