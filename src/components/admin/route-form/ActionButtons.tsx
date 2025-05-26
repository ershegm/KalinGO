
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface ActionButtonsProps {
  isEditMode: boolean;
  isSubmitting: boolean;
}

const ActionButtons = ({ isEditMode, isSubmitting }: ActionButtonsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/admin/routes")}
      >
        Отмена
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Save className="mr-2 h-4 w-4" />
        {isEditMode ? "Сохранить изменения" : "Создать маршрут"}
      </Button>
    </div>
  );
};

export default ActionButtons;
