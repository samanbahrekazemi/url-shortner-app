import { z } from "zod";
import { translate } from "@/config/i18n";

export const loginSchema = z.object({
  email: z.string().min(1, translate("validation.usernameRequired")),
  password: z.string().min(1, translate("validation.passwordRequired")),
});

export const profileSchema = z.object({
  name: z.string().min(2, translate("validation.nameMin")),
  email: z.email(translate("validation.emailValid")),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, translate("validation.currentPasswordRequired")),
  newPassword: z.string().min(6, translate("validation.newPasswordMin")),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: translate("validation.passwordsMatch"),
  path: ["confirmNewPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
