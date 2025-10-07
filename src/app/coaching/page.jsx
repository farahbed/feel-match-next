"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  MessageSquareHeart,
  Video,
  Camera,
  ShieldCheck,
  Star,
  Rocket,
  NotebookText,
  PlayCircle,
  ScanFace,
} from "lucide-react";

/* --------------------------
   Thème dark + gold (tokens)
   -------------------------- */
const GOLD = "#c2a661";
const SURFACE = "#15171b";
const SURFACE_2 = "#1b1d22";
const BORDER = "#262930";
const TEXT = "#E7E7EA";
const MUTED = "#A8AAB2";

/* --------------------------
   Composants utilitaires
   -------------------------- */

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border shadow-sm ${className}`}
      style={{
        borderColor: BORDER,
        background: SURFACE,
        boxShadow: "0 1px 2px rgba(0,0,0,.35), 0 0 0 0.5px rgba(194,166,97,0.08)",
        color: TEXT,
      }}
    >
      {children}
    </div>
  );
}

function CardHeader({ title, description, icon }) {
  return (
    <div
      className="p-5 rounded-t-xl border-b"
      style={{ borderColor: BORDER, background: SURFACE_2 }}
    >
      <div className="flex items-center gap-2" style={{ color: TEXT }}>
        {icon}
        {title ? <h3 className="text-base font-semibold">{title}</h3> : null}
      </div>
      {description ? (
        <p className="mt-1 text-sm" style={{ color: MUTED }}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CardContent({ children }) {
  return <div className="p-5">{children}</div>;
}

function CardFooter({ children }) {
  return (
    <div
      className="p-5 rounded-b-xl border-t"
      style={{ borderColor: BORDER, background: SURFACE_2 }}
    >
      {children}
    </div>
  );
}

function Button({ children, variant = "default", as, href, className = "", ...props }) {
  const Comp = as === "a" ? "a" : "button";
  const base =
    variant === "outline"
      ? "border"
      : "border";
  const style =
    variant === "outline"
      ? {
          borderColor: BORDER,
          background: SURFACE_2,
          color: TEXT,
        }
      : {
          borderColor: "transparent",
          background: GOLD,
          color: "#15171B",
        };

  return (
    <Comp
      href={href}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ${base} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Comp>
  );
}

function Badge({ children, variant = "default" }) {
  const style =
    variant === "secondary"
      ? {
          border: `1px solid ${BORDER}`,
          background: SURFACE_2,
          color: TEXT,
        }
      : {
          background: GOLD,
          color: "#15171B",
          border: "1px solid transparent",
        };
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
      style={style}
    >
      {children}
    </span>
  );
}

function Label({ children }) {
  return <label className="text-sm font-medium" style={{ color: TEXT }}>{children}</label>;
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
      style={{
        borderColor: BORDER,
        background: SURFACE_2,
        color: TEXT,
        boxShadow: "none",
      }}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 min-h-[92px]"
      style={{
        borderColor: BORDER,
        background: SURFACE_2,
        color: TEXT,
        boxShadow: "none",
      }}
    />
  );
}

function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0" style={{ background: "#00000066" }} onClick={onClose} />
      <div
        className="relative z-[61] w-full max-w-lg rounded-xl border shadow-lg"
        style={{ background: SURFACE, borderColor: BORDER, color: TEXT }}
      >
        <div className="p-5 border-b" style={{ borderColor: BORDER }}>
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        <div className="p-5">{children}</div>
        <div className="p-5 border-t" style={{ borderColor: BORDER, background: SURFACE_2 }}>
          {footer}
        </div>
      </div>
    </div>
  );
}

function ResourcePill({ children }) {
  return (
    <div
      className="rounded-full px-3 py-1 text-sm"
      style={{ background: SURFACE_2, color: TEXT, border: `1px solid ${BORDER}` }}
    >
      {children}
    </div>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        d="M12 21s-6.716-4.432-9.193-7.5C.89 11.22 2.136 7.5 5.64 7.5c2.002 0 3.05 1.084 3.86 2.09.81-1.006 1.858-2.09 3.86-2.09 3.504 0 4.75 3.72 2.833 6.001C18.716 16.568 12 21 12 21z"
        fill={GOLD}
      />
    </svg>
  );
}

/* --- Déclarer CoachCard AVANT usage --- */
function CoachCard({ icon, title, description, normalPrice, memberPrice }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="h-full">
      <CardHeader title={title} icon={icon} description={description} />
      <CardContent>
        <div className="flex items-baseline gap-3">
          <div className="text-sm line-through" style={{ color: MUTED }}>{normalPrice}€</div>
          <div className="text-2xl font-semibold" style={{ color: TEXT }}>{memberPrice}€</div>
          <Badge variant="default">Tarif abonné</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => setOpen(true)}>
          Réserver
        </Button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={`Réserver – ${title}`}
          footer={
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button
                onClick={() => {
                  console.log("Reservation submitted");
                  setOpen(false);
                }}
              >
                Envoyer la demande
              </Button>
            </div>
          }
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Votre nom</Label>
              <Input placeholder="Prénom Nom" />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="vous@exemple.com" />
            </div>
            <div className="grid gap-2">
              <Label>Vos disponibilités (propositions)</Label>
              <Textarea placeholder="Ex. mardi 18h–20h, jeudi 14h–16h" />
            </div>
            <div className="grid gap-2">
              <Label>Objectif</Label>
              <Textarea placeholder="Décrivez brièvement ce que vous souhaitez travailler." />
            </div>
          </div>
        </Modal>
      </CardFooter>
    </Card>
  );
}

/* --------------------------
   Page Coaching – Dark + Gold
   -------------------------- */

export default function CoachingPage() {
  const [isSubscriber, setIsSubscriber] = useState(true);

  const aiTools = useMemo(
    () => [
      {
        icon: <SparklesIcon />,
        title: "Améliorer ma bio",
        desc: "Générez une description attractive et authentique en quelques secondes.",
        cta: "Optimiser ma bio",
        onClick: () => console.log("AI: optimize-bio"),
      },
      {
        icon: <MessageSquareHeart className="h-5 w-5" style={{ color: GOLD }} />,
        title: "Idées de premières phrases",
        desc: "Le premier mot compte, trouve la phrase idéale pour lui parler.",
        cta: "Trouver une ouverture",
        onClick: () => console.log("AI: openers"),
      },
      {
        icon: <ScanFace className="h-5 w-5" style={{ color: GOLD }} />,
        title: "Feedback profil",
        desc: "Recevez un avis instantané sur vos photos et votre bio.",
        cta: "Analyser mon profil",
        onClick: () => console.log("AI: quick-review"),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen w-full" style={{ background: SURFACE_2, color: TEXT }}>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: `${GOLD}26`, color: TEXT, border: `1px solid ${GOLD}55` }}
            >
              <Star className="h-3.5 w-3.5" style={{ color: GOLD }} /> Coaching Premium
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD} 35%, ${TEXT} 70%)`,
                }}
              >
                Coaching
              </span>
            </h1>
            <p className="mt-2 max-w-2xl" style={{ color: MUTED }}>
              Boostez vos rencontres avec des conseils personnalisés : outils IA inclus
              dans votre abonnement et sessions avec de vrais coachs à tarif réduit.
            </p>
          </div>

          {/* Switch démo abonnement */}
          <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
            <span className="hidden sm:inline">Mode démo :</span>
            <Badge variant={isSubscriber ? "default" : "secondary"}>
              {isSubscriber ? "Abonné" : "Non abonné"}
            </Badge>
            <Button variant="outline" onClick={() => setIsSubscriber((v) => !v)}>
              Basculer
            </Button>
          </div>
        </motion.div>

        {/* Accès Premium (non-abonné) */}
        {!isSubscriber ? (
          <Card className="mb-10">
            <CardHeader
              title="Accès réservé"
              description={
                <>
                  Cette section est incluse dans l’abonnement <b style={{ color: TEXT }}>Feel & Match Premium</b>.
                </>
              }
              icon={<ShieldCheck className="h-5 w-5" style={{ color: GOLD }} />}
            />
            <CardContent>
              <ul className="list-inside list-disc text-sm space-y-1" style={{ color: MUTED }}>
                <li>Outils de coaching IA illimités</li>
                <li>Réductions sur les sessions avec nos coachs</li>
                <li>Événements à prix préférentiel</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button as="a" href="/subscribe">S’abonner maintenant</Button>
            </CardFooter>
          </Card>
        ) : null}

        {/* Coaching IA */}
        <section className="mb-12">
          <div className="mb-5 flex items-center gap-2" style={{ color: GOLD }}>
            <Brain className="h-5 w-5" />
            <h2 className="text-xl font-semibold" style={{ color: TEXT }}>
              Aide-toi de l’IA pour valoriser ton profil (inclus)
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiTools.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 * i }}
              >
                <Card className="h-full hover:shadow-md transition">
                  <CardHeader title={t.title} icon={t.icon} description={t.desc} />
                  <CardFooter>
                    <Button onClick={t.onClick}>{t.cta}</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Coaching Humain */}
        <section className="mb-12">
          <div className="mb-5 flex items-center gap-2" style={{ color: GOLD }}>
            <Video className="h-5 w-5" />
            <h2 className="text-xl font-semibold" style={{ color: TEXT }}>
              Coaching humain (tarif abonné)
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <CoachCard
              icon={<Video className="h-5 w-5" style={{ color: GOLD }} />}
              title="Session visio 30 min"
              normalPrice={40}
              memberPrice={25}
              description="Un rendez-vous individuel pour débloquer votre situation du moment."
            />
            <CoachCard
              icon={<Camera className="h-5 w-5" style={{ color: GOLD }} />}
              title="Audit photo & profil"
              normalPrice={30}
              memberPrice={20}
              description="Analyse de vos photos, bio et accroches + plan d’action concret."
            />
            <CoachCard
              icon={<HeartIcon />}
              title="Coaching relationnel"
              normalPrice={50}
              memberPrice={35}
              description="Objectifs, communication, confiance : on construit votre feuille de route."
            />
          </div>
        </section>

        {/* Ressources (exemple) */}
        <section className="mb-12">
          <div className="mb-5 flex items-center gap-2" style={{ color: GOLD }}>
            <NotebookText className="h-5 w-5" />
            <h2 className="text-xl font-semibold" style={{ color: TEXT }}>
              Ressources pour progresser
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader
                title="Mini-vidéos conseils"
                icon={<PlayCircle className="h-5 w-5" style={{ color: GOLD }} />}
                description="Des formats courts (60–90s) pour améliorer photo, bio et 1ers messages."
              />
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-3">
                  <ResourcePill>3 erreurs en speed dating</ResourcePill>
                  <ResourcePill>Comment choisir ses photos</ResourcePill>
                  <ResourcePill>7 ice-breakers qui marchent</ResourcePill>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader
                title="Quiz & check-lists"
                icon={<Rocket className="h-5 w-5" style={{ color: GOLD }} />}
                description="Outils concrets pour clarifier votre style et vos attentes."
              />
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ResourcePill>Quel est mon style de rencontre ?</ResourcePill>
                  <ResourcePill>Checklist 1er rendez-vous</ResourcePill>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bonus */}
        <section className="mb-16">
          <Card>
            <CardHeader
              title="Bonus abonné"
              icon={<ShieldCheck className="h-5 w-5" style={{ color: GOLD }} />}
              description="Votre profil affiche un badge spécial et vous recevez des conseils personnalisés chaque semaine."
            />
            <CardContent>
              <div className="flex flex-wrap items-center gap-3">
                <Badge>Coaching Premium</Badge>
                <Badge variant="secondary">Conseils hebdomadaires</Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </section>
    </div>
  );
}

/* Petit icône étincelle or */
function SparklesIcon() {
  return (
    <span
      className="inline-flex items-center justify-center h-5 w-5 rounded-full"
      style={{ background: `${GOLD}26`, border: `1px solid ${GOLD}55` }}
      aria-hidden
    >
      <span
        className="block h-2 w-2 rounded-sm"
        style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}` }}
      />
    </span>
  );
}