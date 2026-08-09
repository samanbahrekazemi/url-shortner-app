"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUrlSchema, type UpdateUrlFormData } from "@/lib/validations/url.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Link2 } from "lucide-react";
import { useTranslation } from "@/config/i18n";

interface URLFormProps {
  onSubmit: (data: UpdateUrlFormData) => Promise<void>;
  isSubmitting: boolean;
  defaultValues?: Partial<UpdateUrlFormData>;
}

export function URLForm({ onSubmit, isSubmitting, defaultValues }: URLFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUrlFormData>({
    resolver: zodResolver(updateUrlSchema),
    defaultValues: defaultValues || { original_url: "" },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("urlForm.title")}</CardTitle>
        <CardDescription>{t("urlForm.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="original_url">{t("form.longUrl")}</Label>
            <div className="relative">
              <Link2 className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="original_url"
                type="url"
                placeholder={t("form.longUrlPlaceholder")}
                className="ps-9"
                {...register("original_url")}
              />
            </div>
            {errors.original_url && <p className="text-xs text-destructive">{errors.original_url.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner size={16} /> : t("urlForm.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
