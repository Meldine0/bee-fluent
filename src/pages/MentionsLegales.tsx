import { motion } from 'motion/react';

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

export function MentionsLegales() {
  return (
    <div className="bg-[#FDFCF8] py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[var(--color-bee-black)] mb-2">
            Mentions légales
          </h1>
          <p className="text-gray-400 text-sm mb-12">Dernière mise à jour : mars 2026</p>

          <Section title="1. Éditeur du site">
            <p>Le site <strong>beefluent.fr</strong> est édité par :</p>
            <ul className="list-none space-y-1 mt-2">
              <li><strong>Sarah Beale</strong></li>
              <li>Auto-entrepreneur — SIRET en cours d'immatriculation</li>
              <li>Alpes-Maritimes (06), France</li>
              <li>Email : <a href="mailto:contact@beefluent.fr" className="text-[var(--color-bee-black)] underline underline-offset-2">contact@beefluent.fr</a></li>
            </ul>
          </Section>

          <Section title="2. Hébergeur">
            <p>Le site est hébergé par :</p>
            <ul className="list-none space-y-1 mt-2">
              <li><strong>Vercel Inc.</strong></li>
              <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li>Site : <span className="text-[var(--color-bee-black)]">vercel.com</span></li>
            </ul>
          </Section>

          <Section title="3. Propriété intellectuelle">
            <p>
              L'ensemble des contenus présents sur ce site — textes, visuels, logo, charte graphique, structure — sont la propriété exclusive de Sarah Beale ou de leurs auteurs respectifs, et sont protégés par le droit français de la propriété intellectuelle.
            </p>
            <p>
              <strong className="text-[var(--color-bee-black)]">Photographie de Sarah Beale :</strong> la photographie de Sarah Beale utilisée sur ce site est une œuvre personnelle protégée par le droit à l'image et le droit d'auteur. Toute reproduction, diffusion, modification, publication ou utilisation de cette image — à des fins commerciales ou non — sans autorisation écrite préalable de l'intéressée est strictement interdite et constitue une contrefaçon susceptible d'engager la responsabilité civile et pénale de son auteur, conformément aux articles L.111-1 et suivants du Code de la propriété intellectuelle.
            </p>
            <p>
              Toute demande d'utilisation doit être adressée à : <a href="mailto:contact@beefluent.fr" className="text-[var(--color-bee-black)] underline underline-offset-2">contact@beefluent.fr</a>
            </p>
          </Section>

          <Section title="4. Données personnelles (RGPD)">
            <p>
              Dans le cadre de la réservation en ligne, des données personnelles (prénom, nom, adresse email, créneaux choisis) sont collectées uniquement dans le but de traiter et confirmer votre demande de cours.
            </p>
            <p>
              Ces données sont conservées pour la durée strictement nécessaire à la gestion de la relation client, et ne sont en aucun cas revendues ou transmises à des tiers sans votre consentement.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d'opposition</li>
            </ul>
            <p>Pour exercer ces droits, contactez : <a href="mailto:contact@beefluent.fr" className="text-[var(--color-bee-black)] underline underline-offset-2">contact@beefluent.fr</a></p>
          </Section>

          <Section title="5. Cookies">
            <p>
              Ce site n'utilise pas de cookies à des fins publicitaires ou de pistage. Des cookies techniques strictement nécessaires au fonctionnement du site (session, préférences) peuvent être déposés. Ils ne nécessitent pas de consentement préalable.
            </p>
          </Section>

          <Section title="6. Responsabilité">
            <p>
              Sarah Beale s'efforce de maintenir les informations du site à jour et exactes, mais ne peut garantir l'exhaustivité ou l'absence d'erreur. Les tarifs et disponibilités sont susceptibles d'évoluer sans préavis.
            </p>
            <p>
              Sarah Beale ne saurait être tenue responsable d'éventuels dommages résultant de l'utilisation du site ou de l'impossibilité d'y accéder.
            </p>
          </Section>

          <Section title="7. Droit applicable">
            <p>
              Le présent site et ses mentions légales sont soumis au droit français. Tout litige relatif à l'utilisation du site relève de la compétence exclusive des tribunaux français.
            </p>
          </Section>
        </motion.div>
      </div>
    </div>
  );
}
