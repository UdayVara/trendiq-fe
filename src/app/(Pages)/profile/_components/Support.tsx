import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Support() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Contact Support</h3>
        <p className="text-muted-foreground">If you have any questions or issues, please fill out the form below.</p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Enter the subject of your inquiry" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Describe your issue or question" />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

