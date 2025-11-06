import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { AICampaignSuggestions, AIBusinessContext } from '@/types/ai-campaign';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { getCurrencySymbol } from '@/utils/currencyData';

interface AIAssistantPanelProps {
  suggestions: AICampaignSuggestions | null;
  step: 'setup' | 'audience' | 'content';
  onApplySuggestion: (field: string, value: any) => void;
  businessContext?: AIBusinessContext | null;
}

export function AIAssistantPanel({ suggestions, step, onApplySuggestion, businessContext }: AIAssistantPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!suggestions) return null;

  const currencySymbol = businessContext?.currency ? getCurrencySymbol(businessContext.currency) : '$';

  const getStepSuggestions = () => {
    switch (step) {
      case 'setup':
        return suggestions.campaignSetup;
      case 'audience':
        return suggestions.targetAudience;
      case 'content':
        return suggestions.adContent;
      default:
        return null;
    }
  };

  const stepData = getStepSuggestions();
  if (!stepData) return null;

  return (
    <div className="w-full lg:w-[400px] space-y-4">
      <Card className="border-2 border-transparent bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-lg">AI Suggestions</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="space-y-3">
            {/* Campaign Setup Step */}
            {step === 'setup' && 'objective' in stepData && (
              <>
                <SuggestionCard
                  title="Campaign Objective"
                  value={stepData.objective}
                  confidence="high"
                  onApply={() => onApplySuggestion('objective', stepData.objective)}
                />
                
                <SuggestionCard
                  title="Recommended Budget"
                  value={`${currencySymbol}${stepData.recommendedBudget.min} - ${currencySymbol}${stepData.recommendedBudget.max}`}
                  confidence="high"
                  reasoning={stepData.recommendedBudget.reasoning}
                  onApply={() => onApplySuggestion('budgetAmount', stepData.recommendedBudget.min)}
                />

                <SuggestionCard
                  title="Bid Strategy"
                  value={stepData.bidStrategy}
                  confidence="high"
                  onApply={() => onApplySuggestion('bidStrategy', stepData.bidStrategy)}
                />

                {stepData.tips.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs font-semibold text-blue-900 mb-2">💡 Pro Tips</p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      {stepData.tips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* Target Audience Step */}
            {step === 'audience' && 'demographics' in stepData && (
              <>
                <SuggestionCard
                  title="Age Range"
                  value={`${stepData.demographics.ageRange[0]} - ${stepData.demographics.ageRange[1]} years`}
                  confidence="high"
                  reasoning={stepData.demographics.reasoning}
                  onApply={() => onApplySuggestion('ageRange', stepData.demographics.ageRange)}
                />

                <SuggestionCard
                  title="Gender"
                  value={stepData.demographics.gender}
                  confidence="high"
                  onApply={() => onApplySuggestion('gender', stepData.demographics.gender)}
                />

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Top Locations</p>
                  {stepData.locations.slice(0, 3).map((loc, i) => (
                    <SuggestionCard
                      key={i}
                      title={loc.name}
                      value={loc.reasoning}
                      confidence="high"
                      onApply={() => onApplySuggestion('location', loc.name)}
                    />
                  ))}
                </div>

                {stepData.interests && stepData.interests.length > 0 && (
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs font-semibold text-purple-900 mb-2">Interest Targeting</p>
                    <div className="flex flex-wrap gap-1">
                      {stepData.interests.map((interest, i) => (
                        <Badge key={i} variant="secondary" className="text-xs cursor-pointer" onClick={() => onApplySuggestion('interest', interest)}>
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {stepData.keywords && stepData.keywords.length > 0 && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs font-semibold text-green-900 mb-2">Keyword Suggestions</p>
                    <div className="flex flex-wrap gap-1">
                      {stepData.keywords.map((keyword, i) => (
                        <Badge key={i} variant="secondary" className="text-xs cursor-pointer" onClick={() => onApplySuggestion('keyword', keyword)}>
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {stepData.jobTitles && stepData.jobTitles.length > 0 && (
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-xs font-semibold text-indigo-900 mb-2">Job Titles</p>
                    <div className="flex flex-wrap gap-1">
                      {stepData.jobTitles.map((title, i) => (
                        <Badge key={i} variant="secondary" className="text-xs cursor-pointer" onClick={() => onApplySuggestion('jobTitle', title)}>
                          {title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Ad Content Step */}
            {step === 'content' && 'headlines' in stepData && (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Headline Ideas</p>
                  {stepData.headlines.slice(0, 3).map((headline, i) => (
                    <SuggestionCard
                      key={i}
                      title={`Option ${i + 1}`}
                      value={headline.text}
                      confidence={headline.confidence}
                      onApply={() => onApplySuggestion('headline', headline.text)}
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Description Ideas</p>
                  {stepData.descriptions.slice(0, 2).map((desc, i) => (
                    <SuggestionCard
                      key={i}
                      title={`Option ${i + 1}`}
                      value={desc.text}
                      confidence={desc.confidence}
                      onApply={() => onApplySuggestion('description', desc.text)}
                    />
                  ))}
                </div>

                {stepData.callToAction.length > 0 && (
                  <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <p className="text-xs font-semibold text-pink-900 mb-2">Call to Action</p>
                    <div className="flex flex-wrap gap-1">
                      {stepData.callToAction.map((cta, i) => (
                        <Badge key={i} variant="secondary" className="text-xs cursor-pointer" onClick={() => onApplySuggestion('cta', cta)}>
                          {cta}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {stepData.visualSuggestions.length > 0 && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-xs font-semibold text-amber-900 mb-2">🎨 Visual Suggestions</p>
                    <ul className="text-xs text-amber-800 space-y-1">
                      {stepData.visualSuggestions.map((visual, i) => (
                        <li key={i}>• {visual}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

interface SuggestionCardProps {
  title: string;
  value: string;
  confidence: 'high' | 'medium';
  reasoning?: string;
  onApply: () => void;
}

function SuggestionCard({ title, value, confidence, reasoning, onApply }: SuggestionCardProps) {
  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-semibold text-gray-700">{title}</p>
            <Badge variant={confidence === 'high' ? 'default' : 'secondary'} className="text-xs">
              {confidence === 'high' ? '✓ High' : '~ Medium'}
            </Badge>
          </div>
          <p className="text-sm text-gray-900">{value}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white hover:opacity-90"
                onClick={onApply}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Apply
              </Button>
            </TooltipTrigger>
            <TooltipContent>Click to apply this suggestion</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {reasoning && (
        <div className="flex items-start gap-1 text-xs text-gray-600 mt-2 p-2 bg-gray-50 rounded">
          <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <p>{reasoning}</p>
        </div>
      )}
    </div>
  );
}
