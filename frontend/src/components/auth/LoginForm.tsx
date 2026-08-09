"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth.schema";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useTranslation } from "@/config/i18n";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { Link2 } from "lucide-react";

const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "admin";

export function LoginForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: ADMIN_USER, password: ADMIN_PASSWORD },
  });

  async function onSubmit(data: LoginFormData) {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    if (data.email === ADMIN_USER && data.password === ADMIN_PASSWORD) {
      login(data.email, data.password);
      toast.success(t("login.welcome"));
      router.push("/");
    } else {
      toast.error(t("login.invalid"));
    }
    setIsSubmitting(false);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Link2 className="size-7" />
        </div>
        <CardTitle className="text-2xl">{t("login.title")}</CardTitle>
        <CardDescription>{t("login.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("login.username")}</Label>
            <Input id="email" dir="ltr" placeholder="admin" className="text-base" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("login.password")}</Label>
            <Input id="password" type="password" dir="ltr" placeholder="admin" {...register("password")} />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner size={16} /> : t("login.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}