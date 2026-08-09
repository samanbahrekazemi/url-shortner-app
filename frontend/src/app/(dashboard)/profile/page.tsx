"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, changePasswordSchema, type ProfileFormData, type ChangePasswordFormData } from "@/lib/validations/auth.schema";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/lib/api/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { User, Lock } from "lucide-react";
import { useTranslation, getErrorMessage } from "@/config/i18n";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const { t } = useTranslation();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || "", email: user?.email || "" },
  });

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onUpdateProfile(data: ProfileFormData) {
    setIsUpdatingProfile(true);
    try {
      const updated = await authService.updateProfile(data);
      setUser(updated);
      toast.success(t("toast.profileUpdated"));
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  async function onChangePassword(data: ChangePasswordFormData) {
    setIsChangingPassword(true);
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success(t("toast.passwordChanged"));
      passwordForm.reset();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsChangingPassword(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">{t("profile.heading")}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            {t("profile.infoTitle")}
          </CardTitle>
          <CardDescription>{t("profile.infoDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("profile.name")}</Label>
              <Input id="name" {...profileForm.register("name")} />
              {profileForm.formState.errors.name && (
                <p className="text-xs text-destructive">{profileForm.formState.errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("profile.email")}</Label>
              <Input id="email" type="email" {...profileForm.register("email")} />
              {profileForm.formState.errors.email && (
                <p className="text-xs text-destructive">{profileForm.formState.errors.email.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isUpdatingProfile}>
              {isUpdatingProfile ? <LoadingSpinner size={16} /> : t("profile.save")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Lock className="size-5" />
            {t("profile.changePasswordTitle")}
          </CardTitle>
          <CardDescription>{t("profile.changePasswordDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{t("profile.currentPassword")}</Label>
              <Input id="currentPassword" type="password" {...passwordForm.register("currentPassword")} />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-xs text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>
              )}
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t("profile.newPassword")}</Label>
              <Input id="newPassword" type="password" {...passwordForm.register("newPassword")} />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-xs text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">{t("profile.confirmPassword")}</Label>
              <Input id="confirmNewPassword" type="password" {...passwordForm.register("confirmNewPassword")} />
              {passwordForm.formState.errors.confirmNewPassword && (
                <p className="text-xs text-destructive">{passwordForm.formState.errors.confirmNewPassword.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? <LoadingSpinner size={16} /> : t("profile.changePassword")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
