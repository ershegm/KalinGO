
import { z } from "zod";

export const routeSchema = z.object({
  title: z.string().min(3, "Название должно содержать минимум 3 символа"),
  description: z
    .string()
    .min(10, "Описание должно содержать минимум 10 символов"),
  category: z.enum([
    "historical",
    "cultural",
    "nature",
    "gastronomy",
    "architectural",
    "entertainment",
  ]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  duration: z.coerce.number().min(1, "Длительность должна быть указана"),
  distance: z.coerce.number().optional(),
  start_point: z.string().min(3, "Укажите начальную точку маршрута"),
  end_point: z.string().min(3, "Укажите конечную точку маршрута"),
  image_url: z
    .string()
    .url("Введите корректный URL изображения")
    .optional()
    .or(z.literal("")),
  map_embed_code: z.string().optional(),
});

export type RouteFormValues = z.infer<typeof routeSchema>;
