import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

export default function ServiceCard({ title, description, features, icon: Icon }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="w-16 h-16 bg-gradient-to-br from-royal to-forest rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-2xl mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      
      <div className="space-y-2">
        <h4 className="font-semibold text-royal mb-3">Prestations incluses :</h4>
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-forest mt-1">✓</span>
            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
