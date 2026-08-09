import { z } from "zod";
import { translate } from "@/config/i18n";

export const createUrlSchema = z.object({
  original_url: z
    .url(translate("validation.urlValid"))
    .max(2048, translate("validation.urlMax")),
  algorithm: z.enum(["v1", "v2"]),
});

export const updateUrlSchema = z.object({
  original_url: z
    .url(translate("validation.urlValid"))
    .max(2048, translate("validation.urlMax")),
});

export type CreateUrlFormData = z.infer<typeof createUrlSchema>;
export type UpdateUrlFormData = z.infer<typeof updateUrlSchema>;
