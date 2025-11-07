import React from 'react';
import { AlertCircle, Clock, TrendingDown, Users } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      stat: '73%',
      problem: 'Leads Never Get a Response',
      detail: 'Average response time: 4+ hours. By then, they\'ve moved to competitors.',
      color: 'text-red-500'
    },
    {
      icon: TrendingDown,
      stat: '68%',
      problem: 'Ad Spend Wasted on Wrong Audience',
      detail: 'Generic targeting means you\'re paying for clicks that never convert.',
      color: 'text-orange-500'
    },
    {
      icon: Users,
      stat: '82%',
      problem: 'Sales Team Buried in Manual Work',
      detail: 'Data entry, follow-ups, scheduling - instead of selling.',
      color: 'text-yellow-500'
    },
    {
      icon: AlertCircle,
      stat: '91%',
      problem: 'No Visibility Into Pipeline',
      detail: 'You have no idea which campaigns work or where leads are stuck.',
      color: 'text-purple-500'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            You're Losing Leads Because...
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every minute without automation costs you money. Here's what's happening right now.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div key={index} className="group relative bg-background rounded-xl border-2 border-border hover:border-primary/50 p-6 transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${problem.color}`}>
                    <problem.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-3xl font-bold ${problem.color}`}>{problem.stat}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {problem.problem}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {problem.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual stat bar */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-destructive/10 border-l-4 border-destructive rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg font-semibold text-foreground">
                  The Average Business Loses $75,000/Year in Missed Opportunities
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Source: Harvard Business Review - "The Hidden Cost of Slow Lead Response"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
