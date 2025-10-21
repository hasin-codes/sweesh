import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-muted-foreground mb-6">
          Get in touch with our team for support or inquiries
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Mail className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-muted-foreground text-sm">
                  Send us an email for any questions or support needs
                </p>
              </div>
            </div>
            <Button asChild className="select-none">
              <Link href="mailto:hasin.innit@gmail.com?subject=Support Request&body=Hi, I need help with...">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
