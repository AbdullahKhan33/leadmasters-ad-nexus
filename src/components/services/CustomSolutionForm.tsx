
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  requirements: z.string().min(10, "Please describe your requirements in detail")
});

interface CustomSolutionFormProps {
  onSubmit: () => void;
}

export function CustomSolutionForm({ onSubmit }: CustomSolutionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      requirements: ""
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log("Custom solution form submitted:", values);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    onSubmit();
    form.reset();
  };

  return (
    <Card className="border border-gray-200 shadow-sm bg-white max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Request Custom Solution
        </CardTitle>
        <p className="text-sm text-gray-600">
          Tell us about your business needs and our solutions team will create a tailored proposal for you.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Smith" 
                        className="border-gray-300 focus:border-blue-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Business Email
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="john@company.com" 
                        className="border-gray-300 focus:border-blue-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+1 (555) 123-4567" 
                        className="border-gray-300 focus:border-blue-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your Company Inc." 
                        className="border-gray-300 focus:border-blue-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Business Requirements
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe your business challenges, goals, and specific requirements. Include details about your industry, target audience, current marketing efforts, and what you hope to achieve."
                      className="border-gray-300 focus:border-blue-500 min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 h-12"
              >
                {isSubmitting ? "Submitting Request..." : "Submit Request"}
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Our solutions team will review your requirements and contact you within 24 hours.
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
