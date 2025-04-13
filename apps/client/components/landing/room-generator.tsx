"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Copy } from "lucide-react";
import { useState } from "react";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "didn't select anything.",
    })
});

export function RoomForm() {
  const [id, setId] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Room created!",
      className: "bg-white text-black",
    });
    console.log(data);
    let id = RandomIdGenerator();
    setId(id);
  }

  function RandomIdGenerator(){
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
   };
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-52 bg-transparent">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" type="submit">Create Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Share link</DialogTitle>
          <DialogDescription className="text-white">
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={"http://localhost:3000/room/"+id}
              readOnly
              className="text-white"
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={() => {
            navigator.clipboard.writeText('http://localhost:3000/room/'+id);
            toast({
              title: "Copied to clipboard!",
              className: "bg-white text-black",
            });
          }}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
            <Button type="submit" variant="secondary" onClick={() =>{
              router.push(`/room/${id}`)
            }}>
              Join Room
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

      </form>
    </Form>
  );
}
