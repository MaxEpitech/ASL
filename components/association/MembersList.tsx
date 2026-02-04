'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Crown } from 'lucide-react';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  role: string | null;
  position: string | null;
  photo: string | null;
  bio: string | null;
  isBoardMember: boolean;
}

interface MembersData {
  boardMembers: Member[];
  activeMembers: Member[];
}

const ROLES: Record<string, string> = {
  president: 'Président',
  vice_president: 'Vice-Président',
  treasurer: 'Trésorier',
  secretary: 'Secrétaire',
  member: 'Membre Actif',
};

export function MembersList() {
  const [data, setData] = useState<MembersData>({ boardMembers: [], activeMembers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Error fetching members:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-600"></div>
      </div>
    );
  }

  const { boardMembers = [], activeMembers = [] } = data || {};

  const MemberCard = ({ member, isBoard }: { member: Member; isBoard?: boolean }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${isBoard ? 'border-t-4 border-royal' : ''}`}>
      <div className="p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className={`w-full h-full rounded-full overflow-hidden relative ${isBoard ? 'ring-4 ring-royal/10' : 'bg-gray-100'}`}>
            {member.photo ? (
              <Image
                src={member.photo}
                alt={`${member.firstName} ${member.lastName}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-royal/5 text-royal/20 font-serif text-3xl font-bold">
                {member.firstName[0]}{member.lastName[0]}
              </div>
            )}
          </div>
          {isBoard && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-full shadow-lg" title="Membre du Bureau">
              <Crown className="w-4 h-4 fill-current" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {member.firstName} {member.lastName}
        </h3>
        
        <div className="text-royal font-medium mb-3">
          {member.role ? ROLES[member.role] : member.position || 'Membre'}
        </div>

        {member.bio && (
          <p className="text-gray-600 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-16">
      {/* Bureau */}
      {boardMembers.length > 0 && (
        <div>
          <h2 className="text-3xl font-serif text-center text-forest mb-2">Le Bureau</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Les membres élus qui pilotent l'association et ses projets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {boardMembers.map((member) => (
              <MemberCard key={member.id} member={member} isBoard />
            ))}
          </div>
        </div>
      )}

      {/* Membres Actifs */}
      {activeMembers.length > 0 && (
        <div className={boardMembers.length > 0 ? "pt-8 border-t border-gray-100" : ""}>
          <h2 className="text-3xl font-serif text-center text-forest mb-2">Membres Actifs</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            L'équipe qui fait vivre l'association au quotidien.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )}

      {boardMembers.length === 0 && activeMembers.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          L'équipe est en cours de constitution.
        </div>
      )}
    </div>
  );
}
