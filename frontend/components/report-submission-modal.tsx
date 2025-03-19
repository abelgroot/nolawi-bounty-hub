import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParticipationActions } from "@/hooks/useParticipationActions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { BountyProgram } from "@/schemas/program.schema";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { useAlert } from "@/providers/alert-provider";

export function ReportSubmissionModal({
  program,
  hackerId,
  isOpen,
  setIsOpen,
}: {
  program: BountyProgram;
  hackerId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const alert = useAlert();
  const { submitReport, isSubmittingReport } =
    useParticipationActions(hackerId);

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const schema = z.object({
    description: z.string().min(1, "description is required"),
    details: z.string().min(1, "You need to provide a detail report"),
  });

  const reportform = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      details: "",
    },
  });

  const { handleSubmit } = reportform;

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (!isTermsChecked) {
      alert?.error("Please accept the terms and conditions");
      return;
    }

    submitReport({
      programId: program.id,
      hackerId: hackerId,
      description: data.description,
      details: data.details,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <Dialog
      open={isSubmittingReport ? true : isOpen}
      onOpenChange={isSubmittingReport ? undefined : setIsOpen}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submit Vulnerability Reprot</DialogTitle>
          <DialogDescription>
            NOTICE: please submit a report that has POC and also is zero day
            vulnerability. make sure you have followed all the legal condition
            of the bug bounty
          </DialogDescription>
          <div className="mt-4">
            <div className="font-semibold text-md">Selected Program</div>
            <div>{program.name}</div>
            <div className="text-xs italic">{program.description}</div>
          </div>
        </DialogHeader>
        <Form {...reportform}>
          <form onSubmit={handleOnSubmit} onKeyDown={handleKeyDown}>
            <div className="flex flex-col gap-4 mt-4 justify-center items-center">
              <FormField
                control={reportform.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the vulnerability and its impact"
                        className="w-full min-h-[50px]"
                        {...field}
                        tabIndex={19}
                        name="description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={reportform.control}
                name="details"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a detailed report"
                        className="w-full min-h-[300px]"
                        {...field}
                        tabIndex={20}
                        name="details"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full my-3 flex items-center space-x-2">
                <Checkbox
                  checked={isTermsChecked}
                  onCheckedChange={() => setIsTermsChecked(!isTermsChecked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have followed the brief and agree to the Nolawi terms &
                  conditions.
                </label>
              </div>

              <DialogFooter className="flex w-full justify-end">
                <Button
                  className="px-8 w-full max-w-[200px]"
                  disabled={isSubmittingReport}
                  type="submit"
                  tabIndex={22}
                >
                  {isSubmittingReport && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                  Submit
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
