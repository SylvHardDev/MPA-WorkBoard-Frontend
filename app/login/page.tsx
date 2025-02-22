"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "L'email est requis" })
    .email({ message: "Adresse email invalide" }),
  password: z
    .string()
    .nonempty({ message: "Le mot de passe est requis" })
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Données de connexion:", data);
    // Intègre ici ta logique de connexion (appel API, redirection, etc.)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="mb-6 text-2xl font-bold text-center">Connexion</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ton.email@exemple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
          <div className="py-4">
            <Link href={"/register"}>
              <p className="text-xs text-slate-600 text-center">
                Pas encore de compte ?{" "}
                <span className="font-semibold text-blue-500 underline">
                  Register
                </span>{" "}
              </p>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
