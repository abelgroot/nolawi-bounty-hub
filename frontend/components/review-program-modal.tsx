import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { createBountyProgramSchema } from "@/schemas/program.schema";
import { Checkbox } from "./ui/checkbox";
import { useAlert } from "@/providers/alert-provider";
import { useProgramActions } from "@/hooks/useProgramActions";
import { useState } from "react";

export function ReviewProgramModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const { createProgram, isCreating } = useProgramActions();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const alert = useAlert();

  const reportform = useForm<z.infer<typeof createBountyProgramSchema>>({
    resolver: zodResolver(createBountyProgramSchema),
    defaultValues: {
      name: "",
      description: "",
      rewardAmount: 100,
    },
  });

  const { handleSubmit } = reportform;

  const onSubmit = (data: z.infer<typeof createBountyProgramSchema>) => {
    if (!isTermsChecked) {
      alert?.error("Please accept the terms and conditions");
      return;
    }

    createProgram({
      name: data.name,
      description: data.description,
      rewardAmount: data.rewardAmount,
      onSuccess: () => {
        setIsOpen(false);
      },
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
      open={isCreating ? true : isOpen}
      onOpenChange={isCreating ? undefined : setIsOpen}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Register a program</DialogTitle>
          <DialogDescription>
            NOTICE: please make sure the registered information comply with your
            requirement
          </DialogDescription>
        </DialogHeader>
        <Form {...reportform}>
          <form onSubmit={handleOnSubmit} onKeyDown={handleKeyDown}>
            <div className="flex flex-col gap-4 mt-4 justify-center items-center">
              <FormField
                control={reportform.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of the program you want to create"
                        className="w-full min-h-[50px]"
                        {...field}
                        tabIndex={18}
                        name="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={reportform.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the vulnerability and list the sites that are affected"
                        className="w-full min-h-[200px]"
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
                name="rewardAmount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Details</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        tabIndex={20}
                        type="number"
                        min={100}
                        name="rewardAmount"
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
                  disabled={isCreating}
                  type="submit"
                  tabIndex={22}
                >
                  {isCreating && <Loader2 className="w-5 h-5 animate-spin" />}
                  Create Program
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
