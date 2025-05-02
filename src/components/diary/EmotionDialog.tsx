
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { Emotion, EmotionEvent } from '@/types/test';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import EmotionSelector from './EmotionSelector';
import EmotionRecommendations from '@/components/EmotionRecommendations';
import { emotions } from '@/utils/emotions';

interface EmotionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSaveEmotion: (event: EmotionEvent) => void;
  existingEmotion?: EmotionEvent;
}

const EmotionDialog: React.FC<EmotionDialogProps> = ({ 
  isOpen, 
  onClose, 
  selectedDate, 
  onSaveEmotion,
  existingEmotion 
}) => {
  const { user, addEmotionEventToUser } = useAuth();
  const { toast } = useToast();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [note, setNote] = useState<string>('');
  const [saving, setSaving] = useState(false);

  // Устанавливаем существующие данные при открытии диалога
  useEffect(() => {
    if (existingEmotion) {
      setNote(existingEmotion.note || '');
      const emotion = emotions.find(e => e.id === existingEmotion.emotionId);
      if (emotion) {
        setSelectedEmotion(emotion);
      }
    } else {
      setNote('');
      setSelectedEmotion(null);
    }
  }, [existingEmotion, isOpen]);

  const handleSave = async () => {
    if (!selectedDate || !selectedEmotion) return;
    
    setSaving(true);
    
    const emotionEvent: EmotionEvent = {
      date: selectedDate,
      emotionId: selectedEmotion.id,
      note: note.trim()
    };
    
    // Сохраняем в контекст пользователя, если пользователь авторизован
    if (user) {
      try {
        const success = await addEmotionEventToUser(emotionEvent);
        if (success) {
          toast({
            title: "Запись сохранена",
            description: "Запись об эмоции успешно добавлена в ваш дневник",
            variant: "default",
          });
        }
      } catch (error) {
        console.error('Ошибка при сохранении эмоции:', error);
        toast({
          title: "Ошибка сохранения",
          description: "Не удалось сохранить запись. Пожалуйста, попробуйте снова.",
          variant: "destructive",
        });
      }
    }
    
    // Сохраняем локально
    onSaveEmotion(emotionEvent);
    setSaving(false);
    onClose();
  };

  const handleSelectEmotion = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
  };

  const formattedDate = selectedDate 
    ? format(selectedDate, 'EEEE, d MMMM yyyy', { locale: ru }) 
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Запись в дневник эмоций
          </DialogTitle>
          <p className="text-gray-500 text-sm capitalize">{formattedDate}</p>
        </DialogHeader>

        {!selectedEmotion ? (
          <EmotionSelector onSelectEmotion={handleSelectEmotion} />
        ) : (
          <>
            <div className="flex items-center space-x-2 mb-4">
              <div className={`p-2 rounded-full bg-${selectedEmotion.color}-100`}>
                <Icon 
                  name={selectedEmotion.icon} 
                  className={`h-5 w-5 text-${selectedEmotion.color}-600`} 
                />
              </div>
              <h3 className="text-lg font-medium">
                {selectedEmotion.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedEmotion(null)}
                className="ml-auto"
              >
                Изменить
              </Button>
            </div>

            <Textarea
              placeholder="Добавьте заметку о своих чувствах (необязательно)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[100px] mb-4"
            />

            <Separator className="my-4" />
            
            <EmotionRecommendations emotion={selectedEmotion} />

            <DialogFooter className="flex space-x-2 pt-4">
              <Button variant="outline" onClick={onClose} disabled={saving}>
                Отмена
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  'Сохранить'
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmotionDialog;
