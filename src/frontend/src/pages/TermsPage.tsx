import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, FileText, Scale, Shield } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Introduction",
    content: `Welcome to Wediva ("the Platform"). By creating an account, listing your services, or using any feature of wediva.in, you ("User") agree to be bound by these Terms & Conditions. These terms apply to all users — couples, vendors, wedding planners, and community members.

Wediva is a wedding vendor marketplace that connects couples with verified wedding service providers across India. The Platform facilitates discovery, shortlisting, and inquiry — it does not itself provide wedding services.`,
  },
  {
    icon: Shield,
    title: "2. Platform-Only Dealings (No Off-Platform Transactions)",
    content: `This is Wediva's most important rule and applies to ALL users.

For Couples & Guests:
You agree that any vendor you discover, shortlist, inquire about, or contact through Wediva must be engaged and paid through the Wediva platform. You must not negotiate, agree terms, or make any payment to a vendor discovered through Wediva through any channel outside the platform (including WhatsApp, phone, in-person, or any third-party app).

For Vendors:
You agree that any couple or client who contacts you through Wediva is a Wediva-introduced lead. You must not accept bookings, negotiate deals, receive advance payments, or conduct any business with a Wediva-introduced couple outside the platform — regardless of how the couple approaches you (phone, Instagram, in person, etc.).

For Wedding Planners:
You agree to ensure all vendor bookings for clients introduced through Wediva are processed through the platform.`,
  },
  {
    icon: AlertTriangle,
    title: "3. Breach of Platform Terms & Penalties",
    content: `Any off-platform transaction between a couple and a vendor that originated through Wediva constitutes a material breach of these Terms & Conditions.

Consequences for Couples:
- Immediate account suspension
- A penalty fee equivalent to 5% of the estimated deal value, subject to a minimum of ₹5,000
- Permanent ban from the platform at Wediva's discretion
- Legal action for damages in cases of fraud or repeated breach

Consequences for Vendors:
- Immediate removal of listing from the platform
- A penalty fee equivalent to the full 2% platform commission on the deal value, plus an additional 5% breach penalty
- Loss of all accumulated reviews and verified status
- Legal action for recovery of commissions and damages
- Reporting to GST authorities where applicable

Wediva reserves the right to investigate suspected off-platform dealings and requires both parties to cooperate. Evidence of off-platform contact (WhatsApp screenshots, bank transfers, etc.) will be treated as conclusive.`,
  },
  {
    icon: Scale,
    title: "4. Platform Commission (Vendors)",
    content: `Vendors on Wediva's Standard, Premium, Destination Hub, and Concierge plans agree to pay a 2% platform commission on the total value of every booking that originates through a Wediva inquiry or lead.

Commission is due within 7 days of receiving the booking deposit from a couple.

Free plan vendors are not charged commission but are limited to 2 active inquiries per month.

All commissions are subject to 18% GST as per Indian tax regulations.`,
  },
  {
    icon: CheckCircle,
    title: "5. Verified Status & Trust",
    content: `Wediva's "Verified" badge indicates that a vendor has submitted GST registration, government-issued ID, and proof of business. Verification does not constitute an endorsement of quality and Wediva is not liable for the performance of any vendor.

Couples are responsible for conducting their own due diligence before confirming a booking. Wediva recommends meeting vendors in person and reviewing contracts independently before making any payments.`,
  },
  {
    icon: Shield,
    title: "6. Data Privacy",
    content: `Wediva collects personal information (name, email, phone, wedding details, social profiles) to facilitate matching between couples and vendors.

Your contact details are NEVER shared with a vendor until a deal is confirmed through the platform. Vendors do not receive your phone number or email from a mere inquiry — only your in-app message.

We do not sell personal data to third parties. Data is processed in accordance with India's Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.`,
  },
  {
    icon: FileText,
    title: "7. Content & Reviews",
    content: `Any content you post on Wediva (reviews, community posts, photos) must be truthful, respectful, and based on genuine experience. False reviews, defamatory content, or spam will result in immediate removal and account suspension.

By posting content, you grant Wediva a non-exclusive, royalty-free licence to display that content on the platform and in marketing materials.`,
  },
  {
    icon: Scale,
    title: "8. Dispute Resolution",
    content: `In the event of a dispute between a couple and a vendor, Wediva may act as a neutral mediator at its discretion. Wediva is not liable for the outcome of any wedding service and does not guarantee vendor performance.

All disputes arising from these Terms shall be governed by the laws of India and subject to the exclusive jurisdiction of courts in New Delhi, India.`,
  },
  {
    icon: FileText,
    title: "9. Changes to These Terms",
    content: `Wediva reserves the right to update these Terms & Conditions at any time. Users will be notified of material changes by email or an in-app notice. Continued use of the platform after changes constitutes acceptance of the new terms.

Last updated: August 2026`,
  },
];

export default function TermsPage() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/8 to-background py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Legal</span>
          </div>
          <h1 className="font-display font-bold text-4xl text-foreground mb-3">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
            These terms govern your use of Wediva. The most important rule: all dealings between couples and vendors discovered through Wediva must happen on the platform. Off-platform transactions are a breach and subject to penalty.
          </p>
        </div>
      </section>

      {/* Key rule callout */}
      <section className="py-6 bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-900/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-400 text-sm">
                No off-platform deals — ever
              </p>
              <p className="text-amber-700 dark:text-amber-500 text-xs mt-1 leading-relaxed">
                Any couple or vendor who bypasses Wediva after being introduced through the platform is in breach of these terms. Penalties apply to both parties. See Section 3 for full details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms sections */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl space-y-5">
          {sections.map((section) => (
            <Card key={section.title} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <section.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-foreground text-lg">
                    {section.title}
                  </h2>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  {section.content.split("\n\n").map((para, i) => (
                    <p key={i} className={para.startsWith("For ") || para.startsWith("Commission") || para.startsWith("Consequences") || para.startsWith("Free plan") || para.startsWith("All commissions") ? "font-medium text-foreground" : ""}>
                      {para}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Contact */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Questions about these terms?{" "}
                <a href="mailto:legal@wediva.in" className="text-primary hover:underline font-medium">
                  legal@wediva.in
                </a>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Wediva — India's trusted wedding vendor marketplace
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
