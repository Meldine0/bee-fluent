import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-heading text-xl font-bold text-[var(--color-bee-black)] mb-4 pb-2 border-b border-gray-100">
        {title}
      </h2>
      <div className="text-gray-600 leading-relaxed space-y-3 text-sm">
        {children}
      </div>
    </section>
  );
}

export function CGV() {
  return (
    <div className="bg-[#FDFCF8] py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[var(--color-bee-black)] mb-2">
            Conditions Générales de Vente
          </h1>
          <p className="text-gray-400 text-sm mb-12">Dernière mise à jour : mars 2026</p>

          <Section title="1. Identification du prestataire">
            <p>
              Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les prestations de cours d'anglais proposées par <strong className="text-[var(--color-bee-black)]">Sarah Beale</strong>, auto-entrepreneur domiciliée dans les Alpes-Maritimes (06), France.
            </p>
            <p>Email : <a href="mailto:contact@beefluent.fr" className="text-[var(--color-bee-black)] underline underline-offset-2">contact@beefluent.fr</a></p>
          </Section>

          <Section title="2. Description des prestations">
            <p>Bee Fluent propose les formules de coaching en anglais suivantes :</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li><strong className="text-[var(--color-bee-black)]">Cours Express</strong> — 20 minutes de coaching ciblé, en visioconférence uniquement.</li>
              <li><strong className="text-[var(--color-bee-black)]">Séance Découverte</strong> — 1 heure de coaching oral, avec diagnostic de niveau et compte-rendu.</li>
              <li><strong className="text-[var(--color-bee-black)]">Pack Intensif</strong> — 5 séances d'une heure avec programme personnalisé et suivi de progression.</li>
              <li><strong className="text-[var(--color-bee-black)]">Immersion Totale</strong> — 10 séances d'une heure avec bilan approfondi, préparation aux examens / entretiens et disponibilité WhatsApp entre les séances.</li>
            </ul>
            <p>Les cours sont dispensés en visioconférence (toute la France) ou en présentiel (Alpes-Maritimes, 06), selon la formule choisie.</p>
          </Section>

          <Section title="3. Tarifs et CESU">
            <p>
              Les tarifs affichés sur le site sont exprimés en euros TTC (TVA non applicable, article 293 B du CGI — auto-entrepreneur).
            </p>
            <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 mt-3">
              <p className="text-green-800 font-semibold mb-1">Réduction CESU — crédit d'impôt immédiat</p>
              <p className="text-green-700">
                Les prestations Bee Fluent sont déclarées via le <strong>CESU (Chèque Emploi Service Universel)</strong>, dispositif légal de services à la personne. À ce titre, les clients bénéficient d'un crédit d'impôt de <strong>50 % sur le montant total</strong> des séances, déduit directement au moment du paiement grâce à l'avance immédiate — sans avance de frais et sans attendre la déclaration d'impôts.
              </p>
              <p className="text-green-600 text-xs mt-2">Fondement légal : article 199 sexdecies du Code général des impôts.</p>
            </div>
            <p>Les tarifs peuvent être modifiés à tout moment. Les prix applicables sont ceux en vigueur au moment de la confirmation de la réservation.</p>
          </Section>

          <Section title="4. Réservation et confirmation">
            <p>
              La réservation s'effectue en ligne via le formulaire disponible sur la page <Link to="/reservation" className="text-[var(--color-bee-black)] underline underline-offset-2">Réserver</Link>. Elle est définitive à réception d'un email de confirmation de la part de Bee Fluent.
            </p>
            <p>
              Pour les packs multi-séances, l'ensemble des créneaux doit être choisi lors de la réservation initiale. Des modifications ultérieures sont possibles sous réserve de disponibilité.
            </p>
          </Section>

          <Section title="5. Modalités de paiement">
            <p>
              Le paiement est dû avant le début de la première séance. Les modalités de paiement (virement, CESU, autre) sont précisées dans l'email de confirmation.
            </p>
            <p>
              Pour les packs, le règlement s'effectue en une seule fois, sauf accord express contraire.
            </p>
          </Section>

          <Section title="6. Annulation et report">
            <p>
              Toute demande d'annulation ou de report doit être adressée par email à <a href="mailto:contact@beefluent.fr" className="text-[var(--color-bee-black)] underline underline-offset-2">contact@beefluent.fr</a> dans les délais suivants :
            </p>
            <ul className="list-disc list-inside space-y-1.5 mt-2">
              <li><strong className="text-[var(--color-bee-black)]">Plus de 48h avant la séance :</strong> report sans frais à une date ultérieure.</li>
              <li><strong className="text-[var(--color-bee-black)]">Entre 24h et 48h avant la séance :</strong> report possible une seule fois, sous réserve de disponibilité.</li>
              <li><strong className="text-[var(--color-bee-black)]">Moins de 24h avant la séance ou absence :</strong> la séance est considérée comme consommée, aucun remboursement ni report ne sera accordé.</li>
            </ul>
            <p>
              En cas d'annulation de la part du prestataire, la séance est intégralement reportée ou remboursée au choix du client.
            </p>
          </Section>

          <Section title="7. Droit de rétractation">
            <p>
              Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation de 14 jours ne s'applique pas aux prestations de services pleinement exécutées avant l'expiration du délai de rétractation, avec l'accord express du consommateur.
            </p>
            <p>
              Pour toute première séance non encore réalisée, le client dispose d'un délai de rétractation de 14 jours à compter de la confirmation de la réservation, à condition de formuler sa demande avant la tenue de ladite séance.
            </p>
          </Section>

          <Section title="8. Responsabilité">
            <p>
              Sarah Beale s'engage à dispenser les cours avec sérieux et professionnalisme, mais ne peut garantir un niveau ou résultat spécifique, celui-ci dépendant de l'implication de l'élève. La responsabilité du prestataire ne saurait être engagée en cas de résultats non atteints pour des raisons indépendantes de la qualité des cours.
            </p>
          </Section>

          <Section title="9. Propriété intellectuelle des supports">
            <p>
              Les supports pédagogiques, exercices, documents et ressources audio ou écrits remis dans le cadre des cours sont la propriété exclusive de Sarah Beale. Ils sont destinés à un usage strictement personnel et ne peuvent être reproduits, diffusés ou revendus sans autorisation écrite préalable.
            </p>
          </Section>

          <Section title="10. Droit applicable et litiges">
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, le litige relèvera de la compétence des tribunaux français compétents.
            </p>
            <p>
              Conformément à l'article L.616-1 du Code de la consommation, le client peut recourir gratuitement à un médiateur de la consommation en cas de litige non résolu avec le prestataire.
            </p>
          </Section>
        </motion.div>
      </div>
    </div>
  );
}
