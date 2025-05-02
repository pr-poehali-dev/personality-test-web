
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { Emotion, EmotionEvent } from '@/types/test';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import EmotionSelector from './EmotionSelector';
import EmotionRecommendations from './EmotionRecommendations';

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
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [note, setNote] = useState<string>(existingEmotion?.note || '');

  const handleSave = () => {
    if (!selectedDate || !selectedEmotion) return;
    
    const emotionEvent: EmotionEvent = {
      date: selectedDate,
      emotionId: selectedEmotion.id,
      note: note.trim()
    };
    
    onSaveEmotion(emotionEvent);
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
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

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Отмена</Button>
              <Button onClick={handleSave}>Сохранить</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmotionDialog;
