
import { z } from "zod";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Import schema from the schema file
import { routeSchema } from "./schema";

type FormValues = z.infer<typeof routeSchema>;

interface MediaFormProps {
  control: Control<FormValues>;
}

const MediaForm = ({ control }: MediaFormProps) => {
  return (
    <>
      <FormField
        control={control}
        name="image_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL изображения</FormLabel>
            <FormControl>
              <Input
                placeholder="https://example.com/image.jpg"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormDescription>
              URL изображения для обложки маршрута
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="map_embed_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Код встраивания карты Яндекс</FormLabel>
            <FormControl>
              <Textarea
                placeholder='<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/..."></script>'
                className="min-h-[120px] font-mono text-sm"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormDescription>
              Код для встраивания Яндекс Карты (например: script с
              src="https://api-maps.yandex.ru/services/constructor/...")
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default MediaForm;
