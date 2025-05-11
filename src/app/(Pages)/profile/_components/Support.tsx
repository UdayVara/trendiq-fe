import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addSupportTicket } from "@/api/support.actions";
import { toast } from "sonner";

// Zod schema
const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function Support() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form Submitted:", data);
    try {
      const res = await addSupportTicket(data);

      if (res.success) {
        toast.success(res.message || "Ticket Added Successfully");
        reset();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error:any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <p className="text-muted-foreground">
          If you have any questions or issues, please fill out the form below.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="Enter the subject of your inquiry"
            {...register("subject")}
          />
          {errors.subject && (
            <p className="text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Describe your issue or question"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
