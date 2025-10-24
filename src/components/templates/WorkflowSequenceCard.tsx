import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MessageSquare, Clock, Copy, Edit, Trash2, Sparkles } from "lucide-react";
import { WorkflowSequenceWithSteps } from "@/types/campaigns";

interface WorkflowSequenceCardProps {
  sequence: WorkflowSequenceWithSteps;
  onEdit: (sequence: WorkflowSequenceWithSteps) => void;
  onDuplicate: (sequence: WorkflowSequenceWithSteps) => void;
  onDelete: (sequenceId: string) => void;
}

export function WorkflowSequenceCard({ sequence, onEdit, onDuplicate, onDelete }: WorkflowSequenceCardProps) {
  const formatDuration = (hours: number) => {
    if (hours < 24) return `${hours} hours`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-0 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="pb-3 relative z-10" style={{ backgroundColor: `${sequence.color}15` }}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl shadow-lg" style={{ background: sequence.color }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-base font-bold text-gray-900">
              {sequence.name}
            </CardTitle>
          </div>
          <Badge variant={sequence.is_active ? "default" : "secondary"} 
                 className={sequence.is_active ? "bg-green-500 text-white" : ""}>
            {sequence.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-700">
          {sequence.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4 relative z-10">
        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Steps</p>
            <p className="text-lg font-bold text-purple-600">{sequence.total_steps}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Channels</p>
            <div className="flex gap-1 mt-1">
              {sequence.email_count > 0 && (
                <Badge variant="outline" className="text-xs">
                  <Mail className="w-3 h-3 mr-1" />
                  {sequence.email_count}
                </Badge>
              )}
              {sequence.whatsapp_count > 0 && (
                <Badge variant="outline" className="text-xs">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {sequence.whatsapp_count}
                </Badge>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <p className="text-sm font-semibold">{formatDuration(sequence.total_duration_hours)}</p>
            </div>
          </div>
        </div>
        
        {/* Expandable Step List */}
        <Accordion type="single" collapsible className="mb-4">
          <AccordionItem value="steps" className="border rounded-lg">
            <AccordionTrigger className="px-3 py-2 hover:no-underline">
              <span className="text-sm font-medium">View Sequence Steps</span>
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              <ol className="space-y-2">
                {sequence.steps.map((step) => (
                  <li key={step.id} className="flex items-start gap-2 text-sm">
                    <Badge variant="outline" className="mt-0.5">{step.step_order}</Badge>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {step.channel === 'email' ? (
                          <Mail className="w-3 h-3 text-purple-600" />
                        ) : (
                          <MessageSquare className="w-3 h-3 text-green-600" />
                        )}
                        <span className="font-medium">{step.template.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {step.delay_hours === 0 ? 'Sent immediately' : `Sent after ${formatDuration(step.delay_hours)}`}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={() => onEdit(sequence)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            size="sm"
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button 
            onClick={() => onDuplicate(sequence)}
            variant="outline" 
            size="sm"
            className="flex-1"
          >
            <Copy className="w-3 h-3 mr-1" />
            Duplicate
          </Button>
          <Button 
            onClick={() => onDelete(sequence.id)}
            variant="ghost" 
            size="sm"
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}